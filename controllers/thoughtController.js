const { User, Thought } = require('../models'); //check path//

module.exports = {
    // Get all thoughts
    getThought(req, res) {
      Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought found with this ID!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
   // Create a thought
   createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
      User.findOneAndUpdate({ _id: req.body.userId },{$push:{thoughts:thought._id}})
      .then(() => {
        res.json({message: "User added thought!"})
      })
    }
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought found with this ID!' })
          : User.deleteMany({ _id: { $in: thought.User } })
      )
      .then(() => res.json({ message: 'Thought and User deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
     .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought found with this ID!' })
          : res.json(thought)
      ) 
      .catch((err) => res.status(500).json(err));
  },
  // Create a reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        {runValidators: true, new: true }
    )
    .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought found with this id!' })
          : res.json(thought)
      ) 
      .catch((err) => res.status(500).json(err));
  },
  // Delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: {reactionId:req.params.reactionId} } },
        {runValidators: true, new: true }
    )
    .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought found with this id!' })
          : res.json(thought)
      ) 
      .catch((err) => res.status(500).json(err));
  },
};
