import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt"
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import { users } from "../data/mongo/manager.mongo.js"
const { GOOGLE_ID, GOOGLE_CLIENT, SECRET } = process.env

passport.use("register", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            let one = await users.readByEmail(email)
            if (!one) {
                let data = req.body;
                data.password = createHash(password)
                let user = await users.create(data)
                return done(null,user)
            }else{
                return done(null, false, {messages: "Already exist"})
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
            if (user && verifyHash(password, user.password)) {
                const token = createToken({ email, role: user.role })
                req.token = token
                return done(null, user)
            } else {
                return done(null, false, { messages: "Bad auth from passport cb" });
            }
        } catch (error) {
            return done(error)
        }
    }
));
passport.use("google",
    new GoogleStrategy(
        {
            clientID: GOOGLE_ID,
            clientSecret: GOOGLE_CLIENT,
            callbackURL: "http://localhost:8080/api/sessions/google/cb",
            passReqToCallback: true
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
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
passport.use("jwt", new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies["token"]]),
    secretOrKey: SECRET
}, async (payload, done) => {
    try {
        const user = await users.readByEmail(payload.email)
        if (user) {
            user.password = null
            return done(null, user)
        } else {
            return done(null, false)
        }
    } catch (error) {
        return done(error)
    }
}))


export default passport;