let city = "Barcelona"
const availableCities:string[] = ["Barcelona", "Girona", "Tarragona", "Lleida"];
let displayedOptions:string[] = availableCities.filter((currentCity) => currentCity.toLowerCase() !=city.toLowerCase());
console.log(displayedOptions);

