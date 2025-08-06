// import React, { useEffect, useRef } from 'react';
// import * as faceapi from 'face-api.js';
// import "./facialExpression.css"
// import axios from 'axios';

// export default function FacialExpression({ setSongs }) {
//     const videoRef = useRef();

//     const loadModels = async () => {
//         const MODEL_URL = '/models';
//         await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
//         await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
//     };

//     const startVideo = () => {
//         navigator.mediaDevices.getUserMedia({ video: true })
//             .then((stream) => {
//                 videoRef.current.srcObject = stream;
//             })
//             .catch((err) => console.error("Error accessing webcam: ", err));
//     };

//     async function detectMood() {

//         const detections = await faceapi
//             .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
//             .withFaceExpressions();
//         let mostProableExpression = 0
//         let _expression = '';

//         if (!detections || detections.length === 0) {
//             console.log("No face detected");
//             return;
//         }

//         for (const expression of Object.keys(detections[ 0 ].expressions)) {
//             if (detections[ 0 ].expressions[ expression ] > mostProableExpression) {
//                 mostProableExpression = detections[ 0 ].expressions[ expression ]
//                 _expression = expression;
//             }
//         }

//         /* get http://localhost:3000/songs?mood=happy */
//         axios.get(`http://localhost:3000/songs?mood=${_expression}`)
//         .then(response=>{
//             console.log(response.data);
//             setSongs(response.data.song);
//         })
//     }

//     useEffect(() => {
//         loadModels().then(startVideo);
//     }, []);

//     return (
//         <div className='mood-element' >
//             <video
//                 ref={videoRef}
//                 autoPlay
//                 muted
//                 className='user-video-feed'
//             />
//             <button onClick={detectMood}>Detect Mood</button>
//         </div>
//     );
// }

import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import './facialExpression.css';
import axios from 'axios';
import Navbar from './Navbar'; // import the new navbar

export default function FacialExpression({ setSongs }) {
    const videoRef = useRef();
    const [mood, setMood] = useState('');

    const emojiMap = {
        happy: '😄',
        sad: '😢',
        angry: '😠',
        surprised: '😲',
        neutral: '😐',
        disgusted: '🤢',
        fearful: '😨'
    };

    const loadModels = async () => {
        const MODEL_URL = '/models';
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((err) => console.error("Error accessing webcam: ", err));
    };

    async function detectMood() {
        const detections = await faceapi
            .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();

        let mostProableExpression = 0;
        let _expression = '';

        if (!detections || detections.length === 0) {
            console.log("No face detected");
            return;
        }

        for (const expression of Object.keys(detections[0].expressions)) {
            if (detections[0].expressions[expression] > mostProableExpression) {
                mostProableExpression = detections[0].expressions[expression];
                _expression = expression;
            }
        }

        setMood(_expression);

        axios.get(`http://localhost:3000/songs?mood=${_expression}`)
            .then(response => {
                setSongs(response.data.song);
            });
    }

    useEffect(() => {
        loadModels().then(startVideo);
    }, []);

    return (
        <div className="page-wrapper">

            <div className="content">
                <h2 className="section-title">Mood Detection</h2>
                <div className="camera-wrapper">
                    <video ref={videoRef} autoPlay muted className='user-video-feed' />
                    <button className="detect-button" onClick={detectMood}>Detect Mood</button>
                </div>

                {mood && (
                    <div className="mood-display">
                        <strong>Detected Mood:</strong>&nbsp;
                        <span>{mood.charAt(0).toUpperCase() + mood.slice(1)}</span>&nbsp;
                        <span className="emoji">{emojiMap[mood]}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
