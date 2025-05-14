async function loadHabits() {
  const res = await fetch('/api/habits');
  const habits = await res.json();

  const container = document.getElementById('habitList');
  container.innerHTML = '';

  habits.forEach((habit, habitIndex) => {
    const habitDiv = document.createElement('div');
    habitDiv.innerHTML = `<h3>${habit.name}</h3>`;

    habit.checkins.forEach((checked, dayIndex) => {
      const btn = document.createElement('button');
      btn.textContent = checked ? '✅' : '❌';
      btn.disabled = checked;
      btn.onclick = async () => {
        await fetch('/api/checkin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ habitIndex, dayIndex })
        });
        loadHabits();
      };
      habitDiv.appendChild(btn);
    });

    container.appendChild(habitDiv);
  });
}

loadHabits();

