import  './player.css'
import PlayIcon from './icons/play.png'
import PauseIcon from './icons/pause.png'
import PrevIcon from './icons/prev.png'
import NextIcon from './icons/next.png'
import LoopEnabledIcon from './icons/loop_enabled.png'
import LoopDisabledIcon from './icons/loop_disabled.png'
import ShuffleEnabledIcon from './icons/shuffle_enabled.png'
import ShuffleDisabledIcon from './icons/shuffle_disabled.png'
import VolumeNoneIcon from './icons/volume_none.png'
import VolumeLowIcon from './icons/volume_low.png'
import VolumeMediumIcon from './icons/volume_mid.png'
import VolumeHighIcon from './icons/volume_high.png'
import { useEffect, useRef, useState } from 'react'

function secondsToString(timeSec) {
    const mins = Math.floor(timeSec / 60).toString()
    const secs = String(timeSec % 60).padStart(2, '0') // Добавляем ведущие нули для однозначных чисел
    
    return `${mins}:${secs}`
}

const DEFAULT_VOLUME = 50

export default function Player(props) {
    // Playing States
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLoopEnabled, setIsLoopEnabled] = useState(false)
    const [isShuffleEnabled, setIsShuffleEnabled] = useState(false)
    // Current Audio
    const [currentAudio, setCurrentAudio] = useState(new Audio(props.currentTrack.path))
    // Current Track States
    const [currentTrack, setCurrentTrack] = useState(props.currentTrack)
    const [currentTrackIdx, setCurrentTrackIdx] = useState(props.currentTrackIdx)
    const [currTrackFactLength, setCurrTrackFactLength] = useState(0)
    const [currTrackHasAdjacent, setCurrSongHasAdjacent] = useState(props.currTrackHasAdjacent)
    // Volume States -- Default = .5 -> 50%
    const [volume, setVolume] = useState(DEFAULT_VOLUME)
    const [isMuted, setIsMuted] = useState(false)
    const volumeSliderRef = useRef(null)

    // Volume
    const getVolumeIcon = () => {
        return volume === 0 ? VolumeNoneIcon : volume <= 20 ? VolumeLowIcon : volume <= 70 ? VolumeMediumIcon : VolumeHighIcon
    }

    const handleVolumeMute = () => {
        isMuted ? setVolume(DEFAULT_VOLUME) : setVolume(0)
        currentAudio.volume = isMuted ? DEFAULT_VOLUME / 100 : 0
        // isMuted ? console.log(`> Muted -> ${volume}`) : console.log(`> ${volume} -> Muted`)
        const isMutedTmp = isMuted
        setIsMuted(!isMutedTmp)
    }

    const handleVolumeChange = (event) => {
        setVolume(event.target.value)
        // console.log(`> Volume Change: ${currentAudio.volume} -> ${event.target.value}`)
        currentAudio.volume = event.target.value / 100
        // console.log(`New volume: ${event.target.value}`)
    }

    // Track
    const isTrackOver = () => {
        // console.log('--------------------------------------------\n' + currentTrack.duration_in_seconds)
        // console.log('--------------------------------------------\n' + JSON.stringify(currentTrack))
        return currentAudio.currentTime >= currentAudio.duration - .01
    }

    const handleTrackLengthChange = (event) => {
        setCurrTrackFactLength(event.target.value)
        currentAudio.currentTime = event.target.value
    }

    const playPauseCurrentTrack = () => {
        if (isPlaying) {
            currentAudio.pause()
        } else {
            if (isTrackOver()) {
                currentAudio.currentTime = 0
            }
            currentAudio.play()
        }
        setIsPlaying(isPlaying => !isPlaying)
        console.log(`${isPlaying} -> ${!isPlaying}`)
    }

    const playPrevTrack = () => {
        if (currTrackHasAdjacent.left) {
            props.setCurrentTrackByIdx(currentTrackIdx - 1)
        }
    }

    const playNextTrack = () => {
        console.log('> playNextTrack')
        if (currTrackHasAdjacent.right) {
            props.setCurrentTrackByIdx(currentTrackIdx + 1)
        }
    }

    const handleTimeUpdate = () => {
        setCurrTrackFactLength(currentAudio.currentTime)

        // Something wrong with the states - delay = 1 change
        // if (isTrackOver() && currTrackHasAdjacent.right) {
        //     console.log('> Play next...')
        //     currentAudio.pause()
        //     playNextTrack()
        // }

        // if (isTrackOver() && !currTrackHasAdjacent.right) {
        if (isTrackOver()) {
            console.log('> Stop playing...')
            currentAudio.pause()
            setIsPlaying(false)
        }
    }
    //
    useEffect(() => {
        console.log(props.currentTrack)
        console.log(`Track Idx = ${props.currentTrackIdx}, Track Duration = ${props.currentTrack.duration_in_seconds}, TrackAdjacent = ${JSON.stringify(props.currTrackHasAdjacent)}`)
        setCurrentTrack(props.currentTrack)
        setCurrentTrackIdx(props.currentTrackIdx)
        setCurrSongHasAdjacent(props.currTrackHasAdjacent)
        setIsPlaying(true)

        currentAudio.setAttribute('src', props.currentTrack.track_file)
        currentAudio.load()
        currentAudio.play()
        currentAudio.addEventListener('timeupdate', handleTimeUpdate)
    }, [props.currentTrack])


    return (
        <div className="player__wrapper">
            <img className="player__icon" src={PrevIcon} onClick={playPrevTrack} alt="Previous Song"></img>
            <img className="player__icon" src={isPlaying ? PauseIcon : PlayIcon} onClick={playPauseCurrentTrack} alt="Play / Pause Song"></img>
            <img className="player__icon" src={NextIcon} onClick={playNextTrack} alt="Next Song"></img>
            <span className="song__cover">
                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 16V1.9697L19 1V13" stroke="#4E4E4E"/>
                    <ellipse cx="4.5" cy="16" rx="3.5" ry="2" stroke="#4E4E4E"/>
                    <ellipse cx="15.5" cy="13" rx="3.5" ry="2" stroke="#4E4E4E"/>
                </svg>
            </span>
            <div className="song__info">
                <a className="track__title-link player" href="http://">{currentTrack.name}</a>
                <a className="track__author-link player" href="http://">{currentTrack.author}</a>
            </div>
            <div className="song__timeline__wrapper">
                <input
                    className="song__timeline"
                    type="range"
                    min={0}
                    max={currentTrack.duration_in_seconds}
                    defaultValue={0}
                    value={currTrackFactLength}
                    onChange={handleTrackLengthChange}
                ></input>
                <span className="song__timeline-text">{secondsToString(Math.floor(currTrackFactLength))} / {secondsToString(currentTrack.duration_in_seconds)}</span>
            </div>
            <div className="player-order__control">
                <img className="player__icon icon_padding" src={isLoopEnabled ? LoopEnabledIcon : LoopDisabledIcon} alt="Previous Song"></img>
                <img className="player__icon icon_padding" src={isShuffleEnabled ? ShuffleEnabledIcon : ShuffleDisabledIcon} alt="Previous Song"></img>
                <img
                    className="player__icon volume"
                    src={getVolumeIcon()}
                    onClick={handleVolumeMute}
                    alt="Volume Icon"></img>
                <input
                    ref={volumeSliderRef}
                    className="volume__slider"
                    type="range"
                    min={0}
                    max={100}
                    defaultValue={volume}
                    value={volume}
                    onChange={handleVolumeChange}
                ></input>
            </div>
        </div>
    )
  }