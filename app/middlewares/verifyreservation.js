const db = require("../models");

var sessionstorage = require('sessionstorage');
const Reservation= db.Reservation;
const Op = db.Op;







checkreservation = (req, res, next) => {
  // Username
  datedebut=req.body.Periodede;
  datefin=req.body.Periodea;
  var id1 = sessionstorage.getItem('agenceid');
  Reservation.findOne({
    where: {
    voitureImmatricule: req.body.voitureImmatricule,agenceId:id1,
    /*
    [Op.or]:[
      {
        Periodede:{
          [Op.gt]:req.body.Periodede,
          [Op.lt]:req.body.Periodea
    
        },
      },{
        Periodede:{
          [Op.gt]:req.body.Periodea
    
        },
      }
    ]

   */
   
    //Periodede:{[Op.gt]:req.body.Periodea },
   // Periodede:{[Op.between]: [req.body.Periodede, req.body.Periodea]},
   // Periodede:{[Op.between]: [req.body.Periodede, req.body.Periodea]},
    //Periodea:{[Op.between]: [req.body.Periodede, req.body.Periodea]},
    }
  }).then(reservation => {
    console.log("result"+reservation);
    if (reservation) {
      res.status(400).send({
        message: "Failed! date is already in use!"
      });
      return;
    }
    next();

    // Email
    
   
    
  });
};

checkreservation1 = (req, res, next) => {
  // Username
  var ok=false;
  datedebut=req.body.Periodede;
  datefin=req.body.Periodea;
  var id1 = sessionstorage.getItem('agenceid');
  Reservation.findAll({
    where: {
    voitureImmatricule: req.body.voitureImmatricule,agenceId:id1,
    
    }
  }).then(reservation => {
  if(reservation.length==0){
    ok=true;
  }
  //  if((reservation.Periodede <= to && reservation.Periodede >= from))
  for(var i=0 in reservation) {
    if(((reservation[i].Periodede > datedebut ) && (reservation[i].Periodede >= datefin )) || (reservation[i].Periodea < datedebut) ){
      ok=true;
      //return;
    }
    else {
      ok=false;
    }
    //console.log(reservation[i].Periodede);
  }
//console.log(ok);
//console.log(datedebut);

    if (ok==false) {
      res.status(400).send({
        message: "Failed! date is already in use!"
      });
      return;
    }
    next();

    // Email
    
   
    
  });
};

const verifyreservation = {
    checkreservation : checkreservation ,
    checkreservation1 : checkreservation1 
};

module.exports = verifyreservation;
