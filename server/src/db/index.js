import mongoose from "mongoose";

export let DBConnection = undefined;

const connectToDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.X_MONGODB_URL
    );
    DBConnection = connectionInstance.connection;
    console.info(`Connected to ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
};

export default connectToDB;
