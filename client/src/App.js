import {Route, Routes} from "react-router-dom";
import AuthForm from "./components/AuthForm";
import {AuthProvider, RequireAuth} from "./auth/Auth";
import {Layout} from "./components/Layout";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<h3>Public</h3>}/>
              <Route path="/login" element={<AuthForm/>}/>
              <Route path="/test" element={<div>Unprotected Page</div>}/>
              <Route path="/protected" element={<RequireAuth><h3>Protected Page</h3></RequireAuth>}/>
            </Route>
          </Routes>
        </AuthProvider>
      </header>
    </div>
  );
}

export default App;
