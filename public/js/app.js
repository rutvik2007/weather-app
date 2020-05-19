const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const outputBox = document.getElementById('forecast')
weatherForm.addEventListener('submit', (e) => {
    const location = search.value
    e.preventDefault()
    outputBox.innerHTML = ''
    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        console.log(data)
        outputBox.innerHTML = `${data.location}<br>The weather is ${data.forecast.description}.<br>The temperature is ${data.forecast.currentTemp}, it feels like ${data.forecast.currentFeelsLike}`
    })
})
})