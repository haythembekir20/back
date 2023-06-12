const { authJwt } = require("../middlewares");
const controller = require("../controllers/kilometrage.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });

    app.post("/api/kilometrage/create", controller.create);
    app.get("/api/kilometrage/findall", controller.findAll);
    app.delete("/api/kilometrage/delete/:id", controller.delete);
    app.get("/api/kilometrage/findOne/:id", controller.findOne);
    app.put("/api/kilometrage/update/:id", controller.update);





}
