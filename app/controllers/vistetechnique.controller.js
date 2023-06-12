const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
var sessionstorage = require('sessionstorage');


const User = db.user;
const Role = db.role;
const Agence = db.agence;
const Op = db.Op;
const Viste= db.Vistetechnique


exports.create = (req, res) => {
    // Validate request
    if (!req.body.voitureImmatricule) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const vistetechnique = {
      voitureImmatricule: req.body.voitureImmatricule,
        GarageId: req.body.carage,
        prix: req.body.prix,
        kilometrage: req.body.kilometrage,
        description:req.body.description,
        date:req.body.date,
        Userid:req.body.Userid,
        agenceId: req.body.agence      
    };
  
    console.log(vistetechnique);
    // Save Tutorial in the database
    Viste.create(vistetechnique)
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

exports.findAll = (req, res) => {
  
    var id = sessionstorage.getItem('agenceid');
   
  
      var condition = {agenceId:id};
     
    
      Viste.findAll({ where: condition})
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
    Viste.destroy({
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

  Viste.update(req.body, {
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

  Viste.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};







