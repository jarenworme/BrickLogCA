import React from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import Router from './components/routes/routes';
import NavBar from './components/navigation/NavBar';
import ScrollToTop from './components/navigation/ScrollToTop';

function App() {
  // Paths for the navbar to disappear
  const noNavBarRoutes = ['/', '/about', '/payments', '/404'];

  // Dynamic paths to match
  const dynamicRoutes = ['/auth/:register'];

  const location = useLocation();

  // Check if the current path matches any in the static list
  const isStaticRoute = noNavBarRoutes.includes(location.pathname);

  // Check if the current path matches any dynamic route
  const isDynamicRoute = dynamicRoutes.some((route) => matchPath(route, location.pathname));

  // Determine if the navbar should be shown
  const showNavBar = !(isStaticRoute || isDynamicRoute);
  
  return (
    <div className="App">
      <ScrollToTop />
      {showNavBar && <NavBar />}
      <Router />
    </div>
  );
}

export default App;
