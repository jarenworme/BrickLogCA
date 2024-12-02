import React from 'react';
import { useLocation } from 'react-router-dom';
import Router from './components/routes/routes';
import NavBar from './components/navigation/NavBar';
import ScrollToTop from './components/navigation/ScrollToTop';

function App() {
  // set up location variable to get pathname
  const location = useLocation();

  // paths for the navbar to disappear
  const noNavBarRoutes = ['/', '/about', '/auth', '/404'];

  // set up variable to determine needing a nav bar based on provided routes
  const showNavBar = !noNavBarRoutes.includes(location.pathname);

  return (
    <div className="App">
      <ScrollToTop />
      {showNavBar && <NavBar />}
      <Router />
    </div>
  );
}

export default App;
