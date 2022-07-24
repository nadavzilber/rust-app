import React from "react";
import {Route, Routes} from "react-router-dom";
import AuthForm from "./components/AuthForm";
import {AuthProvider, RequireAuth} from "./auth/Auth";
import {Layout} from "./components/Layout";
import './App.css';
import Dashboard from "./components/Dashboard";
import EmailList from "./components/EmailList";
import EmailForm from "./components/EmailForm";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      {/*<header className="App-header">*/}
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<AuthForm/>}/>
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
      {/*</header>*/}
    </div>
  );
}

export default App;
