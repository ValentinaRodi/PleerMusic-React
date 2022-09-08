import { useState, useEffect } from 'react'
import { getTracksAll } from '../../backend/getTracks'
import Header from '../childComponents/header/Header'
import Menu from '../childComponents/menu/Menu'
import Player from '../childComponents/player/Player'
import Playlist from '../childComponents/playlist/Playlist'
import Tracks from '../childComponents/tracks/Tracks'

const TRACKS_TEST = [
    {
        id: 1,
        author: 'VAST',
        name: 'Touched',
        album: 'Step into Liquid Soundtrack',
        duration_in_seconds: 238,
        genre: 'pop',
        year: 2022,
        track_file: 'http://127.0.0.1:8887/src/test_audio/vast_touched.mp3',
    },
    {
        id: 2,
        author: 'VAST',
        name: 'Thrown Away',
        album: 'Turquoise & Crimson',
        duration_in_seconds: 240,
        genre: 'rock',
        year: 2021,
        track_file: 'http://127.0.0.1:8887/src/test_audio/vast_thrown_way.mp3',
    },
    {
        id: 3,
        author: 'Isaac Nightingale',
        name: 'Love is Gone',
        album: 'Sides of Canvas',
        duration_in_seconds: 247,
        genre: 'popsa',
        year: 2020,
        track_file: 'http://127.0.0.1:8887/src/test_audio/isaac_nightingale_love_is_gone.mp3',
    },
    {
        id: 4,
        author: 'Dead Sara',
        name: 'Gimme Gimme',
        album: 'X',
        duration_in_seconds: 180,
        genre: 'pop',
        year: 2022,
        track_file: 'http://127.0.0.1:8887/src/test_audio/dead_sara_gimme_gimme.mp3',
    }
]

export default function MainPage() {
    const [tracks, setTracks] = useState(null)
    const [currPlaylistTitle, setCurrentPlaylistTitle] = useState('Tracks')
    const [currentTrack, setCurrentTrack] = useState(null)
    const [currentTrackIdx, setCurrentTrackIdx] = useState(null)
    const [currTrackHasAdjacent, setCurrTrackHasAdjacent] = useState(null)
    const [searchText, setSearchText] = useState('')

    const [filterAuthors, setFilterAuthors] = useState({})
    const [filterYears, setFilterYears] = useState([])
    const [filterGenries, setFilterGenries] = useState([])

    useEffect(() => {
        getTracksAll()
        .then((res) => { setTracks(res.results) })
        .catch((err) => { setTracks(TRACKS_TEST) })
    }, [])



    // Для красивого эффекта - показываем, что загружаем новые треки
    const clearTracks = () => {
        setTracks(null)
    }

    //
    const setCurrentTrackById = (trackId) => {
        const currentTrack = tracks.filter((track) => {
            return track.id === trackId
        })[0]
        setCurrentTrack(currentTrack)
        setCurrentTrackIdx(tracks.findIndex(x => x.id === trackId))
        setHasAdjacent(trackId)
    }

    const setCurrentTrackByIdx = (trackIdx) => {
        // console.log(`> Setting new track, idx=${trackIdx}`)
        const currentTrack = tracks[trackIdx]
        // console.log(`> Set current track to: ${tracks[trackIdx].id}`)
        setCurrentTrack(currentTrack)
        setCurrentTrackIdx(trackIdx)
        setHasAdjacent(currentTrack.id)
    }

    const setHasAdjacent = (trackId) => {
        const currTrackIdx = tracks.findIndex(x => x.id === trackId)
        setCurrentTrackIdx(currTrackIdx)
        setCurrTrackHasAdjacent({
            left: currTrackIdx === 0 ? false : true,
            right: currTrackIdx === tracks.length - 1 ? false : true
        })
    }

    return (
        <div>
            <Header
                title={currPlaylistTitle}
                setSearchText={setSearchText}
                tracks={tracks}
                setFilterAuthors={setFilterAuthors}
                setFilterYears={setFilterYears}
                setFilterGenries={setFilterGenries}
            />
            <Menu
                clearTracks={clearTracks}
                setTracks={setTracks}
                setCurrentPlaylistTitle={setCurrentPlaylistTitle}
            />
            {
                currentTrack ?
                <Player
                    currentTrack={currentTrack}
                    currentTrackIdx={currentTrackIdx}
                    currTrackHasAdjacent={currTrackHasAdjacent}
                    setCurrentTrackByIdx={setCurrentTrackByIdx}
                />
                :
                null
            }
            <Playlist
                clearTracks={clearTracks}
                setTracks={setTracks}
                setCurrentPlaylistTitle={setCurrentPlaylistTitle}
            />
            <Tracks
                tracks={
                    tracks === null ? tracks :
                    tracks.filter(track => { 
                        
                        return ( 
                            ((track.name.toLowerCase() === searchText.toLowerCase()) 
                            || (track.name.toLowerCase().includes(searchText.toLowerCase()))
                            || (track.author.toLowerCase() === searchText.toLowerCase())
                            || (track.author.toLowerCase().includes(searchText.toLowerCase()))
                            || (track.album.toLowerCase() === searchText.toLowerCase())
                            || (track.album.toLowerCase().includes(searchText.toLowerCase())))
                            && (filterAuthors.length === 0 ? true : filterAuthors.includes(track.author))  
                            && (filterYears.length === 0 ? true : filterYears.includes(track.relese ? track.release_date.slice(0, 4) : "Not stated")) 
                            && (filterGenries.length === 0 ? true : filterGenries.includes(track.genre))  
                        )

                        // return (track.name.toLowerCase() === searchText.toLowerCase()) 
                        // || (track.name.toLowerCase().includes(searchText.toLowerCase()))
                        // || (track.author.toLowerCase() === searchText.toLowerCase())
                        // || (track.author.toLowerCase().includes(searchText.toLowerCase()))
                        // || (track.album.toLowerCase() === searchText.toLowerCase())
                        // || (track.album.toLowerCase().includes(searchText.toLowerCase()))
                    })
                }
                setCurrentTrack={setCurrentTrackById}
            />
        </div>
    )
  }
  
