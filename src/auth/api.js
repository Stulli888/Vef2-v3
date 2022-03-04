import express from 'express';
import jwt from 'jsonwebtoken';

import { jwtOptions, tokenOptions, requireAuthentication } from './passport.js';
import {
  comparePasswords, createUser,
  findUserByUsername, findUserById,
  updateUser,
} from '../lib/users.js';
import { getAllEvents,
         registerEvent,
         getEventById,
         updateEvent,
         deleteEventRow,
         register,
         deleteRegistration,
         listUsers,
} from '../lib/db.js';
import { catchErrors } from '../utils/errorsHandler.js';
// import { logger } from '../utils/logger.js';

import { xssSanitizationUsername,
  sanitizationMiddlewareUsername,
  usernameDoesNotExistValidator,
  validationUsernameAndPass,
  usernameAndPaswordValidValidator,
  atLeastOneBodyValueValidator,
  xssSanitizeEvent,
  validateEvent
} from '../validation/validators.js';
import { validationCheck } from '../validation/helpers.js';
import { slugify } from '../lib/slugify.js';
/**
 * Skilgreinir API fyrir nýskráningu, innskráningu notanda, ásamt því að skila
 * upplýsingum um notanda og uppfæra þær.
 */

export const router = express.Router();

async function loginRoute(req, res) {
  const { username, password = '' } = req.body;
  const user = await findUserByUsername(username);
  if (!user) {
    return res.status(401).json({ error: 'No such user' });
  }

  const passwordIsCorrect = await comparePasswords(password, user.password);

  if (passwordIsCorrect) {
    const payload = { id: user.id };
    const token = jwt.sign(payload, jwtOptions.secretOrKey, tokenOptions);
    return res.json({
      token,
      expiresIn: tokenOptions.expiresIn,
    });
  }

  return res.status(401).json({ error: 'Invalid password' });
}

async function userRoute(req,res){
  if(req.user.isadmin){
    const { id } = req.params;

    const user = await findUserById(id);

    if(!user) {
      return res.status(404).json({ error: 'User not found'});
    }
    delete user.password;
    return res.status(200).json(user);
  }
  return res.status(400).json({ error: 'Missing privilege'})
}

async function currentUserRoute(req, res) {
  const { user: { id } = {} } = req;

  const user = await findUserById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  delete user.password;

  return res.status(200).json(user);
}

async function updateCurrentUserRoute(req, res) {
  const { id } = req.user;
  const user = await findUserById(id);

  if (!user) {
    return res.status(500).json(null);
  }

  const { username = null ,password = null } = req.body;

  let resultUsername=null;
  let resultPass=null;

  if(username!==null && user.username !== username){
    const findUser = await findUserByUsername(username);
    if (findUser) {
      return res.status(401).json({ error: 'username already exists' });
    }

    // TODO : Þarf að skoða með validationUsername
    if(username.lenght < 4){
      return res.status(401).json({ error: 'Notendarnafn verður að vera a.m.k 4 stafir' });
    }
    resultUsername= await updateUser(id, username, null);
  }
  if (password!==null){
    const comparePass= await comparePasswords(password, user.password);
    if(!comparePass){
      resultPass= await updateUser(id, null, password);
    }
  }

  if (!resultUsername && !resultPass) {
    return res.status(400).json({ error: 'Nothing to update' });
  }

  const updatedUser = await findUserById(id);
  delete updatedUser.password;

  return res.status(200).json(updatedUser);
}

async function getEvents(req, res) {
  const result = await getAllEvents();
  return res.status(201).json(result);
}

async function registerEventRoute(req, res) {
  const { name, description = '' } = req.body;
  const { user: { id } = {} } = req;
  const result = await registerEvent(name, description, id);
  return res.status(201).json(result);
}

async function getEvent(req, res) {
  const { id } = req.params.id;
  const event = await getEventById(id);

  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  return res.status(200).json(event);
}

async function patchEvent(req, res) {
  const { id } = req.params.id;
  const event = await getEventById(id);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  const { name } = req.body.name;
  const slug = slugify(name);
  const { description } = req.body.description;

  const result = await updateEvent(id, {name, slug ,description});
  return res.status(200).json(result);
}

async function deleteEvent(req, res) {
  const { id } = req.params.id;
  const event = await getEventById(id);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  const result = await deleteEventRow(id);
  if (result.rowCount === 0) {
    return res.status(200).json({ info: 'Event deleted'});
  }
  return res.status(400).json({ error: 'Couldn\'t delete event'});
}

async function registerUser(req, res) {
  const { user: { id } = {} } = req;
  const user = await findUserById(id);
  const name = user.username;
  const comment = req.body.comment || '';
  const event = req.params.id;
  const result = await register({name, comment, event});
  return res.status(200).json(result);
}

async function deleteRegistrationRouter(req, res) {
  const { user: { id } = {} } = req;
  const user = await findUserById(id);
  const name = user.username;
  const event = req.params.id;
  const result = await deleteRegistration(name, event)
  if (result.rowCount === 0) {
    return res.status(200).json({info: 'Registration removed'});
  }
  return res.status(400).json({error: 'Registration couldn\'t be removed'});
}

async function listUsersRouter(req, res) {
  if(req.user.isadmin){
    const result = await listUsers();
    return res.status(200).json(result);
  }
  return res.status(400).json({ error: 'Not enough privilege'})
}

async function newUserRoute(req, res) {
  const { name, username, password } = req.body;
  const result = await createUser(name, username, password);
  delete result.password;
  return res.status(201).json(result);
}

/**
 * User routes
 */
router.post(
  '/users/login',
  validationUsernameAndPass,
  xssSanitizationUsername,
  sanitizationMiddlewareUsername,
  usernameAndPaswordValidValidator,
  validationCheck,
  catchErrors(loginRoute),
);

router.get(
  '/users',
  requireAuthentication,
  catchErrors(listUsersRouter),
);

router.get(
  '/users/me',
  requireAuthentication,
  catchErrors(currentUserRoute),
);

router.get(
  '/users/:id',
  requireAuthentication,
  catchErrors(userRoute),
);

router.patch(
  '/users/me',
  requireAuthentication,
  atLeastOneBodyValueValidator(['username', 'password']),
  validationCheck,
  catchErrors(updateCurrentUserRoute)
);

router.post(
  '/users/register',
  validationUsernameAndPass,
  xssSanitizationUsername,
  sanitizationMiddlewareUsername,
  usernameDoesNotExistValidator,
  validationCheck,
  catchErrors(newUserRoute)
);

/**
 * Events routes
 */

router.get(
  '/events',
  getEvents
);

router.post(
  '/events/register',
  requireAuthentication,
  validateEvent,
  xssSanitizeEvent,
  catchErrors(registerEventRoute)
  )

router.get(
  '/events/:id',
  catchErrors(getEvent)
);

router.patch(
  '/events/:id',
  requireAuthentication,

  catchErrors(patchEvent)
);

router.delete(
  '/events/:id',
  requireAuthentication,
  catchErrors(deleteEvent)
);

/**
 * Registration routes
*/

router.post(
  '/events/:id/register',
  requireAuthentication,
  catchErrors(registerUser)
);

router.delete(
  '/events/:id/register',
  requireAuthentication,
  catchErrors(deleteRegistrationRouter)
);