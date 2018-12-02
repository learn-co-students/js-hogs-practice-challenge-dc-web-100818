document.addEventListener("DOMContentLoaded",  function(){
  fetchAllHogs().then(data => { renderHogs(data)});
  getAddHogForm().addEventListener('submit', addNewHog);
})

function getAddHogForm(){
  return document.querySelector('#hog-form');
}

//functions to return HTML elements

function getHogContainer(){
  return document.querySelector('#hog-container');
}

function fetchAllHogs(){
  return fetch('http://localhost:3000/hogs')
    .then(response => response.json());
}

function renderHogs(data){
  let hogContainer = getHogContainer();
  data.forEach(hog => {
    hogDiv = document.createElement('div');
    hogDiv.id = `hog-${hog.id}`;
    hogDiv.classList.add('hog-card');
    hogContainer.appendChild(hogDiv);
    hogHeader = document.createElement('h1');
    hogHeader.addEventListener('click', deleteHog);
    hogHeader.innerText = hog.name;
    hogPic = document.createElement('img');
    hogPic.src = hog.image;
    hogSpecialty = document.createElement('h4');
    hogSpecialty.innerText = `Specialty: ${hog.specialty}`;
    hogMedal = document.createElement('h4');
    hogMedal.innerText = `Highest Medal Achieved: ${hog["highest medal achieved"]}`;
    hogWeight = document.createElement('h4');
    hogWeight.innerText = `Weight: ${hog["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]}`;

    hogDiv.append(hogHeader, hogPic, hogSpecialty, hogMedal, hogWeight);

    renderForm(hog)
  })
}

function renderForm(hog){
  greaseForm = document.createElement('form');
  greaseForm.addEventListener('click', (event) =>{
    changeGreaseStatus(event, hog)
  });
  greaseForm.id = `grease-form-${hog.id}`;
  greaseCheckbox = document.createElement('input');
  greaseCheckbox.type = "checkbox";
  greaseCheckbox.name = "greased";
  greaseLabel = document.createElement('label');
  greaseLabel.for = "greased";
  greaseForm.append(greaseCheckbox, greaseLabel);
  //set greased checkbox text
  if (hog.greased === true){
    greaseLabel.innerText = 'This hog is really greasy, check to de-grease';
    // greaseCheckbox.greased = !greaseCheckbox.greased;
    greaseCheckbox.checked = true;
  } else if (hog.greased === false){
    greaseLabel.innerText = 'This hog is not currently greased, check to grease'
    // greaseCheckbox.greased = !greaseCheckbox.greased;
    greaseCheckbox.greased = false;
  }
  //append form to hog hogDiv
  hogDiv = document.getElementById(`hog-${hog.id}`);
  hogDiv.append(greaseForm);
}

function changeGreaseStatus(event, hog){
  hog.greased = !hog.greased;
  myForm = document.getElementById(`grease-form-${hog.id}`);
  myCheckbox = myForm.firstChild;
  myLabel = myCheckbox.nextSibling;
  if (hog.greased === true){
    myLabel.innerText = 'This hog is really greasy, check to de-grease';
    greaseCheckbox.checked = true;
  } else if (hog.greased === false){
    myLabel.innerText = 'This hog is not currently greased, check to grease'
    greaseCheckbox.greased = false;
  }
  data = {
    "greased": myCheckbox.checked
  }
  fetch(`http://localhost:3000/hogs/${hog.id}`, {
    method: "PATCH",
    headers: {
            "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
      console.log(data);
  })
}

function addNewHog(event){
  event.preventDefault();
  inputs = getAddHogForm().querySelectorAll('input');
  name = inputs[0].value;
  specialty = inputs[1].value;
  medal = inputs[2].value;
  weight = inputs[3].value;
  image = inputs[4].value;
  greased = inputs[5].checked;

  data = {
    "name": name,
    "specialty": specialty,
    "greased": greased,
    "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": weight,
    "highest medal achieved": medal,
    "image": image
  }
  fetch('http://localhost:3000/hogs', {
    method: "POST",
    headers: {
            "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
  .then(data => { renderHogs([data]) })
}

function deleteHog(event){
  thisPigId = Number(event.target.parentElement.id.split('-')[1]);
  fetch(`http://localhost:3000/hogs/${thisPigId}`, {
    method: "DELETE"
  }).then(response => response.json()).then(data => {deleteFromDOM(data, thisPigId)})
}

function deleteFromDOM(data, thisPigId){
  deleteDiv = document.getElementById(`hog-${thisPigId}`)
  deleteDiv.remove();
}
