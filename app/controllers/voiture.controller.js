const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
var sessionstorage = require('sessionstorage');


const User = db.user;
const Role = db.role;
const Agence = db.agence;
const Voiture= db.voiture;
const Op = db.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.immatricule) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const voiture = {
        immatricule: req.body.immatricule,
        annee: req.body.annee,
        marque: req.body.marque,
        modele: req.body.modele,
        categoire: req.body.categoire,
        boite: req.body.boite,
        clim: req.body.clim,
        nbporte: req.body.nbporte,
        nbpersonne: req.body.nbpersonne,
        consommation: req.body.consommation,
        image: req.body.image,
        assurance: req.body.assurance,
        datededebutassurance: req.body.datededebutassurance,
        datefinassurance: req.body.datefinassurance,
        prixachat: req.body.prixachat,
        dateachat: req.body.dateachat,
        datemiseencerculation: req.body.datemiseencerculation,
        disponible: req.body.disponible,
        Userid:req.body.Userid,
        agenceId:req.body.Agence
        




    };
  
    // Save Tutorial in the database
    Voiture.create(voiture)
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

exports.findAlldisponible = (req, res) => {
  
  var id = sessionstorage.getItem('agenceid');
 console.log(id);

    var condition = {disponible:1, agenceId:id};
   
  
    Voiture.findAll({ where: condition})
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
exports.findAllnondisponible = (req, res) => {
    //  const title = req.query.title;
    var id = sessionstorage.getItem('agenceid');
 

    var condition = {disponible:null, agenceId:id};
     
    
      Voiture.findAll({ where: condition })
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
exports.delete = (req, res) => {
        const id = req.params.id;
      
        Voiture.destroy({
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Tutorial was deleted successfully!"
              });
            } else {
              res.send({
                message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
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

        Voiture.update(req.body, {
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Voiture was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Voiture with id=${id}. Maybe Tutorial was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Tutorial with id=" + id
            });
          });
};

exports.updateNonDisponible = (req, res) => {
        const id = req.params.id;
        var condition = { disponible:null};

        Voiture.update(condition, {
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Voiture was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Voiture with id=${id}. Maybe Tutorial was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Tutorial with id=" + id
            });
          });
};

exports.updateDisponible = (req, res) => {
        const id = req.params.id;
        var condition = { disponible:1};

        Voiture.update(condition, {
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Voiture was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Voiture with id=${id}. Maybe Tutorial was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Tutorial with id=" + id
            });
          });
};


exports.voiturefindOne = (req, res) => {
  const id = req.params.id;

  Voiture.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving voiture with id=" + id
      });
    });
};

