/**
 * Upstash Redis client — cloud database for CreatorStick Website
 *
 * Setup:
 *  1. Create free account at https://upstash.com
 *  2. Create a Redis database (region: ap-southeast-1 for India)
 *  3. Copy UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
 *  4. Add them to .env.local (local dev) and Vercel env vars (production)
 *
 * Data structure in Redis:
 *  bookings           → List  (JSON strings, newest first via LPUSH)
 *  bookings:counter   → String (auto-incrementing ID)
 *  career_applications → List
 *  career_applications:counter → String
 *  contact_messages   → List
 *  contact_messages:counter → String
 */

import { Redis } from '@upstash/redis';

let redis = null;

export function getRedis() {
  if (!redis) {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      throw new Error(
        'Missing Upstash Redis credentials.\n' +
        'Add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to your .env.local file.\n' +
        'Get them free at https://upstash.com'
      );
    }
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  return redis;
}

/** Push a new entry and return it with a unique ID & timestamp */
export async function pushEntry(key, data) {
  const db = getRedis();
  const id = await db.incr(`${key}:counter`);
  const entry = {
    id,
    ...data,
    created_at: new Date().toISOString(),
  };
  await db.lpush(key, JSON.stringify(entry));
  return entry;
}

/** Get all entries for a key (newest first) */
export async function getEntries(key) {
  const db = getRedis();
  const items = await db.lrange(key, 0, -1);
  return items.map((item) => {
    if (typeof item === 'string') return JSON.parse(item);
    return item; // Upstash already parses JSON in some SDK versions
  });
}

// Key constants
export const KEYS = {
  BOOKINGS: 'bookings',
  CAREERS: 'career_applications',
  CONTACTS: 'contact_messages',
};
