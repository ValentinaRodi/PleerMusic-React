import  './playlist.css'
import './playlistSkeleton.css'
import { useEffect, useState } from 'react'
import { getPlaylists } from '../../../backend/getTracks'

const N_PLAYLIST = 3

export default function Playlist() {
    const [playlists, setPlaylists] = useState(null)

    useEffect(() => {
        getPlaylists(N_PLAYLIST)
        .then((res) => { setPlaylists(res) })
    }, [])

    return (
        <div className='playlist__wrapper'>
            {
                (playlists && playlists.length !== 0)
                ?
                playlists.map((playlist, idx) => (
                    <div key={playlist.id} className={`playlist playlist0${(idx % 3) + 1}`}>
                        {playlist.name}
                    </div>
                ))
                :
                Array.apply(null, Array(N_PLAYLIST)).map((playlist, idx) => (
                    <div key={idx} className="playlist skeleton"></div>
                ))
            }
        </div>
    )
  }