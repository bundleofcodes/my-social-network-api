const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts GET all and POST thought
router.route('/').get(getThought).post(createThought);


// /api/thoughts/:thoughtID GET one thought, PUT and DELETE by ID
router.route('/:thoughtID')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

// /api/thought/:thoughtID/reactions POST new reactions
router.route('/:thoughtID/reactions')
.post(createReaction);

// /api/thoughts/:thoughtID/reactions/:reactionId DELETE reaction by ID
router.route('/:thoughtID/reactions/:reactionID')
.delete(deleteReaction);

module.exports = router;