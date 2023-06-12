const { authJwt } = require("../middlewares");
const controller = require("../controllers/Rendezvousmaintenance.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });

    app.post("/api/Rendezvousmaintenance/create", controller.create);
    app.get("/api/Rendezvousmaintenance/findall", controller.findAll);
    app.delete("/api/Rendezvousmaintenance/delete/:id", controller.delete);
    app.get("/api/Rendezvousmaintenance/findOne/:id", controller.findOne);
    app.put("/api/Rendezvousmaintenance/update/:id", controller.update);





}
