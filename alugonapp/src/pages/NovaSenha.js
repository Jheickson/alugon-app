import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function NovaSenha() {
  const { state } = useLocation();
  const { email, code } = state || {};
  const [senha, setSenha] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (senha !== confirm) {
      return alert("Senhas não conferem");
    }
    const res = await fetch("https://localhost:3333/recuperar/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code, newPassword: senha }),
    });
    if (res.ok) {
      alert("Senha redefinida com sucesso!");
      navigate("/login");
    } else {
      const err = await res.json();
      alert(err.error || "Erro ao redefinir senha");
    }
  };

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <h2>Nova Senha</h2>
        <div className="input-group">
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Confirmar Senha</label>
          <input
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="cadastro-btn">
          Redefinir Senha
        </button>
      </form>
    </div>
  );
}
