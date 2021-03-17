const axios = window.axios

const getSongs = () => {
  axios.get('/api/songs')
    .then(({ data: songs }) => {
      document.getElementById('songs').innerHTML = ''
      songs.forEach(song => {
        const songElem = document.createElement('li')
        songElem.className = 'list-group-item d-flex justify-content-between align-items-center'
        songElem.innerHTML = `
          <p>Title: ${song.title}</p>
          <p>Artist: ${song.artist}</p>
          <p>Album: ${song.album}</p>
          <button class="btn btn-warning" data-bs-target="#updateModal" data-bs-toggle="modal" data-id="${song.id}">Update</button>
          <button class="btn btn-danger deleteSong" data-id="${song.id}">Delete</button>
          `
        document.getElementById('songs').append(songElem)
      })
    })
    .catch(err => console.error(err))
}

document.getElementById('addSong').addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/songs', {
    title: document.getElementById('title').value,
    artist: document.getElementById('artist').value,
    album: document.getElementById('album').value
  })
    .then(({ data: song }) => {
      const songElem = document.createElement('li')
      songElem.className = 'list-group-item d-flex justify-content-between align-items-center'
      songElem.innerHTML = `
          <p>Title: ${song.title}</p>
          <p>Artist: ${song.artist}</p>
          <p>Album: ${song.album}</p>
          <button class="btn btn-warning" data-bs-target="#updateModal" data-bs-toggle="modal" data-id="${song.id}">Update</button>
          <button class="btn btn-danger deleteSong" data-id="${song.id}">Delete</button>
          `
      document.getElementById('songs').append(songElem)
      document.getElementById('title').value = ''
      document.getElementById('artist').value = ''
      document.getElementById('album').value = ''
    })
    .catch(err => console.error(err))
})

document.getElementById('updateModal').addEventListener('show.bs.modal', event => {
  const id = event.relatedTarget.dataset.id
  axios.get(`/api/songs/${id}`)
    .then(({ data: song }) => {
      document.getElementById('uTitle').value = song.title
      document.getElementById('uArtist').value = song.artist
      document.getElementById('uAlbum').value = song.album
      document.getElementById('updateSong').dataset.id = song.id
    })
    .catch(err => console.error(err))
})

document.getElementById('updateSong').addEventListener('click', event => {
  const id = event.target.dataset.id
  axios.put(`/api/songs/${id}`, {
    title: document.getElementById('uTitle').value,
    artist: document.getElementById('uArtist').value,
    album: document.getElementById('uAlbum').value
  })
    .then(() => {
      getSongs()
    })
    .catch(err => console.error(err))
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('deleteSong')) {
    const id = event.target.dataset.id
    axios.delete(`/api/songs/${id}`)
      .then(() => {
        event.target.parentNode.remove()
      })
      .catch(err => console.error(err))
  }
})

getSongs()
