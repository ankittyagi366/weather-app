
const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geoapi=require('../src/utils/geocode');
//To show directory and File Name 
// console.log(__dirname);
// console.log(__filename)
// console.log(path.join(__dirname,"../public"));
const app=express();
app.set("view engine","hbs")
const router=express.Router();

const htmlfilesPath=path.join(__dirname,"../src/public/html");
console.log(htmlfilesPath);


//By Default views is the root folder for template in HBS if you wan to change modify the same
//rename the views folder to templates
//Setting for express


const viewsPath=path.join(__dirname,'../src/templates/views')
const partialPath=path.join(__dirname,"../src/templates/partials")
//Now set the view from views to templates
console.log("View path "+viewsPath);
app.set('views',viewsPath);
//Register partials pages

hbs.registerPartials(partialPath);


app.use(express.static(htmlfilesPath))
var product={
    name:"dell",
    price:100
}

router.get('',(req,res)=>{
    
    // Static page
    //res.send("Index page");
    //Hbs page
    res.render("index",{
        title:"Index page"
    });
})
router.get('/about',(req,res)=>{
    res.render("about",{
        title:"About"
    })
});

router.get('/help',(req,res)=>{
    //res.send("Help Page");
    res.render("help",{
        title:"Help"
      
    });
})
var weather={
    longitude:0.10,
    latitude:20
}
// router.get('/weather',(req,res)=>{
//  // res.send('weather')
//  res.render("weather",{
//      title:"Weather",
//      weather:weather
//  });
// })
router.get('/weather',(req,res)=>{
    // res.send('weather')
    if(!req.query.address){
        return res.send({
            error:"You must provide the address term in query string"
        })
    }
    geoapi.GeoCode(req.query.address,(cordinates)=>{
        console.log(cordinates);
        geoapi.GetWeather(cordinates,weather=>{

        console.log(weather);
        res.render("weather",{
             title:weather,
             address:req.query.address,
             forecast:"It is snowing"
            });
        })
    })
    // res.render({
    //     address:req.query.address,
    //     forecast:"It is snowing",
      
    // });
   })

//Query String
router.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"you must have to send search term in query string"
        })
    }
    console.log(req.query);
    res.send({
        products:[]
    })
})


//Nesting routing

router.get("/help/*",(req,res)=>{
   // res.send("help test page not found")
   res.render("error",{
       title:"Help article not found"
   })
})

// When no route match
router.get("*",(req,res)=>{
    res.send("A 404 error page");
    res.render("error",{
    title:"A 404 page not found"
    })
})

app.use('/', router);
app.listen("3000",()=>{

console.log('server is up and running at port number - 3000');
})