import  './header.css'


export default function Header() {
    return (
      <div class="header">
      <img class="search_icon"src="img/icon/search.svg" alt=""/>
      <div class="input_avatar_block">
          <input placeholder="Поиск" type="text" class="search"/>
          <div class="avatar_block">
              <p class="user_name">Джек Ричер</p>
              <div class="avatar"></div>
          </div>
      </div>
      <p class="header_title">Треки</p>
      <div class="search_by_block">
          <p class="search_by">Искать по:</p>
          <button class="search_by_button search_by_songer">исполнителю</button>
          <button class="search_by_button search_by_date">году выпуска</button>
          <button class="search_by_button search_by_genre">жанру</button>
      </div>

      <div class="header_tracks_wrap">
          <div class="content__title playlist-title">
              <div class="playlist-title__col col01">Трек</div>
              <div class="playlist-title__col col02">ИСПОЛНИТЕЛЬ</div>
              <div class="playlist-title__col col03">АЛЬБОМ</div>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="6" cy="6" r="5.5" stroke="#696969"/>
                  <path d="M4 6H6.5V2.5" stroke="#696969"/>
              </svg>    
          </div>
      </div>

  </div> 
    )
  }