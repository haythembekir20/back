module.exports = (sequelize, Sequelize, DataTypes) => {
    const Carburant = sequelize.define(
      "Carburant", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        carburant: {
          type: DataTypes.STRING
        },
        date: {
          type: DataTypes.DATE
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
    return Carburant;
  };
  