module.exports = (sequelize, Sequelize, DataTypes) => {
    const Facturearticle = sequelize.define(
      "Facturearticle", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        Qte: {
          type: DataTypes.STRING
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
    return Facturearticle;
  };
  