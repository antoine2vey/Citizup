Router.configure({
    layoutTemplate: "main",
    notFoundTemplate: "notFound"
});

Router.route("/", {
    name: "home",
    template: "home"
});

Router.route('/city/:id', {
        template: "city",
        data: function () {
            return Cities.findOne({
                _id:this.params.id
            });
        }
});

Router.route('/activities/:id', {
    template: "places",
    data: function () {
        return Activities.findOne({
            _id:this.params.id
        });
    }
});

Router.route("/charts", {
    name: "charts",
    template: "charts"
});


Router.route("/about", {
    name: "about",
    template: "about"
});