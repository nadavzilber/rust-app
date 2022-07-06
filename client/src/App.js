import './App.css';
import AuthForm from "./components/AuthForm";
import {useState} from "react";
import {LOGIN_FORM, REGISTRATION_FORM} from "./constants";
import Home from "./components/Home";

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [authFormType, setAuthFormType] = useState(LOGIN_FORM)
  const [authFormTypeOpposite, setAuthFormTypeOpposite] = useState(REGISTRATION_FORM)

  const credentials = {
    email: "test@gmail.com",
    password: "123"
  }

  const toggleAuthForm = () => {
    setAuthFormType(authFormType === LOGIN_FORM ? REGISTRATION_FORM : LOGIN_FORM)
    setAuthFormTypeOpposite(authFormType === LOGIN_FORM ? LOGIN_FORM : REGISTRATION_FORM)
  }

  const authFormSubmitHandler = async (data) => {
    console.log('authFormSubmitHandler data:', data)
    // need to call login endpoint, then handle the response (alerts, redirects)
    mockLogin(data)
  }

  const mockLogin = (data) => {
    if (data.email === credentials.email && data.password === credentials.password) {
      alert('Successful login')
      setIsAuth(true)
    } else {
      alert('Unsuccessful login')
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {isAuth ?
          <Home setIsAuth={setIsAuth}/> :
          <AuthForm
              //submitHandler={authFormSubmitHandler}
              formType={authFormType}
              toggleAuthForm={toggleAuthForm}
              authFormTypeOpposite={authFormTypeOpposite}
          />
        }
      </header>
    </div>
  );
}

export default App;
