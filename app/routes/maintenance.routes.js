const { authJwt } = require("../middlewares");
const controller = require("../controllers/maintenance.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });

    app.post("/api/maintenance/create", controller.create);
    app.get("/api/maintenance/findall", controller.findAll);
    app.delete("/api/maintenance/delete/:id", controller.delete);
    app.get("/api/maintenance/findOne/:id", controller.findOne);
    app.put("/api/maintenance/update/:id", controller.update);





}
