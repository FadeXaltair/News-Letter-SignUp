const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app =express();
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static("public"));

app.post("/", function(req , res){
    const FirstName = req.body.fname;
    const LastName = req.body.lname;
    const Email = req.body.mailname;

   var data = {
    members : [
        {
            email_address : Email,
            status : "subscribed",
            merge_fields :{
                FNAME : FirstName,
                LNAME : LastName
            }
        
        }
    ]
   };

   var jsonData = JSON.stringify(data);

   const url = "https://us14.api.mailchimp.com/3.0/lists/dbe0037812";
   const options = {
        method : "POST",
        auth : "hitesh:85aec9342825b468013f2378b86c9259-us14"
   }

   const request = https.request(url , options , function(response){

    if(response.statusCode ===200){
        res.sendFile(__dirname +"/success.html");
    }else {
        res.sendFile(__dirname +"/failure.html");
    }
       response.on("data" , function(data){
           console.log(JSON.parse(data));
       });
   })

   request.write(jsonData);
   request.end();
});

app.post("/failure.html" , function(req, res){
    res.redirect("/");
})

app.get("/" , function(req , res){
    res.sendFile(__dirname + "/signup.html");
});

app.listen(3000 , function(){
    console.log("port is running at 3000");
});


// api Key 
// 85aec9342825b468013f2378b86c9259-us14

// list id 
// dbe0037812