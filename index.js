const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Allow cross-origin requests (useful when frontend and backend are on different ports)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());


// In-memory posts storage (for testing purposes)
let posts = [
    { id: 1, title: "First Post", content: "This is the first post!" },
];
//

// GET /api/posts - Fetch all posts
app.get('/api/posts', (req, res) => {
    res.json(posts); // Send back the list of posts
});

// GET /api/posts/:id - Fetch a single post by ID
app.get('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id); // Get post ID from URL params
    const post = posts.find(p => p.id === postId); // Find the post by ID
    if (post) {
        res.json(post); // Return the post if found
    } else {
        res.status(404).json({ message: 'Post not found' }); // Return error if post not found
    }
});

// POST /api/posts - Create a new post
app.post('/api/posts', (req, res) => {
    const { title, content } = req.body; // Get title and content from the request body
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' }); // Validate input
    }

    const newPost = {
        id: posts.length + 1, // Assign a new ID based on the length of the posts array
        title,
        content
    };

    posts.push(newPost); // Add the new post to the posts array
    res.status(201).json(newPost); // Return the newly created post with a 201 status code
});

// PUT /api/posts/:id - Update an existing post by ID
app.put('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id); // Get post ID from URL params
    const { title, content } = req.body; // Get title and content from the request body

    const postIndex = posts.findIndex(p => p.id === postId); // Find the post by ID

    if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found' }); // Return error if post not found
    }

    const updatedPost = {
        id: postId, // Keep the original ID
        title: title || posts[postIndex].title, // Update title if provided, else keep original
        content: content || posts[postIndex].content // Update content if provided, else keep original
    };

    posts[postIndex] = updatedPost; // Update the post in the array
    res.json(updatedPost); // Return the updated post
});
// DELETE /api/posts/:id - Delete a post by ID
app.delete('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id); // Get post ID from URL params
    const postIndex = posts.findIndex(p => p.id === postId); // Find the post by ID

    if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found' }); // Return error if post not found
    }

    posts.splice(postIndex, 1); // Remove the post from the array
    res.status(204).send(); // Return 204 No Content status for successful deletion
});

// Start the server
app.listen(5000,() => {
    console.log('Server is running on port 5000');
});