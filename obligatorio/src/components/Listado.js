import React from 'react';
import { withRouter } from 'react-router-dom';


const Listado = ({ ventas, buscarPaquete, history }) => {


  const btnLogout = () => {
    sessionStorage.setItem('token', null);
    sessionStorage.setItem('userId', null);
    history.push("/login");
  };



  const calcularPrecio = (venta) => {
    let pack = buscarPaquete(venta.id_paquete)[0];
    if (pack != null) {
      let suma = (venta.cantidad_mayores * pack.precio_mayor) + (venta.cantidad_menores * pack.precio_menor);
      return suma;
    } else {
      return 0;
    }
  }



  return (
    <>
      <h2>Ventas:</h2>
      <h3>Cantidad de paquetes vendidos: {ventas.length}</h3>
      <ul>
        {ventas.map((item, index) => (
          <li key={index}>
            <p>Cliente: {item.nombre_cliente}</p>
            <p>Paquete: {buscarPaquete(item.id_paquete)[0]?.nombre}</p>
            <p>Cantidad de adultos: {item.cantidad_mayores}</p>
            <p>Cantidad de menores: {item.cantidad_menores}</p>
            <p>Precio final: {calcularPrecio(item)}</p>
          </li>
        ))}
      </ul>
      <br />
      <input type="button" value="Logout" onClick={btnLogout} />
      <br />
      <hr />
      
    </>
  );
};

export default withRouter(Listado);
