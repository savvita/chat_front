

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Authorization from './layouts/Authorization';
import Index from './layouts/Index';
import Main from './layouts/Main';
import Subscriptions from './layouts/Subscriptions';
import Admin from './layouts/Admin';
import Users from './layouts/Users';
import Request from './layouts/Request/Request';
import UserProfile from './components/UserProfile';
import TextRequest from './layouts/TextRequest';
import ImageRequest from './layouts/ImageRequest';
import VoiceRequest from './layouts/VoiceRequest';
import About from './layouts/About';
import MyRequests from './layouts/MyRequests';
import Shoppings from './layouts/Shoppings';
import UserShopping from './layouts/UserShopping';
import Landing from './layouts/Landing';



function App() {
  return (
    <div className="container-fluid p-0 m-0">
      <Router>
        <Routes>  
          <Route path="/" exact element={ <Landing /> } />  
          <Route path="/" element={ <Main /> }>    
              <Route path="signin" element={ <Authorization signIn /> } />  
              <Route path="signup" element={ <Authorization signUp /> } /> 
              <Route path="subscriptions" element={ <Subscriptions /> } /> 
              <Route path="profile" element={ <UserProfile /> } /> 
              <Route path="myrequests" element={ <MyRequests /> } /> 
              <Route path="about" element={ <About /> } /> 
            </Route>
            <Route path="/admin" element={ <Admin /> }>
              <Route path="users" element={ <Users /> }>
              </Route>
              <Route path="users/:id" element={ <UserShopping /> } />
              <Route path="sales" element={ <Shoppings /> } />
            </Route>
            <Route path="/request" element={ <Request /> }>
              <Route path="text" element={ <TextRequest /> } /> 
              <Route path="image" element={ <ImageRequest /> } /> 
              <Route path="voice" element={ <VoiceRequest /> } /> 
            </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
