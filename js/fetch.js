document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('tracks').addEventListener('click', getSongs)
    //Traer Temas
})

function getSongs() {
    let info = document.getElementById('info')
    let songList = document.getElementById('song-list')
    //info.innerHTML = ""
    songList.innerHTML = ""
    fetch('https://itunes.apple.com/search?term=Jazz')
        .then(resp => resp.json())
        .then(data => {
        data.results.map(song => { 
            //console.log(tracks)
            songList.innerHTML += `
            <<a href="#" data-name="${song.trackName}"
            data-id="${song.trackId}"> ${song.trackName} </a>
            </li>
            `
        })
        attachLinks()
    })
}

function attachLinks() {
    const songs = document.querySelectorAll('li a')
    songs.forEach(song => {
    song.addEventListener('click', displaySong)
    })
}

function displaySong(event) {
    console.log(event.target)
    let songList = document.getElementById('song-list')
    let info = document.getElementById('info')
    songList.innerHTML = ""
    info.innerHTML = ""
    fetch(`https://itunes.apple.com/search?term=Jazz/${event.target.dataset.id}`)
        .then(resp => resp.json())
        .then(song  => {
            //console.log(tracks)
            info.innerHTML += `
            <h1>${song.trackName}</h1>
            <h3>Artist Name: </h3>
            <p>${song.artistName}</p>
            <h3>Release Date: </h3>
            <p>${song.releaseDate}</p>`
        })
}