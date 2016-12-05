/**
 * Created by utilisateur on 09/03/2016.
 */

Meteor.publish("cities", function(){
   return Cities.find({});
});

Meteor.publish("activities", function(){
    return Activities.find({});
});