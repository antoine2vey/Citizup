Meteor.startup(function () {

    smtp = {
        username: 'meteorlensdundalk@gmail.com',
        password: 'meteorEire',
        server: 'smtp.gmail.com',
        port: 587
    };
    process.env.MAIL_URL = 'smtp://' +
        encodeURIComponent(smtp.username) + ':' +
        encodeURIComponent(smtp.password) + '@' +
        encodeURIComponent(smtp.server) + ':' +
        smtp.port;

    Accounts.emailTemplates.from = 'France-Eire Meteor group';
});


Accounts.onCreateUser(function (options, user) {
    if (options.email) {
        Meteor.setTimeout(function () {
            Accounts.sendVerificationEmail(user._id);
        }, 2 * 1000);
    }
    return user;
});