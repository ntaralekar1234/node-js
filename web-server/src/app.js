const path = require("path")
const express = require("express")
const hbs =  require("hbs");

const geocode = require('./utils/geocode')
const forecast = require("./utils/forecast")

//console.log(__dirname)
//console.log(__filename)
const app = express()

const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname,'../public')


// Define paths for Express config
const layoutPath = path.join(__dirname,'../templates/layouts')
const viewsPath = path.join(__dirname,'../templates/views')
hbs.registerPartials(layoutPath);
// Setup handlebars engine and views location
app.set('views',viewsPath)
app.set('view engine','hbs')

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req,res) => {
    res.render('index',{
        title: "Home",
        created_by : "Nikhil Taralekar"
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: "About me",
        created_by : "Nikhil Taralekar"
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: "Help us",
        created_by : "Nikhil Taralekar"
    })
})

app.get('/help/*',(req,res) => {
    res.send('dsfsdfdsf')
})

app.get('/weather', (req,res) => {

    if(!req.query.address){
        return res.send({
            error : 'address must be provided'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,place_name} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecast) => {
            if(error){
                 
                return res.send({ error})
            }
            return res.send({place_name,forecast })
        })
    })
    
})

app.get('*',(req,res) => {
    res.render('404')
})


app.listen(port,() => {
    console.log(`Server is up on port ${port}`)
})