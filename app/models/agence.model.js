module.exports = (sequelize, Sequelize, DataTypes) => {
    const Agence = sequelize.define(
      "agence", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        nom: {
          type: DataTypes.STRING,
        },
        adressepostale: {
          type: DataTypes.STRING
        },
        ville: {
          type: DataTypes.STRING
        },
        tva: {
          type: DataTypes.STRING,
        },
        tel: {
            type: DataTypes.STRING,
          },
        compteboncaire: {
            type: DataTypes.STRING,
          },
        image: {
            type: DataTypes.STRING,
          },
        Userid: {
            type: DataTypes.UUID,
          }
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
    Agence.associate = (models) => {
      Agence.hasMany(models.Agence);
    };
    */


    return Agence;
  };
  