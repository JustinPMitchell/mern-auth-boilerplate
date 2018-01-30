var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Meal = require('../../models/meal.js');

/* GET ALL MEALS */
router.get('/', function(req, res, next) {
  Meal.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE MEAL BY ID */
router.get('/:id', function(req, res, next) {
  Meal.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE MEAL */
router.post('/', function(req, res, next) {
  Meal.create(req.body, function (err, post) {
    console.log('this is the name of the person', req.body);
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE MEAL */
router.put('/:id', function(req, res, next) {
  MEAL.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE MEAL */
router.delete('/:id', function(req, res, next) {
  Meal.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;