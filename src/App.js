import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home';
import CreateUser from './pages/CreateUser';
import NavBar from './components/NavBar';
import View from './pages/View';

export const URL = process.env.REACT_APP_SERVER_URL;
function App() {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:user' element={<CreateUser />} />
      <Route path='/view' element={<View />} />
    </Routes>
    </>
  );
}

export default App;
