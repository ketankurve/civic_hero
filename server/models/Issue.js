import mongoose from 'mongoose';

const issueSchema = mongoose.Schema({
    title: { type: String, required: true }, // e.g. "Broken Streetlight"
    description: { type: String, required: true }, // e.g. "Corner of 5th and Main"
    selectedFile: String, // We will convert image to string later
    creator: String, // The name of the person reporting
    tags: [String], // e.g. ["urgent", "pothole"]
    location: { type: String, default: "Unknown Location" },
    status: {
        type: String,
        default: 'Open', // Can be 'Open', 'In Progress', 'Fixed'
    },
    upvotes: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date,
    },
});

const Issue = mongoose.model('Issue', issueSchema);

export default Issue;