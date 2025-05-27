import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cadastro.css";

function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [conta, setConta] = useState("");
  const [agencia, setAgencia] = useState("");
  const navigate = useNavigate();

  // Formata CPF no padrão 000.000.000-00
  const formatarCPF = (value) => {
    let cpfNumeros = value.replace(/\D/g, "");
    cpfNumeros = cpfNumeros.slice(0, 11);
    cpfNumeros = cpfNumeros.replace(/(\d{3})(\d)/, "$1.$2");
    cpfNumeros = cpfNumeros.replace(/(\d{3})(\d)/, "$1.$2");
    cpfNumeros = cpfNumeros.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpfNumeros;
  };

  // Formata telefone no padrão (00) 00000-0000
  const formatarTelefone = (value) => {
    let telefoneNumeros = value.replace(/\D/g, "");
    telefoneNumeros = telefoneNumeros.slice(0, 11);

    if (telefoneNumeros.length <= 2) {
      telefoneNumeros = telefoneNumeros.replace(/^(\d{0,2})/, "($1");
    } else if (telefoneNumeros.length <= 6) {
      telefoneNumeros = telefoneNumeros.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
    } else {
      telefoneNumeros = telefoneNumeros.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    }

    return telefoneNumeros;
  };

  const converterFotoParaBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const enviarDados = async (fotoBase64) => {
    try {
      const response = await fetch("https://localhost:3333/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          CPF: cpf.replace(/\D/g, ""),
          nome,
          data_nascimento: dataNascimento,
          telefone: telefone.replace(/\D/g, ""),
          email,
          senha,
          foto: fotoBase64,
          conta,
          agencia,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Cadastro bem-sucedido!");
        navigate("/login");
      } else {
        alert("Erro ao cadastrar: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar ao servidor.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    if (senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (cpf.replace(/\D/g, "").length !== 11) {
      alert("CPF inválido. Por favor, insira 11 números.");
      return;
    }

    if (telefone.replace(/\D/g, "").length !== 11) {
      alert("Telefone inválido. Por favor, insira 11 números.");
      return;
    }

    let fotoBase64 = "";
    if (fotoPerfil) {
      fotoBase64 = await converterFotoParaBase64(fotoPerfil);
    }

    enviarDados(fotoBase64);
  };

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <h2> Cadastre-se </h2>

        <div className="input-group">
          <label htmlFor="nome"> Nome </label>
          <input
            type="text"
            id="nome"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email"> E-mail </label>
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
          <label htmlFor="dataNascimento"> Data de Nascimento </label>
          <input
            type="date"
            id="dataNascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="cpf"> CPF </label>
          <input
            type="text"
            id="cpf"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(e) => setCpf(formatarCPF(e.target.value))}
            maxLength={14}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="telefone"> Telefone </label>
          <input
            type="tel"
            id="telefone"
            placeholder="(00) 00000-0000"
            value={telefone}
            onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
            maxLength={15}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="conta">Número da Conta</label>
          <input
            type="text"
            id="conta"
            placeholder="Digite o número da sua conta"
            value={conta}
            onChange={(e) => setConta(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="agencia">Número da Agência</label>
          <input
            type="text"
            id="agencia"
            placeholder="Digite o número da sua agência"
            value={agencia}
            onChange={(e) => setAgencia(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="senha"> Senha </label>
          <input
            type="password"
            id="senha"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirmar-senha"> Confirmar Senha </label>
          <input
            type="password"
            id="confirmar-senha"
            placeholder="Confirme sua senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="fotoPerfil"> Foto de Perfil </label>
          <input
            type="file"
            id="fotoPerfil"
            accept="image/*"
            onChange={(e) => setFotoPerfil(e.target.files[0])}
          />
        </div>

        <button type="submit" className="cadastro-btn">
          Cadastrar
        </button>

        <p className="login-link">
          Já tem uma conta? <Link to="/login"> Faça login </Link>
        </p>
      </form>
    </div>
  );
}

export default Cadastro;
