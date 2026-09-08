import { Schema, model } from "mongoose";

const chatLogSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    role: {
      type: String,
      enum: ["user", "assistant", "system"],
      required: true,
    },

    message: {
      type: String,
      required: true,
      maxlength: 10000,
    },

    source: {
      type: String,
      enum: ["website", "dashboard", "admin"],
      default: "website",
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

chatLogSchema.index({
  sessionId: 1,
  createdAt: 1,
});

export const ChatLog = model(
  "ChatLog",
  chatLogSchema,
);