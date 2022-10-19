const router = require("express").Router();
const controller = require("./reservations.controller");
 
 router
     .route("/:reservationId")
     .get(controller.show)
 
 router
     .route("/")
     .get(controller.list)
 
 module.exports = router;
 