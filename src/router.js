const shortController = require('./controller/short');
const shortControllerInstance = new shortController();
module.exports = app => {
    const { router, controller } = app;
    router.get('/resolveShortUrl/:hash', shortControllerInstance.resolveShortUrl);
    router.get('/test', shortControllerInstance.test);
    router.post('/generate', shortControllerInstance.generate);
};