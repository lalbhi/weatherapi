const express = require("express");
const bp = require("body-parser");
const axios = require("axios");
const path = require("path");
const app = express();


app.use(bp.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,`public`)))

app.get("/", (req, res) => {
  res.render("home.ejs", { serveroutput: "temp" });
});

app.post("/", (req, res) =>{
  let city = req.body.city;
  let url = 'http://api.weatherapi.com/v1/current.json?key=5c030eebaab94c22a02151226242107&q=${city}';

  axios.get(url).then((response) =>{
    console.log(response.data);
    let temp = response.data.current.temp_c;

    res.render("home.ejs", {serveroutput: temp});

  
});
});
  

app.listen(3001,()=>{
  console.log("server started at port 3001");
})