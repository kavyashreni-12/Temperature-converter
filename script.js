const cityAdjustments = {
    Chennai: 0,
    Mumbai: -2,
    Delhi: -3,
    Kolkata: -1,
    Bengaluru: -4,
    Hyderabad: -2,
    Ahmedabad: -3,
    Jaipur: -2,
    Pune: -3,
    Lucknow: -4
};

const celsiusInput = document.querySelector('#celsius > input');
const fahrenheitInput = document.querySelector('#fahrenheit > input');
const kelvinInput = document.querySelector('#kelvin > input');
const citySelect = document.getElementById('city');
const result = document.getElementById('result');
const clearBtn = document.querySelector('.button button');

let originalCelsius = null;

function roundNumber(number) {
    return Math.round(number * 100) / 100;
}

function updateFromCelsius(cTemp) {
    const fTemp = (cTemp * 9 / 5) + 32;
    const kTemp = cTemp + 273.15;
    fahrenheitInput.value = roundNumber(fTemp);
    kelvinInput.value = roundNumber(kTemp);
}

function applyCityAdjustment() {
    const city = citySelect.value;

    if (originalCelsius === null) {
        result.textContent = "❗ Please enter a temperature before selecting a city.";
        return;
    }

    const adjustment = cityAdjustments[city] || 0;
    const adjustedCelsius = originalCelsius + adjustment;
    const adjustedFahrenheit = (adjustedCelsius * 9 / 5) + 32;
    const adjustedKelvin = adjustedCelsius + 273.15;

    celsiusInput.value = roundNumber(adjustedCelsius);
    fahrenheitInput.value = roundNumber(adjustedFahrenheit);
    kelvinInput.value = roundNumber(adjustedKelvin);

    result.textContent = `🌍 Adjusted temperature for ${city}: ${roundNumber(adjustedCelsius)}°C, ${roundNumber(adjustedFahrenheit)}°F, ${roundNumber(adjustedKelvin)}K`;
}

celsiusInput.addEventListener('input', () => {
    if (!citySelect.value) {
        result.textContent = "❗ Please select a city first.";
        return;
    }

    const cTemp = parseFloat(celsiusInput.value);
    if (!isNaN(cTemp)) {
        originalCelsius = cTemp - cityAdjustments[citySelect.value];
        updateFromCelsius(cTemp);
        applyCityAdjustment();
    }
});

fahrenheitInput.addEventListener('input', () => {
    if (!citySelect.value) {
        result.textContent = "❗ Please select a city first.";
        return;
    }

    const fTemp = parseFloat(fahrenheitInput.value);
    if (!isNaN(fTemp)) {
        const cTemp = (fTemp - 32) * 5 / 9;
        originalCelsius = cTemp - cityAdjustments[citySelect.value];
        celsiusInput.value = roundNumber(cTemp);
        updateFromCelsius(cTemp);
        applyCityAdjustment();
    }
});

kelvinInput.addEventListener('input', () => {
    if (!citySelect.value) {
        result.textContent = "❗ Please select a city first.";
        return;
    }

    const kTemp = parseFloat(kelvinInput.value);
    if (!isNaN(kTemp)) {
        const cTemp = kTemp - 273.15;
        originalCelsius = cTemp - cityAdjustments[citySelect.value];
        celsiusInput.value = roundNumber(cTemp);
        updateFromCelsius(cTemp);
        applyCityAdjustment();
    }
});

citySelect.addEventListener('change', () => {
    if (originalCelsius !== null) {
        applyCityAdjustment();
    } else {
        // Try to infer originalCelsius from any existing input
        const cTemp = parseFloat(celsiusInput.value);
        const fTemp = parseFloat(fahrenheitInput.value);
        const kTemp = parseFloat(kelvinInput.value);

        if (!isNaN(cTemp)) {
            originalCelsius = cTemp - cityAdjustments[citySelect.value];
            applyCityAdjustment();
        } else if (!isNaN(fTemp)) {
            const c = (fTemp - 32) * 5 / 9;
            originalCelsius = c - cityAdjustments[citySelect.value];
            applyCityAdjustment();
        } else if (!isNaN(kTemp)) {
            const c = kTemp - 273.15;
            originalCelsius = c - cityAdjustments[citySelect.value];
            applyCityAdjustment();
        } else {
            result.textContent = "❗ Please enter a temperature.";
        }
    }
});

clearBtn.addEventListener('click', () => {
    celsiusInput.value = "";
    fahrenheitInput.value = "";
    kelvinInput.value = "";
    result.textContent = "Adjusted Temperature Will Be Displayed Here";
    originalCelsius = null;
});
