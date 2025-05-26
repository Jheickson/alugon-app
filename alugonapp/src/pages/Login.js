import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://localhost:3333/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();
      if (response.ok) {
        login(data.user, data.token);
        alert("Login bem-sucedido!");

        navigate("/perfil");
      } else {
        alert("Erro ao fazer login: " + data.message);
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2> Entrar </h2>
        <div className="input-group">
          <label htmlFor="email"> E - mail </label>{" "}
          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password"> Senha </label>{" "}
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">
          {" "}
          Entrar{" "}
        </button>
        <p className="register-link">
          Ainda não tem uma conta ? <Link to="/cadastro"> Cadastre - se </Link>{" "}
        </p>{" "}
        <p className="recover-link">
          <Link to="/recuperar">Recuperar conta</Link>
        </p>
      </form>{" "}
    </div>
  );
}

export default Login;
