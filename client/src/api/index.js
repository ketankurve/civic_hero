import axios from 'axios';

// The URL of Backend Restaurant
const url = 'http://localhost:5000/issues';

// 1. Function to GET data (The waiter asking for the menu)
export const fetchIssues = () => axios.get(url);

// 2. Function to POST data (Ordering a new meal)
// 'newIssue' is the JSON package we are sending
export const createIssue = (newIssue) => axios.post(url, newIssue);
export const upvoteIssue = (id) => axios.patch(`${url}/${id}/upvote`);