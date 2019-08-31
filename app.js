const express = require('express');
const mysql = require('mysql');
const app = express();

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

// Connect
db.connect((err) => {
    if (err) throw err;
    console.log('Connected.');
});

// Select posts
app.get('/posts', (req, res) => {
    db.query("SELECT * FROM posts", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.end(JSON.stringify(result, null, 3)); // JSON.stringify(result, replacer, space);
    });
});

// Select single post
app.get('/posts/:id', (req, res) => {
    db.query("SELECT * FROM posts WHERE id = ?", [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.end(JSON.stringify(result, null, 3));
    });
});

// Insert post
app.post('/addpost', (req, res) => {
    db.query("INSERT INTO posts SET title = ?, body = ?", ["Post one", "This is post number one"], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send("Post added.");
    });
});

// Update post
app.put('/updatepost/:id', (req, res) => {
    let newTitle = "Updated title";
    db.query("UPDATE posts SET title = ? WHERE id = ?", [newTitle, req.params.id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send("Post updated.");
    });
});

// Delete post
app.delete('/deletepost/:id', (req, res) => {
    db.query("DELETE FROM posts WHERE id = ?", [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send("Post deleted.");
    });
});

app.listen('3000', () => {
    console.log('Listening on port 3000');
});