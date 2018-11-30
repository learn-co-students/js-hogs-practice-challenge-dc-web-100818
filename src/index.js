//our code goes here
document.addEventListener('DOMContentLoaded', function(){
  fetchAllHogs()
})

function fetchAllHogs(){
  fetch('http://localhost:3000/hogs')
    .then(response => response.json())
    .then(data => data.forEach(renderHog))
}

function renderHog(hog){
  let container = document.getElementById('hog-container')
  let divElement = document.createElement('div')
  container.appendChild(divElement)
  divElement.classList.add('hog-card')
  divElement.id = hog.id
      let name = document.createElement('h3')
      name.innerText = hog.name
      divElement.appendChild(name)
  let specialty = document.createElement('h3')
  specialty.innerText = hog.specialty
  divElement.appendChild(specialty)
      let weight = document.createElement('h3')
      weight.innerText = hog['weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water']
      divElement.appendChild(weight)
  let highMet = document.createElement('h3')
  highMet.innerText = hog['highest medal achieved']
  divElement.appendChild(highMet)
      let image = document.createElement('img')
      image.src = hog.image
      divElement.appendChild(image)
  let greased = document.createElement('input')
  greased.type = 'checkbox'
  greased.checked = hog.greased
  divElement.appendChild(greased)
  greased.addEventListener('click', (event) => {
      let data = {greased: greased.checked}
      fetch(`http://localhost:3000/hogs/${hog.id}`, {
        method: "PATCH",
        headers: {
                "Content-Type": "application/json"
            },
        body: JSON.stringify(data)
      })
  })
    let btn = document.createElement('button')
    btn.innerText = "delete"
    divElement.appendChild(btn)
    btn.addEventListener('click', (event) => {
        fetch(`http://localhost:3000/hogs/${hog.id}`, {
          method: 'DELETE'
        })
    divElement.remove()
    })
}

let form = document.getElementById('hog-form')
form.addEventListener('submit', createHog)

function createHog(event){
  event.preventDefault()
  let name = document.querySelector('#name').value
  let specialty = document.querySelector('#specialty').value
  let weight = document.querySelector('#medal').value
  let highMet = document.querySelector('#weight').value
  let image = document.querySelector('#img').value
  let greased = document.querySelector('#greased').checked
  postHog(name, specialty, weight, highMet, image, greased)
}

function postHog(name, specialty, weight, highMet, image, greased){
  let data = {
    'name': name,
    'specialty': specialty,
    'greased': greased,
    'weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water': weight,
    'highest medal achieved': highMet,
    'image': image
  }
  fetch('http://localhost:3000/hogs', {
    method: "POST",
    headers: {
            "Content-Type": "application/json"
        },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(json => renderHog(json))
}
