const { authJwt } = require("../middlewares");
const controller = require("../controllers/garage.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });

    app.post("/api/garage/create", controller.create);
    app.get("/api/garage/findall", controller.findAll);
    app.delete("/api/garage/delete/:id", controller.delete);
    app.get("/api/garage/findOne/:id", controller.findOne);
    app.put("/api/garage/update/:id", controller.update);





}
