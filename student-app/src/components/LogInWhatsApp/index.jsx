import React from 'react';
import { StytchAuth } from '@stytch/stytch-react';

const LogInWhatsApp = () => {
  const handleSuccess = (response) => {
    console.log(response);
    // Aquí puedes hacer lo que necesites con la respuesta del servidor
  };

  const handleError = (error) => {
    console.error(error);
    // Aquí puedes manejar el error de alguna manera si lo necesitas
  };

  return (
    <StytchAuth
      flowId="whatsapp"
      onSuccess={handleSuccess}
      onError={handleError}
      render={(props) => (
        <button onClick={props.onClick}>Iniciar sesión con WhatsApp</button>
      )}
    />
  );
};

export default LogInWhatsApp;
