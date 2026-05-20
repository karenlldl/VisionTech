import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlataformaHome from "./pages/platform/PlataformaHome/PlataformaHome";
import FormCadastro from "./pages/platform/FormCadastro/FormCadastro";
import CadastroEnviado from "./pages/platform/CadastroEnviado/CadastroEnviado";
import LoginPlataforma from "./pages/platform/LoginPlataforma/LoginPlataforma";
import Admin from "./pages/platform/Admin/Admin";
import AdminAgenda from "./pages/platform/AdminAgenda/AdminAgenda";
import NovoPaciente from "./pages/platform/NovoPaciente/NovoPaciente";
import AdminDashboards from "./pages/platform/AdminDashboards/AdminDashboards";
import Equipe from "./pages/platform/Equipe/Equipe";
import CadastrarFuncionario from "./pages/platform/CadastrarFuncionario/CadastrarFuncionario";
import Dentista from "./pages/platform/Dentista/Dentista";
import DentistaAgenda from "./pages/platform/DentistaAgenda/DentistaAgenda";
import DentistaAtendimentos from "./pages/platform/DentistaAtendimentos/DentistaAtendimentos";
import DentistaHistorico from "./pages/platform/DentistaHistorico/DentistaHistorico";
import CadastrarDentista from "./pages/platform/CadastrarDentista/CadastrarDentista";
import ConviteEnviado from "./pages/platform/ConviteEnviado/ConviteEnviado";
import DefinirSenha from "./pages/platform/DefinirSenha/DefinirSenha";
import NotFound from "./pages/platform/NotFound/NotFound";


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

         <Route path="/definir-senha" element={<DefinirSenha />} />

         <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;