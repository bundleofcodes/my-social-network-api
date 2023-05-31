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
router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

// /api/thought/:thoughtID/reactions POST new reactions
router.route('/:thoughtId/reactions').post(createReaction);
// .post(createReaction);

// /api/thoughts/:thoughtID/reactions/:reactionId DELETE reaction by ID
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
// .delete(deleteReaction);

module.exports = router;