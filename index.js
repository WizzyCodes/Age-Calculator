document.addEventListener("DOMContentLoaded", function () {
  const dayInput = document.querySelector("input[name='DAY']");
  const monthInput = document.querySelector("input[name='month']");
  const yearInput = document.querySelector("input[name='year']");
  const button = document.querySelector(".line-image");
  const yearsDisplay = document.querySelector(".Years-Space");
  const monthsDisplay = document.querySelector(".Months-Space");
  const daysDisplay = document.querySelector(".Days-Space");
  const refresh = document.querySelector(".Svg");

  function createErrorElement() {
    const errorElement = document.createElement("div");
    errorElement.style.color = "red";
    errorElement.style.fontSize = "9px";
    errorElement.style.textAlign = "start";
    errorElement.style.fontWeight = "600";
    errorElement.style.width = "100%";
    return errorElement;
  }
  const dayError = createErrorElement();
  const monthError = createErrorElement();
  const yearError = createErrorElement();
  function initial() {
    dayInput.textContent = "";
    monthInput.textContent = "";
    yearInput.textContent = "";
    yearsDisplay.textContent = "- -";
    monthsDisplay.textContent = "- -";
    daysDisplay.textContent = "- -";
    dayError.textContent = "";
    monthError.textContent = "";
    yearError.textContent = "";
  }

  dayInput.parentElement.appendChild(dayError);
  monthInput.parentElement.appendChild(monthError);
  yearInput.parentElement.appendChild(yearError);

  button.addEventListener("click", function (e) {
    e.preventDefault();

    const day = parseInt(dayInput.value, 10);
    const month = parseInt(monthInput.value, 10);
    const year = parseInt(yearInput.value, 10);
    initial();

    let isValid = true;

    if (!dayInput.value) {
      dayError.textContent = "This field is required";
      isValid = false;
    }
    if (!monthInput.value) {
      monthError.textContent = "This field is required";
      isValid = false;
    }
    if (!yearInput.value) {
      yearError.textContent = "This field is required";
      isValid = false;
    }

    if (!isValid) return;

    if (month < 1 || month > 12) {
      monthError.textContent = "Must be a valid month";
      return;
    }
    if (day < 1 || day > new Date(year, month, 0).getDate()) {
      dayError.textContent = "Must be a valid date";
      return;
    }
    if (year > new Date().getFullYear()) {
      yearError.textContent = "Must be in the past";
      return;
    }

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths--;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    yearsDisplay.textContent = ageYears;
    monthsDisplay.textContent = ageMonths;
    daysDisplay.textContent = ageDays;
  });
  initial();

  refresh.addEventListener("click", function () {
    initial();

    dayInput.value = "";
    monthInput.value = "";
    yearInput.value = "";
    yearsDisplay.value = "";
    monthsDisplay.value = "";
    daysDisplay.value = "";
  });
});
