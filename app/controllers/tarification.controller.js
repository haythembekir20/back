const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
var sessionstorage = require('sessionstorage');


const User = db.user;
const Role = db.role;
const Agence = db.agence;
const Voiture= db.voiture;
const Tarification= db.tarification;
const Op = db.Op;

exports.create = (req, res) => {
  
  
    // Create a Tutorial
    const tarification = {
        categoire: req.body.categoire,
        kilometrage: req.body.kilometrage,
        prix: req.body.prix,
        Userid:req.body.Userid,
        agenceId: req.body.agence      
    };

  console.log(this.tarification);
  
    // Save Tutorial in the database
    Tarification.create(tarification)
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
     
    
      Tarification.findAll({ where: condition})
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
    Tarification.destroy({
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

  Tarification.update(req.body, {
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

  Tarification.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};


exports.find = (req, res) => {
  var id1 = sessionstorage.getItem('agenceid');
  const id = req.params.id;
  Tarification.findOne({
    where: {
      categoire: id,agenceId:id1
    }
}) .then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message: "Error retrieving Tutorial with id=" + id
  });
});
}












