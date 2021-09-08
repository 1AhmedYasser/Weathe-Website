const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')
const app = express()
const port = process.env.port || 3001

// Define paths for express config
const publicDirPath = path.join(__dirname, "../public",)
const viewsPath = path.join(__dirname,"../templates/views")
const parialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location 
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(parialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Ahmed Yasser"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Ahmed Yasser"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Ahmed Yasser"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        } 
            console.log(latitude, longitude, location)
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

app.get("/help/*", (req, res) => {
    res.render("404", {
        title:"404",
        name:"Ahmed Yasser",
        errorMessage:"Not Found"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title:"404",
        name:"Ahmed Yasser",
        errorMessage:"Not Found"
    })
})

// Start the server
app.listen(port, () => {
    console.log("Server Started")
})