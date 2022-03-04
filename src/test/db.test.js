import { readFile } from 'fs/promises';
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import dotenv from 'dotenv';
import {
  getEventById,
  getAllEvents,
  listUsers,
  createEvent,
  registerEvent,
  createSchema,
  dropSchema,
  end,
  register,
  updateEvent,
  query,
} from '../lib/db';

dotenv.config({ path: './.env.test' });

describe('db', () => {
  beforeAll(async () => {
    await dropSchema();
    await createSchema();
    const data = await readFile('./sql/testInsert.sql');
    await query(data.toString('utf-8'));
  });

  afterAll(async () => {
    await end();
  });

  it('creates a valid event and returns it', async () => {
    const name = 'test';
    const description = 'foo';
    const maker = 1;
    const result = await registerEvent(name, description, maker);
    expect(result.name).toBe(name);
    expect(result.slug).toBe(name);
    expect(result.id).toBeGreaterThan(0);

    // ARRANGE => setja upp test gögn
    // ACT => Acta á test gögnin
    // ASSERT => Staðfestum að það sem við gerðum gerðist rétt
  });

  it('does not create an invalid event', async () => {
    const result = await createEvent({});
    expect(result).toBe(null);
  });

  it('does not allow creating two events with the same name', async () => {
    const event = {
      name: 'foo',
      maker: 1
    };
    const result = await registerEvent(event);
    const sameName = await registerEvent(event);
    expect(result).toBeDefined();
    expect(sameName).toBeNull();
  });

  it('creates and updates an event', async () => {
    const name = 'test1';
    const description = 'd';
    const maker = 1;
    const result = await registerEvent(name, description, maker);
    const updated = await updateEvent(result.id, { name: 'two', slug: 'two' });
    expect(updated.id).toEqual(result.id);
    expect(updated.name).toBe('two');
    expect(updated.slug).toBe('two');
    expect(result.description).toBe('d');
    expect(updated.description).toBe(null);
  });

  it('allows registering to events', async () => {
    const name = 'test1';
    const description = 'd';
    const maker = 1;
    const event = await registerEvent(name, description, maker);
    const registration = await register({ name: 'r', event: event.id });

    expect(registration.name).toEqual('r');
  });

  it('does not allow registering to non existant event', async () => {
    const registration = await register({ name: 'r', event: 0 });

    expect(registration).toBeNull();
  });

  it('does not allow registering to non existant event', async () => {
    const registration = await register({ event: 0 });

    expect(registration).toBeNull();
  });
  it('can fetch a list of users', async () => {
    const users = await listUsers();
    expect(users[0].id).toEqual(1);
  });
  it('can fetch an event using a unique id', async () => {
    const event = await getEventById(1)
    expect(event.name).toBe('test');
  });
  it('can fetch all of it\'s events', async () => {
    const events = await getAllEvents();
    expect(events[0].id).toEqual(1);
    expect(events).toHaveLength(3);
  });
  it('', async () => {

  });
});
