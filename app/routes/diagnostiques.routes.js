const { authJwt } = require("../middlewares");
const controller = require("../controllers/diagnostiques.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });

    app.post("/api/diagnostiques/create", controller.create);
    app.get("/api/diagnostiques/findall", controller.findAll);
    app.delete("/api/diagnostiques/delete/:id", controller.delete);
    app.get("/api/diagnostiques/findOne/:id", controller.findOne);
    app.put("/api/diagnostiques/update/:id", controller.update);





}
