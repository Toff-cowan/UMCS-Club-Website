import '../pages/Projects.css';
import Footer from './Frame/Footer.jsx';
import Header from './Frame/Header.jsx';
import Navbar from './Frame/Navbar.jsx';
import Projects from '../pages/Projects.jsx';

export default function Layout() {
  return (
    <div className="layout-root">
      <Navbar />
      <Header />
      <Projects />
      <Footer />
    </div>
  );
}
