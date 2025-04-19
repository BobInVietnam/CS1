const { createClient } = require('redis');
const redisClient = createClient({ url: 'redis://redis:6379' }); // 'redis' is the container name

redisClient.on('error', err => console.error('❌ Redis error:', err));

(async () => {
  await redisClient.connect();
  console.log('✅ Connected to Redis');
})();

async function get(id) {
  return await redisClient.get(id);
}

async function set(id, value) {
  await redisClient.set(id, value, { EX: 3600});
}

module.exports = {
  get,
  set
}