var Sequelize = require('sequelize');
var db = require('./_db');
var Hotel = require('./hotel'); 
var Restaurants = require('./restaurant'); 
var Activities = require('./activity'); 

var Day = db.define('day', {
	number: Sequelize.INTEGER 
}); 

Day.belongsTo(Hotel); 
Day.belongsToMany(Restaurants, {through: 'day_restaurant'}); 
Day.belongsToMany(Activities, {through: 'day_activity'}); 

module.exports = Day; 