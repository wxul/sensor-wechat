const apiRouter = require('./api');

module.exports = function(app) {
    app.use('/api2', apiRouter);
};
