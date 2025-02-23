import style from "./index.module.css";
import logo from "../../assets/logo.png";
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cart from "../Cart/Cart";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaHome, FaTimes, FaUser, FaShopify, FaSignInAlt, FaSignOutAlt, FaSun, FaMoon, FaKey } from "react-icons/fa";
import { AuthContext } from "../../context/Auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import ButtonAdmin from "./ButtonAdmin";


const Header = () => {
  const { autenticarUsuario } = useContext(AuthContext);
  const [isadmin, setIsAdmin] = useState(false)
  const Auth = useContext(AuthContext)
  const { modoOscuro, setModoOscuro } = useContext(AuthContext)


  useEffect(() => {
    if (Auth.auth.id !== undefined) {
      toast.success('Session iniciada', { autoClose: 1500 });
      if (Auth.auth.role === "Admin" || Auth.auth.role === "Editor") {

        setIsAdmin(true)
      }


    } else {
      setIsAdmin(false)
    }

  }, [Auth.auth.id])




  const [isScrolled, setIsScrolled] = useState(false);

  // enlace para realizar un seguimiento de si el usuario se ha desplazado hacia abajo en la página o no
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  // Agregamos un detector de eventos al objeto de la ventana para escuchar los eventos de desplazamiento y actualizar el estado.
  window.addEventListener("scroll", handleScroll);

  const [clicked, setClicked] = useState(false)

  const handelModocuro = () => {

    setModoOscuro(!modoOscuro)

  }
  const handleClick = () => {
    //cuando esta true lo pasa al false y viceversa
    setClicked(!clicked);

  }
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  }

  const handlerSingOut = () => {
    toast.error('Session cerrada', { autoClose: 1500 });

    localStorage.removeItem('_id'); // Elimina el _id del almacenamiento local
    autenticarUsuario(); // Llama a autenticarUsuario desde el contexto para actualizar el estado de autenticación

  };
  const location = useLocation();
  console.log(location)
  return (

    <>

      <header className={`${style.header} ${isScrolled ? style.scrolled : ""}`}>

        <div className={style.burguer}>

          {clicked ? (

            <motion.div
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FaTimes className={`${style.navicon} }`} onClick={handleClick} />
            </motion.div>

          ) :
            <motion.div

              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FaBars className={`${style.navicon} }`} onClick={handleClick} />
            </motion.div>
          }
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            delay: 0.2
          }}


          className={` ${isScrolled ? style.logoScroll : style.logo}`}>

          <Link to="NavajaFina/">
            <img src={logo} alt="logo" />
          </Link>

        </motion.div>
        <nav onClick={handleLinkClick} className={`${style.nav1} }`}>
          <Link to="NavajaFina/" className={location.pathname === "/NavajaFina/" ? style.Active : ""} ><FaHome /> INICIO</Link>

          <Link to='NavajaFina/products' className={location.pathname === "/NavajaFina/products" ? style.Active : ""}><FaShopify /> PRODUCTOS</Link>
          {isadmin ? (
            <Link className={location.pathname === "/NavajaFina/admin" ? style.Active : ""} to="NavajaFina/admin"><FaKey />PANEL</Link>
          ) : null}
          {Auth.auth.id ? (
            <>
              <ToastContainer />
              <Link to='NavajaFina/perfil' className={location.pathname === "/NavajaFina/perfil" ? style.Active : ""}><FaUser /> PERFIL</Link>
              <Link onClick={handlerSingOut}><FaSignOutAlt />Cerrar Sesión</Link>
            </>
          ) : (
            <>
              <ToastContainer />
              <Link to="NavajaFina/login" className={location.pathname === "/NavajaFina/login" ? style.Active : ""}><FaSignInAlt />INICIAR SESIÓN</Link>
            </>
          )}
          <a onClick={handelModocuro} style={{ color: "#fff" }}>


            {!modoOscuro ?

              <FaMoon className={style.oscuro} />
              :
              <FaSun className={style.oscuro} />
            }



          </a>


        </nav>
        <AnimatePresence>
          {clicked ? (
            <motion.nav
              animate={{ y: "0%", opacity: 1 }}
              initial={{ y: "-100%", opacity: 0 }}
              exit={{ x: "-100%", opacity: 1 }}
              transition={{ duration: .5 }}
              onClick={handleLinkClick} className={`${style.nav} ${clicked ? isScrolled ? style.activeScroll : style.active : ""}`}>
              <Link onClick={handleClick} to="NavajaFina/"><FaHome /> INICIO</Link>

              <Link onClick={handleClick} to='NavajaFina/products'><FaShopify /> PRODUCTOS</Link>
              {isadmin ? (
                <Link className={location.pathname === "/NavajaFina/admin" ? style.Active : ""} to="NavajaFina/admin"><FaKey />PANEL</Link>
              ) : null}
              {Auth.auth.id ? (
                <>
                  <ToastContainer />
                  <Link to='NavajaFina/perfil' className={location.pathname === "/NavajaFina/perfil" ? style.Active : ""}><FaUser /> PERFIL</Link>
                  <Link onClick={handlerSingOut}><FaSignOutAlt />Cerrar Sesión</Link>
                </>
              ) : (
                <>
                  <ToastContainer />
                  <Link to="NavajaFina/login" className={location.pathname === "/NavajaFina/login" ? style.Active : ""}><FaSignInAlt />INICIAR SESIÓN</Link>
                </>
              )}

              <a onClick={handelModocuro} style={{ color: "#fff" }}>
                {!modoOscuro ? (


                  <>

                    <FaMoon className={style.oscuro} />
                    <p style={{ color: "#fff" }}>Modo Oscuro </p>
                  </>
                ) : (
                  <>

                    <FaSun className={style.oscuro} />
                    <p style={{ color: "#fff" }}>Modo Claro </p>
                  </>

                )}
              </a>

            </motion.nav>
          ) : null}
        </AnimatePresence>
        {Auth.auth?.role !== "Admin" && Auth.auth?.role !== "Editor" ? (

          location.pathname !== '/NavajaFina/cart' ? <Cart /> : null
        ) : (null)}
      </header >
    </>
  );
};

export default Header;
