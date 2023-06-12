module.exports = (sequelize, Sequelize, DataTypes) => {
    const Tarification= sequelize.define(
      "Tarification", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        categoire: {
          type: DataTypes.STRING
        },
        prix: {
          type: DataTypes.STRING
        },
        kilometrage: {
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
    return Tarification;
  };
  