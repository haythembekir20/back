module.exports = (sequelize, Sequelize, DataTypes) => {
    const Rendezvousmaintenance= sequelize.define(
      "Rendezvousmaintenance", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        description: {
          type: DataTypes.STRING
        },
        datedebut: {
          type: DataTypes.DATE
        },
        dateretour: {
          type: DataTypes.DATE
        },
        Heuredebut: {
          type: DataTypes.STRING
        },
        minutedebut: {
          type: DataTypes.STRING,
        },
        heureretour: {
            type: DataTypes.STRING,
          },
        minuteretour: {
            type: DataTypes.STRING,
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

    return Rendezvousmaintenance;
  };
  