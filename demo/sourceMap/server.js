let express = require("express");

let app = new express();

app.get("/api/user",(req,res)=>{
  res.json("I am wp");
})

app.listen('3000');