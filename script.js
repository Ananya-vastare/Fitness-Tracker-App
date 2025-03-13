const workouts = [];
document.getElementById("workoutForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const exercise = document.getElementById("exercise").value;
    const duration = document.getElementById("duration").value;
    const calories = document.getElementById("calories").value;

    if (exercise && duration && calories) {
        workouts.push({ exercise, duration: parseInt(duration), calories: parseInt(calories) });
        updateWorkoutList();
        updateChart();
        document.getElementById("workoutForm").reset();
    }
});

function updateWorkoutList() {
    const workoutList = document.getElementById("workoutList");
    workoutList.innerHTML = "";
    workouts.forEach((workout, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${workout.exercise} - ${workout.duration} mins - ${workout.calories} cal <button onclick="removeWorkout(${index})" style="background:#ff3b60;color:white;border:none;padding:5px 10px;border-radius:5px;cursor:pointer;">✖</button>`;
        workoutList.appendChild(li);
    });
}

function removeWorkout(index) {
    workouts.splice(index, 1);
    updateWorkoutList();
    updateChart();
}

let chart;
function updateChart() {
    const ctx = document.getElementById("workoutChart").getContext("2d");
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: workouts.map(w => w.exercise),
            datasets: [{
                label: 'Calories Burned',
                data: workouts.map(w => w.calories),
                backgroundColor: '#ff5c7a',
                borderColor: '#ff3b60',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}