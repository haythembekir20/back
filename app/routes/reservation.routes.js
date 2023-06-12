const { authJwt } = require("../middlewares");
const controller = require("../controllers/reservation.controller");
const { verifyreservation } = require("../middlewares");


module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });

    app.post("/api/reservation/create",
    [
      verifyreservation.checkreservation1
    ], controller.create);
    app.get("/api/reservation/findall", controller.findAll);
    app.delete("/api/reservation/delete/:id", controller.delete);
    app.get("/api/reservation/findOne/:id", controller.findOne);
    app.put("/api/reservation/update/:id",[
      verifyreservation.checkreservation1
    ], controller.update);





}
