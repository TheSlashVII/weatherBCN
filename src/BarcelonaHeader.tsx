import './header.css';
import {useState} from "react";


function header() {
    const [currentCity, setCurrentCity] = useState("Barcelona");

    return(
        <header>
            <h2>Tiempo de {currentCity}</h2>
            <div className="provinces">
                <h4>Tarragona</h4>
                <h4>Lleida</h4>
                <h4>Girona</h4>
            </div>

        </header>
    )
}

export default header;