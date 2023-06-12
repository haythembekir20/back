module.exports = (sequelize, Sequelize, DataTypes) => {
    const Contratvoiture= sequelize.define(
      "Contratvoiture", // Model name
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
       
        nbjour: {
          type: DataTypes.STRING,
        },
        prix: {
            type: DataTypes.STRING,
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
    return Contratvoiture;
  };
  