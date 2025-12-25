import express from 'express';
import { getIssues, createIssue, upvoteIssue } from '../controllers/issues.js';

const router = express.Router();

// When a user visits "localhost:5000/issues"...
router.get('/', getIssues);   // GET request -> Fetch all issues
router.post('/', createIssue); // POST request -> Create a new issue
router.patch('/:id/upvote', upvoteIssue); // PATCH request -> Upvote an issue

export default router;