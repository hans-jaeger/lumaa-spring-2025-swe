/**
 * This file handles task CRUD operations. These routes will be procted by the JWT middleware
 * 
 */

const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middlewares/authMiddleware');

/* GET /tasks | Retrieve tasks for the authenticated user */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tasks = await pool.query('SELECT * FROM tasks WHERE userId = $1', [req.user.id]);
    res.json(tasks.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

/* POST /tasks | Create a new task */
router.post('/', authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = await pool.query(
      'INSERT INTO tasks (title, description, isComplete, userId) VALUES ($1, $2, false, $3) RETURNING *',
      [title, description, req.user.id]
    );
    res.status(201).json(newTask.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

/* PUT /tasks/:id | Update an existing task */
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, isComplete } = req.body;
  try {
    // Ensure the task belongs to the authenticated user
    const taskResult = await pool.query('SELECT * FROM tasks WHERE id = $1 AND userId = $2', [id, req.user.id]);
    if (taskResult.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    const updatedTask = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, iscomplete = $3 WHERE id = $4 RETURNING id, title, description, iscomplete AS "isComplete", userId',
      [title, description, isComplete, id]
    );
    res.json(updatedTask.rows[0]);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

/* DELETE /tasks/:id | Delete a task */
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    // Check task ownership
    const taskResult = await pool.query('SELECT * FROM tasks WHERE id = $1 AND userId = $2', [id, req.user.id]);
    if (taskResult.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
