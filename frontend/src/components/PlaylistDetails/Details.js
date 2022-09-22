import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import EditPlaylistFormModal from "../EditPlaylistFormModal";
import './Details.css'
import * as playlistsActions from '../../store/playlists'
import AddSongToPlaylistFormModal from "../AddSongToPlaylistFormModal";


function Details() {
    const dispatch = useDispatch();
    const history = useHistory();
    const playlist = useSelector((state) => state.playlistDetails);
    if (!playlist.id) return <Redirect to='/profile'/>
    const {id, title, description, imageUrl, url, userId, Album, Artist, albumId } = playlist;
    const songs = Object.values(playlist.Songs);

    const deletePlaylist = async (id) => {
        await dispatch(playlistsActions.fetchDeletePlaylist(id))
        return history.push('/profile')
    }

    return (
      <div>
        <div id="songDetails">
          <h2>Playlist Details</h2>
          <button className="button" id="delete" onClick={() => deletePlaylist(playlist.id)}>
            <i className="fa-duotone fa-x"></i>
          </button>
          <EditPlaylistFormModal />
        </div>
        <div id="songDetails">
        <h3>{playlist.name}</h3>
        </div>
        <ul>
          {songs.map((el) => (
            <li key={el.id}>{el.title}</li>
          ))}
          {/* <li>{title}</li>
          <li>{description}</li>
          <li>{imageUrl}</li>
          <li>{url}</li>
          <li>{userId}</li> */}
          {/* <li>{Album && Album.title}</li>
          <li>{Artist && Artist.username}</li> */}
        </ul>
      </div>
    );
}
export default Details
