
import {useState, useEffect } from "react";
// import {modifiedCity} from "./commonHooks.ts";
import './header.css'
import './gridConf.css'
// Import los jsons
import GironaData from './GironaProvinceWeather.json';
import TarragonaData from './TgnProvinceWeather.json';
import BarcelonaData from './BcnProvinceWeather.json';
import LleidaData from './LleidaProvinceWeather.json';
import {relevantPrediction} from "./fetchInfo.ts";

function App() {
    // usare el react hook de useState para cambiar el header y los contenidos de la pagina
    // en base a la seleccion del usuario
  const [city, setCity] = useState("Barcelona");
  const availableCities:string[] = ["Barcelona", "Girona", "Tarragona", "Lleida"];
  // filtramos las opciones disponibles
  let displayedOptions:string[] = availableCities.filter((currentCity) => currentCity !=city);
  // usare este react hook para
  const [currentCityData, setCurrentCityData] = useState<relevantPrediction[]>(BarcelonaData)

    // este react hook es usado para ejecutar la funcion de filtrar de la lista de opciones
  // tambien sera usado para recoger la informacion que se pida
  // los useEffects hooks se ejecutan cuando ocurre un cambio a cualquier variable que especifiques en los []
    // en este caso cada vez que la variable city se cambie se ejecutara el hook useEffect
    // lo  usare tambien para cambiar de documento json para mostrar informacion
    useEffect(() => {
    displayedOptions = availableCities.filter((currentCity) => currentCity.toLowerCase() !=city.toLowerCase());
    console.log(currentCityData)
    if (city.toLowerCase() == "barcelona"){
        setCurrentCityData(BarcelonaData);

    } else if (city.toLowerCase() == "lleida"){
        setCurrentCityData(LleidaData);

    } else if (city.toLowerCase() == "tarragona"){
        setCurrentCityData(TarragonaData);

    } else if (city.toLowerCase() == "girona"){
        setCurrentCityData(GironaData);


    }

  }, [city]);


  return (
      <div>
          <header>
              <h2>Tiempo de {city}</h2>
              <div className="provinces">
                  {displayedOptions.map((option: any) =>
                      <button onClick={() => setCity(option)}> {option}</button>)}
              </div>
          </header>
          <main>
              <div className={"displayInfo"}>
              {currentCityData.map((city) =>
                  <div className={"eachCity"}>
                      <h2>{city.name}</h2>
                      <div className={"ordenFlex"}>
                          <h1>{city.stateSky.description}</h1>
                      </div>
                      <div className={"ordenFlex"}>
                          <div>
                              <h5>Min: </h5>
                              <h2><strong>{city.temperatures.min}</strong></h2>
                          </div>
                          <div>
                              <h5>Max: </h5>
                              <h2><strong>{city.temperatures.max}</strong></h2>
                          </div>
                      </div>
                  </div>
              )}
              </div>
          </main>
      </div>


  )
}

export default App
