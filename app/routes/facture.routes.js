const { authJwt } = require("../middlewares");
const controller = require("../controllers/facture.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });

    app.post("/api/facture/create", controller.create);
    app.get("/api/facture/findall", controller.findAll);
    app.delete("/api/facture/delete/:id", controller.delete);
    app.get("/api/facture/findOne/:id", controller.findOne);

    app.get("/api/facture/findfacture/:id", controller.findAllFacturearticle);

    app.put("/api/facture/paye/:id", controller.paye);
    app.put("/api/facture/inpaye/:id", controller.inpaye);






}
