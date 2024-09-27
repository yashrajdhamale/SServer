import mongoose from "mongoose";

const MenteeRequestSchema = new mongoose.Schema({
    menteeEmail: {
        type: String,
        required: true
    },
    mentorEmail: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const MenteeRequest = mongoose.model("MenteeRequest", MenteeRequestSchema);

export default MenteeRequest;
