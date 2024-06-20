let filterClose = document.getElementById("filterClose");
let filterBox = document.getElementById("filterBox");
let filterOpenBtn = document.getElementById("filterOpenBtn");
let modeofopereationUL = document.getElementById("modeofopereationUL");
let modeofopereation = document.getElementById("modeofopereation");

let li = modeofopereationUL.getElementsByTagName("li");
let input = modeofopereationUL.getElementsByTagName("input");
let iElement = modeofopereationUL.getElementsByTagName("i");
let modeofNumberView = document.getElementById('modeofNumberView')
modeofopereationUL.style.display = "none";

document.addEventListener("click", function (event) {
  if (modeofopereationUL.style.display == "block") {
    var clickedElement = event.target;
    if (
      !modeofopereationUL.contains(clickedElement) &&
      clickedElement !== modeofopereationUL &&
      clickedElement !== modeofopereation
    ) {
        modeofopereation.click()
    }
  }
});

modeofopereation.addEventListener("click", () => {
  if (modeofopereationUL.style.display == "none")
    modeofopereationUL.style.display = "block";
  else {
    let selectNumber = 0;
    modeofopereationUL.style.display = "none";
    for (let i = 0; i < input.length; i++) {
      if (input[i].checked == true) {
        selectNumber++;
      }
    }
    modeofNumberView.innerHTML = `${selectNumber} Seçili`
  }
});

let radiusKM = document.getElementById("radiusKM");

filterBox.style.display = "none";
filterClose.addEventListener("click", () => {
  if (filterBox.style.display == "none") filterBox.style.display = "block";
  else filterBox.style.display = "none";
});

filterOpenBtn.addEventListener("click", () => {
  if (filterBox.style.display == "none") filterBox.style.display = "block";
  else filterBox.style.display = "none";
});

try {
  let rTop = document.getElementById("rTop");
  let rx = document.getElementById("rx");
  let intervalId;

  let boolTakipOne = false;
  let boolTakipTwo = false;

  let tak = (event) => {
    radiusKM.innerHTML = event.offsetX;

    rTop.style.left = `${event.offsetX}px`;
    console.log(event.offsetX);
  };

  rx.addEventListener("mousedown", (event) => {
    rx.addEventListener("mousemove", tak);
  });

  rx.addEventListener("mouseup", (event) => {
    rx.removeEventListener("mousemove", tak);
  });

  rTop.addEventListener("mousedown", (event) => {
    rx.addEventListener("mousemove", tak);
  });

  rTop.addEventListener("mouseup", (event) => {
    rx.removeEventListener("mousemove", tak);
  });
  document.addEventListener("mouseup", () => {
    rx.removeEventListener("mousemove", tak);
  });
} catch (error) {}
