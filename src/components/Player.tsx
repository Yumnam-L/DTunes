import React, { useEffect, useRef } from 'react';

const Player = ({ videoId }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (window.YT) {
      loadVideo();
    } else {
      loadYouTubeIframeAPI();
    }
  }, [videoId]);

  const loadYouTubeIframeAPI = () => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      loadVideo();
    };
  };

  const loadVideo = () => {
    new window.YT.Player(playerRef.current, {
      height: '390',
      width: '640',
      videoId: videoId,
      events: {
        onReady: onPlayerReady,
      },
    });
  };

  const onPlayerReady = (event) => {
    event.target.playVideo();
  };

  return <div ref={playerRef}></div>;
};

export default Player;
