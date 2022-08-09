import  './menu.css'
import { useState } from 'react';
import { Link } from "react-router-dom"
import logo from './LogoWhite.png'

export default function Menu() {
    const [displayMenu, setClickedDisplayMenu] = useState('');

    function handleDisplayMenu() {
       displayMenu ? setClickedDisplayMenu('') : setClickedDisplayMenu('click-state')
    }

    function handleExit() {
        localStorage.getItem('')
    }

    return (
        <div className="left_side_menu">
            <img className="logo" src={logo} alt="logo"/>
            <div className="nav__burger burger" onClick={handleDisplayMenu}>
                <span className="burger__line"></span>
                <span className="burger__line"></span>
                <span className="burger__line"></span>
            </div>

            <div className={displayMenu || 'burger_menu'}>
                <Link to='/MainPage' className="burger_menu_a">Главное</Link>
                <Link to='/MainPage' className="burger_menu_a">Мои треки</Link>
                <Link to='/' className="burger_menu_a" onClick={handleExit}>Выйти</Link>
            </div> 
        </div>
    )
  }