document.addEventListener('DOMContentLoaded', function() {
  init()
})

function init() {
  fetchAllHogs()
  let form = document.querySelector('#hog-form')
  form.addEventListener('submit', addNewHog)
}

//  FETCH
function fetchAllHogs() {
  fetch('http://localhost:3000/hogs')
    .then(res => res.json())
    .then(data => data.forEach(renderHog))
}

function postFetch(hog) {
  fetch('http://localhost:3000/hogs', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(hog)
  })
    .then(res => res.json())
    .then(data => renderHog(data))
}

function patchFetch(e, id, obj) {
  fetch(`http://localhost:3000/hogs/${id}`, {
    method: 'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(obj)
  })
}

function deleteFetch(e, id) {
  fetch(`http://localhost:3000/hogs/${id}`, {
    method: 'DELETE',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {e.target.parentElement.parentElement.remove()})
}

//  CALLBACK
function addNewHog(e) {
  e.preventDefault()
  let hog = {
    'name': e.target.querySelector('#name').value,
    'specialty': e.target.querySelector('#specialty').value,
    'greased': e.target.querySelector('#greased').checked,
    "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": e.target.querySelector('#weight').value,
    "highest medal achieved": e.target.querySelector('#medal').value,
    'image': e.target.querySelector('#img').value
  }
  postFetch(hog)
}

function editHog(e) {
  console.log('e.target.checked=' + e.target.checked)
  let obj = {greased: e.target.checked}
  let id = e.currentTarget.parentElement.dataset.id
  patchFetch(e, id, obj)
}

function deleteHog(e) {
  let id = e.target.parentElement.parentElement.dataset.id
  deleteFetch(e, id)
}


//  DATA RENDERING
function renderHog(hog) {
  let divEl = document.createElement('div')
  divEl.classList.add('hog-card')
  divEl.dataset.id = hog.id

  let name = document.createElement('h2')
  name.innerText = hog.name

  let specialty = document.createElement('h3')
  specialty.innerText = hog.specialty

  let greaseDiv = document.createElement('div')
  greaseDiv.innerText = "Greased: "
  greaseDiv.addEventListener('click', editHog)

  let greased = document.createElement('input')
  greased.type = 'checkbox'
  greased.classList.add('greased')
  greased.checked = hog.greased

  let weight = document.createElement('h3')
  weight.innerText = hog['weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water']

  let medal = document.createElement('h3')
  medal.innerText = hog['highest medal achieved']

  let img = document.createElement('img')
  img.src = hog.image

  let btnDiv = document.createElement('div')

  let btn = document.createElement('button')
  btn.innerText = 'Delete'
  btn.addEventListener('click', deleteHog)

  document.querySelector('#hog-container').appendChild(divEl)
  divEl.append(name, specialty, medal, weight, greaseDiv, img, btnDiv)
  greaseDiv.appendChild(greased)
  btnDiv.appendChild(btn)
}
