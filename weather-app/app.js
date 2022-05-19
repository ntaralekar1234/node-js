const request = require('postman-request')

const url = 'http://api.weatherapi.com/v1/current.json?key=361eb8e3a7df43a3967154200221905&q=Pune'
request({url:url,json:true},(error,response) => {
    console.log("It is currently "+response.body.temp_c + " degrees. It feels like "+ response.body.feelslike_c)
})