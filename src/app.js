const path = require('path')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')

const app = express()

const port = process.env.PORT || 3000
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Burak'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Burak'

    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This is usefull help text.',
        title: 'HELP',
        name: 'Burak'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You should give an address.'
        })
    }

    geoCode(req.query.address, (error,{latitude, longitude, location} = {}) => {
        
        if(error){

            return res.send({
                error: 'You should give an address.'
            })
            
        }

        forecast(latitude, longitude, (error1,forecastdata) => {
            if(error1){
                return res.send(error1)
            }
    
            console.log(forecastdata)
            console.log(location)

            res.send({
                location,
                forecastdata
            })

        })
    })

})



app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Burak',
        errorMessage: 'Help Document is not exist.'
    })
})

app.get('/products', (req,res)=>{

    if(!req.query.search){
        return res.send('You should search for products')
    }
    
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        errorMessage: '404 NOT FOUND'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port  )
})