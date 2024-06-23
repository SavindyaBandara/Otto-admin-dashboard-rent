import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import Profile from './pages/Profile.jsx';
import Analytics from './pages/Analytics.jsx';
import ProductList from './pages/ProductList.jsx';
import Settings from './pages/Settings.jsx';
import AddVehicleForm from './pages/AddVehicleForm.jsx';
import AddLicenceForm from './pages/AddLicenceForm.jsx';
import Logout from './pages/Logout.jsx';
import AddServiceDetails from './pages/AddServiceDetails.jsx';
import Login from './pages/Login.jsx';

const AppLayout = () => {
  const location = useLocation();
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const PrivateRoute = ({ element }) => {
    return authToken ? element : <Navigate to='/' />;
  };

  return (
    <>
      {location.pathname !== '/' ? (
        <Sidebar>
          <Routes>
            <Route
              path='/dashboard'
              element={<PrivateRoute element={<Dashboard />} />}
            />
            <Route
              path='/profile'
              element={<PrivateRoute element={<Profile />} />}
            />
            <Route
              path='/addvehicle'
              element={<PrivateRoute element={<AddVehicleForm />} />}
            />
            <Route
              path='/analytics'
              element={<PrivateRoute element={<Analytics />} />}
            />
            <Route
              path='/add-license'
              element={<PrivateRoute element={<AddLicenceForm />} />}
            />
            <Route
              path='/settings'
              element={<PrivateRoute element={<Settings />} />}
            />
            <Route
              path='/productList'
              element={<PrivateRoute element={<ProductList />} />}
            />
            <Route
              path='/logout'
              element={<PrivateRoute element={<Logout />} />}
            />
            <Route
              path='/add-service/:carId'
              element={<PrivateRoute element={<AddServiceDetails />} />}
            />
            <Route
              path='/edit-service/:carId'
              element={<PrivateRoute element={<AddServiceDetails />} />}
            />
          </Routes>
        </Sidebar>
      ) : (
        <Routes>
          <Route path='/' element={<Login/>} />
        </Routes>
      )}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;