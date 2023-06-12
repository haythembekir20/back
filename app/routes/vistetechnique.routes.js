const { authJwt } = require("../middlewares");
const controller = require("../controllers/vistetechnique.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });

    app.post("/api/vistetechnique/create", controller.create);
    app.get("/api/vistetechnique/findall", controller.findAll);
    app.delete("/api/vistetechnique/delete/:id", controller.delete);
    app.get("/api/vistetechnique/findOne/:id", controller.findOne);
    app.put("/api/vistetechnique/update/:id", controller.update);





}
