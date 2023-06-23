import './App.css';
import Nav from './Nav';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Home from './Home';
import { GlobalProvider } from './GlobalContext';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
 

  return (
    <div className="App">

    <GlobalProvider>

      <BrowserRouter>
      <Nav/>
      <Routes>

        <Route exact path='/' element={ <Home /> }></Route>
        <Route path='/login' element={ <LogIn /> }></Route>
        <Route path='/signup' element={ <SignUp /> }></Route>

      </Routes>
      </BrowserRouter>

    </GlobalProvider>
    </div>
  );
}

export default App;
