import config from '~/config'
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UsersTable } from '../database/tables';
import normalizeEmail from 'normalize-email';

const BCRYPT_SALT_ROUNDS = 12;

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email: string, password: string, done) => {
      try {
        const normalizedEmail = normalizeEmail(email);
        const existingUser = await UsersTable.findOne({ email: normalizedEmail });
        if (existingUser) {
          console.log(`Email ${normalizedEmail} already registered.`);
          return done(null, false, { message: 'Email already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
        const newUser = await UsersTable.create({
          email: normalizedEmail,
          password_hash: hashedPassword
        }).save();

        console.log(`Created user: ${newUser.email}`);
        return done(null, newUser);
      } catch (err) {
        done(err);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email: string, password: string, done) => {
      try {
        const normalizedEmail = normalizeEmail(email);
        const user = await UsersTable.findOne({ email: normalizedEmail });

        if (!user) {
            return done(null, false, { message: 'Bad username.' });
        }
        
        const passwordVerified = await bcrypt.compare(password, user.password_hash);
        if (!passwordVerified) {
          console.log(`Passwords do not match for user ${user.email}.`);
          return done(null, false, { message: 'Passwords do not match.' });
        }
          
        console.log(`User ${user.email} authenticated.`);
        return done(null, user);
      } catch (err) {
        done(err);
      }
    },
  ),
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: config.AUTH.TOKEN_SECRET,
  jsonWebTokenOptions: {
    maxAge: "7d",
  },
};

passport.use(
  'jwt',
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await UsersTable.findOne(jwtPayload.id);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err);
    }
  }),
);