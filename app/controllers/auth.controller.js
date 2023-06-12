const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
var sessionstorage = require('sessionstorage');
var nodemailer = require("nodemailer");




let transporter = nodemailer.createTransport({
  service: 'gmail', // true for 465, false for other ports
  auth: {
    user: 'mbekir1994@gmail.com', // generated ethereal user
    pass: 'MOHAMEDbekir151679' // generated ethereal password
  }
});

const User = db.user;
const Role = db.role;
const Agence = db.agence;
const Op = db.Op;




exports.signup = (req, res) => {
  // Save user to database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // User role 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signupagence = (req, res) => {
  // Save user to database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "agence was registered successfully!" });
          });
        });
      } else {
        // User role 2
        user.setRoles([2]).then(() => {
          Agence.create({
            Userid: user.id,
            nom:req.body.nom,
            tel:req.body.tel,
            adressepostale:req.body.adressepostale,
            ville:req.body.ville,
            tva:req.body.tva,
            compteboncaire:req.body.compteboncaire

                      })
          res.send({ message: "agence was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      let authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        
        //req.session.user = user;
       // session.id = user.id;
//this.sess=req.session;
//this.sess.id=1;
//req.session.username = username;
sessionstorage.setItem('id', user.id);

if(user.Agenceid == null){
 
  
  var condition = { Userid: user.id}  ;
  // { where: condition }
   Agence.findOne({ where: condition })
     .then(data => {
       //this.ok=data[0]["Agenceid"];
       //ok=data["id"];
       //console.log(data["id"]);
       sessionstorage.setItem('agenceid', data["id"]);


       res.status(200).send(
        { id: user.id,
        username: user.username,
        email: user.email,
        active:user.active,
        Agenceid:data["id"],
        roles: authorities,
        accessToken: token,
        auth: true
      });
     })
     


}

else{
  sessionstorage.setItem('agenceid', user.Agenceid);
  res.status(200).send(
    { id: user.id,
    username: user.username,
    email: user.email,
    active:user.active,
    Agenceid:user.Agenceid,
    roles: authorities,
    accessToken: token,
    auth: true
  });
}



      
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signout = (req, res) => {
  return res.status(200).send({ accessToken: null});
};


exports.signupemploye = (req, res) => {
  // Save user to database
  var id = sessionstorage.getItem('agenceid');

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    Agenceid: id,
    active: 1
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "employe was registered successfully!" });
          });
        });
      } else {
        // User role 2
        user.setRoles([4]).then(() => {
        
          res.send({ message: "employe was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};




exports.afficheemploye = (req, res) => {
//const Agenceid = req.body.AgenceId;
// const b = req.session;
var id = sessionstorage.getItem('agenceid');
console.log(id);

//console.log('session'+id);
//console.log("id"+session.id);
// const id = req.params.id;
  const a = '29ba449a-e047-474b-a359-5c018621c824';
  var condition = { Agenceid: id}  ;
 // { where: condition }
  User.findAll({ where: condition })
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

exports.deleteemploye = (req, res) => {
 const id = req.params.id;
  //const id = "00d19f3b-8db8-43a0-85ef-e485d0bc78d9"
//console.log(id);
//console.log("hhh");

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "employe was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete employe with id=${id}. Maybe employe was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

//update user
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
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

//update user active = 1
exports.updateActive = (req, res) => {
  const id = req.params.id;
  var condition = { active:1};

  User.update(condition, {
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

//update user desactive = 0
exports.updateDesactive = (req, res) => {
  const id = req.params.id;
  var condition = { active:null};

  User.update(condition, {
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




exports.afficheAgence = (req, res) => {

  //var id = sessionstorage.getItem('id');
  
  //console.log('session'+id);
  const id = req.params.id;
    var condition = { Userid:id}  ;
   // { where: condition }
    //Agence.findOne({ where: condition })
    Agence.findOne()
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

exports.agencefindOne = (req, res) => {
    const id = req.params.id;
  
    Agence.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };

//update Agence
exports.updateAgence = (req, res) => {
  const id = req.params.id;

  Agence.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Agence was updated successfully."
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



//update password
exports.updatePassword = (req, res) => {
  const id = req.params.id;
  var pass=bcrypt.hashSync(req.body.password, 8);
  var condition = { password:pass};
  User.update(condition, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Agence was updated successfully."
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

exports.getCode = (req, res) => {
  const email = req.params.email;

  User.findOne({
    where: {
      email: email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(200).send({ message: "Email Not found." });
      }

      let token = jwt.sign({ email: user.email }, config.secret, {
        expiresIn: 120 // 24 hours
      });
      sessionstorage.setItem('token', token);
       transporter.sendMail({
        from: 'mbekir1994@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Votre Code est ", // Subject line
        text: token // plain text body   
      });
      return res.status(200).send({ code: token});

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.changePassword = (req, res) => {
    const email = req.params.email;
    var token = sessionstorage.getItem('token');
    if(token!=req.body.token){
      res.send({message: "code invalid"})
      }else{
        User.update(
          {
            password:bcrypt.hashSync(req.body.password, 8)
          },
        {
          where: { email: email }
        }).then(data=>{
          res.send({message:"success"})
        })
      }
};




exports.affichetoutAgence = (req, res) => {



    Agence.findAll()
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
exports.affichetoutuser = (req, res) => {



    User.findAll()
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

  exports.active = (req, res) => {
    const id = req.params.id;
    var condition = { active:1};
    User.update(condition, {
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
  exports.desactive = (req, res) => {
    const id = req.params.id;
    var condition = { active:null};
    User.update(condition, {
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

  exports.deleteagence= (req, res) => {
    const id = req.params.id;
    Agence.destroy({
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