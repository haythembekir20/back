const config = require("../config/config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    define: {
      underscored: true
    },
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize, DataTypes);
db.role = require("./role.model.js")(sequelize, Sequelize, DataTypes);
db.agence = require("./agence.model.js")(sequelize, Sequelize, DataTypes);
db.voiture = require("./voiture.model")(sequelize, Sequelize, DataTypes);
db.maintenance = require("./maintenance.model")(sequelize, Sequelize, DataTypes);
db.Kilometrage = require("./Kilometrage.model")(sequelize, Sequelize, DataTypes);
db.carburant = require("./carburant.model")(sequelize, Sequelize, DataTypes);
db.diagnostiques = require("./diagnostiques.model")(sequelize, Sequelize, DataTypes);
db.traqueurs = require("./traqueurs.model")(sequelize, Sequelize, DataTypes);
db.Vistetechnique = require("./vistetechnique.model")(sequelize, Sequelize, DataTypes);


db.Rendezvousmaintenance = require("./rendez-vous-maintenance.model")(sequelize, Sequelize, DataTypes);

db.Client = require("./client.model")(sequelize, Sequelize, DataTypes);
db.Garage = require("./garage.model")(sequelize, Sequelize, DataTypes);
db.Contravention = require("./contravention.model")(sequelize, Sequelize, DataTypes);
db.Option = require("./option.model")(sequelize, Sequelize, DataTypes);
db.tarification = require("./tarification.model")(sequelize, Sequelize, DataTypes);
db.Reservation = require("./reservation.model")(sequelize, Sequelize, DataTypes);


db.rendezvousreservation = require("./rendezvousreservation.model")(sequelize, Sequelize, DataTypes);

db.contrat = require("./contrat.model")(sequelize, Sequelize, DataTypes);
db.contratvoiture = require("./contratvoiture.model")(sequelize, Sequelize, DataTypes);
db.Contratoption = require("./contratoption.model")(sequelize, Sequelize, DataTypes);

db.article = require("./article.model")(sequelize, Sequelize, DataTypes);
db.facture = require("./facture.model")(sequelize, Sequelize, DataTypes);
db.facturearticle = require("./facturearticle.model")(sequelize, Sequelize, DataTypes);
db.file = require("./file.model")(sequelize, Sequelize, DataTypes);
db.payement = require("./payement.model")(sequelize, Sequelize, DataTypes);





// relation payement
db.payement.belongsTo(db.agence);
db.agence.hasMany(db.payement,{
  onDelete:"cascade",
  allowNull: false,
});

db.payement.belongsTo(db.facture);
db.facture.hasMany(db.payement,{
  onDelete:"cascade",
  allowNull: true,
});

db.payement.belongsTo(db.contrat);
db.contrat.hasMany(db.payement,{
  onDelete:"cascade",
  allowNull: true,
});

// relation file
db.file.belongsTo(db.agence);
db.agence.hasMany(db.file,{
  onDelete:"cascade",
  allowNull: false,
});

db.file.belongsTo(db.Client);
db.Client.hasMany(db.file,{
  onDelete:"cascade",
  allowNull: false,
});



// relation facture
db.facture.belongsTo(db.agence);
db.agence.hasMany(db.facture,{
  onDelete:"cascade",
  allowNull: false,
});

db.facture.belongsTo(db.Client);
db.Client.hasMany(db.facture,{
  onDelete:"cascade",
  allowNull: false,
});


db.facture.belongsToMany(db.article, {
  through: db.facturearticle,
  foreignKey: "facture",
  otherKey: "article"
});
db.article.belongsToMany(db.facture, {
  through: db.facturearticle,
  foreignKey: "article",
  otherKey: "facture"
});


// onetomany article
db.article.belongsTo(db.agence);
db.agence.hasMany(db.article,{
  onDelete:"cascade",
  allowNull: false,
});



// relation contrat

//onetomany contrat et client
db.contrat.belongsTo(db.Client);
db.Client.hasMany(db.contrat,{
  onDelete:"cascade",
  allowNull: false,
});

db.contrat.belongsTo(db.agence);
db.agence.hasMany(db.contrat,{
  onDelete:"cascade",
  allowNull: false,
});
//manytomany contrat et option
db.Option.belongsToMany(db.contrat, {
  through: db.Contratoption,
  foreignKey: "option",
  otherKey: "contrat"
});
db.contrat.belongsToMany(db.Option, {
  through: db.Contratoption,
  foreignKey: "contrat",
  otherKey: "option"
});

//manytomany contrat et voiture
db.voiture.belongsToMany(db.contrat, {
  through: db.contratvoiture,
  foreignKey: "voiture_id",
  otherKey: "contrat_id"
});
db.contrat.belongsToMany(db.voiture, {
  through: db.contratvoiture,
  foreignKey: "contrat_id",
  otherKey: "voiture_id"
});




/*
db.Contraventions.belongsTo(db.agence);
db.agence.hasMany(db.Contraventions,{
  onDelete:"cascade"
});
*/
// onetomany rendezvous reservation
db.rendezvousreservation.belongsTo(db.agence);
db.agence.hasMany(db.rendezvousreservation,{
  onDelete:"cascade",
  allowNull: false,
});

db.rendezvousreservation.belongsTo(db.Client);
db.Client.hasMany(db.rendezvousreservation,{
  onDelete:"cascade",
  allowNull: false,
});


