import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as GithubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt"
import { verifyHash, createHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import repository from "../repositories/users.repositories.js";
import service from "../services/users.services.js";
import crypto from "crypto"

const { GOOGLE_ID, GOOGLE_CLIENT, SECRET, GITHUB_CLIENT, GITHUB_ID } = process.env

passport.use("register", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            let one = await repository.readByEmail(email)
            if (!one) {
                let data = req.body;
                data.verifiedCode = crypto.randomBytes(12).toString("base64")
                let user = await repository.create(data)
                if (user) {
                    service.register(data)
                }
                return done(null, user)
            } else {
                return done(null, false, { message: "Already exist" })
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
            const user = await repository.readByEmail(email)
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
                let user = await repository.readByEmail(profile._id);
                const sessionData = {
                    email: profile._id,
                    role: null
                };
                if (user) {
                    sessionData.role = user.role;
                } else {
                    const newUser = {
                        email: profile._id,
                        name: profile.name.givenName,
                        photo: profile.coverPhoto,
                        password: createHash(profile._id)
                    };
                    user = await repository.create(newUser);
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
passport.use(
    "github",
    new GithubStrategy(
        {
            passReqToCallback: true,
            clientID: GITHUB_ID,
            clientSecret: GITHUB_CLIENT,
            callbackURL: "http://localhost:8080/api/sessions/github/cb",
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                let user = await repository.readByEmail(profile.id + "@github.com");
                if (!user) {
                    user = {
                        email: profile.id + "@github.com",
                        name: profile.displayName || profile.username,
                        photo: profile.photos[0].value,
                        password: createHash(profile.id),
                    };
                    user = await repository.create(user);
                }
                req.session.email = user.email;
                req.session.role = user.role;
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);
passport.use("jwt", new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies["token"]]),
    secretOrKey: SECRET,
    passReqToCallback: true
}, async (req, payload, done) => {
    try {
        const user = await repository.readByEmail(payload.email);
        if (user) {
            if (req && req.session) {
                req.session.role = user.role;
            }
            user.password = null;
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error);
    }
}));

export default passport;