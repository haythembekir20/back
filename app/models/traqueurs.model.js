module.exports = (sequelize, Sequelize, DataTypes) => {
    const Traqueurs = sequelize.define(
      "Traqueurs", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        identifiant: {
          type: DataTypes.STRING
        },
        fournisseur: {
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
  
   

    return Traqueurs;
  };
  