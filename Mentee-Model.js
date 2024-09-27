import mongoose from 'mongoose';

const Mentee = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    
    educationStatus: {
        type: String,
        // required: true
    },
    interests: {
        type: Array,
        // required: true
    },
    goals: {
        type: Array,
        // required: true
    },
});

const MenteeUser = mongoose.model('MenteeUser', Mentee);

// ES Module export
export default MenteeUser;
