const express = require('express');
const app = express();
const port = 3000;

let tasks = [];

app.use(express.json());
app.use(express.static('public'));

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const newTask = req.body;
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedText = req.body.text;

    tasks = tasks.map(task => 
        task.id === taskId ? {...task, text: updatedText, completed: req.body.completed} : task
    );

    res.json(tasks.find(task => task.id === taskId));
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
