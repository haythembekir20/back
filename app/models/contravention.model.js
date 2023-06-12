module.exports = (sequelize, Sequelize, DataTypes) => {
    const Contravention = sequelize.define(
      "Contravention", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        dateafraction: {
          type: DataTypes.DATE
        },
        montant: {
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
    return Contravention;
  };
  