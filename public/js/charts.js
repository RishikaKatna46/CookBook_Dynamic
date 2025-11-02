async function loadChart() {
  const res = await fetch("/api/stats");
  const data = await res.json();

  const ctx = document.getElementById("recipeChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Total Recipes", "Average Rating"],
      datasets: [{
        label: "CookBook Insights",
        data: [data.totalRecipes, data.avgRating],
        backgroundColor: ["#3e95cd", "#f39c12"], // same colors as static project
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `🍳 Top Category: ${data.topCategory}`,
          font: { size: 18, weight: "bold" },
          color: "#2c3e50"
        },
        legend: {
          display: true,
          labels: { color: "#34495e", font: { size: 14 } }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: "#2c3e50" }
        },
        x: {
          ticks: { color: "#2c3e50" }
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", loadChart);
