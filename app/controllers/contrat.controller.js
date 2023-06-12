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
const Contrat= db.contrat;
const Contratoption= db.Contratoption;
const Contratvoiture= db.contratvoiture;
var timmatrucile=new Array(); 
var tdatedebut=new Array(); 
var tdatefin=new Array(); 
var tnbjour=new Array(); 
var tprix=new Array();
var t=new Array();
var toption = new Array();
var listeoption=new Array();


exports.create = (req, res) => {
   

  for (var key in req.body) 
  {
  if(key.indexOf('immatricule')> -1)
  {
      
       timmatrucile.push(req.body[key]);
  }
  if(key.indexOf('datedebut')> -1)
  {
      
       tdatedebut.push(req.body[key]);
  }
  if(key.indexOf('datefin')> -1)
  {
      
       tdatefin.push(req.body[key]);
  }
  if(key.indexOf('nbjour')> -1)
  {
      
    tnbjour.push(req.body[key]);
  }
  if(key.indexOf('prix')> -1)
  {
      
    tprix.push(req.body[key]);
  }
   }

console.log(t);

  
    // Create a Tutorial
    const contrat = {
        periodede: req.body.periodede,
        periodea: req.body.periodea,
        date: req.body.date,
        commentaire: req.body.commentaire,
        acompte: req.body.acompte,
        prixvoiture: req.body.prixvoiture,
        prixoption: req.body.prixoption,
        prixtotal: req.body.prixtotal,
        Userid:req.body.Userid,
        paye:"0",
        ClientId: req.body.client,
        agenceId: req.body.agence      
    };
  
    // Save Tutorial in the database
    Contrat.create(contrat)
      .then(contrat => {
        //res.send(data);
       listeoption=req.body.optionId;
      // console.log(req.body.optionId);
        for (var key in listeoption) 
        {

          contratoption={
            contrat: contrat.id,
            option: listeoption[key]
          }
          toption.push(contratoption)
        }
        //console.log(toption);
        
        Contratoption.bulkCreate(toption).then(()=>{
          //  res.send(garantie);
          toption=[];
        }).catch(err=>{
            res.status(500).send({ message: err.message });
        
        });
        

        for(i in timmatrucile){
          contratvoiture={
            voiture_id:timmatrucile[i],
            periodede:tdatedebut[i],
            periodea:tdatefin[i],
            nbjour:tnbjour[i],
            prix:tprix[i],
            contrat_id:contrat.id

          }
          t.push(contratvoiture)
        }
       // console.log(t);

        Contratvoiture.bulkCreate(t).then(()=>{
          //  res.send(garantie);
          t=[];timmatrucile=[];tdatedebut=[];tdatefin=[];tnbjour=[];tprix=[];
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
   
  
    Contrat.findAll({ where: condition})
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
  Contrat.destroy({
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

  Contrat.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};


exports.findAllVoiture = (req, res) => {
  
  const idcontrat = req.params.id;


    var condition = {contrat_id:idcontrat};
   
  
    Contratvoiture.findAll({ where: condition})
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
  Contrat.update(req.body, {
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
  Contrat.update(condition, {
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




