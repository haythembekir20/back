module.exports = (sequelize, Sequelize, DataTypes) => {
    const Contratoption= sequelize.define(
      "Contratoption", // Model name
      {
      
    
          
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
    return Contratoption;
  };
  