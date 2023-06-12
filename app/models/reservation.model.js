module.exports = (sequelize, Sequelize, DataTypes) => {
    const Reservation= sequelize.define(
      "Reservation", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        dateReservation: {
          type: DataTypes.DATE
        },
        Periodede: {
          type: DataTypes.DATE
        },
        Periodea: {
          type: DataTypes.DATE
        },
        heurePeriodede: {
            type: DataTypes.STRING,
          },
        minutePeriodede: {
            type: DataTypes.STRING,
          },
        heurePeriodea: {
            type: DataTypes.STRING,
          },
        minutePeriodea: {
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
  /*
    Voiture.associate = (models) => {
        Voiture.belongsTo(models.Voiture);
      };
*/
    return Reservation;
  };
  