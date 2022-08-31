import { useState, useEffect } from 'react'
import  './header.css'

export default function Header(props) {
    const [userLogin, setUserLogin] = useState(localStorage.getItem('user'))
    const [tracks, setTracks] = useState(props.tracks)

    const handleSearchChange = (event) => {
        // console.log(`> Search: ${event.target.value}`)
        props.setSearchText(event.target.value)
    }

    useEffect(() => {
        setTracks(props.tracks)
    }, [props.tracks])

    const [classNameAuthor, setClassNameAuthor] = useState('search_by_button', 'search_by_songer')
    const [classNameYear, setClassNameYear] = useState('search_by_button', 'search_by_songer')
    const [classNameGenre, setClassNameGenre] = useState('search_by_button', 'search_by_songer')

    const [filterIconAuthor, setFilterIconAuthor] = useState(0)
    const [filterIconYear, setFilterIconYear] = useState(0)
    const [filterIconGenre, setFilterIconGenre] = useState(0)

    const [selectAuthor, setSelectAuthor] = useState([])
    const [selectYear, setSelectYear] = useState([])
    const [selectGenre, setSelectGenre] = useState([])

    const [selectAuthorClass, setSelectAuthorClass] = useState('icon_filter')
    const [selectYearClass, setSelectYearClass] = useState('icon_filter')
    const [selectGenreClass, setSelectGenreClass] = useState('icon_filter')

    const [filterCountAuthor, setFilterCountAuthor] = useState(0)
    const [filterCountYear, setFilterCountYear] = useState(0)
    const [filterCountGenre, setFilterCountGenre] = useState(0)
    
    const [filterCountClassAuthor, setFilterCountClassAuthor] = useState('icon_counter_display')
    const [filterCountClassYear, setFilterCountClassYear] = useState('icon_counter_display')
    const [filterCountClassGenre, setFilterCountClassGenre] = useState('icon_counter_display')
    
    // функции отрисовки в Track по фильтру авторов/года/жанры
    function handleAuthorSelect(e) {
        
        handlerClickSelect(selectAuthorClass, setSelectAuthorClass)

        if (selectAuthor.includes(e.target.id)) {
            setSelectAuthor( selectAuthor.filter( author  => author !== e.target.id) )
            setFilterCountAuthor(filterCountAuthor - 1)
        } else {
            setSelectAuthor(selectAuthor.concat([e.target.id]))
            setFilterCountAuthor(filterCountAuthor + 1)   
        }
    }

    function handleYearSelect(e) {
        
        handlerClickSelect(selectYearClass, setSelectYearClass)

        if (selectYear.includes(e.target.id)) {
            setSelectYear( selectAuthor.filter( year  => year !== e.target.id) )
            setFilterCountYear(filterCountYear - 1)
        } else {
            setSelectYear(selectYear.concat([e.target.id]))
            setFilterCountYear(filterCountYear + 1)   
        }
    }

    function handleGenreSelect(e) {
        
        handlerClickSelect(selectGenreClass, setSelectGenreClass)

        if (selectGenre.includes(e.target.id)) {
            setSelectGenre( selectGenre.filter( genre  => genre !== e.target.id) )
            setFilterCountGenre(filterCountGenre - 1)
        } else {
            setSelectGenre(selectGenre.concat([e.target.id]))
            setFilterCountGenre(filterCountGenre + 1)   
        }
    }
    
    // функция изменения вида счетчика
    function addedFilterCountClassAuthor() {
        if (filterCountAuthor >= 1) {
            setFilterCountClassAuthor('icon_counter_author')
        } 
        if (filterCountAuthor === 0) {
            setFilterCountClassAuthor('icon_counter_display')
        }
    }

    function addedFilterCountClassYear() {
        if (filterCountYear >= 1) {
            setFilterCountClassYear('icon_counter_year')
        } 
        if (filterCountYear === 0) {
            setFilterCountClassYear('icon_counter_display')
        }
    }

    function addedFilterCountClassGenre() {
        if (filterCountGenre >= 1) {
            setFilterCountClassGenre('icon_counter_genre')
        } 
        if (filterCountAuthor === 0) {
            setFilterCountClassGenre('icon_counter_display')
        }
    }
    
    //для отслеживания изменений выбора авторов/года/жанры
    useEffect(() => {
        props.setFilterAuthors(selectAuthor)
    }, [selectAuthor])

    useEffect(() => {
        props.setFilterYears(selectYear)
    }, [selectYear])

    useEffect(() => {
        props.setFilterGenries(selectGenre)
    }, [selectGenre])
 
    //для отслеживания изменений счетчика авторов/года/жанры
    useEffect(() => {
        addedFilterCountClassAuthor()
    }, [filterCountAuthor])

    useEffect(() => {
        addedFilterCountClassYear()
    }, [filterCountYear])

    useEffect(() => {
        addedFilterCountClassGenre()
    }, [filterCountGenre])

    // сохранение авторов/года/жанров в объекты
    const resultTracksAuthor = []
    const resultTracksYear = []
    const resultTracksGenre = []
    const seenKeys = new Set()

    if (tracks !== null) {
        for (const row of tracks) {
            if (seenKeys.has(row.author)) continue
            resultTracksAuthor.push(row)
            seenKeys.add(row.author)
        }
    }

    if (tracks !== null) {
        for (const row of tracks) {
            if (seenKeys.has(row.year)) continue
            resultTracksYear.push(row)
            seenKeys.add(row.year)
        }
    }

    if (tracks !== null) {
        for (const row of tracks) {
            if (seenKeys.has(row.genre)) continue
            resultTracksGenre.push(row)
            seenKeys.add(row.genre)
        }
    }
 
    //функция изменения вида кнопки
    function haderClickFilter(className, setClassName, filterCount) {
        if(className === 'search_by_button') {
            setClassName('search_by_button_active') 
        } else {
            if(filterCount === 0) {
                setClassName('search_by_button')
            }
        }
    }

    //функция добавления/удаления плашки авторы/жанры/года
    function addedClickFilterButton(filterIcon, setFilterIcon, setClassNameButton) {
        if(filterIcon === 0) {
            setFilterIcon(1)
        } else {
            setFilterIcon(0)

            // if (filterCountClassAuthor === 0) {
            //     setClassNameButton('search_by_button', 'search_by_songer')
            // }
            // if (filterCountClassYear === 0) {
            //     setClassNameButton('search_by_button', 'search_by_songer')
            // }
            // if (filterCountClassGenre === 0) {
            //     setClassNameButton('search_by_button', 'search_by_songer')
            // }
        }
    }

    // удаление других открытых плашек
    function removeDieFiltre(filterIcon1, setFilterIcon1, filterIcon2, setFilterIcon2) {
        if(filterIcon1 === 1 || filterIcon2 === 1) {
            setFilterIcon1(0)
            setFilterIcon2(0)
        }
    }

    //функции нажатия на кнопку фильтра авторы/жанры/года
    function haderClickFilterAuthor() {
        haderClickFilter(classNameAuthor, setClassNameAuthor, filterCountAuthor)
        addedClickFilterButton(filterIconAuthor, setFilterIconAuthor, setClassNameAuthor)
        removeDieFiltre(filterIconYear, setFilterIconYear, filterIconGenre, setFilterIconGenre)
        addedFilterCountClassAuthor()
    }

    function haderClickFilterYear() {
        haderClickFilter(classNameYear, setClassNameYear, filterCountYear)
        addedClickFilterButton(filterIconYear, setFilterIconYear, setClassNameYear)
        removeDieFiltre(filterIconAuthor, setFilterIconAuthor, filterIconGenre, setFilterIconGenre)
        addedFilterCountClassYear()
    }

    function haderClickFilterGenre() {
        haderClickFilter(classNameGenre, setClassNameGenre, filterCountGenre)
        addedClickFilterButton(filterIconGenre, setFilterIconGenre, setClassNameGenre)
        removeDieFiltre(filterIconYear, setFilterIconYear, filterIconAuthor, setFilterIconAuthor)
        addedFilterCountClassGenre()
    }

    //функция изменения вида названий авторы/года/кнопки
    function handlerClickSelect(className, setClassName) {
        if(className === 'icon_filter') {
            setClassName('icon_filter_chouse')
        } else {
            setClassName('icon_filter')
        }
    }

    //компоненты блоков, в которых отображаются кнопки авторов/годов/жанров 
    const AddedFilterIconAuthor = () => 
        <div className='filter_icon filter_icon_author'>
        { resultTracksAuthor.map((track) => <button className={selectAuthorClass} key={track.id} id={track.author} onClick={handleAuthorSelect}>{track.author}</button> )}
        </div>

    const AddedFilterIconYear = () => 
        <div className='filter_icon filter_icon_year'>
            { resultTracksYear.map((track) => <button className={selectYearClass} key={track.id} id={track.year} onClick={handleYearSelect}>{track.year}</button> )}
        </div>

    const AddedFilterIconGenre = () => 
        <div className='filter_icon filter_icon_genre'>
            { resultTracksGenre.map((track) => <button className={selectGenreClass} key={track.id} id={track.genre} onClick={handleGenreSelect}>{track.genre}</button> )}
        </div>
    
    // компонент блока счетчика aвторов/годов/жанров
    const AddedCounterAuthor = () => <div className={filterCountClassAuthor}>{filterCountAuthor}</div>
    const AddedCounterYear = () => <div className={filterCountClassYear}>{filterCountYear}</div>
    const AddedCounterGenre = () => <div className={filterCountClassGenre}>{filterCountGenre}</div>

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
          <button className={classNameAuthor} onClick={haderClickFilterAuthor}>исполнителю</button>
          { [...Array(filterIconAuthor)].map((_, i) => <AddedFilterIconAuthor key={i} />) }
          <AddedCounterAuthor />
          <button className={classNameYear} onClick={haderClickFilterYear}>году выпуска</button>
          { [...Array(filterIconYear)].map((_, i) => <AddedFilterIconYear key={i} />) }
          <AddedCounterYear />
          <button className={classNameGenre} onClick={haderClickFilterGenre}>жанру</button>
          { [...Array(filterIconGenre)].map((_, i) => <AddedFilterIconGenre key={i} />) }
          <AddedCounterGenre />
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