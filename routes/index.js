const router = require('express').Router();
// Import all of the API routes from /api/index.js
const apiRoutes = require('./api'); //check path//
// add prefix of `api` to all of the api routes imported from the `api` directory
router.use('/api', apiRoutes);

router.use((req, res) => res.send(This is the wrong route!));

module.exports = router;