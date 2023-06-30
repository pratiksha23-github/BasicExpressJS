const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact=require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// app.use(function(req, res, next) {
//     req.myName='Pratiksha';
//     next();
// })

// app.use(function(req, res, next) {
//     console.log('My name from MW2', req.myName);
//     next();
// })

var ContactList = [
    {
        name:"Pratiskha",
        phone:"1234567890"
    },
    {
        name:"Sakshi",
        phone:"6431456789"
    },
    {
        name:"Swati",
        phone:"0974725746"
    }
]

// app.get('/', (req, res) => {
//     // console.log('from the get route controller', req.myName);
//     Contact.find({}, function (err, contacts) {
//         if (err) {
//             console.log('Error in fetching contacts', err);
//             return;
//         }
//     })
//     return res.render('home',{
//         title:"Contact List",
//         contact_List:contacts
//     });
// });


app.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find({});
    return res.render('home', {
      title: "Contact List",
      contact_List: contacts
    });
  } catch (err) {
    console.log('Error in fetching contacts', err);
    return;
  }
});


app.get('/practice',(req,res) => {
    return res.render('practice',{
        title:"let's Play Vth EJS"
    });
});


app.post('/create-contact', function(req, res) {
  Contact.create({
    name: req.body.name,
    phone: req.body.phone
  })
    .then(newcontact => {
      console.log(newcontact);
      return res.redirect('back');
    })
    .catch(err => {
      console.log('error in create contact', err);
      return;
    });
});

// app.post('/create-contact', function(req, res){
    
//     Contact.create({
//         name: req.body.name,
//         phone: req.body.name
//     }, function(err, newContact){
//         if(err){console.log('Error in creating a contact!')
//             return;}
//             console.log('******', newContact);
//             return res.redirect('back');
//     })
  
//     // ContactList.push(req.body);
//     // return res.redirect('back');

// });



app.get('/delete-contacts', function(req, res) {
    let id = req.query.id
    Contact.findByIdAndDelete(id).then(function(id){
        console.log(id);
        return res.redirect('back');
    })
    .catch(err => {
        console.log('error in delete contact', err);
        return;
    })
    // console.log(req.params);
    // let phone = req.query.phone;
    // let contactIdx=ContactList.findIndex(contact => contact.phone == phone);

    // if(contactIdx!=-1){
    //     ContactList.splice(contactIdx,1);
    // }

    // return res.redirect('back');
})


// app.get('/', (req, res) => {
//     res.send('<h1>Cool, It is running!</h1>');
// });

app.listen(port,(err)=>{
    if(err) {
        console.log("Error in running Server",err);
    }
    console.log("Server is listening on port ",port);
});