const express = require("express");
const path = require("path");
const port = 8000;
const db = require('./config/mongoose');
const app = express();
const Contact = require('./models/contact')



// // middleware1
// app.use(function(req, res, next){
//     req.myName="Ankur";
//     // console.log('Middleware1 Called');
//     next();
// });

// // middleware2

// app.use(function(req, res, next){
//     // console.log('Middleware2 Called');
//     console.log("My name from mw2 ", req.myName);
//     next();
// })



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList = [
  {
    name: "Arpan",
    phone: "111111111111",
  },
  {
    name: "Ankur",
    phone: "1234567890",
  },
  {
    name: "Sam",
    phone: "153648989",
  },
];

app.get("/", function (req, res) {
    // console.log("My name from get ", req.myName);

    Contact.find({}, function(err, contacts){
      if(err){
       console.log('Error in Fetching Contacts form DB');
       return;
      }

      return res.render("home", {
        title: "My Contracts List",
        contact_list: contacts,
      });
    });

  
});

app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "Lets us play with ejs",
  });
});


app.post('/create-contact', function(req, res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    // contactList.push(req.body);

    Contact.create({
     name: req.body.name,
     phone: req.body.phone
    }, function(err, newContact){
      if(err){console.log("Error in Creating Contract :");return};

      console.log('***********', newContact);
      return res.redirect('back')
    })
    
});

// for deleting contract

app.get('/delete-contact',function(req, res){

  
  //* GET the id from query in ul
  
   let id = req.query.id;

  //  * Find the contact using id and delete

   Contact.findByIdAndDelete(id, function(err){
   if (err) {
     console.log('error in deleting an object from DB');
     return;
   }
   return res.redirect('back');
   });

   
});

app.listen(port, function (err) {
  if (err) {
    console.log("<h1>Error in running the server </h1> ", err);
  }
  console.log("yup! my Express Server is running!", port);
});
