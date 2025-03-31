// fetch information
/*
* base website for the api: https://www.el-tiempo.net/api
* API used for the prediction (Barcelona): https://www.el-tiempo.net/api/json/v2/provincias/08
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
    // entonces se filtrara cada objeto de la lista sin filtrar
    // y pasaremos los objetos filtrados a la lista de ciudades filtradas
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


// configuracion basica de la funcion writefile (este ejemplo ya no esta en uso)
/*
const conf = {
    JSON_File: "./BcnProvinceWeather.json", // ubicacion del fichero json
    json: filteredCities, // informacion que pasaremos para escribir
}
*/
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
/*
if (validator(filteredCities)) {
    // validamos si la informacion pasa la validacion
    console.log("validation passed");
    writeFile(conf.JSON_File, JSON.stringify(conf.json),() => {})
} else {
    // si no pasa mostramos un mensaje de error por pantalla
    console.error("validation error");
}

*/

const barcelona:provinceType = {
    name: "Barcelona",
    province: {
        fetchLink: "https://www.el-tiempo.net/api/json/v2/provincias/08",
        jsonFile: "./BcnProvinceWeather.json"
    }
}
const tarragona:provinceType= {
    name: "Tarragona",
    province: {
        fetchLink: "https://www.el-tiempo.net/api/json/v2/provincias/43",
        jsonFile: "./TgnProvinceWeather.json"
    }
}
const lleida:provinceType = {
    name: "Lleida",
    province: {
        fetchLink: "https://www.el-tiempo.net/api/json/v2/provincias/25",
        jsonFile: "./LleidaProvinceWeather.json"
    }
}
const girona:provinceType = {
    name: "Girona",
    province: {
        fetchLink: "https://www.el-tiempo.net/api/json/v2/provincias/17",
        jsonFile: "./GironaProvinceWeather.json"
    }
}
export type provinceType = {
    name: string,
    province: {fetchLink:string,jsonFile:string}
}

// funcion para actualizar la informacion json cada vez que se carge la pagina




/*
* Usare el parametro province para ajustar el fetch a cuando lo necesite
* */
export async function infoFetch(province:string):Promise<void> {
    const selProvince = province.toLowerCase();
    let fetchLink:string;
    let jsonFile: string;
    // hacemos un if para cambiar el link para buscar la informacion del tiempo
    // y para cambiar el archivo que usaremos
    if (selProvince === "barcelona") {
        fetchLink = barcelona.province.fetchLink;
        jsonFile = barcelona.province.jsonFile;
    } else if (selProvince === "tarragona") {
        fetchLink = tarragona.province.fetchLink;
        jsonFile = tarragona.province.jsonFile;
    } else if (selProvince === "lleida") {
        fetchLink = lleida.province.fetchLink;
        jsonFile = lleida.province.jsonFile;
    } else if (selProvince === "girona") {
        fetchLink = girona.province.fetchLink;
        jsonFile = girona.province.jsonFile;
    }

    // @ts-ignore
    const data:relevantPredictionFilter = await fetch(fetchLink).then((res) => res.json());
    const filteredCities:relevantPredictionFilter[] = []
    data.ciudades.forEach(currentCity => {
        let fCity:relevantPredictionFilter = {
            ciudades: [{name: currentCity.name,
                stateSky: {description: currentCity.stateSky.description},
                temperatures: {max: currentCity.temperatures.max, min: currentCity.temperatures.min}}]

        }
        filteredCities.push(fCity);
    })
    if (validator(filteredCities)){
        console.log("fetching new data...");
        // @ts-ignore
        writeFile(jsonFile, JSON.stringify(filteredCities),() => {})
    } else{
        console.error("Error while fetching data!");
    }

}
infoFetch("Tarragona"); //haciendo pruebas



// writeFile(conf.JSON_File, JSON.stringify(conf.json),() => {})


