// Show a message to the user that the name was not found
function showAlert(message, className) {
    // Only shows the alert if it is not already shown
    if (!(document.querySelector(`.alert.alert-${className}`) === null)) {
        return;
    }
    // Create a div where to show the alert
    const div = document.createElement("div");

    // Add a class name to the div
    div.className = `alert alert-${className}`;

    // Add a text to the div with the message received 
    div.appendChild(document.createTextNode(message));

    // Insert the div between the form and the table
    const main = document.querySelector(".main-container");
    const table = document.querySelector(".table");
    main.insertBefore(div, table);

    // Vanish the alert after a few seconds
    setTimeout(() => document.querySelector(`.alert.alert-${className}`).remove(), 3000);
}

// Get the country name from the API and add it to the DOM element
function countryName(countryId, row) {
    fetch(`https://restcountries.com/v3.1/alpha/${countryId}`)
        .then(response => response.json())
        .then(data => row.innerHTML = `<td>${data[0].name.common}</td>` + row.innerHTML);
}

// Show the list of countries where the name was found
function showCountries(countries) {
    const countriesList = document.querySelector("#countries-list");
    countriesList.innerHTML = "";
    let countriesDisplayed = false;
    countries.forEach(element => {
        // Check the element has the country code because sometimes the API returns only the probability 
        // without the country code
        if (!(element.country_id === "")) {
            // Add a row to the table for each country, usually the API returns 3 countries
            const row = document.createElement("tr");
            countryName(element.country_id, row)
            row.innerHTML += `<td>${+Math.ceil(element.probability * 100)}%</td>`;
            countriesList.appendChild(row);

            // There was at list one element with the country code
            countriesDisplayed = true;
        }
    });
    return countriesDisplayed;
}

const init = () => {
    document.querySelector(".form-container").addEventListener("submit", event => {
        event.preventDefault();

        // Look in the API for the provided name
        const nameToLookup = document.getElementById("nameToLookup").value;
        fetch(`https://api.nationalize.io?name=${nameToLookup}`)
            .then(response => response.json())
            .then(data => {
                // The API returns an array of up to three country names
                if (!showCountries(data.country)) {
                    showAlert("No countries found for this name.", "danger");
                };
            });
    });
    nameToLookup.focus();

    // Clear button to clear the screen and start a new search
    document.querySelector("#clear-button").addEventListener("click", event => {
        document.getElementById("nameToLookup").value = "";
        const countriesList = document.querySelector("#countries-list");
        countriesList.innerHTML = "";
        nameToLookup.focus();
    });

}

document.addEventListener('DOMContentLoaded', init);
