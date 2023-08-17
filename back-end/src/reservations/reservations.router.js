/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require('express').Router();
const controller = require('./reservations.controller');

router.route('/').post(controller.create).get(controller.list);

module.exports = router;
