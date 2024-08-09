import { Outlet, Link } from "react-router-dom";

const NavBar = () => {
   return (
      <>
         <nav class="navbar navbar-expand-sm bg-info navbar-dark">
            <a class="navbar-brand" href="/">Appolo Hospitals</a>

            <ul class="nav navbar-nav">
               <li class="nav-item">
                  <Link className="linkClass" to="/">Home</Link>
               </li>
               <li class="nav-item">
                  <Link className="linkClass" to="/doctors">Doctors</Link>
               </li>
               <li class="nav-item">
                  <Link className="linkClass" to="/patients">Patients</Link>
               </li>
            </ul>
         </nav>
         <Outlet />
      </>
   )
}
export default NavBar;