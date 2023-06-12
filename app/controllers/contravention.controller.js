const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
var sessionstorage = require('sessionstorage');


const User = db.user;
const Role = db.role;
const Agence = db.agence;
const Voiture= db.voiture;
const Client= db.Client;
const Contravention= db.Contravention;
const Op = db.Op;

exports.create = (req, res) => {
  
  console.log(req.body.client);
    // Create a Tutorial
    const contravention = {
      voitureImmatricule: req.body.voitureImmatricule,
      dateafraction: req.body.dateafraction,
      montant: req.body.montant,
      ClientId: req.body.client,
      Userid:req.body.Userid,
      agenceId: req.body.agence      
    };
    console.log(contravention);
    // Save Tutorial in the database
    Contravention.create(contravention)
      .then(data => {
          console.log(data);
        res.send(data);
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
     
    
      Contravention.findAll({ where: condition})
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
    Contravention.destroy({
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

exports.update = (req, res) => {
  const id = req.params.id;

  Contravention.update(req.body, {
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

exports.findOne = (req, res) => {
  const id = req.params.id;

  Contravention.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};







