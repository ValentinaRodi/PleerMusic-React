import  './menu.css'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import logo from './LogoWhite.png'
import { getTracksAll } from '../../../backend/getTracks';

export default function Menu(props) {
    const [displayMenu, setClickedDisplayMenu] = useState('');
    const navigate = useNavigate()

    const openBurgerMenu = () => {
       displayMenu ? setClickedDisplayMenu('') : setClickedDisplayMenu('click-state')
    }

    const goToTracks = () => {
        props.setCurrentPlaylistTitle('Tracks')
        props.clearTracks()
        getTracksAll()
        .then((res) => { props.setTracks(res.results) })
    }

    const openFavoriteTracks = () => {
        console.log('>> Loading Favorite Tracks...')
    }

    const logOut = () => {
        navigate('/', {replace: true})
    }

    return (
        <div className="left_side_menu">
            <Link to='/MainPage' className="burger_menu_a"><img className="logo" src={logo} alt="logo"/></Link>
            <div className="nav__burger burger" onClick={openBurgerMenu}>
                <span className="burger__line"></span>
                <span className="burger__line"></span>
                <span className="burger__line"></span>
            </div>
            <div className={displayMenu || 'burger_menu'}>
                <button className="burger_menu-button" onClick={goToTracks}>Главное</button>
                <button className="burger_menu-button" onClick={openFavoriteTracks} disabled>Мои треки</button>
                <button className="burger_menu-button" onClick={logOut}>Выйти</button>
            </div> 
        </div>
    )
  }