const { authJwt } = require("../middlewares");
const controller = require("../controllers/traqueurs.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });

    app.post("/api/traqueurs/create", controller.create);
    app.get("/api/traqueurs/findall", controller.findAll);
    app.delete("/api/traqueurs/delete/:id", controller.delete);
    app.get("/api/traqueurs/findOne/:id", controller.findOne);
    app.put("/api/traqueurs/update/:id", controller.update);





}
