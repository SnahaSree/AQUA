import { Schema, model } from "mongoose";

const caseStudySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    summary: {
      type: String,
      required: true,
      maxlength: 1000,
    },

    challenge: {
      type: String,
      required: true,
      maxlength: 3000,
    },

    solution: {
      type: String,
      required: true,
      maxlength: 3000,
    },

    impact: {
      type: String,
      required: true,
      maxlength: 3000,
    },

    metrics: [
      {
        label: {
          type: String,
          required: true,
        },

        value: {
          type: String,
          required: true,
        },
      },
    ],

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    imageUrl: {
      type: String,
      default: null,
    },

    published: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const CaseStudy = model(
  "CaseStudy",
  caseStudySchema,
);