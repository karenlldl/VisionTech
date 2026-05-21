import { BrowserRouter, Routes, Route } from "react-router-dom";

/* =========================
   SITE
========================= */

import Home from "./pages/site/Home/Home";
import Solucao from "./pages/site/Solucao/Solucao";
import FAQ from "./pages/site/Faq/Faq";
import Contato from "./pages/site/Contato/Contato";
import Time from "./pages/site/Time/Time";

/* =========================
   PLATFORM
========================= */

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
import CadastrarDentista from "./pages/platform/CadastrarDentista/CadastrarDentista";

import Dentista from "./pages/platform/Dentista/Dentista";
import DentistaAgenda from "./pages/platform/DentistaAgenda/DentistaAgenda";
import DentistaAtendimentos from "./pages/platform/DentistaAtendimentos/DentistaAtendimentos";
import DentistaHistorico from "./pages/platform/DentistaHistorico/DentistaHistorico";

import ConviteEnviado from "./pages/platform/ConviteEnviado/ConviteEnviado";
import DefinirSenha from "./pages/platform/DefinirSenha/DefinirSenha";

import NotFound from "./pages/platform/NotFound/NotFound";
import LayoutSite from "./layouts/LayoutSite/LayoutSite";
import Sobre from "./pages/site/Sobre/Sobre";
import FilaExterna from "./pages/platform/FilaExterna/FilaExterna";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* SITE ROUTES */}
        <Route element={<LayoutSite />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/solucao" element={<Solucao />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/time" element={<Time />} />
        </Route>

        {/* PLATFORM ROUTES */}

        <Route path="/plataforma" element={<PlataformaHome />} />

        <Route path="/cadastro" element={<FormCadastro />} />
        <Route path="/cadastro-enviado" element={<CadastroEnviado />} />

        <Route path="/login" element={<LoginPlataforma />} />

        {/* ADMIN */}

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/agenda" element={<AdminAgenda />} />
        <Route path="/admin/fila-externa" element={<FilaExterna />} />
        <Route path="/admin/novo-paciente" element={<NovoPaciente />} />
        <Route path="/admin/dashboards" element={<AdminDashboards />} />
        <Route path="/admin/equipe" element={<Equipe />} />

        <Route
          path="/admin/equipe/cadastrar-funcionario"
          element={<CadastrarFuncionario />}
        />

        <Route
          path="/admin/equipe/cadastrar-dentista"
          element={<CadastrarDentista />}
        />

        <Route
          path="/admin/equipe/convite-enviado"
          element={<ConviteEnviado />}
        />

        {/* DENTISTA */}

        <Route path="/dentista" element={<Dentista />} />

        <Route
          path="/dentista/agenda"
          element={<DentistaAgenda />}
        />

        <Route
          path="/dentista/atendimentos"
          element={<DentistaAtendimentos />}
        />

        <Route
          path="/dentista/historico"
          element={<DentistaHistorico />}
        />

        {/* RESET */}

        <Route path="/definir-senha" element={<DefinirSenha />} />

        {/* 404 */}

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;