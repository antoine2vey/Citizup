/**
* Created by utilisateur on 09/03/2016.
*/

Template.places.helpers({

  mapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(this.long, this.lat),
        zoom: 8
      };
    }
  },

  isPlaces: function (a) {
    return a.nature === "place"
  },
  isEvents: function (a) {
    return a.nature === "event"
  },
  activities: function() {
    return Cities.find({});
  },

  others:function() {
    var other = Cities.findOne({
      "activities._id":this._id
    });
    return other.activities
  },

  notsame: function(p) {
    return p._id != this._id
  },

  comments:function() {
    var y = Activities.findOne({
      _id: this._id
    }).comments.length;
    var nb = y;
    if(nb > 1){
      return nb + "comments"
    }
    return nb + "comment"
  },

  likes:function() {
    var x = Activities.findOne({
      _id: this._id
    }).likes.length;
    var nb = x;
    if(nb > 1){
      return nb + "likes"
    }
    return nb + "like"
  },

  isLike:function() {
    var c = Activities.findOne({
      _id:this._id
    });

    c = c.likes;
    var like = false;
    c.map(function(a){
      if(a._id == Meteor.userId()){
        like = true;
      }
    });
    return like;
  },

  likeDisplay:function() {
    var c = Activities.findOne({
      _id: this._id
    });

    c = c.likes;
    var like = false;
    c.map(function (a) {
      if (a._id == Meteor.userId()) {
        like = true;
      }
    });
    return (like ? "display:none" : "display:inline-block");
  },

  NotlikeDisplay:function() {
    var c = Activities.findOne({
      _id:this._id
    });

    c = c.likes;
    var like = false;
    c.map(function(a){
      if(a._id == Meteor.userId()){
        like = true;
      }
    });
    return (like ? "display:inline-block": "display:none");
  }
});

Template.places.events({
  'submit .add-comments':function(e) {
    e.preventDefault();
    var text = e.target.text.value;
    Meteor.call("addComment", this, text, function(err){
      if(err){
        console.log(err);
      }
    });

    e.target.text.value = "";
    return false;
  },

  'click .like-btn':function() {
    var obj = {
      likes :
      {
        _id : Meteor.userId(),
        /*                email : Meteor.user().emails[0].address*/
        isLike: true
      }
    };

    Meteor.call("addLike", this._id, obj);
  },

  'click .unlike-btn':function() {
    Meteor.call("removeLike", this._id);
  }
});

Template.places.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('CityLocalisation', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
});

Meteor.startup(function() {
  GoogleMaps.load();
});
