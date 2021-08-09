import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const Login = ({ history }) => {
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

    fetch('http://destinos.develotion.com/login.php', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(res => {
        if (res.codigo === 200) {
          sessionStorage.setItem('token', res.apiKey);
          sessionStorage.setItem('userId', res.id);
          history.push('/');
        } else {
          setMensajeError(`Error :-( -> ${res.mensaje}`);
        }
      })
      .catch(res => {
        setMensajeError(`Error :-( -> ${res.mensaje}`);
      });
  };

  const btnReg = () => {
    history.push("/Registro")
  };

  return (
    <>
      <div>
        <input type="text" placeholder="Ingrese el usuario..."  onChange={handleChangeUsuario} />
        <input
          type="password"
          placeholder="Ingrese la contraseña..."
          onChange={handleChangePassword}
        />
        <input type="button" value="Entrar" onClick={btnClick} />
        <br/>
        <input type="button" value="Registrarse" onClick={btnReg} />
      </div>
      <p className="mensaje-error">{mensajeError}</p>
    </>
  );
};

Login.propTypes = {};

export default withRouter(Login);
