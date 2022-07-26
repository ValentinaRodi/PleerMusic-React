import Header from '../childComponents/header/Header'
import Menu from '../childComponents/menu/Menu'
import Player from '../childComponents/player/Player'
import Playlist from '../childComponents/playlist/Playlist'
import Tracks from '../childComponents/tracks/Tracks'


export default function MainPage() {
    return (
        <div>
            <Header />
            <Menu />
            <Player />
            <Playlist />
            <Tracks />
        </div>
    )
  }
  
