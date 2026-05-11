let prev = "",
  op = null,
  count = 0;

function clear() {
  document.getElementById("display").value = "";
  alert("Clear KO Nato ");
  prev = "";
  op = null;
}

function operate(operator) {
  let display = document.getElementById("display");
  prev = display.value;
  op = operator;
  display.value += " " + operator + " ";
}

function equal() {
  let display = document.getElementById("display");
  let result;

  count++;

  if (count === 1) {
    result = eval(display.value);
  } else {
    result = Math.floor(eval(display.value) + 50);
  }

  display.value = result;
}

document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("clear")) clear();
    else if (btn.classList.contains("operator")) operate(btn.textContent);
    else if (btn.classList.contains("equal")) equal();
    else document.getElementById("display").value += btn.textContent;
  });
});
