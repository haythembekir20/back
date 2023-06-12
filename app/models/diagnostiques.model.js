module.exports = (sequelize, Sequelize, DataTypes) => {
    const Diagnostiques = sequelize.define(
      "Diagnostiques", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        prix: {
          type: DataTypes.STRING
        },
        description: {
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
    return Diagnostiques;
  };
  