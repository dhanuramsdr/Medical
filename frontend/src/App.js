
import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';

import Register from './Register'
import Login from './login';
import Addtablet from './Addtablet';

import Addoinment from './Addoinment';
import Tabletlist from './Tabletlist';
import Oinmentlist from './Oinmentlist';
import Addsyrup from './Addsyrup';
import Syruplist from './Syruplist';
import Billsection from './Billsection';
import Updatetablets from './updateTablet';
import Updateoinment from './updateOinment';
import Updatesyrup from './updateSyrup';
import Sample2 from './practics/Sample2';
import Sample3 from './practics/Sample3';
import Practics from './practics/Practics';
function App() {
  // <h2 className='text-center'>Add tablet</h2>
  //   <div className=' min-h flex items-center justify-center bg-red-300  '></div>
  return (
    <div className="App" >
         <BrowserRouter>
 <Routes>
  <Route path='/Register' element={<Register/>}></Route>
  <Route path='/' element={<Login/>}></Route>  
  <Route path='/home' element={<Home/>}></Route>
  
  <Route path='/addtablet' element={<Addtablet/>}></Route>
  <Route path='/tablettlist' element={<Tabletlist/>}></Route>
  <Route path='/addoinment' element={<Addoinment/>}></Route>
  <Route path='/oinmentlist' element={<Oinmentlist/>}></Route>
  <Route path='/addsyrup' element={<Addsyrup/>}></Route>
  <Route path='/syruplist' element={<Syruplist/>}></Route>
  <Route path='/billsection' element={<Billsection/>}></Route>
  <Route path='/updatetablets/:id' element={<Updatetablets/>}></Route>
  <Route path='/updateoinment/:id' element={<Updateoinment/>}></Route>
  <Route path='/uxpdatesyrup/:id' element={<Updatesyrup/>}></Route>
  <Route path='/sample2' element={<Sample2/>}></Route>
  <Route path='/sample3' element={<Sample3/>}></Route>
  <Route path='/Practics' element={<Practics/>}></Route>





  




 


 
 </Routes >
 </BrowserRouter>    
  
    
    </div>
  )
}
export default App;
// axios
// .post('http://localhost:6050/api/v1/login/logout') // This is just an example. You need to replace this with your actual logout endpoint
// .then((res) => {
//   console.log(res);
//   // After successful logout, you might want to clear any user-related data in your app and redirect the user to the login page or elsewhere.
//   navigate('/');
// })
// .catch((err) => console.log(err));
// };