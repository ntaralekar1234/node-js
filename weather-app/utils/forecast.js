const request = require('postman-request')


const forecast = (latitude,longitude,callback) => {

    const url = 'http://api.weatherapi.com/v1/current.json?key=361eb8e3a7df43a3967154200221905&q=' + latitude +','+longitude+'&units=f'
    request({url,json:true},(error,{ body }) => {

        if(error){
            callback("Unable to connect",undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,"It is currently "+body.current.temp_c + " degrees. It feels like "+ body.current.feelslike_c)
        }
        
    })

}

module.exports = forecast
