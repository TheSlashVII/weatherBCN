// fetch information
/*
* API used for the prediction : https://www.el-tiempo.net/api/json/v2/provincias/08
* We are going to display the weather prediction from
* the municipalities of barcelona
*
*
* */
// imports
import {writeFile} from "fs";
import {Ajv} from "ajv";



// types (interfaces) para filtrar informacion
export type relevantPredictionFilter = {
    ciudades:[{
        name: string,
        stateSky: {
            description: string,
        },
        temperatures: {
            max: string,
            min: string,
        }
    }]  // esto lo hago porque necesitaba una lista de objetos de tipo ciudad
}
// information
const info:relevantPredictionFilter = await fetch("https://www.el-tiempo.net/api/json/v2/provincias/08").then((res) => res.json());
const filteredCities:relevantPredictionFilter[] = []


info.ciudades.forEach(currentCity => {
    let eCity:relevantPredictionFilter = {
        ciudades: [{
            name: currentCity.name,
            stateSky: {
                description: currentCity.stateSky.description,
            },
            temperatures: {
                max: currentCity.temperatures.max,
                min: currentCity.temperatures.min,
            }
        }]

    }
    filteredCities.push(eCity);
})





/*
const schema = {
    type: "object",
    properties: {
        ciudades: {
            type: "array",


        }
    }
}

const ajvObject = new Ajv();
const validator = ajvObject.compile()
*/
const conf = {
    JSON_File: "./clean.json",
    json: filteredCities,
}

writeFile(conf.JSON_File, JSON.stringify(conf, null, 2),() => {});


