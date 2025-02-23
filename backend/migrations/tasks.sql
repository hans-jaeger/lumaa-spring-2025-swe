-- Execute the following to create the proper table for tasks
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  isComplete BOOLEAN DEFAULT FALSE,
  userId INTEGER REFERENCES users(id) ON DELETE CASCADE
);
