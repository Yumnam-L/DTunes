import React, { useEffect, useRef, useState } from 'react';

const Player = ({ videoId }) => {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (window.YT && playerRef.current) {
      if (player) {
        player.loadVideoById(videoId);
      } else {
        loadVideo();
      }
    } else {
      loadYouTubeIframeAPI();
    }
  }, [videoId]);

  const loadYouTubeIframeAPI = () => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      loadVideo();
    };
  };

  const loadVideo = () => {
    const newPlayer = new window.YT.Player(playerRef.current, {
      height: '390',
      width: '640',
      videoId: videoId,
      events: {
        onReady: onPlayerReady,
      },
    });
    setPlayer(newPlayer);
  };

  const onPlayerReady = (event) => {
    event.target.playVideo();
  };

  return <div ref={playerRef}></div>;
};

export default Player;


