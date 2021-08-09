import React from 'react';
import { withRouter } from 'react-router-dom';


const Destinos = ({ contarPaquetes, contiene }) => {

    const dest = contarPaquetes(false);
    let titulo;
    

    if (contiene(dest)) {
        titulo = <h2>Paquetes vendidos más de 3 veces</h2>;
    } else {
        titulo = <h2>No hay paquetes vendidos más de 3 veces</h2>;
    }
    return (
        <>
            {titulo}
            <ul>
                {
                    dest.map((item, index) => (
                        <li key={index}>
                            <h3>- {item.nombre} -</h3>
                            <img className="foto" src={`https://destinos.develotion.com/imgs/${item.foto}`} alt="Foto" />
                            <p>- Precio adultos: {item.precio_mayor}</p>
                            <p>- Precio menores: {item.precio_menor}</p>
                        </li>
                    ))
                }
            </ul>
            <hr />

        </>
    );
};

export default withRouter(Destinos);
