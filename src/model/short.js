const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/short-url', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }); // to avoid some deprecation warning
const shortSchema = new mongoose.Schema({
    originUrl: { 
        type: String,
        required: true,
        maxLength: 2048,
        unique: true
    },
    shortUrl: {
        type: String,
        required: true,
        maxLength: 11
    },
    prefix: {
        type: String,
        required: true,
        maxLength: 11
    },
    createdAt: { 
        type: Date, 
        expires: 60 * 60 * 24,
        default: Date.now 
    },
});
const ShortModel = mongoose.model('short', shortSchema);
module.exports = ShortModel;
