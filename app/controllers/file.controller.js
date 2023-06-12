const db = require("../models");
const File= db.file;
//const testFolder = 'H:/locationvoiture2/frontendAdmin/src/assets/app-assets/file';
const testFolder = 'H:/locationvoiture2/frontendAdmin/src/assets/app-assets/Dropbox/locationvoiture';
const fs = require('fs');
var filelist = new Array();
var sessionstorage = require('sessionstorage');

exports.listeFile = (req, res) => {
    // Save user to database
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
           // console.log(file);
         filelist.push(file);
        });
        res.send(filelist);
        filelist=[];
      })
  };
  exports.createFile = (req, res) => {
    // Save user to database
    file=req.body.file
    fs.rename('H:/locationvoiture2/frontendAdmin/src/assets/app-assets/Dropbox/locationvoiture/'+file,
     'H:/locationvoiture2/frontendAdmin/src/assets/app-assets/uploads/'+file, function (err) {
      if (err) return console.error(err)
      File.create({
        nom: req.body.nom,
        type: req.body.type,
        date: req.body.date,
        image: file,
        ClientId: req.body.client,
        agenceId: req.body.agence  
     
      })
      .then(() => {
          res.send({ message: "File was registered successfully!" });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
     })

  };


  exports.deleteFile = (req, res) => {
    // Save user to database
    filePath=req.params.filePath
    path="H:/locationvoiture2/frontendAdmin/src/assets/app-assets/Dropbox/locationvoiture/"
    fs.unlink(path+filePath,function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
   });  

  };



  exports.listeFileTraite = (req, res) => {
    // Save user to database
    var id = sessionstorage.getItem('agenceid');
   
  
      var condition = {agenceId:id};
    File.findAll({ where: condition},{ raw: true,
      order: [['created_at', 'DESC']]
    }).then(file=>{
     res.send(file);
  

    })     
  };

  exports.update = (req, res) => {
    const id = req.params.id;
  
    File.update({
        nom: req.body.nom,
        type: req.body.type,
        date: req.body.date,
        clientId: req.body.clt
    }, {
      where: { id: id }
    })
      .then(() => {
          res.send({
            message: "File was updated successfully."
          });
      })
      .catch(err => {
        res.status(500).send({
          message: err
        });
      });
  };


  exports.delete= (req, res) => {
    const id = req.params.id;
    File.findByPk(id).then(data => {
      fs.unlink(Folder+'/'+data.image,function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
          });  

    
    });

    
    File.destroy({
       where: { id: id }
     })
       .then(() => {
        
           res.send({
             message: "File was deleted successfully!"
           });
        
       })
       .catch(err => {
         res.status(500).send({
           message: err
         });
       });
};