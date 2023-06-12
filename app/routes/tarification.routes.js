const { authJwt } = require("../middlewares");
const { verifytarification } = require("../middlewares");

const controller = require("../controllers/tarification.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });

    app.post("/api/tarification/create",
    [
      verifytarification.checktarfication
    ],
    controller.create);
    app.get("/api/tarification/findall", controller.findAll);
    app.delete("/api/tarification/delete/:id", controller.delete);
    app.get("/api/tarification/findOne/:id", controller.findOne);
    app.put("/api/tarification/update/:id", controller.update);
    app.get("/api/tarification/find/:id", controller.find);







}
