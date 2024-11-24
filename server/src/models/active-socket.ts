import { redisClient } from "@/caching";
import { Collections } from ".";
import { User } from "./user";
import mongoose, { Document, Model, ObjectId, Types } from "mongoose";
import { activeSocketKey } from "@/caching/keys";
import { logger } from "@/utils/logger";
const { Schema } = mongoose;

export interface IActiveSocket extends Document {
  userId: Types.ObjectId;
  socketId: string;
  createdAt: Date;
  id: Types.ObjectId;
  createOrUpdate(): void;
}

interface IActiveSocketModel extends Model<IActiveSocket> {
  getSocketIdByUser(userId: string | ObjectId): Promise<string>;
  deleteByUser(userId: string | ObjectId): Promise<boolean>;
}

const activeSocketSchema = new Schema<IActiveSocket>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
      unique: true,
    },
    socketId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: {},
  }
);

activeSocketSchema.virtual("id").get(function () {
  return this._id;
});

activeSocketSchema.statics.getSocketIdByUser = async function (userId: string) {
  const socketId = await redisClient.get(activeSocketKey(userId));

  if (socketId) {
    logger.info(`${activeSocketKey(userId)} : hit`);
    return Promise.resolve(socketId);
  }
  logger.info(`${activeSocketKey(userId)} : miss`);

  return ActiveSocket.findOne({
    userId: userId,
  }).then((activeSocket) => {
    if (activeSocket) return activeSocket.socketId;
  });
};

activeSocketSchema.statics.deleteByUser = async function (userId: string) {
  return await Promise.all([
    redisClient.del(activeSocketKey(userId)),
    ActiveSocket.deleteMany({
      userId,
    }),
  ])
    .then(() => true)
    .catch(() => false);
};

activeSocketSchema.methods.createOrUpdate = async function () {
  try {
    await Promise.all([
      this.save(),
      redisClient.set(activeSocketKey(this.userId), this.socketId),
    ]);
  } catch (error) {
    await Promise.all([
      await ActiveSocket.updateOne(
        { userId: this.userId },
        {
          $set: {
            socketId: this.socketId,
          },
        }
      ),
      await redisClient.set(activeSocketKey(this.userId), this.socketId),
    ]);
  }
};

const ActiveSocket = mongoose.model<IActiveSocket, IActiveSocketModel>(
  Collections.ActiveSockets,
  activeSocketSchema
);

export { ActiveSocket };
