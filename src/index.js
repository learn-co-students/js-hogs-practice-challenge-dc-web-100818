document.addEventListener('DOMContentLoaded', function(){
  fetchHogs()
})

function fetchHogs(){
  fetch('http://localhost:3000/hogs')
    .then(resp => resp.json())
    .then(json => json.forEach(renderHog))
}

function renderHog(hog){
  let hogContainer = document.querySelector('#hog-container')

  let hogDiv = document.createElement('div')
  hogDiv.classList.add('hog-card')
  let hogName = document.createElement('h2')
  hogName.innerText = hog.name

  let hogSpecialty = document.createElement('h4')
  hogSpecialty.innerText = hog.specialty

  let hogGreased = document.createElement('input')
  hogGreased.type = "checkbox"
  hogGreased.checked = hog.greased
  hogGreased.addEventListener('click', () => {
    fetch(`http://localhost:3000/hogs/${hog.id}`, {
      method: 'PATCH',
      headers: {
        "Content-type": "application/json",
        Application: "application/json"
      },
      body: JSON.stringify({greased: hogGreased.checked})
    })
  })

  let hogWeight = document.createElement('h4')
  hogWeight.innerText = hog['weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water']

  let hogMedal = document.createElement('h2')
  hogMedal.innerText = hog['highest medal achieved']

  let hogImage = document.createElement('img')
  hogImage.src = hog.image

  let deleteBtn = document.createElement('button')
  deleteBtn.innerText = "Delete Hog"
  deleteBtn.addEventListener('click', () => {
    fetch(`http://localhost:3000/hogs/${hog.id}`, {
      method: "DELETE"
    })
    hogDiv.remove()
  })
  hogDiv.append(hogName, hogSpecialty, hogGreased, hogWeight, hogMedal, hogImage, deleteBtn)
  hogContainer.appendChild(hogDiv)
}

let form = document.querySelector('#hog-form')
form.addEventListener('submit', createHog)

function createHog(event){
  event.preventDefault()
  let name = document.querySelector("#name").value
  let specialty = document.querySelector("#specialty").value
  let medal = document.querySelector("#medal").value
  let weight = document.querySelector("#weight").value
  let image = document.querySelector("#img").value
  let greased = document.querySelector("#greased").checked

  postHog(name, specialty, medal, weight, image, greased)
}

function postHog(name, specialty, medal, weight, image, greased){
  let info = {
    "name": name,
    "specialty": specialty,
    "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": weight,
    "highest medal achieved": medal,
    "image": image,
    "greased": greased
  }
  fetch('http://localhost:3000/hogs', {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(info)
  })
  .then(resp => resp.json())
  .then(json => renderHog(json))
}
