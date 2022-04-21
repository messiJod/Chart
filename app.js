const ctx = document.getElementById("myChart");
const btn1 = document.querySelector(".line");
const btn2 = document.querySelector(".bar");
const btn3 = document.querySelector(".pie");
const databtn = document.querySelector(".data");
let hslbtn = document.querySelector("#hsl");

let delayed;
const label = [
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
      data: [100,55,10,48,79,69],
      label: "Sales",
      backgroundColor: [randomColor()],
      borderColor: [randomColor()],
      tension: 0.3,
      fill: true,
    },
  ],
  labels: label,
};

const config = {
  type: "line",
  data: data,
  option: {
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
      y: {
        ticks: {
          callback: function (value) {
            return "$" + value;
          },
        },
      },
    },
  },
};
const myChart = new Chart(ctx, config);

btn1.addEventListener("click", changeToLine);
btn2.addEventListener("click", changeToBar);
btn3.addEventListener("click", changeToPie);

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
  let number = label.length;
  for (let i = 0; i < 1; i++) {
    data.datasets[0].backgroundColor.push(randomColor());
    //    data.datasets[0].borderColor.push(randomColor());
  }
  data.datasets[0].borderColor = randomColor();
  myChart.update();
}

function changeToBar() {
  config.type = "bar";
  let number = label.length;
  for (let i = 0; i < number; i++) {
    data.datasets[0].backgroundColor.push(color());
    //    data.datasets[0].borderColor.push(randomColor());
  }
  data.datasets[0].borderColor = randomColor();
  myChart.update();
}

function changeToPie() {
  config.type = "pie";
  //    let number = data.datasets[0].data.length;
  let number = label.length;
  for (let i = 0; i < number; i++) {
    data.datasets[0].backgroundColor.push(randomColor());
    //    data.datasets[0].borderColor.push(randomColor());
  }
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
  for (let i = 0; i < label.length; i++) {
    data.datasets[0].data.push(random(1, 100));
  }
  myChart.update();
}

databtn.addEventListener("mouseover", dataPush);

hslbtn.addEventListener("mouseover", function () {
  hslbtn.style.backgroundColor = color();
});
