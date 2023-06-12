module.exports = (sequelize, Sequelize, DataTypes) => {
    const Payement = sequelize.define(
      "Payement", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        mode: {
          type: DataTypes.STRING
        },
        montant: {
          type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATE
          },
        description: {
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
    return Payement;
  };
  