const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


router
    .route("/:tableId/seat")
    .put(controller.update)    // Update table reservation
    .delete(controller.delete) // Delete table reservation
    .all(methodNotAllowed);    // Handle unsupported HTTP methods

// Route for listing and creating tables
router
    .route("/")
    .get(controller.list)     // List all tables
    .post(controller.create)   // Create a new table
    .all(methodNotAllowed);    // Handle unsupported HTTP methods

// Export the router to be used in the main application
module.exports = router;