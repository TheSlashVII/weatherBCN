
import {useState, useEffect } from "react";
// import {modifiedCity} from "./commonHooks.ts";
import './header.css'


function App() {
    // usare el react hook de useState para cambiar el header y los contenidos de la pagina
    // en base a la seleccion del usuario
  const [city, setCity] = useState("Barcelona");
  const availableCities:string[] = ["Barcelona", "Girona", "Tarragona", "Lleida"];
  // filtramos las opciones disponibles
  let displayedOptions:string[] = availableCities.filter((currentCity) => currentCity !=city);

  // este react hook es usado para ejecutar la funcion de filtrar de la lista de opciones
  // tambien sera usado para recoger la informacion que se pida
  // los useEffects hooks se ejecutan cuando ocurre un cambio a cualquier
  useEffect(() => {
    displayedOptions = availableCities.filter((currentCity) => currentCity.toLowerCase() !=city.toLowerCase());
  }, [city]);


  return (
      <header>
        <h2>Tiempo de {city}</h2>
        <div className="provinces">
          {displayedOptions.map((option:any) =>
            <button onClick={() => setCity(option)}> {option}</button>)}
        </div>
      </header>

  )
}

export default App
