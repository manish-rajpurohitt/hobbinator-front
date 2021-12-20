import './App.css';
import Homepage from './components/Homepage/index';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { createContext, useReducer } from 'react';
import { initialState, reducer } from './components/reducers/UseReducer';
import ForgotPassword from './components/ForgotPasswordPage';
import Dashboard from './components/Dashboard';
import ResetPassword from './components/ResetPassword';
import ProfilePage from './components/ProfilePage/ProfilePage';

export const Usercontext = createContext();

function App(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Usercontext.Provider value={{state, dispatch}}>
      <Router>
           <div className="App">
           <Routes>
            <Route exact path='/' element={<Homepage />}></Route>
            <Route exact path="/forgotPassword" element={<ForgotPassword/>}></Route>
            <Route exact path="/dashboard" element={<Dashboard/>}></Route>
            <Route exact path="/resetPassword/:id" element={<ResetPassword/>}></Route>
            <Route exact path="/profile" element={<ProfilePage/>}></Route>


          </Routes>
          </div>
       </Router>
       </Usercontext.Provider>
  );
}

export default App;
