require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

/* GET SINGLE USER BY ID */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE USER */
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* ADD MEAL PLAN */
router.post("/addmealplan", function(req,res,next){
  console.log("REQ BODY IS",req.body);
  console.log("REQ PARAMS ARE ",req.params);
  console.log("REQ", req);
    User.update({_id: req.body.userId}, {
      meals:{
        end:req.body.end,
        mealdata:JSON.stringify(req.body.mealData)
      }
    }, function(err, numberAffected, rawResponse) {
      if(err) return next(err);
      res.status(200).send("added meal to db");
    })
})

module.exports = router;