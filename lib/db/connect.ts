import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
  isConnected: boolean;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
  isConnected: false,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI;

  // If no MongoDB URI is configured (e.g. quick preview on Render), immediately use memory store with zero latency
  if (!uri) {
    return null;
  }

  if (cached.conn && cached.isConnected) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 3000,
    };

    cached.promise = mongoose
      .connect(uri, opts)
      .then((m) => {
        cached.isConnected = true;
        return m;
      })
      .catch((err) => {
        console.warn(
          "MongoDB connection deferred/unavailable, utilizing robust in-memory persistence layer:",
          err.message
        );
        cached.isConnected = false;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch {
    cached.isConnected = false;
    return null;
  }
}
