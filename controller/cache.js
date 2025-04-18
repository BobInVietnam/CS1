const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 200 });

function get(key) {
    return cache.get(key);
}

function set(key, value) {
    cache.set(key, value);
}

module.exports = {
    get,
    set,
};