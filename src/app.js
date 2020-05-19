const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('../utils/forecast')
const geocode = require('../utils/geocode')

//Start the server
const app = express()

//Define paths for Express and handlebars
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup static directory
app.use(express.static(publicDirPath))

//Setup handlebars and the path to the views directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rutvik S'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Rutvik S'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help : "THIS IS THE MF HELP PAGE, BITCH",
        title : "Help",
        name : "Rutvik S"
    })
})

app.get('/weather', (req, res) => {
    if(req.query.address){
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error){
                res.send({
                    error
                })
            }
            else{
                forecast(latitude, longitude, (error, forecastData) =>{
                    if(error) res.send({
                        error
                    })
                    else{
                        res.send({
                            forecast : forecastData,
                            location
                        })
                    }
                })
            }
        })
    }
    else{
        res.send("Please provide an address to get the weather for")
    }
})


app.get('/products', (req, res) => {
    if(!req.query.name){
        res.send({error : "You need to provide the name of the item"})
    }
    
})

app.get('/help/*', (req, res) => {
    res.render('404',  {
        errorStr : "Help page not found",
        name : "Rutvik",
        title : "Error"
        
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorStr : "Page not found",
        name : "Rutvik",
        title : "Error"
        
    })
})




app.listen(3000, () => {
    console.log("Server start at port 3000")
})