const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    test_name: {
      type: String,
      required: true,
      minlength: [4, "Test name is too short"],
      maxlength: [15, "Test name is very long"],
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    attempted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attempt" }],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Test", testSchema);
