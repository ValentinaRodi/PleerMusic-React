import { useState, useEffect, useRef } from 'react'
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
    useEffect(() => {
        // Clear current filter styles
        setFilterCountAuthor(0)
        setFilterCountYear(0)
        setFilterCountGenre(0)
        
        setFilterCountClassAuthor('icon_counter_display')
        setFilterCountClassYear('icon_counter_display')
        setFilterCountClassGenre('icon_counter_display')

        setClassNameAuthor('search_by_button')
        setClassNameYear('search_by_button')
        setClassNameGenre('search_by_button')

        //
        const authorSeenKeys = new Set()
        const yearSeenKeys = new Set()
        const genreSeenKeys = new Set()

        let resultTracksAuthor = {}
        let resultTracksYear = {}
        let resultTracksGenre = {}
        if (tracks !== null) {
            for (const row of tracks) {
                const author = row.author
                if (!authorSeenKeys.has(author)) {
                    resultTracksAuthor[author] = false
                    authorSeenKeys.add(author)
                }

                const year = row.release_date ? parseInt(row.release_date.slice(0, 4), 10) : "Not stated"
                if (!yearSeenKeys.has(year)) {
                    resultTracksYear[year] = false
                    yearSeenKeys.add(year)
                }

                const genre = row.genre
                if (!genreSeenKeys.has(genre)) {
                    resultTracksGenre[genre] = false
                    genreSeenKeys.add(genre)
                }
            }
            setSelectAuthor(resultTracksAuthor)
            setSelectYear(resultTracksYear)
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
    function addedClickFilterButton(filterIcon, setFilterIcon) {
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
        
        setScroll(5)
    }

    function headerClickFilterYear() {
        headerClickFilter(classNameYear, setClassNameYear, filterCountYear)
        addedClickFilterButton(filterIconYear, setFilterIconYear, setClassNameYear)
        removeDieFilter(filterIconAuthor, setFilterIconAuthor, filterIconGenre, setFilterIconGenre)
        addedFilterCountClassYear()

        // Снятие выделения с других кнопок-фильтров
        deselectFilterButton(classNameAuthor, setClassNameAuthor, filterCountAuthor)
        deselectFilterButton(classNameGenre, setClassNameGenre, filterCountGenre)

        setScroll(5)
    }

    function headerClickFilterGenre() {
        headerClickFilter(classNameGenre, setClassNameGenre, filterCountGenre)
        addedClickFilterButton(filterIconGenre, setFilterIconGenre, setClassNameGenre)
        removeDieFilter(filterIconYear, setFilterIconYear, filterIconAuthor, setFilterIconAuthor)
        addedFilterCountClassGenre()

        // Снятие выделения с других кнопок-фильтров
        deselectFilterButton(classNameAuthor, setClassNameAuthor, filterCountAuthor)
        deselectFilterButton(classNameYear, setClassNameYear, filterCountYear)

        setScroll(5)
    }

    const [nScroll, setScroll] = useState(5)

    function handleOnscroll(n) {
        // const filterElement = document.getElementsByClassName(`filter_icon filter_icon_${filterName}`)[0]
        // filterElement.style.height = filterElement.offsetHeight
        setScroll(n)
        console.log('scroll')
    }

    //компоненты блоков, в которых отображаются кнопки авторов/годов/жанров 
    const AddedFilterIconAuthor = () => 
        <div className='filter_icon filter_icon_author' onWheel={() => {handleOnscroll(Object.keys(selectAuthor).length)}}>
            {
                Object.keys(selectAuthor).slice(0, nScroll).map((author, idx) => {
                    
                    return (<button
                        className={selectAuthor[author] ? 'icon_filter_selected' : 'icon_filter'}
                        key={idx}
                        id={author}
                        onClick={handleAuthorSelect}
                        >{author}</button>)
                    }
               )
            }
        </div>
    
    const AddedFilterIconYear = () => 
        <div className='filter_icon filter_icon_year' onWheel={() => {handleOnscroll(Object.keys(selectYear).length)}}>
            {
                Object.keys(selectYear).slice(0, nScroll).map((year, idx) => 
                <button
                    className={selectYear[year] ? 'icon_filter_selected' : 'icon_filter'}
                    key={idx}
                    id={year}
                    onClick={handleYearSelect}
                >{year}</button>)
            }
        </div>

    

    const AddedFilterIconGenre = () => 
        <div className='filter_icon filter_icon_genre' onWheel={() => {handleOnscroll(Object.keys(selectGenre).length)}}>
            {
                Object.keys(selectGenre).slice(0, nScroll).map((genre, idx) => 
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

  