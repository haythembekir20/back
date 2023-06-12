const { authJwt } = require("../middlewares");
const controller = require("../controllers/carburant.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });

    app.post("/api/carburant/create", controller.create);
    app.get("/api/carburant/findall", controller.findAll);
    app.delete("/api/carburant/delete/:id", controller.delete);
    app.get("/api/carburant/findOne/:id", controller.findOne);
    app.put("/api/carburant/update/:id", controller.update);





}
