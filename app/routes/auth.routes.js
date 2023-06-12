const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );


  app.post(
    "/api/auth/signupa",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signupagence
  );

  app.post(
    "/api/auth/signupemployee",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signupemploye
  );

  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/signout", controller.signout);
  app.get("/api/auth/Affiche", controller.afficheemploye);
  app.delete("/api/auth/SuppEmploye/:id", controller.deleteemploye);

  app.put("/api/auth/update/:id", controller.update);
  app.put("/api/auth/updateActive/:id", controller.updateActive);
  app.put("/api/auth/upadteDesactive/:id", controller.updateDesactive);


  app.get("/api/auth/AfficheAgence/:id", controller.afficheAgence);

  app.get("/api/auth/agencefindOne/:id", controller.agencefindOne);
  app.put("/api/auth/updateAgence/:id", controller.updateAgence);
  app.put("/api/auth/updatePassword/:id", controller.updatePassword);

  app.get("/api/auth/getCode/:email", controller.getCode);
  app.put("/api/auth/changePassword/:email", controller.changePassword);




  app.get("/api/auth/Affichetoutagence", controller.affichetoutAgence);
  app.get("/api/auth/Affichetoutuser", controller.affichetoutuser);

  app.put("/api/auth/active/:id", controller.active);
  app.put("/api/auth/desactive/:id", controller.desactive);
  app.delete("/api/auth/SuppAgence/:id", controller.deleteagence);




};
