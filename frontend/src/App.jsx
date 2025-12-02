import { Routes, Route, Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Homepage from './Pages/Homepage'
import Recipelist from './Pages/Recipelist'
import Recipedetailpage from './Pages/Recipedetailpage'
import Submitdetailpage from './Pages/Submitdetailpage'
import AddtoCard from './Pages/AddtoCard'
import Loginpage from './Pages/Loginpage'
import Registerpage from './Pages/Registerpage'
import { RecipesProvider } from './context/RecipesContext'

// Layout that shows Navbar on all "main" pages
function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

function App() {
  return (
    <RecipesProvider>
      <Routes>
        {/* Routes that include the Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          {/* Mount Recipelist on /browse to match Navbar/Homepage/Footer links */}
          <Route path="/browse" element={<Recipelist />} />
          {/* Optional alias: keep old /recipelist path working too */}
          <Route path="/recipelist" element={<Recipelist />} />
          {/* Recipe detail page (expects an :id param) */}
          <Route path="/recipe/:id" element={<Recipedetailpage />} />
          {/* Submit recipe page */}
          <Route path="/submit" element={<Submitdetailpage />} />
          {/* Cart page */}
          <Route path="/cart" element={<AddtoCard />} />
        </Route>

        {/* Auth routes WITHOUT Navbar */}
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
      </Routes>
    </RecipesProvider>
  )
}

export default App
