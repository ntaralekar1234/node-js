const geocode = require('./utils/geocode')
const forecast = require("./utils/forecast")


const address = process.argv[2] // get command line arguments

if(!address){
    console.log('Provide address')
}
else{
    geocode(address,(error,{latitude,longitude,place_name} = {}) => {
        if(error){
            return console.log(error)
        }
        forecast(latitude,longitude,(error,forecast) => {
            if(error){
                return console.log(error)
            }
            console.log(place_name)
            console.log(forecast)
        })
    })
}


