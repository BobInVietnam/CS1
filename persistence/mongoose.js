const mongoose = require('mongoose');

(async () => {
    await mongoose.connect('mongodb://mongodb:27017');
    if (mongoose.connection.readyState === 1) {
        console.log('✅ Connected to MongoDB');
    }
})();

const urlSchema = new mongoose.Schema({
    _id: String,
    url: String
});

const ShortUrl = mongoose.model('ShortUrl', urlSchema)

async function insert(id, url) {
    try {
        const record = new ShortUrl({_id: id, url: url})
        record.save()
        return record ? record._id : null
    } catch (err) {
        console.error(err)
        throw err
    }
}

async function findUrl(id) {
    try {
        const record = await ShortUrl.findById(id)
        return record ? record.url : null
    } catch (err) {
        console.error(err)
        throw err
    }
}

async function findId(url) {
    try {
        const record = await ShortUrl.findOne({url: url})
        return record ? record._id : null
    } catch (err) {
        console.error(err)
        throw err
    }
}

module.exports = {
    insert,
    findUrl,
    findId
}