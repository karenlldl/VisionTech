import { Outlet } from "react-router-dom";
import Footer from "../../components/site/Footer/Footer";
import Nav from "../../components/site/Nav/Nav";

const Layout = () => {
    return (
        <>
        <div className="min-h-screen bg-brand-mist text-brand-ink">
      <Nav />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
        </>
    )
}
export default Layout;