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


// import React, { useEffect, useRef, useState } from 'react';

// interface PlayerProps {
//   videoId: string;
// }

// const Player: React.FC<PlayerProps> = ({ videoId }) => {
//   const playerRef = useRef<HTMLDivElement | null>(null);
//   const [player, setPlayer] = useState<any>(null);

//   useEffect(() => {
//     if ((window as any).YT && playerRef.current) {
//       if (player) {
//         player.loadVideoById(videoId);
//       } else {
//         loadVideo();
//       }
//     } else {
//       loadYouTubeIframeAPI();
//     }
//   }, [videoId]);

//   const loadYouTubeIframeAPI = () => {
//     const tag = document.createElement('script');
//     tag.src = 'https://www.youtube.com/iframe_api';
//     const firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

//     (window as any).onYouTubeIframeAPIReady = () => {
//       loadVideo();
//     };
//   };

//   const loadVideo = () => {
//     const newPlayer = new (window as any).YT.Player(playerRef.current, {
//       height: '390',
//       width: '640',
//       videoId: videoId,
//       events: {
//         onReady: onPlayerReady,
//       },
//     });
//     setPlayer(newPlayer);
//   };

//   const onPlayerReady = (event: any) => {
//     event.target.playVideo();
//   };

//   return <div ref={playerRef}></div>;
// };

// export default Player;

// 1

// import React, { useEffect, useRef } from 'react';

// interface PlayerProps {
//   videoId: string;
// }

// const Player: React.FC<PlayerProps> = ({ videoId }) => {
//   const playerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if ((window as any).YT) {
//       loadVideo();
//     } else {
//       loadYouTubeIframeAPI();
//     }
//   }, [videoId]);

//   const loadYouTubeIframeAPI = () => {
//     const tag = document.createElement('script');
//     tag.src = 'https://www.youtube.com/iframe_api';
//     const firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

//     (window as any).onYouTubeIframeAPIReady = () => {
//       loadVideo();
//     };
//   };

//   const loadVideo = () => {
//     new (window as any).YT.Player(playerRef.current, {
//       height: '390',
//       width: '640',
//       videoId: videoId,
//       events: {
//         onReady: onPlayerReady,
//       },
//     });
//   };

//   const onPlayerReady = (event: any) => {
//     event.target.playVideo();
//   };

//   return <div ref={playerRef}></div>;
// };

// export default Player;

