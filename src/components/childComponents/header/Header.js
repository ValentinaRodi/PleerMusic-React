import { useState } from 'react'
import  './header.css'


export default function Header(props) {
    const [userLogin, setUserLogin] = useState(localStorage.getItem('user'))

    const handleSearchChange = (event) => {
        console.log(`> Search: ${event.target.value}`)
        props.setSearchText(event.target.value)
    }

    return (
      <div className="header">
      <img className="search_icon"src="img/icon/search.svg" alt=""/>
      <div className="input_avatar_block">
          <input placeholder="Поиск" type="text" className="search" onChange={handleSearchChange}/>
          <div className="avatar_block">
              <p className="user_name">{userLogin}</p>
              <div className="avatar"></div>
          </div>
      </div>
      <p className="header_title">{props.title}</p>
      <div className="search_by_block">
          <p className="search_by">Искать по:</p>
          <button className="search_by_button search_by_songer">исполнителю</button>
          <button className="search_by_button search_by_date">году выпуска</button>
          <button className="search_by_button search_by_genre">жанру</button>
      </div>

      <div className="header_tracks_wrap">
          <div className="content__title playlist-title">
              <div className="playlist-title__col col01">Трек</div>
              <div className="playlist-title__col col02">ИСПОЛНИТЕЛЬ</div>
              <div className="playlist-title__col col03">АЛЬБОМ</div>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="6" cy="6" r="5.5" stroke="#696969"/>
                  <path d="M4 6H6.5V2.5" stroke="#696969"/>
              </svg>    
          </div>
      </div>

  </div> 
    )
  }