// onetomany reservation
db.Reservation.belongsTo(db.agence);
db.agence.hasMany(db.Reservation,{
  onDelete:"cascade",
  allowNull: false,
});
db.Reservation.belongsTo(db.voiture);
db.voiture.hasMany(db.Reservation,{
  onDelete:"cascade",
  allowNull: false,
});
db.Reservation.belongsTo(db.Client);
db.Client.hasMany(db.Reservation,{
  onDelete:"cascade",
  allowNull: false,
});


// onetomany vistetechnique
db.Vistetechnique.belongsTo(db.agence);
db.agence.hasMany(db.Vistetechnique,{
  onDelete:"cascade",
  allowNull: false,
});
db.Vistetechnique.belongsTo(db.voiture);
db.voiture.hasMany(db.Vistetechnique,{
  onDelete:"cascade",
  allowNull: false,
});
db.Vistetechnique.belongsTo(db.Garage);
db.Garage.hasMany(db.Vistetechnique,{
  onDelete:"cascade",
  allowNull: false,
});


// onetomany maintenance
db.maintenance.belongsTo(db.agence);
db.agence.hasMany(db.maintenance,{
  onDelete:"cascade",
  allowNull: false,
});
db.maintenance.belongsTo(db.voiture);
db.voiture.hasMany(db.maintenance,{
  onDelete:"cascade",
  allowNull: false,
});

db.maintenance.belongsTo(db.Garage);
db.Garage.hasMany(db.maintenance,{
  onDelete:"cascade",
  allowNull: false,
});

// onetomany Kilometrage
db.Kilometrage.belongsTo(db.agence);
db.agence.hasMany(db.Kilometrage,{
  onDelete:"cascade",
  allowNull: false,
});
db.Kilometrage.belongsTo(db.voiture);
db.voiture.hasMany(db.Kilometrage,{
  onDelete:"cascade",
  allowNull: false,
});

// onetomany carburant
db.carburant.belongsTo(db.agence);
db.agence.hasMany(db.carburant,{
  onDelete:"cascade",
  allowNull: false,
});
db.carburant.belongsTo(db.voiture);
db.voiture.hasMany(db.carburant,{
  onDelete:"cascade",
  allowNull: false,
});


// onetomany diagnostiques
db.diagnostiques.belongsTo(db.agence);
db.agence.hasMany(db.diagnostiques,{
  onDelete:"cascade",
  allowNull: false,
});
db.diagnostiques.belongsTo(db.voiture);
db.voiture.hasMany(db.diagnostiques,{
  onDelete:"cascade",
  allowNull: false,
});
db.diagnostiques.belongsTo(db.Garage);
db.Garage.hasMany(db.diagnostiques,{
  onDelete:"cascade",
  allowNull: false,
});


// onetomany traqueurs
db.traqueurs.belongsTo(db.agence);
db.agence.hasMany(db.traqueurs,{
  onDelete:"cascade",
  allowNull: false,
});
db.traqueurs.belongsTo(db.voiture);
db.voiture.hasMany(db.traqueurs,{
  onDelete:"cascade",
  allowNull: false,
});

//one to many voiture
db.voiture.belongsTo(db.agence);
db.agence.hasMany(db.voiture,{
  onDelete:"cascade",
  allowNull: false,
});

// onetomany Rendezvous maintenance
db.Rendezvousmaintenance.belongsTo(db.agence);
db.agence.hasMany(db.Rendezvousmaintenance,{
  onDelete:"cascade",
  allowNull: false,
});
db.Rendezvousmaintenance.belongsTo(db.voiture);
db.voiture.hasMany(db.Rendezvousmaintenance,{
  onDelete:"cascade",
  allowNull: false,
});

db.Rendezvousmaintenance.belongsTo(db.Garage);
db.Garage.hasMany(db.Rendezvousmaintenance,{
  onDelete:"cascade",
  allowNull: false,
});


// onetomany client et contact
db.Client.belongsTo(db.agence);
db.agence.hasMany(db.Client,{
  onDelete:"cascade",
  allowNull: false,
});


// onetomany garage
db.Garage.belongsTo(db.agence);
db.agence.hasMany(db.Garage,{
  onDelete:"cascade",
  allowNull: false,
});


// onetomany Contraventions
db.Contravention.belongsTo(db.agence);
db.agence.hasMany(db.Contravention,{
  onDelete:"cascade",
  allowNull: false,
});
db.Contravention.belongsTo(db.voiture);
db.voiture.hasMany(db.Contravention,{
  onDelete:"cascade",
  allowNull: false,
});
db.Contravention.belongsTo(db.Client);
db.Client.hasMany(db.Contravention,{
  onDelete:"cascade",
  allowNull: false,
});

// onetomany option
db.Option.belongsTo(db.agence);
db.agence.hasMany(db.Option,{
  onDelete:"cascade",
  allowNull: false,
});

// onetomany tarification
db.tarification.belongsTo(db.agence);
db.agence.hasMany(db.tarification,{
  onDelete:"cascade",
  allowNull: false,
});
















db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "role_id",
  otherKey: "user_id"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "user_id",
  otherKey: "role_id"
});



db.ROLES = ["user", "admin", "agence","employe"];

module.exports = db;
