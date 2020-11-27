const path= require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('../src/utils/forecast')
const geocode = require('../src/utils/geocode')


const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static dir location to server   
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Subahsish'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Page',
        name: 'Subahsish'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        msg: 'For help contect Admin!',
        name: 'Subahsish'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must enter a address!'
        }) 
    }

    geocode(req.query.address,(error, {latitude, longitude,location}={})=>{
        if(error){
            return res.send({error})
        }  
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }   
            // console.log(location)
            // console.log(forecastdata)
            res.send({
                forecast: forecastdata,
                location: location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404 Page',
        msg: '404,Helper content not found!',
        name: 'Subahsish'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404 Page',
        msg: '404, Page not found!',
        name: 'Subahsish'
    })
})

app.listen(port, ()=>{
    console.log('Server is up in port'+port)
})