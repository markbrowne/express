'use strict'

const db = require('../config/database');
const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
  var carsCollection = db.get('cars')

  carsCollection.find({}, function(err, foundCars) {
    res.render('cars/index', {
      cars: foundCars
    })
  })
})

router.get('/new', function(req, res) {
  res.render('cars/new')
})

router.post("/", function(req, res) {
  var carsCollection = db.get('cars')
  carsCollection.insert(req.body, function(err, savedCar) {
    if (err) throw err
    res.redirect("/cars")
  })
})

router.get('/:id', function(req, res) {
  var carsCollection = db.get('cars')

  carsCollection.findOne({
    _id: req.params.id
  }, function(err, foundCar) {
    if (err) throw err
    res.render('cars/show', {
      car: foundCar
    })
  })
})

router.get("/:id/edit", function(req, res) {
  var carsCollection = db.get('cars')
  carsCollection.findOne({
    _id: req.params.id
  }, function(err, foundCar) {
    if (err) throw err
    res.render('cars/edit', {
      car: foundCar
    })
  })
})

router.put("/cars/:id?", function(req, res) {
  var carsCollection = db.get('cars')
  carsCollection.update({_id: req.params.id},
    {_id: req.params.id,make: req.params.make , model: req.params.model , model_year: req.params.model_year},
    function(err, savedCar) {
    if (err) throw err
    res.redirect("/cars")
  })
})

module.exports = router
