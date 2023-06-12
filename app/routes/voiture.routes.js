const { authJwt } = require("../middlewares");
const controller = require("../controllers/voiture.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });

    app.post("/api/voiture/create", controller.create);
    app.get("/api/voiture/affichedispo", controller.findAlldisponible );
    app.get("/api/voiture/affichenondispo", controller.findAllnondisponible );
    app.delete("/api/voiture/delete/:id", controller.delete );
    app.put("/api/voiture/update/:id", controller.update );
    app.put("/api/voiture/updateNonDisponbile/:id", controller.updateNonDisponible );
    app.put("/api/voiture/updateDisponible/:id", controller.updateDisponible );

    app.get("/api/voiture/voiturefindOne/:id", controller.voiturefindOne);



    




};