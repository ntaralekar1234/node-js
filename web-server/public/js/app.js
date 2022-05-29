const weatherForm = document.querySelector('form')
const input = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();
    messageOne.textContent = ""
    messageTwo.textContent = "loading..."
    const location = input.value;
    fetch('http://localhost:3000/weather?address='+location).then((res) => {
        res.json().then((data) => {
            if(data.error){
                return messageTwo.textContent = data.error
            }
            messageOne.textContent = data.place_name
            messageTwo.textContent = data.forecast
        })
    })
})