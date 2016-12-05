/**
 * Created by utilisateur on 09/03/2016.
 */

Template.city.helpers({
    isPlaces: function (a) {
        return a.nature === "place"
    },
    isEvents: function (a) {
        return a.nature === "event"
    },
    city : function () {
        return Cities.find({});
    },

    mapOptions: function() {
        // Make sure the maps API has loaded
        if (GoogleMaps.loaded()) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(this.coordinates.long, this.coordinates.lat),
                zoom: 8
            };
        }
    }
});

Template.city.events({

    "submit .new-activitie-form": function (event) {
        event.preventDefault();
        var activities = {
            _id:Random.id(),
            name : event.target.name.value,
            lat:event.target.lat.value,
            long:event.target.long.value,
            nature:event.target.nature.value,
            url: event.target.url.value,
            dateStart:event.target.srt.value,
            dateEnd:event.target.end.value,
            description:event.target.description.value,
            owner:Meteor.userId(),
            picture: []
        }
        var city = this;
            Meteor.call("insertActivity", activities, function(err){
                if(err) {
                    console.log(err);
                }
            });
            Meteor.call("initUploadServerForActivity", city, activities);
    },

    "focus .field-input":function(e) {
        var $this = $(e.target);
        $($this).parent().addClass('is-focused has-label');
    },

    "blur .field-input":function (e) {
        var $this = $(e.target);
        $parent = $($this).parent();
        if ($($this).val() == '') {
            $parent.removeClass('has-label');
        }
        $parent.removeClass('is-focused');
    },

    "each .field-input":function (e) {
        var $this = $(e.target);
        if ($($this).val() != '') {
            $($this).parent().addClass('has-label');
        }
    }
});

Template.city.onCreated(function() {
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