const { findId, queryUrl, insert } = require('./persistence/model');

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

function findOrigin(id) {
    return findId(id);
}

function getId(url) {
    return queryUrl(url)
}

function create(id, url) {
    return insert(id, url);
}

async function shortUrl(url) {
    // const id = await getId(url)
    // if (id != null) {
    //     return id;
    // }
    while (true) {
        let newID = makeID(5);
        let originUrl = await findOrigin(newID);
        if (originUrl == null) {
            const res = await create(newID, url)
            if (res && res != Error) {
                return newID;
            } else {
                console.log(res)
                return null;
            }
        }
    }
}
module.exports = {
    findOrigin,
    shortUrl
}