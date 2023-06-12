const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./app/config/config.js");
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const multer = require('multer');
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });
//var upload = multer({dest:'uploads/'});
/*
const corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
*/
app.use(cors());

app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


  


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync().then(() => {

 // initial(); // Just use it in development, at the first time execution!. Delete it in production
});



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hi there, welcome to this tutorial." });
});

// api routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/voiture.routes")(app);
require("./app/routes/maintenance.routes")(app);
require("./app/routes/Kilometrage.routes")(app);
require("./app/routes/carburant.routes")(app);
require("./app/routes/diagnostiques.routes")(app);
require("./app/routes/traqueurs.routes")(app);
require("./app/routes/vistetechnique.routes")(app);
require("./app/routes/Rendezvousmaintenance.routes")(app);
require("./app/routes/client.routes")(app);
require("./app/routes/garage.routes")(app);
require("./app/routes/contravention.routes")(app);
require("./app/routes/option.routes")(app);
require("./app/routes/tarification.routes")(app);
require("./app/routes/reservation.routes")(app);
require("./app/routes/rendezvousreservation.routes")(app);
require("./app/routes/contrat.routes")(app);
require("./app/routes/article.routes")(app);
require("./app/routes/facture.routes")(app);
require("./app/routes/file.routes")(app);
require("./app/routes/payement.routes")(app);













// upload image
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      //cb(null, './uploads');
      
      cb(null, 'H:/locationvoiture2/frontendAdmin/src/assets/app-assets/uploads');
   },
  filename: function (req, file, cb) {
      cb(null , file.originalname);
  }
});

var upload = multer({ storage: storage })

app.get("/image", (req, res) => {
  res.json({image:"http://localhost:3000/uploads/1.PNG" });
});


app.post('/single', upload.single('image'), (req, res) => {
  try {
    res.send(req.file);
  }catch(err) {
    res.send(400);
  }
})


app.post('/bulk', upload.array('profiles', 4) , (req, res) =>{
  try {
      res.send(req.files);
  } catch(error) {
        console.log(error);
         res.send(400);
  }
});
//end





// set port, listen for requests
//const PORT = config.PORT;
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Just use it in development, at the first time execution!. Delete it in production

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "agence"
  });

  Role.create({
    id: 3,
    name: "admin"
  });

   Role.create({
    id: 4,
    name: "employe"
  });
  
  
}

