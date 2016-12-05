Template.home.events({
    'submit .new-cities-form': function (event) {
        event.preventDefault();
        var userId = Meteor.userId();
        Meteor.call('initUploadServerForCity', event.target.name.value, event.target.lat.value, event.target.long.value, event.target.description.value, userId)
    },

    "click .remove-btn": function (e) {
        var target = e.target.id;
        Meteor.call('removeCitie', target);
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

Template.home.helpers({
    cityliste: function () {
        return Cities.find({});
    },

    isOwner:function(o) {
        return o === Meteor.userId();
    }
});

Template.navbar.events({
    "click #reset": function () {
        Meteor.call("reset", function (err, res) {
            if (err) console.log("!!", err);
        });
    }
});