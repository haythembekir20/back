module.exports = (sequelize, Sequelize, DataTypes) => {
    const Contrat= sequelize.define(
      "Contrat", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        
        periodede: {
          type: DataTypes.DATE
        },
        periodea: {
          type: DataTypes.DATE
        },
        date: {
          type: DataTypes.DATE
        },
        commentaire: {
          type: DataTypes.STRING,
        },
        acompte: {
            type: DataTypes.STRING,
          },
        prixvoiture: {
            type: DataTypes.STRING,
          },
        prixoption: {
            type: DataTypes.STRING,
          },
        prixtotal: {
            type: DataTypes.STRING,
          },
        paye: {
            type: DataTypes.STRING,
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
    return Contrat;
  };
  