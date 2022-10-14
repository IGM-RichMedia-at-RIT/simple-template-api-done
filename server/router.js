/* Here we are importing our entire controllers folder. Keep in mind
  that when we import an entire folder, we are actually importing the
  index.js file from that folder. The index.js file acts as a sort of
  "interface" for the folder. Future demos will explore this in depth.
*/
const controllers = require('./controllers');

/* The router function sets up our various routes within our express
  app (created in app.js).
*/
const router = (app) => {
  app.get('/results', controllers.results);
  app.get('/getData', controllers.getData);
  app.get('/', controllers.index);

  app.get('/*', controllers.notFound);
};

module.exports = router;
