document.addEventListener("DOMContentLoaded", () => {
  const calculationType = document.getElementById("calculationType");
  const inputsDiv = document.getElementById("inputs");
  const calculateButton = document.getElementById("calculateButton");
  const resultDiv = document.getElementById("result");

  calculationType.addEventListener("change", updateInputs);
  calculateButton.addEventListener("click", performCalculation);

  function updateInputs() {
    const type = calculationType.value;
    inputsDiv.innerHTML = "";

    if (type === "speed") {
      inputsDiv.innerHTML = `
        <input type="text" id="distance" placeholder="Enter distance (e.g., 100 km)" required />
        <input type="text" id="time" placeholder="Enter time (e.g., 1h 30min)" required />
      `;
    } else if (type === "distance") {
      inputsDiv.innerHTML = `
        <input type="text" id="speed" placeholder="Enter speed (e.g., 60 km/h)" required />
        <input type="text" id="time" placeholder="Enter time (e.g., 1h 30min)" required />
      `;
    } else if (type === "time") {
      inputsDiv.innerHTML = `
        <input type="text" id="distance" placeholder="Enter distance (e.g., 100 km)" required />
        <input type="text" id="speed" placeholder="Enter speed (e.g., 60 km/h)" required />
      `;
    }
  }

  function performCalculation() {
    const type = calculationType.value;
    const distanceInput = document.getElementById("distance");
    const speedInput = document.getElementById("speed");
    const timeInput = document.getElementById("time");

    try {
      let result;
      if (type === "speed") {
        const distance = parseUnitValue(distanceInput.value);
        const timeSeconds = parseCompositeTime(timeInput.value);
        result = calculateSpeed(distance.value, distance.unit, timeSeconds);
      } else if (type === "distance") {
        const speed = parseUnitValue(speedInput.value);
        const timeSeconds = parseCompositeTime(timeInput.value);
        result = calculateDistance(speed.value, speed.unit, timeSeconds);
      } else if (type === "time") {
        const distance = parseUnitValue(distanceInput.value);
        const speed = parseUnitValue(speedInput.value);
        result = calculateTime(
          distance.value,
          distance.unit,
          speed.value,
          speed.unit
        );
      }

      displayResult(result);
    } catch (error) {
      resultDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
  }

  function parseUnitValue(input) {
    const match = input.match(/^([\d.]+)\s*([a-zA-Z/]+)$/);
    if (!match)
      throw new Error("Invalid input format. Use: value unit (e.g., 100 km)");
    return { value: parseFloat(match[1]), unit: match[2] };
  }

  function parseCompositeTime(input) {
    const timeUnits = {
      s: 1,
      min: 60,
      h: 3600,
      d: 86400,
    };
    return input
      .split(" ")
      .map((chunk) => {
        const match = chunk.match(/^([\d.]+)\s*([a-zA-Z]+)$/);
        if (!match || !timeUnits[match[2]])
          throw new Error(`Invalid time unit: ${chunk}`);
        return parseFloat(match[1]) * timeUnits[match[2]];
      })
      .reduce((a, b) => a + b, 0);
  }

  function calculateSpeed(distance, distUnit, timeSeconds) {
    const meters = toMeters(distance, distUnit);
    const speedMS = meters / timeSeconds;
    return {
      "m/s": speedMS.toFixed(2),
      "km/h": (speedMS * 3.6).toFixed(2),
      mph: (speedMS * 2.23694).toFixed(2),
    };
  }

  function calculateDistance(speed, speedUnit, timeSeconds) {
    const metersPerSecond = toSpeed(speed, speedUnit);
    const distance = metersPerSecond * timeSeconds;
    return {
      m: distance.toFixed(2),
      km: (distance / 1000).toFixed(2),
      mi: (distance / 1609.34).toFixed(2),
    };
  }

  function calculateTime(distance, distUnit, speed, speedUnit) {
    const meters = toMeters(distance, distUnit);
    const metersPerSecond = toSpeed(speed, speedUnit);
    const timeSeconds = meters / metersPerSecond;
    return {
      s: timeSeconds.toFixed(2),
      min: (timeSeconds / 60).toFixed(2),
      h: (timeSeconds / 3600).toFixed(2),
    };
  }

  function toMeters(value, unit) {
    const conversions = {
      m: 1,
      km: 1000,
      mi: 1609.34,
      ft: 0.3048,
      yd: 0.9144,
    };
    if (!conversions[unit]) throw new Error(`Unsupported unit: ${unit}`);
    return value * conversions[unit];
  }

  function toSpeed(value, unit) {
    const conversions = {
      "m/s": 1,
      "km/h": 1000 / 3600,
      mph: 1609.34 / 3600,
      "ft/s": 0.3048,
    };
    if (!conversions[unit]) throw new Error(`Unsupported unit: ${unit}`);
    return value * conversions[unit];
  }

  function displayResult(result) {
    resultDiv.innerHTML = "<h3>Results:</h3>";
    Object.entries(result).forEach(([unit, value]) => {
      resultDiv.innerHTML += `<p>${value} ${unit}</p>`;
    });
  }

  // Initialize inputs
  updateInputs();
});
