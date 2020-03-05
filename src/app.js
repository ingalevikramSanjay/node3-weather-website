const path = require('path')
const express = require('express')
const hbs=require('hbs')
const geocode = require('./utils/geoCode')
const forecast = require('./utils/forecast')
//const address
const app = express()
const port=process.env.PORT || 3000

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index',{
        title:'Weather App',
        name:'Vikram Ingale'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Vikram Ingale'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'Thanks for reaching out to us. we will get back to you soon',
        name:'Vikram Ingale'

    })
})

//app.com/weather
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, { lattitude, longitutude, location }={}) => {
        if (error) {
            return res.send({
                error:'you must enter a valid address'
            })
            //console.log(error)
        }

        forecast(lattitude, longitutude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error:'address not valid'
                })
                //console.log(error)
            }
            res.send({
                forecast: forecastdata,
                location,
                address:req.query.address
            })
            //console.log(location)
            //console.log(forecastdata)
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404page',{
        message:'Help Article not found',
        name:'Vikram Ingale',
        title:'error page'
    })
})

app.get('*',(req, res)=>{
    res.render('404page',{
        message:'Page not found',
        name: 'Vikram Ingale',
        title: 'error page'

    })
})

app.listen(port, () => {
    console.log('Server has started on port port '+port)
})