import  './tracks.css'
import './skeletonTracks.css'
import LoginPage from '../../loginPage/LoginPage'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTracksAll } from '../../../backend/getTracks'

function secondsToString(timeSec) {
    const mins = Math.floor(timeSec / 60).toString()
    const secs = String(timeSec % 60).padStart(2, '0') // Добавляем ведущие нули для однозначных чисел
    
    return `${mins}:${secs}`
}

export default function Tracks(props) {
    const [user, setUser] = useState(localStorage.getItem("user"))
    const [tracks, setTracks] = useState(props.tracks)
    const navigate = useNavigate();

    // useEffect для отслеживания изменения user в localStorage
    useEffect(() => {
        function checkUser() {
            const user = localStorage.getItem('user')
            if (user) setUser(user)
        }
        window.addEventListener('storage', checkUser)
      
        return () => {
            window.removeEventListener('storage', checkUser)
        }
    }, [])

    // useEffect для редиректа на страницу логина
    useEffect(() => {
        if (!user) navigate('/', {replace: true})
    }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect для первичной загрузки треков через props и MainPage
    useEffect(() => {
        setTracks(props.tracks)
    }, [props.tracks])

    return (
        <div className='tracks'>
            <div className="track_wrap">
                {
                    (tracks && tracks.length !== 0)
                    ?
                    tracks.map((track) => (
                        <div className="playlist__item" key={track.id}>
                            <div className="playlist__track track">
                                <div className="track__title">
                                    <div className="track__title-image">
                                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 16V1.9697L19 1V13" stroke="#4E4E4E"/>
                                            <ellipse cx="4.5" cy="16" rx="3.5" ry="2" stroke="#4E4E4E"/>
                                            <ellipse cx="15.5" cy="13" rx="3.5" ry="2" stroke="#4E4E4E"/>
                                        </svg>
                                    </div>
                                    <div className="track__title-text">
                                        <a className="track__title-link" href="http://">{track.name}<span className="track__title-span"></span></a>
                                    </div>
                                </div>
                                <div className="track__author">
                                    <a className="track__author-link" href="http://">{track.author}</a>
                                </div>
                                <div className="track__album">
                                    <a className="track__album-link" href="http://">{track.album}</a>
                                </div>
                                <div className="track__time">
                                    <svg className="track_like" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.34372 2.25572H8.36529C9.29718 1.44175 11.7563 0.165765 13.9565 1.76734C17.3111 4.20921 14.2458 9.5 8.36529 13H8.34372M8.34378 2.25572H8.32221C7.39032 1.44175 4.93121 0.165765 2.73102 1.76734C-0.623552 4.20921 2.44172 9.5 8.32221 13H8.34378" stroke="#696969"/>
                                    </svg>
                                    <span className="track__time-text">{secondsToString(track.duration_in_seconds)}</span>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    Array.apply(null, Array(10)).map((track, idx) => (
                        <div className="playlist__item" key={idx}>
                            <div className="playlist__track track skeleton">
                                <div className="track__title">
                                    <div className="track__title-image skeleton"></div>
                                    <div className="track__title-text skeleton"></div>
                                </div>
                                <div className="track__author skeleton"></div>
                                <div className="track__album skeleton"></div>
                                <div className="track__time skeleton"></div>
                            </div>
                        </div>
                    ))
                }
            </div>                        
        </div>
    )
}