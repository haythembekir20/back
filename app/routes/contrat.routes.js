const { authJwt } = require("../middlewares");
const controller = require("../controllers/contrat.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });

    app.post("/api/contrat/create", controller.create);
    app.get("/api/contrat/findall", controller.findAll);
    app.delete("/api/contrat/delete/:id", controller.delete);
    app.get("/api/contrat/findOne/:id", controller.findOne);
    app.get("/api/contrat/findVoiture/:id", controller.findAllVoiture);

    app.put("/api/contrat/paye/:id", controller.paye);
    app.put("/api/contrat/inpaye/:id", controller.inpaye);



 





}
