const express = require("express");
const app = express();
const hbs = require('hbs');
const path = require("path");

const port = process.env.PORT || 3000 ;


// adding static path
const staticPath = path.join(__dirname ,"../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
app.use(express.static(staticPath))

// setting view engine
app.set("view engine" , "hbs");
// setting views in template file
app.set("views" , viewPath);
// registering the partials
hbs.registerPartials(partialPath)


app.get("/" , (req , res) =>{
    res.render("index")
})
app.get("/about" , (req , res) =>{
    res.render("about")
})
// To get present day in weather form

const getCurrentday = () => {
    var weekDay = new Array(7);
    weekDay[0] = "Sunday";
    weekDay[1] = "Monday";
    weekDay[2] = "Tuesday";
    weekDay[3] = "Wednesday";
    weekDay[4] = "Thursday";
    weekDay[5] = "Friday";
    weekDay[6] = "Saturday";
let currentday = new Date();
let day = weekDay[currentday.getDay()]
return day
}

// to get present date and month
const getCurrenttime = () => {

    var months = [" ","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var now = new Date();
    var month = months[now.getMonth() + 1];
    var day = now.getDate();
    return `${day} ${month}`
}


app.get("/weather" , (req , res) =>{
    res.render("weather" , {
        toDay : getCurrentday(),
        currDate : getCurrenttime()
    })
})
app.get("*" , (req , res) =>{
    res.render("404error",{
        errmsg : 'Oops this page not found'
    })
})

app.listen(port, () =>{
    console.log("listening at port 3000")
})