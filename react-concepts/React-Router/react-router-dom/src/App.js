import {BrowserRouter,Routes,Route,Link, NavLink} from "react-router-dom"
import './App.css';
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
// import Dashboard from "./Dashboard/Dashboard";  (nested if)
import Profile from "./Dashboard/Profile";
import Settings from "./Dashboard/Settings";
// import Login from "./programmatic/Login";
import ProtectedRoute from "./Proteced-routes/ProtectedRoute";
import Login from "./Proteced-routes/Login";
import Dashboard from "./Proteced-routes/Dashboard";
import { useState } from "react";

function App() {
  const[isAuth,setIsAuth]=useState(null)
  return (
    <div className="App">

      {/* simple routing */}
     {/* <BrowserRouter>
       <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>  | <NavLink to="/contact" style={({isActive})=>({fontWeight:isActive?"bold":"normal"})}>Contact</NavLink>
       </nav>
       <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />}/>
       </Routes>
     </BrowserRouter> */}


     {/* Nested Routes-dashboard parent */}
      {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="profile" element={<Profile />}/>
        <Route path="settings" element={<Settings />} />
      </Routes>
      </BrowserRouter> */}
      {/* <BrowserRouter>
       <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </BrowserRouter> */}
      <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |
        <Link to="/login">Login</Link> |
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login  setIsAuth={setIsAuth} />} />
        <Route path="/dashboard" element={
          <ProtectedRoute isAuth={isAuth}>
            <Dashboard />
          </ProtectedRoute>
         } />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
