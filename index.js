const resultDiv = document.getElementById("result");
const fetchButton = document.getElementById("fetchButton");
const countryInput = document.getElementById("countryInput");

// Function to fetch country info from REST Countries API
function fetchCountryInfo(country) {
    const url = `https://restcountries.com/v3.1/name/${country}`;

    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Event listener for the button
fetchButton.addEventListener("click", () => {
    const country = countryInput.value.trim();
    if (country) {
        fetchCountryInfo(country)
            .then(countries => {
                // Clear previous results
                resultDiv.innerHTML = '';

                // Display the country info
                countries.forEach(country => {
                    const countryElement = document.createElement('div');
                    countryElement.className = 'country-info';
                    countryElement.innerHTML = `
                        <h5>${country.name.common}</h5>
                        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                        <p><strong>Region:</strong> ${country.region}</p>
                    `;
                    resultDiv.appendChild(countryElement);
                });
            })
            .catch(error => {
                resultDiv.innerHTML = `<div class="alert alert-danger">Error fetching country info: ${error.message}</div>`;
            });
    } else {
        resultDiv.innerHTML = '<div class="alert alert-warning">Please enter a country name.</div>';
    }
});