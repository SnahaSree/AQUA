import { Schema, model } from "mongoose";

const contactRequestSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    organization: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    phone: {
      type: String,
      trim: true,
      maxlength: 30,
    },

    requestType: {
      type: String,
      enum: [
        "briefing",
        "partnership",
        "deployment",
        "general",
      ],
      default: "general",
      index: true,
    },

    message: {
      type: String,
      required: true,
      maxlength: 5000,
    },

    status: {
      type: String,
      enum: [
        "new",
        "in-progress",
        "resolved",
        "archived",
      ],
      default: "new",
      index: true,
    },

    source: {
      type: String,
      enum: ["website", "chatbot", "admin"],
      default: "website",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactRequest = model(
  "ContactRequest",
  contactRequestSchema,
);