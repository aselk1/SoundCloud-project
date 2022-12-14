import { useEffect, useRef, useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { useDispatch, useSelector } from "react-redux";

import Queue from "./Queue";

import * as queueActions from "../../store/queue";
import "./AudioPlayer.css";

function SongPlayer() {
  const dispatch = useDispatch();
  const songDetails = useSelector((state) => state.songDetails);
  const currentQueue = useSelector((state) => state.queue);
  const [currentSong, setCurrentSong] = useState(0);
  const [showQueue, setShowQueue] = useState(false);
  let playingSong;
  if (currentQueue[currentSong]) {
    playingSong = currentQueue[currentSong].url;
  }

  const player = useRef();
  // if (!songDetails.id) {
  //   if (player.current && showQueue){
  //     console.log("Running");
  //     player.current.audio.current.pause();
  //   }
  // }

  const openQueue = async () => {
    await setShowQueue(true);
    // else await setShowQueue(false);
  };
  useEffect(() => {
    const queue = JSON.parse(localStorage.getItem("queue"));
    if (queue) {
      (async function () {
        await dispatch(queueActions.clearQueue());
        await dispatch(queueActions.addQueue(queue));
      })();
      // (async function () {
      // })();
    }
  }, [dispatch]);

  return (
    <div className="audioPlayer">
      {showQueue && <Queue setShowQueue={setShowQueue} />}
      <AudioPlayer
        src={playingSong}
        ref={player}
        autoPlayAfterSrcChange={false}
        autoPlay={false}
        showSkipControls
        customAdditionalControls={[
          <button className="queueButton" onClick={openQueue}>
            <i className="fa-solid fa-music"></i>
          </button>,
          RHAP_UI.LOOP,
        ]}
        onClickNext={async () => {
          if (currentQueue.length !== currentSong + 1) {
            await setCurrentSong(currentSong + 1);
            player.current.audio.current.play()
          }
        }}
        onClickPrevious={async() => {
          if (currentSong > 0) {
            await setCurrentSong(currentSong - 1);
            player.current.audio.current.play();
          }
        }}
        onEnded={async() => {
          if (currentQueue.length > currentSong + 1) {
            await setCurrentSong(currentSong + 1);
            player.current.audio.current.play();
          }
        }}
      />
    </div>
  );
}

export default SongPlayer;
