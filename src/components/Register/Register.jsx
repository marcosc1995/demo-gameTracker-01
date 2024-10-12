import React from "react";

export default function Register() {
  return (
    <div className="register">
      <h1>Registrarse</h1>

      <form>
        <input type="text" placeholder="Nombre" required />
        <input type="email" placeholder="Correo electrónico" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  );
}
