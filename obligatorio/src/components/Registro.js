import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const Registro = ({ history }) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const handleChangeUsuario = ({ target: { value } }) => {
    setUsuario(value);
  };

  const handleChangePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  const btnClick = () => {
    const body = {
      usuario,
      password,
    };

    setMensajeError('');

    fetch('http://destinos.develotion.com/usuarios.php', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(res => {
        if (res.codigo === 200) {
          alert("Usuario agregado");
          sessionStorage.setItem('token', res.apiKey);
          sessionStorage.setItem('userId', res.id);
          history.push('/');
        } else {
          setMensajeError(`Error: ${res.mensaje}`);
        }
      })
      .catch(res => {
        setMensajeError(`Error: ${res.mensaje}`);
      });
  };

  return (   
    <>
      <div>
        <input type="text" placeholder="Ingrese nombre de usuario..." onChange={handleChangeUsuario} />
        <br/>
        <input type="password" placeholder="Ingrese contraseña de usuario..."  onChange={handleChangePassword} />
        <br/>
        <input type="button" value="Registrarse" onClick={btnClick} />
      </div>
      <p className="mensaje-error">{mensajeError}</p>
    </>
  );
};

Registro.propTypes = {};

export default withRouter(Registro);
