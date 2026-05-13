import { Types } from "mongoose";
import { HttpError } from "../config/httpError.config.js";
import { chatClient, streamClient } from "../config/stream.config.js";
import {
  HTTP_BAD_REQUEST,
  HTTP_CONFLICT,
  HTTP_FORBIDDEN,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_NOT_ALLOWED,
  HTTP_NOT_FOUND,
} from "../lib/httpError.js";
import { Session } from "../models/Session.model.js";
import { CreateSessionSchemaType } from "../validators/session.validator.js";
import { ACTIVE_SESSION_POPULATE } from "../config/sessionPopulate.config.js";
import { User } from "../models/User.model.js";

export const createSessionService = async (
  userId: string,
  clerkId: string,
  body: CreateSessionSchemaType,
) => {
  const user = await User.findById({ id: userId });
  if (user?.type !== "interviewer")
    throw new HttpError(
      "Only interviewers can create sessions",
      HTTP_NOT_ALLOWED.code,
    );

  const { problem, difficulty } = body;

  const uuid = crypto.randomUUID();
  const callId = `session_${Date.now()}_${uuid}`;

  const session = await Session.create({
    problem,
    difficulty,
    host: userId,
    callId,
  });

  try {
    await streamClient()
      .video.call("default", callId)
      .getOrCreate({
        data: {
          created_by_id: clerkId,
          custom: {
            problem,
            difficulty,
            sessionId: session._id.toString(),
          },
        },
      });

    const channel = chatClient().channel("messaging", callId, {
      team: `${problem} Session`,
      created_by_id: clerkId,
      members: [clerkId],
    });

    await channel.create();

    return session;
  } catch (err: unknown) {
    console.error(err);

    await Session.findByIdAndDelete(session._id);

    throw new HttpError(
      HTTP_INTERNAL_SERVER_ERROR.message,
      HTTP_INTERNAL_SERVER_ERROR.code,
    );
  }
};

export const getCountSessionsService = async () => {
  return await Session.countDocuments({}).exec();
};

export const getActiveSessionsService = async (numOfSessions = 20) => {
  return await Session.find({ status: "active" })
    .populate(ACTIVE_SESSION_POPULATE)
    .sort({ createdAt: -1 })
    .limit(numOfSessions);
};

export const getMyRecentSessionsService = async (userId: string) => {
  return await Session.find({
    status: "completed",
    $or: [{ host: userId }, { participant: userId }],
  });
};

export const getSessionByIdService = async (id: string) => {
  const session = await Session.findById(id).populate(ACTIVE_SESSION_POPULATE);

  if (!session) throw new HttpError("Session not found", HTTP_NOT_FOUND.code);

  return session;
};

export const joinSessionService = async (
  id: string,
  userId: Types.ObjectId,
  clerkId: string,
) => {
  const session = await Session.findById(id);

  if (!session) throw new HttpError("Session not found", HTTP_NOT_FOUND.code);

  if (session.status !== "active")
    throw new HttpError("Session is not active", HTTP_BAD_REQUEST.code);

  if (session.participant)
    throw new HttpError("Session is full", HTTP_CONFLICT.code);

  if (session.host.equals(userId))
    throw new HttpError("You are already the host", HTTP_NOT_ALLOWED.code);

  session.participant = userId;
  await session.save();

  try {
    const channel = chatClient().channel("messaging", session.callId);
    await channel.addMembers([clerkId]);

    return session;
  } catch (err: unknown) {
    console.error(err);

    session.participant = null;
    await session.save();

    throw new HttpError(
      "Error adding member to the chat client",
      HTTP_INTERNAL_SERVER_ERROR.code,
    );
  }
};

export const endSessionService = async (
  id: string,
  userId: Types.ObjectId,
  clerkId: string,
) => {
  const session = await Session.findById(id);

  if (!session) throw new HttpError("Session not found", HTTP_NOT_FOUND.code);

  if (!session.host.equals(userId))
    throw new HttpError("You are not the host", HTTP_FORBIDDEN.code);
  if (session.status === "completed")
    throw new HttpError("Session already completed", HTTP_BAD_REQUEST.code);

  const call = streamClient().video.call("default", session.callId);
  await call.delete({ hard: true });

  const channel = chatClient().channel("messaging", session.callId);
  await channel.delete();

  session.status = "completed";
  await session.save();

  return session;
};
