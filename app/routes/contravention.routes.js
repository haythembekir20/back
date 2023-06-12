const { authJwt } = require("../middlewares");
const controller = require("../controllers/contravention.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });

    app.post("/api/contravention/create", controller.create);
    app.get("/api/contravention/findall", controller.findAll);
    app.delete("/api/contravention/delete/:id", controller.delete);
    app.get("/api/contravention/findOne/:id", controller.findOne);
    app.put("/api/contravention/update/:id", controller.update);





}
