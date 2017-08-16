var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../models').Hotel;
var Restaurant = require('../models').Restaurant;
var Activity = require('../models').Activity;
var Day = require('../models').Day; 

router.get('/', function(req, res, next) {
  Promise.all([
    Hotel.findAll(),
    Restaurant.findAll(),
    Activity.findAll()
  ])
  .spread(function(dbHotels, dbRestaurants, dbActivities) {
    res.render('index', {
      templateHotels: dbHotels,
      templateRestaurants: dbRestaurants,
      templateActivities: dbActivities
    });
  })
  .catch(next);
});

router.get('/api/hotels', function(req, res, next) {
  Hotel.findAll().then(function(hotels) {
    res.json(hotels); 
  }) 
}); 

router.get('/api/restaurants', function(req, res, next) {
  Restaurant.findAll().then(function(restaurants) {
    res.json(restaurants); 
  }) 
}); 

router.get('/api/activities', function(req, res, next) {
  Activity.findAll().then(function(activities) {
    res.json(activities); 
  }) 
}); 

// router.post('/api/days/:id/restaurants', function(req, res, next) {
//   Day.findOrCreate({
//     where: {
//       number: req.params.id 
//     }
//   }).then(function(day) {
//     res.json(day); 
//   }) 

// }); 

router.get('/api/days', function(req,res,next) {
  Day.findAll().then(function(days) {
    var dayCount = days.length; 
    return dayCount+1; 
  }).then(function(dayCount) {
    Day.create({
        number: dayCount
    })
  }) 
})

router.post('/api/days/:id/restaurants', function(req, res, next) {
  console.log("HELLOOOOO"); 
  Day.create({
    where: {
      number: req.params.id
    }
  }).then(function(day) {
    console.log(day); 
  })
}); 


// router.get('/api/days', function(req, res, next) {
//   Day.findAll().then(function(days) {
//     res.json(days)
//   })
// }); 

module.exports = router;
