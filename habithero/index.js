const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

let habits = [
  {
    name: "Drink Water",
    icon: "💧",
    goal: 12, // e.g., 12 hours a day
    checkins: Array(12).fill(false), // Sunday–Saturday
  }
];

// Get all habits
app.get('/api/habits', (req, res) => {
  res.json(habits);
});

// Update check-in for a specific day
app.post('/api/checkin', (req, res) => {
  const { habitIndex, dayIndex } = req.body;
  if (
    habits[habitIndex] &&
    Number.isInteger(dayIndex) &&
    dayIndex >= 0 &&
    dayIndex < 7
  ) {
    habits[habitIndex].checkins[dayIndex] = true;
    return res.sendStatus(200);
  }
  res.status(400).send("Invalid habit or day index");
});

// Add a new habit
app.post('/api/habit', (req, res) => {
  const { name, icon = "🌟", goal = 7 } = req.body;
  if (!name) return res.status(400).send("Name is required");

  const newHabit = {
    name,
    icon,
    goal,
    checkins: Array(12).fill(false),
  };
  habits.push(newHabit);
  res.status(201).json(newHabit);
});

// (Optional) Reset check-ins weekly
app.post('/api/reset', (req, res) => {
  habits.forEach(h => h.checkins = Array(7).fill(false));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`HabitHero running at http://13.59.35.92:${PORT}`);
});

