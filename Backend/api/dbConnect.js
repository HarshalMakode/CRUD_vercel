// Backend/api/dbConnect.js
import mongoose from 'mongoose';

const dbConnect = async () => {
    if (mongoose.connections[0].readyState) {
        return; // Use existing connection if already connected
    }

    try {
        await mongoose.connect("mongodb+srv://harshalmakode26:K6woOov6pvvf831o@cruddb.mlexk.mongodb.net/?retryWrites=true&w=majority&appName=crudDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("MongoDB connection error");
    }
};

export default dbConnect;
