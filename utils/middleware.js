const rateLimit = require('express-rate-limit');

const MAX_REQUESTS = 30

const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: MAX_REQUESTS,
  message: { error: 'Too many requests, please try again later.' },
})

const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;
  
  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
  
  // Record start time to calculate response time
  req.startTime = Date.now();
  
  // Listen for response finish event to log the response time
  res.on('finish', () => {
      const responseTime = Date.now() - req.startTime;
      console.log(`[${timestamp}] ${method} ${url} - ${res.statusCode} - ${responseTime}ms`);
  });
  
  next();
};

module.exports = {
  requestLogger,
  rateLimiter
}