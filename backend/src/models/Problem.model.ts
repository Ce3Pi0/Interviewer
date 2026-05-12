import mongoose, { InferSchemaType } from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    category: {
      type: String,
      default: "Programming Problems",
    },
    description: {
      text: {
        type: String,
        required: true,
      },
      notes: [
        {
          type: String,
        },
      ],
    },
    examples: [
      {
        input: {
          type: String,
          required: true,
        },
        output: {
          type: String,
          required: true,
        },
        explanation: {
          type: String,
        },
      },
    ],
    constraints: [
      {
        type: String,
        required: true,
      },
    ],
    starterCode: {
      javascript: {
        type: String,
        required: true,
      },
      python: {
        type: String,
        required: true,
      },
      java: {
        type: String,
        required: true,
      },
    },
    expectedOutput: {
      javascript: {
        type: String,
        required: true,
      },
      python: {
        type: String,
        required: true,
      },
      java: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true },
);

export const Problem = mongoose.model("Problem", problemSchema);

export type IProblemDocument = InferSchemaType<typeof problemSchema>;
