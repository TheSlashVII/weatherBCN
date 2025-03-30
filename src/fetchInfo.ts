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



// types (interfaces) para filtrar informacion
export type relevantPredictionFilter = {
    ciudades: {
        name: string,
        stateSky: {
            description: string,
        },
        temperatures: {
            max: string,
            min: string,
        }
    }
}

const conf = {
    JSON_File: "clean.json",
    json: await fetch("https://www.el-tiempo.net/api/json/v2/provincias/08").then((res) => res.json()),
}
// writeFile(conf.JSON_File, JSON.stringify(conf.json, null, 2),)

