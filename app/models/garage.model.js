module.exports = (sequelize, Sequelize, DataTypes) => {
    const Garage = sequelize.define(
      "Garage", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        nom: {
          type: DataTypes.STRING
        },
        tel: {
          type: DataTypes.STRING
        },
        adresse: {
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
    return Garage;
  };
  