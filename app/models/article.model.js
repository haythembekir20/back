module.exports = (sequelize, Sequelize, DataTypes) => {
    const Article = sequelize.define(
      "Article", // Model name
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
        prix: {
          type: DataTypes.STRING
        },
        tva: {
            type: DataTypes.STRING
          },
        prixttc: {
            type: DataTypes.STRING
          },
        cout: {
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
    return Article;
  };
  