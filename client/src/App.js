import React from "react";
import {Route, Routes} from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import {AuthProvider, RequireAuth} from "./auth/Auth";
import {Layout} from "./components/Layout/Layout";
import './App.css';
import EmailsPage from "./components/Emails/Dashboard";
import EmailList from "./components/Emails/EmailList";
import EmailForm from "./components/Emails/EmailForm";
import Home from "./components/Home/Home";
import {ProfilePage} from "./components/Profile/ProfilePage";

function App() {
  return (
    <div className="App">
      {/*<header className="App-header">*/}
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home/>}/>
              <Route path="login" element={<AuthForm/>}/>
              <Route path="emails" element={<RequireAuth>
                <EmailsPage/>
              </RequireAuth>}> {/* nested routes are automatically protected by RequireAuth */}
                <Route path="view" element={<EmailList/>}/>
                <Route path="send" element={<EmailForm/>}/>
                <Route path="profile" element={<ProfilePage/>}/>
                {/* This is another element that can be rendered alongside with Emails
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
