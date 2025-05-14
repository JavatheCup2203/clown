const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

let habits = [
  {
    name: "Drink Water",
    checkins: Array(7).fill(false) // 7 days, default: unchecked
  }
];

// Get all habits
app.get('/api/habits', (req, res) => {
  res.json(habits);
});

// Update check-in
app.post('/api/checkin', (req, res) => {
  const { habitIndex, dayIndex } = req.body;
  if (habits[habitIndex]) {
    habits[habitIndex].checkins[dayIndex] = true;
  }
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`HabitHero running at http://18.189.21.73:${PORT}`);
});

