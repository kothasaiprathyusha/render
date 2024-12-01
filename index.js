const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());  // Enable CORS for all domains

app.use(express.json());  // Middleware to parse incoming JSON requests

let posts = [
  { id: 1, title: 'Introduction to Blogging', content: 'Blogging is an amazing way to share your thoughts and ideas with the world...' },
  { id: 2, title: 'Top 5 Tips for Writing Better Blogs', content: 'Learn how to write captivating and engaging blog posts...' },
  { id: 3, title: 'How to Monetize Your Blog', content: 'Discover ways to earn money by turning your blog into a business...' }
];

// GET /api/posts - Fetch all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);  // Send the posts as JSON response
});

// Start the server
app.listen(port, () => {
  console.log('Server is running on port ');
});