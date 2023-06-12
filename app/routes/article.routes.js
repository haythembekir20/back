const { authJwt } = require("../middlewares");
const controller = require("../controllers/article.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });

    app.post("/api/article/create", controller.create);
    app.get("/api/article/findall", controller.findAll);
    app.delete("/api/article/delete/:id", controller.delete);
    app.get("/api/article/findOne/:id", controller.findOne);
    app.put("/api/article/update/:id", controller.update);





}
