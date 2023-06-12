const { authJwt } = require("../middlewares");
const controller = require("../controllers/option.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });

    app.post("/api/option/create", controller.create);
    app.get("/api/option/findall", controller.findAll);
    app.delete("/api/option/delete/:id", controller.delete);
    app.get("/api/option/findOne/:id", controller.findOne);
    app.put("/api/option/update/:id", controller.update);





}
