const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');


const MONGODB_URI = 'mongodb://auction:auction2020@ds253368.mlab.com:53368/auction_xactly'

/**
 * Create Express server.
 */
const app = express();


mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});


/**
 * Express configuration
 */
app.set('port', process.env.PORT ||  8080);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Entity Routes
 */
const entityRoutes = require('./entity/routes');
app.use('/entity',entityRoutes);

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
    console.log(' App is running at http://localhost:%d in %s mode', app.get('port'));
    console.log('  Press CTRL-C to stop\n');
  });
