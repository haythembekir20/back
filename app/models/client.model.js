module.exports = (sequelize, Sequelize, DataTypes) => {
    const Client = sequelize.define(
      "Client", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        nom: {
          type: DataTypes.STRING
        },
        prenom: {
            type: DataTypes.STRING
          },
        cin: {
            type: DataTypes.STRING
          },
        datenaissance: {
          type: DataTypes.DATE
        },
        ville: {
            type: DataTypes.STRING
          },
        codepostale: {
            type: DataTypes.STRING
          },
        tel1: {
            type: DataTypes.STRING
          },
        tel2: {
            type: DataTypes.STRING
          },

        email: {
            type: DataTypes.STRING
          },
        description: {
            type: DataTypes.STRING
          },
        date: {
            type: DataTypes.DATE
          },
        active: {
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
  /*
    Voiture.associate = (models) => {
        Voiture.belongsTo(models.Voiture);
      };
*/
    return Client;
  };
  