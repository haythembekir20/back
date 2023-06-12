module.exports = (sequelize, Sequelize, DataTypes) => {
    const Maintenance= sequelize.define(
      "Maintenance", // Model name
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
        prix: {
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
    return Maintenance;
  };
  