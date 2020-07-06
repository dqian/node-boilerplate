import config from '~/config'
import * as bcrypt from 'bcrypt';
import * as passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { getConnection } from 'typeorm';
import { User } from '../database/models/user';
const normalizeEmail = require("normalize-email");

const BCRYPT_SALT_ROUNDS = 12;
const JWT_AUTH_HEADER = "JWT";
const JWT_TOKEN_MAX_AGE = "7d";

const USERNAME_FIELD = 'email';
const PASSWORD_FIELD = 'password';

export enum PassportAction {
  Register = 'register',
  Login = 'login',
  JWT = 'jwt',
}

passport.use(
  PassportAction.Register,
  new LocalStrategy(
    {
      usernameField: USERNAME_FIELD,
      passwordField: PASSWORD_FIELD,
      session: false,
    },
    async (email: string, password: string, done) => {
      try {
        const UsersTable = getConnection().getRepository(User);
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
  PassportAction.Login,
  new LocalStrategy(
    {
      usernameField: USERNAME_FIELD,
      passwordField: PASSWORD_FIELD,
      session: false,
    },
    async (email: string, password: string, done) => {
      try {
        const UsersTable = getConnection().getRepository(User);
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
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(JWT_AUTH_HEADER),
  secretOrKey: config.AUTH.TOKEN_SECRET,
  jsonWebTokenOptions: {
    maxAge: JWT_TOKEN_MAX_AGE,
  },
};

passport.use(
  PassportAction.JWT,
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const UsersTable = getConnection().getRepository(User);
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