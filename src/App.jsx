import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import Login from './Login'
import Navbar from './Navbar'
import Home from './Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './About'
import Contact from './Contact'
import Logout from './Logout'
import NewBlog from './NewBlog'
import Copy from './Copy'
import BlogDisplay from './BlogDisplay'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/Home' element={<Home/>}/>
      <Route path='/About' element={<About/>}/>
      <Route path='/Contact' element={<Contact/>}/>
      <Route path='/Logout' element={<Logout/>}/>
      <Route path='/' element={<Login/>}/>
      <Route path='/NewBlog' element={<NewBlog/>}/>
      <Route path='/BlogDisplay/:id' element={<BlogDisplay/>}/>
     
    </Routes>
    </BrowserRouter>
    {/* <BlogDisplay/> */}
    {/* <NewBlog/> */}
    {/* <Copy/> */}
      {/* <Login/> */}
      {/* <Navbar/> */}
      {/* <Home/> */}
    </>
  )
}

export default App
