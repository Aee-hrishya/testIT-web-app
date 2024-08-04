const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    question_name: {
      type: String,
      required: true,
      minlength: [4, "Question name is too short"],
      maxlength: [30, "Question name is too long"],
    },
    options: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.length === 4;
        },
      },
      message: (props) => `${props.value} does not have exactly 4 options!`,
      required: true,
    },
    correct_answer: { type: String, required: true },
    attempted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attempt" }],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = new mongoose.model("Question", questionSchema);
