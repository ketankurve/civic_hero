import mongoose from 'mongoose';
import Issue from '../models/Issue.js';

// 1. Get all Issues (The "Read" in CRUD)
export const getIssues = async (req, res) => {
    try {
        // "Find" takes time, so we use await
        const issues = await Issue.find(); 
        
        // Return the list of issues with status 200 (OK)
        res.status(200).json(issues);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// 2. Create a new Issue (The "Create" in CRUD)
export const createIssue = async (req, res) => {
    const issue = req.body; // The data sent from the Frontend form

    const newIssue = new Issue(issue);

    try {
        await newIssue.save(); // Save to MongoDB
        res.status(201).json(newIssue); // 201 means "Created Successfully"
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// 3. The Upvote Logic
export const upvoteIssue = async (req, res) => {
    const { id } = req.params; // Get the ID from the URL (e.g., /issues/123/upvote)

    // Check if the ID is valid (prevent crashing if ID is fake)
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No issue with that id');

    // 1. Find the issue
    const issue = await Issue.findById(id);

    // 2. Add +1 to the upvotes
    const updatedIssue = await Issue.findByIdAndUpdate(id, { upvotes: issue.upvotes + 1 }, { new: true });

    // 3. Send back the updated issue
    res.json(updatedIssue);
}