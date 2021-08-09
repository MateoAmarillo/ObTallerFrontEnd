import React from 'react';
import { Bar } from 'react-chartjs-2';
import { withRouter } from 'react-router-dom';

const GraficaDestinos = ({ paquetes, ventas}) => {

    const usuariosPaquete = (id) => {
        let cant = 0;
        ventas.forEach((item) => {
            if(item.id_paquete === id){
                cant += item.cantidad_mayores + item.cantidad_menores
            }
        });
        return cant;
    }

    const contarUsuarios = () => {
        let cant = 0;
        let data = [];
        paquetes.forEach((item) => {
            cant = usuariosPaquete(item.id);
            data = [...data, cant];
        });
        return data;
    }




    const data = {
        labels: paquetes.map((item) => ("Destino " + item.id)), //(item.nombre)
        datasets: [
            {
                label: '# de usuarios por destino',
                data: contarUsuarios(),
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

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <>
            <div className='header'>
                <h3 className='title'>Personas por destino</h3>
            </div>
            <Bar data={data} options={options} />
            <hr />
        </>
    );
}
export default withRouter(GraficaDestinos);