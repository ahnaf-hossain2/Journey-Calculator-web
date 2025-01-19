document.addEventListener("DOMContentLoaded", () => {
  const calculationType = document.getElementById("calculationType");
  const inputsDiv = document.getElementById("inputs");
  const calculateButton = document.getElementById("calculateButton");
  const resultDiv = document.getElementById("result");

  calculationType.addEventListener("change", updateInputs);
  calculateButton.addEventListener("click", performCalculation);

  const unitOptions = {
    distance: ["m", "km", "mi", "ft", "yd"],
    time: ["s", "min", "h", "d"],
    speed: ["m/s", "km/h", "mph", "ft/s"],
  };

  function updateInputs() {
    const type = calculationType.value;
    inputsDiv.innerHTML = "";

    if (type === "speed") {
      inputsDiv.innerHTML = `
        <input type="number" id="distance" placeholder="Enter distance" required />
        ${createUnitSelector("distanceUnit", unitOptions.distance)}
        <input type="number" id="time" placeholder="Enter time" required />
        ${createUnitSelector("timeUnit", unitOptions.time)}
      `;
    } else if (type === "distance") {
      inputsDiv.innerHTML = `
        <input type="number" id="speed" placeholder="Enter speed" required />
        ${createUnitSelector("speedUnit", unitOptions.speed)}
        <input type="number" id="time" placeholder="Enter time" required />
        ${createUnitSelector("timeUnit", unitOptions.time)}
      `;
    } else if (type === "time") {
      inputsDiv.innerHTML = `
        <input type="number" id="distance" placeholder="Enter distance" required />
        ${createUnitSelector("distanceUnit", unitOptions.distance)}
        <input type="number" id="speed" placeholder="Enter speed" required />
        ${createUnitSelector("speedUnit", unitOptions.speed)}
      `;
    }
  }

  function createUnitSelector(id, options) {
    return `
      <select id="${id}">
        ${options.map((option) => `<option value="${option}">${option}</option>`).join("")}
      </select>
    `;
  }

  function performCalculation() {
    const type = calculationType.value;
    const distance = document.getElementById("distance")?.value;
    const distanceUnit = document.getElementById("distanceUnit")?.value;
    const speed = document.getElementById("speed")?.value;
    const speedUnit = document.getElementById("speedUnit")?.value;
    const time = document.getElementById("time")?.value;
    const timeUnit = document.getElementById("timeUnit")?.value;

    try {
      let result;
      if (type === "speed") {
        const timeSeconds = convertToSeconds(parseFloat(time), timeUnit);
        result = calculateSpeed(parseFloat(distance), distanceUnit, timeSeconds);
      } else if (type === "distance") {
        const timeSeconds = convertToSeconds(parseFloat(time), timeUnit);
        result = calculateDistance(parseFloat(speed), speedUnit, timeSeconds);
      } else if (type === "time") {
        const distanceMeters = convertToMeters(parseFloat(distance), distanceUnit);
        const speedMS = convertToSpeed(parseFloat(speed), speedUnit);
        result = calculateTime(distanceMeters, speedMS);
      }
      displayResult(result);
    } catch (error) {
      resultDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
  }

  function convertToMeters(value, unit) {
    const conversions = { m: 1, km: 1000, mi: 1609.34, ft: 0.3048, yd: 0.9144 };
    if (!conversions[unit]) throw new Error(`Unsupported unit: ${unit}`);
    return value * conversions[unit];
  }

  function convertToSeconds(value, unit) {
    const conversions = { s: 1, min: 60, h: 3600, d: 86400 };
    if (!conversions[unit]) throw new Error(`Unsupported unit: ${unit}`);
    return value * conversions[unit];
  }

  function convertToSpeed(value, unit) {
    const conversions = { "m/s": 1, "km/h": 1000 / 3600, mph: 1609.34 / 3600, "ft/s": 0.3048 };
    if (!conversions[unit]) throw new Error(`Unsupported unit: ${unit}`);
    return value * conversions[unit];
  }

  function calculateSpeed(distance, distanceUnit, timeSeconds) {
    const meters = convertToMeters(distance, distanceUnit);
    const speedMS = meters / timeSeconds;
    return { "m/s": speedMS.toFixed(2), "km/h": (speedMS * 3.6).toFixed(2), mph: (speedMS * 2.23694).toFixed(2) };
  }

  function calculateDistance(speed, speedUnit, timeSeconds) {
    const metersPerSecond = convertToSpeed(speed, speedUnit);
    const distance = metersPerSecond * timeSeconds;
    return { m: distance.toFixed(2), km: (distance / 1000).toFixed(2), mi: (distance / 1609.34).toFixed(2) };
  }

  function calculateTime(distanceMeters, speedMS) {
    const timeSeconds = distanceMeters / speedMS;
    return { s: timeSeconds.toFixed(2), min: (timeSeconds / 60).toFixed(2), h: (timeSeconds / 3600).toFixed(2) };
  }

  function displayResult(result) {
    resultDiv.innerHTML = "<h3>Results:</h3>";
    for (const [unit, value] of Object.entries(result)) {
      resultDiv.innerHTML += `<p>${value} ${unit}</p>`;
    }
  }

  updateInputs();
});
