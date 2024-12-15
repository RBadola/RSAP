
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './App.css'
import RegisterPage from './components/RegisterPage'


function App() {

  return (
    <section className='w-full min-h-screen flex items-center justify-center'>
      
    <RegisterPage/>
    
    </section>
    // <RouterProvider router={router} />
    // <HeroSection/>
  )
}

export default App
