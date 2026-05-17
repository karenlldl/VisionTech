import { BrowserRouter, Routes, Route } from "react-router-dom";

import PlataformaHome from "./pages/PlataformaHome/PlataformaHome";
import FormCadastro from "./pages/FormCadastro/FormCadastro";
import CadastroEnviado from "./pages/CadastroEnviado/CadastroEnviado";
import LoginPlataforma from "./pages/LoginPlataforma/LoginPlataforma";
import Dentista from "./pages/Dentista/Dentista";
import Admin from "./pages/Admin/Admin";
import DentistaHistorico from "./pages/DentistaHistorico/DentistaHistorico";
import DentistaAtendimentos from "./pages/DentistaAtendimentos/DentistaAtendimentos";
import NovoPaciente from "./pages/NovoPaciente/NovoPaciente";
import AdminAgenda from "./pages/AdminAgenda/AdminAgenda";
import AdminDashboards from "./pages/AdminDashboards/AdminDashboards";
import DentistaAgenda from "./pages/DentistaAgenda/DentistaAgenda";
import Equipe from "./pages/Equipe/Equipe";
import CadastrarDentista from "./pages/CadastrarDentista/CadastrarDentista";
import CadastrarFuncionario from "./pages/CadastrarFuncionario/CadastrarFuncionario";
import ConviteEnviado from "./pages/ConviteEnviado/ConviteEnviado";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlataformaHome />} />
        <Route path="/cadastro" element={<FormCadastro />} />
        <Route path="/cadastro-enviado" element={<CadastroEnviado />} />
        <Route path="/login" element={<LoginPlataforma />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/agenda" element={<AdminAgenda />} />
        <Route path="/admin/novo-paciente" element={<NovoPaciente />} />
        <Route path="/admin/dashboards" element={<AdminDashboards />} />
        <Route path="/admin/equipe" element={<Equipe />} />
        <Route path="/admin/equipe/cadastrar-funcionario" element={<CadastrarFuncionario />} />
        <Route path="/dentista" element={<Dentista />} />
        <Route path="/dentista/agenda" element={<DentistaAgenda />} />
        <Route path="/dentista/atendimentos" element={<DentistaAtendimentos />} />
        <Route path="/dentista/historico" element={<DentistaHistorico />} />
        <Route path="/admin/equipe/cadastrar-dentista" element={<CadastrarDentista />} />
        <Route path="/admin/equipe/convite-enviado" element={<ConviteEnviado />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;