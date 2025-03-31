// fetch information
/*
* API used for the prediction : https://www.el-tiempo.net/api/json/v2/provincias/08
* We are going to display the weather prediction from
* the municipalities of barcelona
*
*
* */
// imports
import {writeFile} from "fs"; // Funcion utilizada como un remplazo de Bun.write (no funcionaba por alguna razon)
import {Ajv} from "ajv"; // validador



// types (interfaces) para filtrar informacion
/*
* Aqui abajpo hice que el camppo ciudades fuera una lista porque
* en el JSON que recibimos nos da la informacion en forma de lista
* en ese campo.
*
* Haciendo eso puedo iterar por todos los objetos
* */
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
// Response del json que buscamos
const info:relevantPredictionFilter = await fetch("https://www.el-tiempo.net/api/json/v2/provincias/08").then((res) => res.json());
const filteredCities:relevantPredictionFilter[] = [] // inicializamos esta array vacia para luego meter los campos del json que queremos


info.ciudades.forEach(currentCity => {
    // creo un objeto que contenga los campos que necesito
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


// configuracion de la funcion writefile
const conf = {
    JSON_File: "./clean.json", // ubicacion del fichero json
    json: filteredCities, // informacion que pasaremos para escribir
}

// validacion del schema
const schema = {
    type: "array",
    items: {
        type: "object",
        properties: {
            ciudades: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string"
                        },
                        stateSky: {
                            type: "object",
                            properties: {
                                description: {
                                    type: "string"
                                }
                            },
                            required: [
                                "description"
                            ]
                        },
                        temperatures: {
                            type: "object",
                            properties: {
                                max: {
                                    type: "string"
                                },
                                min: {
                                    type: "string"
                                }
                            },
                            required: [
                                "max",
                                "min"
                            ]
                        }
                    },
                    required: [
                        "name",
                        "stateSky",
                        "temperatures"
                    ]
                }
            }
        },
        required: [
            "ciudades"
        ]
    }
}

const ajvObject = new Ajv();
const validator = ajvObject.compile(schema);
if (validator(filteredCities)) {
    // validamos si la informacion pasa la validacion
    console.log("validation passed");
    writeFile(conf.JSON_File, JSON.stringify(conf.json),() => {})
} else {
    // si no pasa mostramos un mensaje de error por pantalla
    console.error("validation error");
}





// writeFile(conf.JSON_File, JSON.stringify(conf.json),() => {})


