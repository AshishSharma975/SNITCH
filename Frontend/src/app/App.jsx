import React from 'react'
import { RouterProvider } from 'react-router'
import { routes } from "./app.routes";
import {useSelector} from 'react-redux'
import { useAuth } from '../features/auth/hook/useAuth';
import { useEffect } from 'react';

import { Toaster } from 'react-hot-toast';

const App = () => {

  const {handleGetMe} = useAuth();
const user = useSelector(state => state.auth.user)
console.log(user)

useEffect(() => {
  handleGetMe();
},[])

  const {token} = useSelector((state) => state.auth);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={routes} />
    </div>
  )
}

export default App