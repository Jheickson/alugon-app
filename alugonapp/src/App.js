import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import Home from './pages/Home';
import Header from './pages/Header';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import SpaceDetail from './pages/SpaceDetail';
import Footer from './pages/Footer';
import Perfil from './pages/Perfil';
import MeusEspacos from './pages/MeusEspacos';
import NovoAluguel from './pages/NovoAluguel';
import Faturas from './pages/Faturas';
import Pagamento from './pages/Pagamento';
import NovoEspaco from './pages/NovoEspaco';
import EdicaoUsuario from './pages/EdicaoUsuario';
import RecuperarEmail from './pages/RecuperarEmail';
import VerificarCodigo from './pages/VerificarCodigo';
import NovaSenha from './pages/NovaSenha';
function App() {
  return (
    <AuthProvider> 
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/espacos" element={<MeusEspacos />} />
          <Route path="/space/:id" element={<SpaceDetail />} /> 
          <Route path="/perfil" element={<Perfil />} /> 
          <Route path="/faturas" element={<Faturas />} /> 
          <Route path="/novo-aluguel/:id" element={<NovoAluguel />} /> 
          <Route path="/pagamento/:id" element={<Pagamento />} />
          <Route path="/novo-espaco" element={<NovoEspaco />}/>
          <Route path="/editar-espaco/:id" element={<NovoEspaco />}/>
          <Route path="/editar-usuario/:id" element={<EdicaoUsuario />}/>
          <Route path="/recuperar" element={<RecuperarEmail />} />
          <Route path="/recuperar/codigo" element={<VerificarCodigo />} />
          <Route path="/recuperar/nova-senha" element={<NovaSenha />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider> 
  );
}

export default App;
