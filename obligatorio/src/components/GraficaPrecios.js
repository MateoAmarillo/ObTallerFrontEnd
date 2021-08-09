import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { withRouter } from 'react-router-dom';

const GraficaPrecios = ({ paquetes }) => {


    const promedioPaquete = () => {
        let cant = 0;
        let data = [];
        paquetes.forEach((item) => {
            cant = (item.precio_mayor+item.precio_menor)/2;
            data = [...data, cant];
        });
        return data;
    }




    const data = {
        labels: paquetes.map((item) => ("Destino " + item.id)), //(item.nombre)
        datasets: [
            {
                label: '# de usuarios por destino',
                data: promedioPaquete(),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <div className='header'>
                <h3 className='title'>Precios promedio</h3>
            </div>
            <Doughnut data={data}/>
            <hr />
        </>
    );
}
export default withRouter(GraficaPrecios);