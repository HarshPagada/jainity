import Sidebar from './components/Navbar';
import Navbar from './components/Sidebar';
import Backdrop from './components/Backdrop';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Sangh from './components/Sangh';
import About from './components/About';
import Signin from './components/Signin';
import Laabh from './components/Laabh';
import Contact from './components/Contact';
import BackdropSangh from './components/BackdropSangh';
import SidebarSangh from './components/SidebarSangh';
import SidebarLaabh from './components/SidebarLaabh';
import BackdropLaabh from './components/BackdropLaabh';
import Donate from './components/Donate';

function App() {

  const [sidebar, setsidebar] = useState(false);
  const [sanghbar, setsanghbar] = useState(false);
  const [laabhbar, setlaabhbar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sanghData, setSanghData] = useState([]);
  const [selectedLaabh, setSelectedLaabh] = useState('');
  const [selectedsangh, setselectedSangh] = useState('');
  const [totalsangh, settotalSangh] = useState('');
  const [totallaabh, settotalLaabh] = useState('');

  const toggleSidebar = () => {
    setsidebar((prevState) => !prevState);
  }

  const toggleSangh = () => {
    setsanghbar((prevState) => !prevState);
  }

  const toggleLaabh = () => {
    setlaabhbar((prevState) => !prevState);
  }

  return (
    <div>
        <BrowserRouter>
          <Sidebar opensidebar={toggleSidebar} closesidebar={toggleSidebar} />
          <Backdrop sidebar={sidebar} closesidebar={toggleSidebar} />
          <Navbar sidebar={sidebar} toggleNavbar={toggleSidebar} closesidebar={toggleSidebar} />

          <SidebarSangh opensidebar={toggleSangh} sanghbar={sanghbar} sanghData={sanghData} closesidebar={toggleSangh} setselectedSangh={setselectedSangh} settotalSangh={settotalSangh} selectedsangh={selectedsangh} setLoading={setLoading} />
          <BackdropSangh sanghbar={sanghbar} closesidebar={toggleSangh} />

          <SidebarLaabh opensidebar={toggleLaabh} laabhbar={laabhbar} sanghData={sanghData} closesidebar={toggleLaabh} setSelectedLaabh={setSelectedLaabh} selectedLaabh={selectedLaabh} settotalLaabh={settotalLaabh} setLoading={setLoading} />
          <BackdropLaabh laabhbar={laabhbar} closesidebar={toggleLaabh} />

          <Routes>
            <Route exact path="/" element={<Sangh opensidebar={{ toggleSangh, toggleLaabh }} setSanghData={setSanghData} loading={loading} setLoading={setLoading} selectedLaabh={selectedLaabh} selectedsangh={selectedsangh} totalsangh={totalsangh} totallaabh={totallaabh} />} />
            <Route exact path="/Laabh" element={<Laabh />} />
            <Route exact path="/About" element={<About />} />
            <Route exact path="/Contact" element={<Contact />} />
            <Route exact path="/Signin" element={<Signin />} />
            <Route exact path="/Donate" element={<Donate />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
