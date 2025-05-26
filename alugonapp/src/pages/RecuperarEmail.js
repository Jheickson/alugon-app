import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecuperarEmail() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("https://localhost:3333/recuperar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      alert("Código gerado! (veja o console do servidor)");
      navigate("/recuperar/codigo", { state: { email } });
    } else {
      const err = await res.json();
      alert(err.error || "Erro ao recuperar conta");
    }
  };

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <h2>Recuperar Conta</h2>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="cadastro-btn">
          Enviar Código
        </button>
      </form>
    </div>
  );
}
