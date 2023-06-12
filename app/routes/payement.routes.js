const { authJwt } = require("../middlewares");
const controller = require("../controllers/payement.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });

    app.post("/api/payement/create", controller.create);
    app.get("/api/payement/findall", controller.findAll);
    app.delete("/api/payement/delete/:id", controller.delete);
    app.get("/api/payement/findOne/:id", controller.findOne);
    app.put("/api/payement/update/:id", controller.update);





}
