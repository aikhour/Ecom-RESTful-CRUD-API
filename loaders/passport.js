const passport = require('passport');
const LocalStrategy = require('passport-local');

const AuthService =  require('../services/authService');
const AuthServiceInstance = new AuthService();

module.exports = (app) => {
    // passport init
    app.use(passport.initialize());
    app.use(passport.session());

    // serialize data to store in cookie
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // deserialize data in cookie
    passport.deserializeUser((id, done) => {
        done(null, { id });
    });

    // config localstrategy for login
    passport.use(new LocalStrategy(
        async (username, password, done) => {
            try {

                const user = await AuthServiceInstance.login({ email: username, password });
                return done(null, user);
            } catch(error) {
                return done(error);
            }
        }
    ));

    return passport;

}