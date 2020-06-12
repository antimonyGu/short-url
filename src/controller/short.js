// Usually you should not control the database directly in the controller but it is only a demo for interview. That's the reason I do so.
const ShortModel = require('../model/short');
const { murmurHash64 } = require('murmurhash-native');
const { hashSeed } = require('../../config/config');
const base62 = require("base62/lib/ascii");

class Short {
    async resolveShortUrl(ctx, next) {
        const foo = await ShortModel.findOne({ shortUrl: ctx.params.hash });
        if (foo === null) {
            return ctx.body = 'invalid short url'; // it's a little bit ugly but I don't have enough time to design a beautiful 404 page
        }
        ctx.redirect(foo.originUrl.replace(/\[DUPLICATED\]/g, ''));
    }

    async generate(ctx, next) {
        const hashResult64 = murmurHash64(ctx.request.body.originUrl, hashSeed, 'hex');
        const query = { originUrl: ctx.request.body.originUrl,  shortUrl: base62.encode(parseInt(hashResult64, 16)), prefix: 'www.testPrefix.com' };
        const shortUrlConflict = await ShortModel.findOne(query);
        if (shortUrlConflict !== null) { // find the origin url has generated short url
            return ctx.body = hashResult64;
        }
        try {
            const shortDocument = await new ShortModel(query).save();
            ctx.body = shortDocument.shortUrl;
        } catch(e) {
            // different origin url hash conflict
            ctx.request.body.originUrl += '[DUPLICATED]';
            Short.prototype.generate(ctx);
        }
    }


    async test(ctx, next) {
        ctx.body = 'for testing';
    }
}
module.exports = Short;