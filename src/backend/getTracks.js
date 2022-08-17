import axios from 'axios';

const API_URL = 'http://84.201.139.95:8000'

export async function getTracksAll() {
    // По этому запросу выдается только первая страница из 10 элементов. Запрос на следующую страницу хранится в data.next
    const response = await axios.get(`${API_URL}/catalog/track/all`)
    return response.data
}

export async function getTracksByPlaylist(playlistId) {
    const response = await axios.get(`${API_URL}/catalog/selection/${playlistId}`)
    return response.data
}

export async function getPlaylists(n=3) {
    const response = await axios.get(`${API_URL}/catalog/selection`)
    return response.data.results.map((playlist) => (
        {
            id: playlist.id,
            name: playlist.name || `Плейлист №${playlist.id}`
        }
    ))
}

export async function getTracksFavorite(userId) {
    // TODO: Не понятно, как посмотреть избранные треки ¯\_(ツ)_/¯
}