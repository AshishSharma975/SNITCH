import React from 'react'
import { RouterProvider } from 'react-router'
import { routes } from "./app.routes";
const App = () => {
  return (
    <div className='text-amber-300'>
      <RouterProvider router={routes} />
    </div>
  )
}

export default App