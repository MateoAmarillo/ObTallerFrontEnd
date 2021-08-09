import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const Venta = ({ paquetes, agregarVenta, history }) => {
    const [cliente, setCliente] = useState('');
    const [mayores, setMayores] = useState(0);
    const [menores, setMenores] = useState(0);
    const [paquete, setPaquete] = useState(1);
    
    const handleChangeCliente = ({ target: { value } }) => {
        setCliente(value);
    };


    const handleChangeMayores = ({ target: { value } }) => {
        setMayores(value);
    };

    const handleChangeMenores = ({ target: { value } }) => {
        setMenores(value);
    };

    const handleChangePaquete = ({ target: { value } }) => {
        setPaquete(value);
    };

    const realizarVenta = () => {
        let suma = parseInt(mayores) + parseInt(menores);
        if (suma > 10) {
            alert("No pueden ser mas de 10 personas");
        } else {
            const body = {
                idVendedor: sessionStorage.getItem('userId'),
                nombreCliente: cliente,
                idPaquete: paquete,
                cantidadMayores: mayores,
                cantidadMenores: menores
            };
            fetch(`http://destinos.develotion.com/ventas.php`, {
                method: 'POST',
                headers: {
                    'apikey': sessionStorage.getItem('token'),
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(body),
            })
                .then(res => res.json())
                .then(res => {
                    if (res.codigo === 200) {
                        let venta = {
                            "id": res.idVenta,
                            "vendedor_id": parseInt(body.idVendedor),
                            "nombre_cliente": body.nombreCliente,
                            "id_paquete": parseInt(body.idPaquete),
                            "cantidad_mayores": parseInt(body.cantidadMayores),
                            "cantidad_menores": parseInt(body.cantidadMenores)
                        }
                        agregarVenta(venta);
                    } else {
                        console.log(`Error: ${res.mensaje}`);
                    }
                })
                .catch(res => {
                    console.log(`Error: ${res.mensaje}`);
                });
        }

    };

    return (
        <>
            <div>
                <input type="text" placeholder="Nombre de cliente" onChange={handleChangeCliente} />
                <br />
                <input type="number" placeholder="Cantidad de adultos" onChange={handleChangeMayores} />
                <br />
                <input type="number" placeholder="Cantidad de menores" onChange={handleChangeMenores} />
                <br />
                <select onChange={handleChangePaquete}>
                    {paquetes.map((item) => (
                        <option key={item.id} value={item.id} >
                            {item.nombre}
                        </option>
                    ))}
                </select>
                <input type="button" value="Aceptar" onClick={realizarVenta} />
            </div>
            <hr/>
        </>
    );
};


export default withRouter(Venta);
