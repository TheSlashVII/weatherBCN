import './header.css'
import {useEffect} from "react";
/*
import BcnH from "./BarcelonaHeader.tsx";
import LleidaH from "./LleidaHeader.tsx";
import GironaH from "./GironaHeader.tsx";


 */
// @ts-ignore
function TarragonaHeader() {

    // este react hook se activa cada vez que la variable dentro de los corchetes cambia
    /*
    useEffect( () => {
        if(props.startsWith("Barcelona".toLowerCase())){
            props = "Barcelona"
        } else if (props.startsWith("Lleida".toLowerCase())){
            props = "Lleida"
        } else if (props.startsWith("Girona".toLowerCase())){
            props = "Girona"
        }
    },[props])
    */
    return (
        <header>
            <h2>Tiempo de Tarragona</h2>
            <div className="provinces">
                <button>Barcelona</button>
                <button>Lleida</button>
                <button>Girona</button>
            </div>
        </header>
    )
}
export default TarragonaHeader;