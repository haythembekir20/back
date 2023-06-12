module.exports = (sequelize, Sequelize, DataTypes) => {
    const Voiture= sequelize.define(
      "voiture", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          unique: true
        },
        immatricule: {
          type: DataTypes.STRING,
          primaryKey: true
          

        },
        annee: {
          type: DataTypes.STRING
        },
        marque: {
          type: DataTypes.STRING
        },
        modele: {
          type: DataTypes.STRING
        },
        categoire: {
          type: DataTypes.STRING,
        },
        boite: {
            type: DataTypes.STRING,
          },
        clim: {
            type: DataTypes.STRING,
          },
        nbporte: {
            type: DataTypes.INTEGER,
          },
        nbpersonne: {
            type: DataTypes.INTEGER,
          },
        consommation: {
            type: DataTypes.STRING,
          },
        image: {
            type: DataTypes.STRING,
          },
        assurance: {
            type: DataTypes.STRING,
          },
        datededebutassurance: {
            type: DataTypes.DATE,
          },
        datefinassurance: {
            type: DataTypes.DATE,
          },
        prixachat: {
            type: DataTypes.STRING,
          },
        dateachat: {
            type: DataTypes.DATE,
          },
        datemiseencerculation: {
            type: DataTypes.DATE,
          },
        disponible: {
            type: DataTypes.INTEGER,
          },
        Userid: {
            type: DataTypes.UUID,
          },
      
          
      },
     
      {
        // Options
        timestamps: true,
        underscrored: true,
        createdAt: "created_at",
        freezeTableName: true,
        updatedAt: "updated_at"
      
                


      }
    );
  /*
    Voiture.associate = (models) => {
        Voiture.belongsTo(models.Voiture);
      };
*/
    return Voiture;
  };
  