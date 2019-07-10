const searchValue = document.querySelector('.search')
const countryContainer = document.querySelector('.countries')

// Retrieve Data from restcountries.eu
let countries;

fetch('https://restcountries.eu/rest/v2/all?fields=name;flag;capital;timezones;currencies')
.then(function(response) {
		if (response.status !== 200) {
			countryContainer.innerHTML = `<p>Server denied connection. <br> Reload Page. <br> Status Code: ${ response.status }<p>`;
			countryContainer.classList = 'error';
			return;
		}
		response.json().then(function(data) {
			countries = data;
			results(countries);
		});
	}
);

// Clear and add list of countries
function results (countries) {
	// Clear List
	countryContainer.innerHTML = '';
	countries.forEach( function(country, index) {
		// Create Country Container
		let container = document.createElement('div');
		container.classList = 'country';
		// Create Image and append
		let image = new Image(120);
		image.classList = 'flag';
		image.src = country.flag;
		container.appendChild(image);
		// Create Name
		let name = document.createElement('h2');
		name.classList = 'name';
		name.innerText = country.name;
		container.appendChild(name);
		// Create Info Container
		let info = document.createElement('div')
		info.classList = 'info';
		// Create Capital
		let capital = document.createElement('p');
		capital.innerHTML = `<strong>Capital:</strong> ${ country.capital }`;
		info.appendChild(capital);
		// Create TimeZone
		let timeZone = document.createElement('p');
		timeZone.innerHTML = `<strong>Time Zone:</strong> ${ country.timezones[0] }`;
		info.appendChild(timeZone);
		// Create Currency
		let currency = document.createElement('p');
		currency.innerHTML = `<strong>Currency:</strong> ${ country.currencies[0].code ?  country.currencies[0].code : 'n/a'} ${ country.currencies[0].symbol ? country.currencies[0].symbol : '' }`;
		info.appendChild(currency);
		// Append Info
		container.appendChild(info);
		// Append Country to Results container 
		countryContainer.appendChild(container);
	});
};

// Automatic Search on key up
searchValue.addEventListener('keyup', () => {
	let modifiedCountries = [];
	countries.forEach( function(element, index) {
		if (element.name.toLowerCase().includes(searchValue.value.toLowerCase())) {
			modifiedCountries.push(element);
		};
	});
	if (modifiedCountries.length > 0) {
		results(modifiedCountries);
	};
});
