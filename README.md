
# Project: Name Nationality

This is a an excercise to practice fetching data from an API.

We have created a simple app where **the user can enter a name and the app will return up to three countries where the name is used**, including the probability of use in each country.

For this project we are using two different public APIs:
* ## nationalize.io
This API allows to search by a single name or multiple names, currently this app is using only by single name.
It returns an array with data that includes several fields, this app is only using the **country ID** and **probability of use**.

* ## restcountries.com
This is a very useful API that lets get information about a country in several ways, at this time this app is only searching by country code to get the country's full name.

The process is very simple, there is a form where the user can enter a name and two buttons, one to start the search and the other one to clear the screen.

![Main screen](./images/main%20screen.png)


Once the user press Enter or click the Lookup button the app execute a fetch to get the countries data

        // Look in the API for the provided name
        const nameToLookup = document.getElementById("nameToLookup").value;
        fetch(`https://api.nationalize.io?name=${nameToLookup}`)
            .then(response => {
                const result = response.json();
                return result;
            })
            .then(data => {
                // The API returns an array of up to three country names
                if (!showCountries(data.country)) {
                    showAlert("No countries found for this name.", "danger");
                };


In this fetch we are also calling the function to process the country ID in order to get the full name of the country. This function is calling the restcountries API and adding the country name to the unordered list we are creating to show the countries and probabilities to the user.

    // Get the country name from the API and add it to the DOM element
    function countryName(countryId, row) {
        fetch(`https://restcountries.com/v3.1/alpha/${countryId}`)
            .then(response => response.json())
            .then(data => row.innerHTML = `<td>${data[0].name.common}</td>` + row.innerHTML);
    }


Here is an example of how the user will see the results:

![Complete screen](./images/complete%20screen.png)
