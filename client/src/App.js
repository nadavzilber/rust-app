import React from "react";
import {Route, Routes} from "react-router-dom";
import LoginForm from "./components/Auth/LoginForm";
import {AuthProvider, RequireAuth} from "./auth/Auth";
import {Layout} from "./components/Layout/Layout";
import './App.css';
import Dashboard from "./components/Dashboard/Dashboard";
import SentEmails from "./components/Emails/SentEmails";
import ComposeEmail from "./components/Emails/ComposeEmail";
import Home from "./components/Home/Home";
import {Profile} from "./components/Profile/Profile";
import {ViewProfile} from "./components/Profile/ViewProfile";
import {EditProfile} from "./components/Profile/EditProfile";

function App() {
  return (
    <div className="App">
      {/*<header className="App-header">*/}
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home/>}/>
              <Route path="login" element={<LoginForm/>}/>
              <Route path="dashboard" element={<RequireAuth>
                <Dashboard/>
              </RequireAuth>}> {/* nested routes are automatically protected by RequireAuth */}
                <Route path="sent-emails" element={<SentEmails/>}/>
                <Route path="compose-email" element={<ComposeEmail/>}/>
                <Route path="profile" element={<Profile/>}>
                  {/* This is another element that can be rendered alongside with Profile */}
                  {/* <Route index element={<div>Profile default index page</div>} /> */}
                  <Route path="view" element={<ViewProfile/>}/>  {/* TODO: fix the index */}
                  <Route path="edit" element={<EditProfile/>}/>
                </Route>
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
