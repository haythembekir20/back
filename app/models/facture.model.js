module.exports = (sequelize, Sequelize, DataTypes) => {
    const Facture = sequelize.define(
      "Facture", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        date: {
          type: DataTypes.DATE
        },
        delai: {
          type: DataTypes.DATE
        },
        Prixtotal: {
            type: DataTypes.STRING
          },
        paye: {
            type: DataTypes.STRING
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
    return Facture;
  };
  