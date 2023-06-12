const { authJwt } = require("../middlewares");
const controller = require("../controllers/rendezvousreservation.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });

    app.post("/api/rendezvousreservation/create", controller.create);
    app.get("/api/rendezvousreservation/findall", controller.findAll);
    app.delete("/api/rendezvousreservation/delete/:id", controller.delete);
    app.get("/api/rendezvousreservation/findOne/:id", controller.findOne);
    app.put("/api/rendezvousreservation/update/:id", controller.update);





}
