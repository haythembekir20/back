const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
var sessionstorage = require('sessionstorage');


const User = db.user;
const Role = db.role;
const Agence = db.agence;
const Voiture= db.voiture;
const Kilometrage= db.Kilometrage;
const Op = db.Op;
const Facture= db.facture;
const Facturearticle= db.facturearticle;

var tarticle=new Array(); 
var tqte=new Array();
var t=new Array();


exports.create = (req, res) => {
  for (var key in req.body) 
  {
  if(key.indexOf('article')> -1)
  {
      
       tarticle.push(req.body[key]);
  }
  if(key.indexOf('qte')> -1)
  {
      
       tqte.push(req.body[key]);
  }
 
   }

   console.log(tqte);
  
    // Create a Tutorial
    const facture = {
        date: req.body.date,
        delai: req.body.delai,
        Prixtotal: req.body.Prixtotal,
        paye: "0",
        Userid:req.body.Userid,
        ClientId: req.body.client,
        agenceId: req.body.agence      
    };
  
    // Save Tutorial in the database
    Facture.create(facture)
      .then(data => {

        for(i in tarticle){
          facturearticle={
            Qte:tqte[i],
            facture:data.id,
            article:tarticle[i]

          }
          t.push(facturearticle)
        }

        Facturearticle.bulkCreate(t).then(()=>{
          //  res.send(garantie);
          t=[];tqte=[];tarticle=[];
        }).catch(err=>{
            res.status(500).send({ message: err.message });
        
        });





      
      
        res.send({ message: "agence was registered successfully!" });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
};



exports.findAll = (req, res) => {
  
  var id = sessionstorage.getItem('agenceid');
 

    var condition = {agenceId:id};
   
  
    Facture.findAll({ where: condition})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

exports.delete= (req, res) => {
  const id = req.params.id;
   Facture.destroy({
     where: { id: id }
   })
     .then(num => {
       if (num == 1) {
         res.send({
           message: "Maintenance was deleted successfully!"
         });
       } else {
         res.send({
           message: `Cannot delete Maintenance with id=${id}. Maybe employe was not found!`
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Could not delete Tutorial with id=" + id
       });
     });
};



exports.findOne = (req, res) => {
const id = req.params.id;

Facture.findByPk(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving Tutorial with id=" + id
    });
  });
};


exports.findAllFacturearticle = (req, res) => {
  const id = req.params.id;

 

    var condition = {facture:id};
   
  
    Facturearticle.findAll({ where: condition})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};


exports.paye = (req, res) => {
  const id = req.params.id;
  var condition = { paye:"1"};
  Facture.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};



exports.inpaye = (req, res) => {
  const id = req.params.id;
  var condition = { paye:null};
  Facture.update(condition, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};
















