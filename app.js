const ctx = document.getElementById("myChart").getContext("2d");
const btn1 = document.querySelector(".line");
const btn2 = document.querySelector(".bar");
const btn3 = document.querySelector(".pie");
const btn4 = document.querySelector(".doughnut");
const databtn = document.querySelector(".data");
const hslbtn = document.querySelector("#hsl");
const monthbtn = document.querySelector(".month");
const weekbtn = document.querySelector(".week");
const daybtn = document.querySelector(".day");

let delayed;

const colorPalette = [
  "#374151",
  "#1d4ed8",
  "#ef4444",
  "#f97316",
  "#06b6d4",
  "#8b5cf6",
  "#3b82f6",
  "#22c55e",
  "#a8a29e",
  "#4338ca",
  "#be185d",
];
const dayLabel = [];

const weekLabel = [
  "Week1",
  "Week2",
  "Week3",
  "Week4",
  "Week5",
  "Week6",
  "Week7",
  "Week8",
];

const monthLabel = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const data = {
  datasets: [
    {
      data: [55, 94, 84, 10, 262, 1, 295, 48, 75],
      label: "Sales",
      backgroundColor: colorPalette,
      borderColor: [randomColor()],
      tension: 0.3,
      fill: false,
    },
  ],
  labels: monthLabel,
};

const config = {
  type: "line",
  data: data,
  options: {
    plugins: {
      title: {
        display: false,
        text: "TOP",
        fontsize: 24,
      },
    },
    responsive: true,
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
        ticks: {
          display: true,
        },
      },
      y: {
        grid: {
          display: true,
        },
        ticks: {
          callback: function (value) {
            return "$" + value;
          },
          display: true,
        },
      },
    },
  },
};
const myChart = new Chart(ctx, config);

window.addEventListener("load", days);
btn1.addEventListener("click", changeToLine);
btn2.addEventListener("click", changeToBar);
btn3.addEventListener("click", changeToPie);
btn4.addEventListener("click", changeToDoughnut);
monthbtn.addEventListener("click", changeLabelToMonth);
weekbtn.addEventListener("click", changeLabelToWeek);
daybtn.addEventListener("click", changeLabelToDay);

function randomColor() {
  let string = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  let color = [];

  for (let i = 0; i < 6; i++) {
    let number = Math.floor(Math.random() * 16);
    color.push(string[number]);
  }

  let final = color.join("");
  return `#${final}`;
}

function changeToLine() {
  config.type = "line";
  let number = monthLabel.length;
  for (let i = 0; i < 1; i++) {
    data.datasets[0].backgroundColor.push(color());
    // data.datasets[0].borderColor.push(randomColor());
  }
  data.datasets[0].borderColor = color();
  config.options.scales.x.grid.display = true;
  config.options.scales.y.grid.display = true;
  config.options.scales.x.ticks.display = true;
  config.options.scales.y.ticks.display = true;
  config.data.datasets[0].radius = 5;
  config.data.datasets[0].hitRadius = 40;
  config.data.datasets[0].hoverRadius = 12;
  config.data.datasets[0].pointBackgroundColor = "rgba(199,33,104,1)";
  config.options.scales.x.grid.borderColor = "#D9D9D9";
  config.options.scales.y.grid.borderColor = "#D9D9D9";
  myChart.update();
}

function changeToBar() {
  config.type = "bar";
  let number = monthLabel.length;
  for (let i = 0; i < number; i++) {
    data.datasets[0].backgroundColor.push(color());
    // data.datasets[0].borderColor.push(randomColor());
  }
  data.datasets[0].borderColor = color();
  config.options.scales.x.grid.display = false;
  config.options.scales.y.grid.display = true;
  config.options.scales.x.ticks.display = true;
  config.options.scales.y.ticks.display = true;
  delete config.data.datasets[0].radius;
  delete config.data.datasets[0].hitRadius;
  delete config.data.datasets[0].hoverRadius;
  config.options.scales.x.grid.borderColor = "#D9D9D9";
  config.options.scales.y.grid.borderColor = "#D9D9D9";
  myChart.update();
}

function changeToPie() {
  config.type = "pie";
  //    let number = data.datasets[0].data.length;
  let number = monthLabel.length;
  for (let i = 0; i < number; i++) {
    data.datasets[0].backgroundColor.push(color());
    data.datasets[0].borderColor = "#fff";
  }
  // config.options.radius = "100";
  config.options.scales.x.grid.display = false;
  config.options.scales.y.grid.display = false;
  config.options.scales.x.ticks.display = false;
  config.options.scales.y.ticks.display = false;
  delete config.data.datasets[0].radius;
  delete config.data.datasets[0].hitRadius;
  delete config.data.datasets[0].hoverRadius;
  config.options.scales.x.grid.borderColor = "transparent";
  config.options.scales.y.grid.borderColor = "transparent";
  myChart.update();
}

function changeToDoughnut() {
  config.type = "doughnut";
  let number = monthLabel.length;
  for (let i = 0; i < number; i++) {
    data.datasets[0].backgroundColor.push(randomColor());
  }
  data.datasets[0].borderColor = "#fff";
  config.options.scales.x.grid.display = false;
  config.options.scales.y.grid.display = false;
  config.options.scales.x.ticks.display = false;
  config.options.scales.y.ticks.display = false;
  delete config.data.datasets[0].radius;
  delete config.data.datasets[0].hitRadius;
  delete config.data.datasets[0].hoverRadius;
  config.options.scales.x.grid.borderColor = "transparent";
  config.options.scales.y.grid.borderColor = "transparent";
  myChart.update();
}

function changeLabelToMonth() {
  data.labels = monthLabel;
  myChart.update();
}

function changeLabelToWeek() {
  data.labels = weekLabel;
  myChart.update();
}

function changeLabelToDay() {
  data.labels = dayLabel;
  myChart.update();
}

function random(min, max) {
  let number = Math.floor(Math.random() * (max - min + 1)) + min;
  return number;
}

function color() {
  let colorString = `hsl(${random(1, 360)},${random(1, 100)}% ,${random(
    1,
    100
  )}%)`;
  return colorString;
}

function dataPush() {
  data.datasets[0].data = [];
  for (let i = 0; i < monthLabel.length; i++) {
    data.datasets[0].data.push(random(1, 1000));
  }
  myChart.update();
}

function days() {
  for (let i = 1; i <= 60; i++) {
    dayLabel.push(i);
  }
}

databtn.addEventListener("mouseover", dataPush);

// hslbtn.addEventListener("mouseover", function () {
//   hslbtn.style.backgroundColor = color();
// });
