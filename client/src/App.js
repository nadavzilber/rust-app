import {Route, Routes} from "react-router-dom";
import AuthForm from "./components/AuthForm";
import {AuthProvider, RequireAuth} from "./auth/Auth";
import {Layout} from "./components/Layout/Layout";
import './App.css';
import Dashboard from "./components/Dashboard";
import EmailList from "./components/Dashboard/EmailList";
import EmailForm from "./components/Dashboard/EmailForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<h3>Welcome Home</h3>}/>
              <Route path="/login" element={<AuthForm/>}/>
              <Route path="/test" element={<div>Unprotected Page</div>}/>
              <Route path="emails" element={<RequireAuth><Dashboard/></RequireAuth>}>
                <Route path="view" element={<EmailList/>}/>
                <Route path="send" element={<EmailForm />}/>
                {/* This is another element that can be rendered alongside with Dashboard
                <Route index element={<div>Emails default index page</div>} /> */}
              </Route>
              <Route path='*' element={<div>404 Page Not Found</div>} />
            </Route>
          </Routes>
        </AuthProvider>
      </header>
    </div>
  );
}

export default App;
