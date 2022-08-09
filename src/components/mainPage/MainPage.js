import { useState, useEffect } from 'react'
import { getTracksAll } from '../../backend/getTracks'
import Header from '../childComponents/header/Header'
import Menu from '../childComponents/menu/Menu'
import Player from '../childComponents/player/Player'
import Playlist from '../childComponents/playlist/Playlist'
import Tracks from '../childComponents/tracks/Tracks'



export default function MainPage() {
    const [tracks, setTracks] = useState(null)

    useEffect(() => {
        getTracksAll()
        .then((res) => { setTracks(res.results) })
    }, [])

    // Для красивого эффекта - показываем, что загружаем новые треки
    const clearTracks = () => {
        setTracks(null)
    }

    return (
        <div>
            <Header />
            <Menu />
            <Player />
            <Playlist clearTracks={clearTracks} setTracks={setTracks}/>
            <Tracks tracks={tracks}/>
        </div>
    )
  }
  
