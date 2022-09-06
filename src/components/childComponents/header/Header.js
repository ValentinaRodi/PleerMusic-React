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

    const [classNameAuthor, setClassNameAuthor] = useState('search_by_button')
    const [classNameYear, setClassNameYear] = useState('search_by_button')
    const [classNameGenre, setClassNameGenre] = useState('search_by_button')

    const [filterIconAuthor, setFilterIconAuthor] = useState(0)
    const [filterIconYear, setFilterIconYear] = useState(0)
    const [filterIconGenre, setFilterIconGenre] = useState(0)

    const [selectAuthor, setSelectAuthor] = useState({})
    const [selectYear, setSelectYear] = useState({})
    const [selectGenre, setSelectGenre] = useState({})

    const [filterCountAuthor, setFilterCountAuthor] = useState(0)
    const [filterCountYear, setFilterCountYear] = useState(0)
    const [filterCountGenre, setFilterCountGenre] = useState(0)
    
    const [filterCountClassAuthor, setFilterCountClassAuthor] = useState('icon_counter_display')
    const [filterCountClassYear, setFilterCountClassYear] = useState('icon_counter_display')
    const [filterCountClassGenre, setFilterCountClassGenre] = useState('icon_counter_display')

    // Функция для проверки наличия true в объетках selectAuthor / selectYear / selectGenre
    function hasAppliedFilters(selectObject) {
        return Object.values(selectObject).some(status => status)
    }
    
    // функции отрисовки в Track по фильтру авторов/года/жанры
    function handleAuthorSelect(e) {
        const selectAuthorNew = {...selectAuthor}
        selectAuthorNew[e.target.id] = !selectAuthorNew[e.target.id]
        setSelectAuthor(selectAuthorNew)
        setFilterCountAuthor(filterCountAuthor + (selectAuthorNew[e.target.id] ? 1 : -1))
    }

    function handleYearSelect(e) {
        const selectYearNew = {...selectYear}
        selectYearNew[e.target.id] = !selectYearNew[e.target.id]
        setSelectYear(selectYearNew)
        setFilterCountYear(filterCountYear + (selectYearNew[e.target.id] ? 1 : -1))
    }

    function handleGenreSelect(e) {
        const selectGenreNew = {...selectGenre}
        selectGenreNew[e.target.id] = !selectGenreNew[e.target.id]
        setSelectGenre(selectGenreNew)
        setFilterCountGenre(filterCountGenre + (selectGenreNew[e.target.id] ? 1 : -1))
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
        if (filterCountGenre === 0) {
            setFilterCountClassGenre('icon_counter_display')
        }
    }
    
    //для отслеживания изменений выбора авторов/года/жанры
    useEffect(() => {
        props.setFilterAuthors(Object.keys(selectAuthor).filter((author) => { return selectAuthor[author] }))
    }, [selectAuthor])

    useEffect(() => {
        console.log(Object.keys(selectYear).filter((year) => { return selectYear[year] }))
        props.setFilterYears(Object.keys(selectYear).filter((year) => { return selectYear[year] }))
    }, [selectYear])

    useEffect(() => {
        props.setFilterGenries(Object.keys(selectGenre).filter((genre) => { return selectGenre[genre] }))
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
    // Инициализация Object фильтра по автору
    useEffect(() => {
        const seenKeys = new Set()

        let resultTracksAuthor = {}
        if (tracks !== null) {
            for (const row of tracks) {
                if (seenKeys.has(row.author)) continue
                resultTracksAuthor[row.author] = false
                seenKeys.add(row.author)
            }
            setSelectAuthor(resultTracksAuthor)
        }
    }, [tracks])

    // Инициализация Object фильтра по году
    useEffect(() => {
        const seenKeys = new Set()

        let resultTracksYear = {}
        if (tracks !== null) {
            for (const row of tracks) {
                if (seenKeys.has(row.year)) continue
                resultTracksYear[row.year] = false
                seenKeys.add(row.year)
            }
            setSelectYear(resultTracksYear)
        }
    }, [tracks])

    // Инициализация Object фильтра по жанру
    useEffect(() => {
        const seenKeys = new Set()

        let resultTracksGenre = {}
        if (tracks !== null) {
            for (const row of tracks) {
                if (seenKeys.has(row.genre)) continue
                resultTracksGenre[row.genre] = false
                seenKeys.add(row.genre)
            }
            setSelectGenre(resultTracksGenre)
        }
    }, [tracks])
 
    //функция изменения вида кнопки
    function headerClickFilter(className, setClassName, filterCount) {
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
        }
    }

    // удаление других открытых плашек
    function removeDieFilter(filterIcon1, setFilterIcon1, filterIcon2, setFilterIcon2) {
        if(filterIcon1 === 1 || filterIcon2 === 1) {
            setFilterIcon1(0)
            setFilterIcon2(0)
        }
    }

    // Снятие выделение с кнопок-фильтров "исполнителю", "году", "жанру"
    function deselectFilterButton(className, setClassName, filterCount) {
        if (className === 'search_by_button_active' && filterCount === 0) {
            setClassName('search_by_button')
        }
    }

    //функции нажатия на кнопку фильтра авторы/жанры/года
    function headerClickFilterAuthor() {
        headerClickFilter(classNameAuthor, setClassNameAuthor, filterCountAuthor)
        addedClickFilterButton(filterIconAuthor, setFilterIconAuthor, setClassNameAuthor)
        removeDieFilter(filterIconYear, setFilterIconYear, filterIconGenre, setFilterIconGenre)
        addedFilterCountClassAuthor()

        // Снятие выделения с других кнопок-фильтров
        deselectFilterButton(classNameYear, setClassNameYear, filterCountYear)
        deselectFilterButton(classNameGenre, setClassNameGenre, filterCountGenre)
    }

    function headerClickFilterYear() {
        headerClickFilter(classNameYear, setClassNameYear, filterCountYear)
        addedClickFilterButton(filterIconYear, setFilterIconYear, setClassNameYear)
        removeDieFilter(filterIconAuthor, setFilterIconAuthor, filterIconGenre, setFilterIconGenre)
        addedFilterCountClassYear()

        // Снятие выделения с других кнопок-фильтров
        deselectFilterButton(classNameAuthor, setClassNameAuthor, filterCountAuthor)
        deselectFilterButton(classNameGenre, setClassNameGenre, filterCountGenre)
    }

    function headerClickFilterGenre() {
        headerClickFilter(classNameGenre, setClassNameGenre, filterCountGenre)
        addedClickFilterButton(filterIconGenre, setFilterIconGenre, setClassNameGenre)
        removeDieFilter(filterIconYear, setFilterIconYear, filterIconAuthor, setFilterIconAuthor)
        addedFilterCountClassGenre()

        // Снятие выделения с других кнопок-фильтров
        deselectFilterButton(classNameAuthor, setClassNameAuthor, filterCountAuthor)
        deselectFilterButton(classNameYear, setClassNameYear, filterCountYear)
    }

    //компоненты блоков, в которых отображаются кнопки авторов/годов/жанров 
    const AddedFilterIconAuthor = () => 
        <div className='filter_icon filter_icon_author'>
            {
                Object.keys(selectAuthor).map((author, idx) => 
                <button
                    className={selectAuthor[author] ? 'icon_filter_selected' : 'icon_filter'}
                    key={idx}
                    id={author}
                    onClick={handleAuthorSelect}
                >{author}</button>)
            }
        </div>

    const AddedFilterIconYear = () => 
        <div className='filter_icon filter_icon_year'>
            {
                Object.keys(selectYear).map((year, idx) => 
                <button
                    className={selectYear[year] ? 'icon_filter_selected' : 'icon_filter'}
                    key={idx}
                    id={year}
                    onClick={handleYearSelect}
                >{year}</button>)
            }
        </div>

    const AddedFilterIconGenre = () => 
        <div className='filter_icon filter_icon_genre'>
            {
                Object.keys(selectGenre).map((genre, idx) => 
                <button
                    className={selectGenre[genre] ? 'icon_filter_selected' : 'icon_filter'}
                    key={idx}
                    id={genre}
                    onClick={handleGenreSelect}
                >{genre}</button>)
            }
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
          <button className={classNameAuthor} onClick={headerClickFilterAuthor}>исполнителю</button>
          { [...Array(filterIconAuthor)].map((_, i) => <AddedFilterIconAuthor key={i} />) }
          <AddedCounterAuthor />
          <button className={classNameYear} onClick={headerClickFilterYear}>году выпуска</button>
          { [...Array(filterIconYear)].map((_, i) => <AddedFilterIconYear key={i} />) }
          <AddedCounterYear />
          <button className={classNameGenre} onClick={headerClickFilterGenre}>жанру</button>
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