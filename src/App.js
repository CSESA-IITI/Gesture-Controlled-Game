import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import CarGame from './CarGame';
import useSound from 'use-sound';


import { drawGuides, detectZone, isVictory ,drawHand} from './Utilities';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [lastMove, setLastMove] = useState("");
  const [score, setscore] = useState(0);
  
  const gameStartedRef = useRef(false);

 
const [play, { stop, pause, isPlaying }] = useSound('/bgmusic.mp3', { 
  volume: 0.5, 
  loop: true,
  interrupt: true 
});

useEffect(() => {
  if (gameStarted) {
  
    const startAudio = async () => {
      try {
        await play();
      } catch (err) {
        console.log("Autoplay blocked. User must click the page first.");
      }
    };
    startAudio();
  } else {
    pause();
  }
}, [gameStarted, play, pause]);
 
  useEffect(() => {
    gameStartedRef.current = gameStarted;
   
    if (!gameStarted) {
      setLastMove(""); 
    }


  }, [gameStarted]);

  useEffect(() => {
    const loadModel = async () => {
      const net = await handpose.load();
      console.log("Handpose model loaded");
      // Run detection loop
      setInterval(() => detect(net), 100);
    };
    loadModel();
  }, []);

  const detect = async (net) => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Force canvas size to match video
      video.width = videoWidth;
      video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const predictions = await net.estimateHands(video);
      const ctx = canvasRef.current.getContext("2d");

      ctx.clearRect(0, 0, videoWidth, videoHeight);
      drawGuides(ctx, videoWidth, videoHeight);

      if (predictions.length === 0) return;

      const lm = predictions[0].landmarks; 
      drawHand(predictions, ctx);

      // --- LOGIC SPLIT: MENU MODE vs GAME MODE ---
      
      // MODE 1: Game is NOT running (Menu)
      if (!gameStartedRef.current) {
        const gesture = isVictory(lm);
        if (gesture === "VICTORY") {
          console.log("✌️ Victory detected -> STARTING GAME");
          setLastMove("VICTORY");
          setGameStarted(true); // Start directly from App
        } 
      }
      // MODE 2: Game IS running (Steering)
      else {
        const move = detectZone(lm, videoWidth, videoHeight);
        if (move && move !== lastMove) {
          setLastMove(move);
        }
      }
    }
  };

  return (
    <div className="app-container">
      <header className="game-header">
        <h1>🏎️ Hand Gesture Racing</h1>
        <p className={`status-badge ${gameStarted ? "active" : "waiting"}`}>
          {gameStarted ? "🟢 GAME ACTIVE" : "🔴 SHOW ✌️ TO START"}
        </p>
      </header>

      <div className="main-content">
        <div className="cam-wrapper">
          <h3 className="panel-title">Your Hand Controller</h3>
          <div className="video-stack">
            <Webcam
              ref={webcamRef}
              className="cam-feed"
              videoConstraints={{ width: 400, height: 300 }} 
          
            />
            <canvas
              ref={canvasRef}
              className="cam-overlay"
            />
          </div>
          <div className="move-indicator">
            Last Move: <span style={{color: 'gold', fontWeight:'bold'}}>{lastMove || "..."}</span>
            <br/>
            Score: <span style={{color: 'white'}}>{score}</span>
          </div>
        </div>

        <div className="game-wrapper">
          <CarGame 
              gamestarted={gameStarted} 
              setGameStarted={setGameStarted} 
              lastMove={lastMove} 
              setLastMove={setLastMove}
              score={score}
              setscore={setscore}
              play={play}
              stop={stop}
          />
        </div>
      </div>
    </div>
  );
}

export default App;