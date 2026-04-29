import React from 'react'
import { RouterProvider } from 'react-router'
import { routes } from "./app.routes";
import {useSelector} from 'react-redux'
import { useAuth } from '../features/auth/hook/useAuth';
import { useEffect } from 'react';

import { Toaster } from 'react-hot-toast';

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const App = () => {

  const {handleGetMe} = useAuth();
const user = useSelector(state => state.auth.user)
console.log(user)

useEffect(() => {
  handleGetMe();
},[])

useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return () => {
    lenis.destroy();
  };
}, []);

  const { loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div style={{ 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#faf9f7',
          fontFamily: 'serif',
          fontSize: '24px',
          letterSpacing: '0.2em',
          color: '#0a0a0a'
      }}>
          SNITCH
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={routes} />
    </div>
  )
}

export default App