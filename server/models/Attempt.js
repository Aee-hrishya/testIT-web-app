const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  attempted: { type: Boolean, required: true },
});

module.exports = new mongoose.model("Attempt", attemptSchema);
