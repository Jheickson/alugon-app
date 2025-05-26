import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerificarCodigo() {
  const { state } = useLocation();
  const email = state?.email;
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("https://localhost:3333/recuperar/verificar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });
    if (res.ok) {
      navigate("/recuperar/nova-senha", { state: { email, code } });
    } else {
      const err = await res.json();
      alert(err.error || "Código inválido");
    }
  };

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <h2>Digite o Código</h2>
        <div className="input-group">
          <label>Código</label>
          <input
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="cadastro-btn">
          Verificar
        </button>
      </form>
    </div>
  );
}
