module.exports = (sequelize, Sequelize, DataTypes) => {
    const Rendezvousreservation= sequelize.define(
      "Rendezvousreservation", // Model name
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
        date: {
          type: DataTypes.DATE
        },
       
        Heure: {
          type: DataTypes.STRING
        },
        minute: {
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

    return Rendezvousreservation;
  };
  