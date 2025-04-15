const { findId, queryUrl, insert } = require('./persistence/model');
const cache = require('./persistence/cache');

function makeID(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

async function findOrigin(id) {
    let url = cache.get(id);
    if (url) {
        console.log(`Cache hit for ID: ${id}`);
        return url;
    }

    url = await findId(id);
    if (url) {
        cache.set(id, url);
    }
    return url;
}

async function getId(url) {
    let id = cache.get(url);
    if (id) {
        console.log(`Cache hit for URL: ${url}`);
        return id;
    }


    id = await queryUrl(url);
    if (id) {
        cache.set(url, id);
    }
    return id;
}

async function create(id, url) {
    const result = await insert(id, url);
    if (result) {
        cache.set(id, url);
        cache.set(url, id);
    }
    return result;
}

async function shortUrl(url) {
    let id = await getId(url);
    if (id != null) {
        return id;
    }

    while (true) {
        let newID = makeID(5);
        let originUrl = await findOrigin(newID);
        if (originUrl == null) {
            const res = await create(newID, url);
            if (res && res != Error) {
                return newID;
            } else {
                console.log(res);
                return null;
            }
        }
    }
}

module.exports = {
    findOrigin,
    shortUrl,
};