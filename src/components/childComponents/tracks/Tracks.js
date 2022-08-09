import  './tracks.css'
import axios from 'axios'
import LoginPage from '../../loginPage/LoginPage'

const baseURL = "http://84.201.139.95:8000"

let backendTracks = {}

axios.get(`${baseURL}/catalog/track/all/`).then((res) => {
    backendTracks = res.data.results
})

export default function Tracks() {
    
    const loggedInUser = localStorage.getItem("user")

    if (!loggedInUser) {
        return (<LoginPage />)
    } else {
        return (
            <div className='tracks'>
                <div className="track_wrap">
                    
                    {backendTracks.map((track) => (
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
                                <span className="track__time-text">{track.duration_in_seconds}</span>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>                        
            </div>
        )
    }
}