const db = require("../models");

var sessionstorage = require('sessionstorage');
const Tarification= db.tarification;







checktarfication = (req, res, next) => {
  // Username
  var id1 = sessionstorage.getItem('agenceid');
  Tarification.findOne({
    where: {
      categoire: req.body.categoire,agenceId:id1
     
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }
    next();

    // Email
    
   
    
  });
};

const verifytarification = {
  checktarfication : checktarfication 
};

module.exports = verifytarification;
