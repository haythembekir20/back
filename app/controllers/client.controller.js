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
const Op = db.Op;

exports.createcontact = (req, res) => {
  
  
    // Create a Tutorial
    const client = {
      nom: req.body.nom,
        prenom: req.body.prenom,
        tel1: req.body.tel1,
        tel2: req.body.tel2,
        email: req.body.email,
        description: req.body.description,
        date:req.body.date,
        active:null,
        Userid:req.body.Userid,
        agenceId: req.body.agence     
    };
  
    // Save Tutorial in the database
    Client.create(client)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
};

exports.createclient = (req, res) => {
  
  
    // Create a Tutorial
    const client = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        cin:req.body.cin,
        datenaissance:req.body.datenaissance,
        ville:req.body.ville,
        codepostale:req.body.codepostale,
        tel1: req.body.tel1,
        tel2: req.body.tel2,
        email: req.body.email,
        description: req.body.description,
        active:req.body.active,
        Userid:req.body.Userid,
        agenceId: req.body.agence     
    };
  
    // Save Tutorial in the database
    Client.create(client)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
};

exports.findAllClient = (req, res) => {
  
    var id = sessionstorage.getItem('agenceid');
   
  
      var condition = {active:1, agenceId:id};

    
      Client.findAll({ where: condition})
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

exports.findAllContact = (req, res) => {
  
    var id = sessionstorage.getItem('agenceid');
   
  
      var condition = {active:null, agenceId:id};

    
      Client.findAll({ where: condition})
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
     Client.destroy({
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

  Client.update(req.body, {
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

  Client.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};







