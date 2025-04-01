import {useEffect, useState} from "react";
import LleidaH from "./LleidaHeader.tsx";
import GironaH from "./GironaHeader.tsx";
import BarcelonaHeader from "./BarcelonaHeader.tsx";
import TarragonaHeader from "./TarragonaHeader.tsx";

function barcelonaHeader() {


    return(
        <header>
            <h2>Tiempo de Barcelona</h2>
            <div className="provinces">
                <button>Tarragona</button>
                <button>Girona</button>
                <button>Lleida</button>
            </div>
        </header>
    )
}
export default barcelonaHeader;