import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import GraficaDestinos from './GraficaDestinos';
import GraficaPrecios from './GraficaPrecios';
import Listado from './Listado';
import Venta from './Venta';
import Destinos from './Destinos';
import DestinosPromo from './DestinosPromo';


const Inicio = ({history}) => {
  useEffect(() => {
    if (sessionStorage.getItem('token') === 'null') {
      history.push('/Login');
    } else {
      const obtenerVentas = () => {
        const body = {
          userId: sessionStorage.getItem('userId'),
        };
        fetch(`http://destinos.develotion.com/ventas.php?idVendedor=${body.userId}`, {
          method: 'GET',
          headers: {
            'apikey': sessionStorage.getItem('token'),
            'Content-type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(res => {
            if (res.codigo === 200) {
              setVentas(res.ventas);
            } else {
              console.log(`Error: ${res.mensaje}`);
            }
          })
          .catch(res => {
            console.log(`Error: ${res.mensaje}`);
          });
      }
    
      const obtenerPaquetes = () => {
        fetch(`http://destinos.develotion.com/paquetes.php`, {
          method: 'GET',
          headers: {
            'apikey': sessionStorage.getItem('token'),
            'Content-type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(res => {
            if (res.codigo === 200) {
              setPaquetes(res.destinos);
              obtenerVentas();
            } else {
              console.log(`Error: ${res.mensaje}`);
            }
          })
          .catch(res => {
            console.log(`Error: ${res.mensaje}`);
          });
      }
  
      obtenerPaquetes();
    }
  }, []);

  const [ventas, setVentas] = useState([]);
  const [paquetes, setPaquetes] = useState([]);

  

  const agregarVenta = (venta) => {
    setVentas([...ventas, venta]);
  };

  const buscarPaquete = (idPaquete) => {
    return paquetes.filter(elem => elem.id === idPaquete)
  }


  const ventasPaquete = (id) => {
    let cant = 0;
    ventas.forEach((item) => {
      if (item.id_paquete === id) {
        cant++;
      }
    });
    return cant;
  }

  const contarPaquetes = (promo) => {
    let cant = 0;
    let destinos = [];
    paquetes.forEach((item) => {
      cant = ventasPaquete(item.id);
      if (promo) {
        if (cant === 0) {
          destinos = [...destinos, item];
        }
      } else if (cant > 3) {
        destinos = [...destinos, item];
      }


    });
    return destinos;
  }

  const contiene = (dest) => {
    if (dest.length > 0) {
        return true
    } else {
        return false
    }
}



  return (
    <>
      <Listado ventas={ventas} paquetes={paquetes} agregarVenta={agregarVenta} buscarPaquete={buscarPaquete} />
      <Venta paquetes={paquetes} agregarVenta={agregarVenta} />
      <GraficaDestinos paquetes={paquetes} ventas={ventas} buscarPaquete={buscarPaquete} />
      <GraficaPrecios paquetes={paquetes}/>
      <Destinos contarPaquetes={contarPaquetes} contiene={contiene}/>
      <DestinosPromo contarPaquetes={contarPaquetes} contiene={contiene}/>
    </>
  );
};

Inicio.propTypes = {};

export default withRouter(Inicio);
