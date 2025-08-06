// import React from 'react'
// import { useState } from 'react'
// import './MoodSongs.css'

// const MoodSongs = ({ Songs }) => {

//     const [ isPlaying, setIsPlaying ] = useState(null);

//     const handlePlayPause = (index) => {
//         if (isPlaying === index) {
//             setIsPlaying(null);
//         } else {
//             setIsPlaying(index);
//         }
//     };


//     return (
//         <div className='mood-songs'>
//             <h2>Recommended Songs</h2>

//             {Songs.map((song, index) => (
//                 <div className='song' key={index}>
//                     <div className="title">
//                         <h3>{song.title}</h3>
//                         <p>{song.artist}</p>
//                     </div>
//                     <div className="play-pause-button">
//                         {
//                             isPlaying === index &&
//                             <audio
//                                 src={song.audio} style={{
//                                     display: 'none'
//                                 }}
//                                 autoPlay={isPlaying === index}
//                             ></audio>
//                         }
//                         <button onClick={() => handlePlayPause(index)}>
//                             {isPlaying === index ? <i className="ri-pause-line"></i> : <i className="ri-play-circle-fill"></i>}
//                         </button>
//                     </div>

//                 </div>
//             ))}

//         </div>
//     )
// }

// export default MoodSongs

import React, { useState } from 'react';
import './MoodSongs.css';

const MoodSongs = ({ Songs }) => {
    const [isPlaying, setIsPlaying] = useState(null);

    const handlePlayPause = (index) => {
        if (isPlaying === index) {
            setIsPlaying(null);
        } else {
            setIsPlaying(index);
        }
    };

    return (
        <div className='mood-songs'>
            <h2>🎵 Recommended Songs</h2>

            <div className="songs-container">
                {Songs.map((song, index) => (
                    <div className={`song-card ${isPlaying === index ? 'active' : ''}`} key={index}>
                        <div className="song-info">
                            <h3>{song.title}</h3>
                            <p>{song.artist}</p>
                        </div>

                        <div className="controls">
                            {isPlaying === index &&
                                <audio
                                    src={song.audio}
                                    autoPlay
                                    style={{ display: 'none' }}
                                />
                            }
                            <button onClick={() => handlePlayPause(index)}>
                                {isPlaying === index ? (
                                    <i className="ri-pause-line"></i>
                                ) : (
                                    <i className="ri-play-circle-fill"></i>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isPlaying !== null && (
                <div className="now-playing">
                    <h4>Now Playing 🎧</h4>
                    <p>{Songs[isPlaying]?.title} — {Songs[isPlaying]?.artist}</p>
                </div>
            )}
        </div>
    );
};

export default MoodSongs;
