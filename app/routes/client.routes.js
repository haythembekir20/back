const { authJwt } = require("../middlewares");
const controller = require("../controllers/client.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });

    app.post("/api/client/createclient", controller.createclient);
    app.post("/api/client/createcontact", controller.createcontact);



    app.get("/api/client/findallclient", controller.findAllClient);
    app.get("/api/client/findallcontact", controller.findAllContact);

    app.delete("/api/client/delete/:id", controller.delete);
    app.get("/api/client/findOne/:id", controller.findOne);
    app.put("/api/client/update/:id", controller.update);





}
