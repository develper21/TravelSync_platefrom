import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  getDestinationById,
  getDestinations,
} from '../src/controllers/destinationsController.js';
import {
  getContactMessages,
  submitContactMessage,
} from '../src/controllers/contactController.js';

const createResponse = () => ({
  statusCode: 200,
  body: undefined,
  status(statusCode) {
    this.statusCode = statusCode;
    return this;
  },
  json(body) {
    this.body = body;
    return this;
  },
});

describe('destination endpoints', () => {
  it('filters destinations by search and returns pagination metadata', async () => {
    const response = createResponse();

    await getDestinations(
      { query: { search: 'Paris', page: '1', limit: '1' } },
      response,
    );

    assert.equal(response.statusCode, 200);
    assert.equal(response.body.destinations.length, 1);
    assert.match(response.body.destinations[0].name, /Paris/i);
    assert.equal(response.body.page, 1);
    assert.equal(response.body.totalPages, 1);
  });

  it('returns 404 when a destination does not exist', async () => {
    const response = createResponse();

    await getDestinationById({ params: { id: 'not-a-destination' } }, response);

    assert.equal(response.statusCode, 404);
    assert.deepEqual(response.body, { error: 'Destination not found' });
  });
});

describe('contact endpoints', () => {
  it('rejects submissions missing required fields', async () => {
    const response = createResponse();

    await submitContactMessage({ body: { name: 'A traveler' } }, response);

    assert.equal(response.statusCode, 400);
    assert.deepEqual(response.body, {
      error: 'Name, email, and message are required fields.',
    });
  });

  it('accepts a message and defaults its subject', async () => {
    const response = createResponse();

    await submitContactMessage(
      {
        body: {
          name: 'A traveler',
          email: 'traveler@example.com',
          message: 'I need help planning a trip.',
        },
      },
      response,
    );

    assert.equal(response.statusCode, 201);
    assert.equal(response.body.success, true);
    assert.equal(response.body.contact.subject, 'General Inquiry');

    const listResponse = createResponse();
    await getContactMessages({}, listResponse);
    assert.ok(
      listResponse.body.some((contact) => contact._id === response.body.contact._id),
    );
  });
});
