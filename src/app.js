const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('../utils/forecast')
const geocode = require('../utils/geocode')


const app = express()

//define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)



//Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req,res) => {
    res.render('index', {
        title: 'root',
        name: 'name'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Abood'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        name: 'Abood',
        help_message: 'This is the help message',
        title: "Help"
    })
})




app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})







app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        error: 'help article not found',
        name: 'Abood'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        error: 'page not found',
        name: 'Abood'
    })
})



app.listen(3000, () => {
    console.log('The server has run on the port 3000')
})





