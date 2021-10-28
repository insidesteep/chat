const passport = require("passport");
const path = require("path");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { UserService } = require("../services");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

// passport.serializeUser(function (user, done) {
//   console.log("A")
//   done(null, user.id);
// });

// passport.deserializeUser(async function (id, done) {
//   console.log("B")
//   const user = await UserService.get({ googleId: id });

//   console.log("DESER", user);
//   if (user) {
//     done(err, user);
//   }
// });


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      proxy: true,
    },
    async function (accessToken, refreshToken, profile, done) {
      let user = await UserService.get({ googleId: profile.id });

      if (!user) {
        user = await UserService.create({
          googleId: profile.id,
          name: profile.displayName,
          avatar: profile.photos.length ? profile.photos[0].value : "",
          email: profile.emails[0].value,
        });
      }

      done(null, user);
    }
  )
);
