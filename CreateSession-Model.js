import mongoose from "mongoose";

const CreateSessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    timeFrom: {
        type: String,
        required: true
    },
    timeTo: {
        type: String,
        required: true
    },
    
    price: {
        type: Number,
        required: true
    },
    mentorID: {
        type: String,
        // required: true
    },
    type: {
        type: String,
        required: true
    },
    menteesID: {
        type: [String],
        // required: true
    }

}); 

const CreatedSession = mongoose.model("CreatedSession", CreateSessionSchema);

export default CreatedSession;