import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { users } from "../data/mongo/manager.mongo.js"
const { GOOGLE_ID, GOOGLE_CLIENT } = process.env

passport.use("register", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {

            let one = await users.readByEmail(email)
            if (one) {
                return done(null, false)
            } else {
                let data = req.body
                data.password = createHash(password)
                let user = await users.create(data)
                return done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }
));
passport.use("login", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            const user = await users.readByEmail(email)
            if (user) {
                const verify = verifyHash(password, user.password)
                if (verify) {
                    req.session.email = email
                    req.session.role = user.role
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } else {
                return done(null, false)
            }
        } catch (error) {
            return (done)
        }
    }
));
passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_ID,
            clientSecret: GOOGLE_CLIENT,
            callbackURL: "http://localhost:8080/api/sessions/google/cb",
            passReqToCallback: true
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile);
                let user = await users.readByEmail(profile.id);
                const sessionData = {
                    email: profile.id,
                    role: null
                };
                if (user) {
                    sessionData.role = user.role;
                } else {
                    const newUser = {
                        email: profile.id,
                        name: profile.name.givenName,
                        photo: profile.coverPhoto,
                        password: createHash(profile.id)
                    };
                    user = await users.create(newUser);
                    sessionData.role = user.role;
                }
                req.session.email = sessionData.email;
                req.session.role = sessionData.role;
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);


export default passport;