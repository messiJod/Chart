const ctx = document.getElementById("myChart");
const btn1 = document.querySelector(".line");
const btn2 = document.querySelector(".bar");
const btn3 = document.querySelector(".pie");

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
      data: [20, 10, 1, 25, 18, 19, 9],
      label: "Sales",
      backgroundColor: [randomColor()],
      borderColor: [randomColor()],
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
  for (let i = 0; i < number; i++) {
    data.datasets[0].backgroundColor.push(randomColor());
    //    data.datasets[0].borderColor.push(randomColor());
  }
  data.datasets[0].borderColor = "pink";
  myChart.update();
}

function changeToBar() {
  config.type = "bar";
  let number = label.length;
  for (let i = 0; i < number; i++) {
    data.datasets[0].backgroundColor.push(randomColor());
    //    data.datasets[0].borderColor.push(randomColor());
  }
  data.datasets[0].borderColor = "pink";
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
