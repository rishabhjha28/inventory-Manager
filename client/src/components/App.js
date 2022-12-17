import '../App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './Home';
import Inup from './Inup';
import WrongCredentials from './WrongCredentials';
import Product from './Product';
import Category from './Category';
import PageNotFound from './PageNotFound';
import ForgotPassword from './ForgotPassword';
import RequireAuth from '../RequireAuth';

function App() {
  return (
    <div>
      <Routes>
        <Route path = '/' element={<Home/>} />
        <Route path = 'signup' element={<Inup purpose = {'signup'}/>} />
        <Route path = 'login' element={<Inup purpose = {'login'}/>} />
        <Route path = 'wrong-credentials' element={<WrongCredentials/>} />
        <Route path = 'product/:email' element = {<RequireAuth><Product/></RequireAuth> }/>
        <Route path = 'category/:email' element = {<RequireAuth><Category/></RequireAuth>}/>
        <Route path = 'forgot-password' element = {<ForgotPassword/>}/>
        <Route path = '*' element = {<PageNotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
