const router = require('express').Router()
const controller = require('./seating.controller')
const methodNotAllowed = require('../errors/methodNotAllowed')


router.route('/').get(controller.list).all(methodNotAllowed)

module.exports = router