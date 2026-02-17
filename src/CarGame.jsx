import React, { useRef, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ReceiptPoundSterling } from 'lucide-react';


const carImage = new Image();
carImage.src = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCAxMDAiPjxwYXRoIGQ9Ik0xMCwxMCBoMzAgYTEwLDEwIDAgMCAxIDEwLDEwIHY2MCBhMTAsMTAgMCAwIDEgLTEwLDEwIGgtMzAgYTEwLDEwIDAgMCAxIC0xMCwtMTAgdi02MCBhMTAsMTAgMCAwIDEgMTAsLTEwIHoiIGZpbGw9IiNkYzI2MjYiIHN0cm9rZT0iIzk5MTYxNiIgc3Ryb2tlLXdpZHRoPSIyIi8+PHJlY3QgeD0iNSIgeT0iMjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjE1IiBmaWxsPSIjMzMzIiByeD0iMiIvPjxyZWN0IHg9IjQwIiB5PSIyMCIgd2lkdGg9IjUiIGhlaWdodD0iMTUiIGZpbGw9IiMzMzMiIHJ4PSIyIi8+PHJlY3QgeD0iNSIgeT0iNjUiIHdpZHRoPSI1IiBoZWlnaHQ9IjE1IiBmaWxsPSIjMzMzIiByeD0iMiIvPjxyZWN0IHg9IjQwIiB5PSI2NSIgd2lkdGg9IjUiIGhlaWdodD0iMTUiIGZpbGw9IiMzMzMiIHJ4PSIyIi8+PHBhdGggZD0iTTEyLDMwIGgyNiBhMiwyIDAgMCAxIDIsMiB2MTUgYTIsMiAwIDAgMSAtMiwyIGgtMjYgYTIsMiAwIDAgMSAtMiwtMiB2LTE1IGEyLDIgMCAwIDEgMiwtMiB6IiBmaWxsPSIjM2I4MmY2Ii8+PHBhdGggZD0iTTE1LDgwIGgyMCBhMiwyIDAgMCAxIDIsMiB2NSBhMiwyIDAgMCAxIC0yLDIgaC0yMCBhMiwyIDAgMCAxIC0yLC0yIHYtNSBhMiwyIDAgMCAxIDIsLTIgeiIgZmlsbD0iIzMzMyIvPjwvc3ZnPg==`;

const rockImage = new Image();
rockImage.src = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCI+PHBhdGggZD0iTTI1LDUgQzEwLDUgNSwyNSA1LDM1IEM1LDQ1IDE1LDQ4IDI1LDQ4IEMzNSw0OCA0NSw0NSA0NSwzNSBDNDUsMjUgNDAsNSAyNSw1IFoiIGZpbGw9IiM3ODkwOWMiIHN0cm9rZT0iIzRhNTU2OCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTE1LDIwIFExNSwxNSAyMCwyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNGE1NTY4IiBzdHJva2Utd2lkdGg9IjIiIGxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTMwLDMwIFEzNSwyNSAzNSwzNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNGE1NTY4IiBzdHJva2Utd2lkdGg9IjIiIGxpbmVjYXA9InJvdW5kIi8+PC9zdmc+`;

const coinImage = new Image();
coinImage.src = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCI+PGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjAiIGZpbGw9IiNmZmQwMDEiIHN0cm9rZT0iI2I0ODkwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMTUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZTliMyIgc3Ryb2tlLXdpZHRoPSIyIi8+PHRleHQgeD0iMjUiIHk9IjM1IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2I0ODkwMCIgZm9udC13ZWlnaHQ9ImJvbGQiPiQ8L3RleHQ+PC9zdmc+`;



function CarGame(props) {
  // State for menu vs playing
  const [gameStart, setGameStart] = useState(props.gamestarted ? true : false);
  const lastMoveRef = useRef(props.lastMove);
  
  // Screen Dimensions
  const widthCard = window.innerWidth * 0.5;
  const heightCard = window.innerHeight * 0.9;

  // Lane Calculations
  const firstLine = widthCard / 3 + widthCard / 9;
  const secondLine = widthCard / 3 + widthCard / 9 * 2;

  const canvasRef = useRef(null);
  const newItemRef = useRef([]); 

  const gameRef = useRef({
    carLane: 0,
    carX: firstLine,
    carY: heightCard - 100,
  });
  
  useEffect(() => {

    if (!gameStart) {
      
      if (props.lastMove === 'VICTORY' ) {
         console.log("Victory sign detected! Restarting game...");
         handleClickStart();
      }
    }
  }, [props.lastMove, gameStart]); // Re-run whenever the gesture changes

  // Keep ref in sync with props
  useEffect(() => {
    lastMoveRef.current = props.lastMove;
  }, [props.lastMove]);

  // Watch for external start signals
  useEffect(() => {
    setGameStart(props.gamestarted);
  }, [props.gamestarted]);

  const handleClickStart = () => {
    props.setGameStarted(true); // Notify parent
    setGameStart(true);
    props.play();
  };

  const handleClickstop = () => {
    props.setGameStarted(false); // Notify parent
    setGameStart(false);
    props.stop();
  };

  // --- MAIN GAME LOGIC ---
  useEffect(() => {
    // 1. If game is stopped, do nothing
    if (!gameStart) return;

   console.clear();
    newItemRef.current = []; // Clear old enemies
    props.setscore(0);         // Reset score display
    gameRef.current.carLane = 0; // Reset car position

    const game = gameRef.current;

    // Handle Head Movement
    const handleOnChange = () => {
      const move = lastMoveRef.current;
      if (move === 'LEFT') game.carLane = 1;
      else if (move === 'RIGHT') game.carLane = -1;
      else if (move === 'MID') game.carLane = 0;
    };

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let spawnTimerId;

    // --- Helper: Draw the Static Road ---
    const drawRoad = () => {
      ctx.fillStyle = 'green';
      ctx.fillRect(0, 0, widthCard, heightCard);
      
      ctx.fillStyle = 'grey';
      ctx.fillRect(widthCard / 3, 0, widthCard / 3, heightCard);

      const gap = 20;
      const lineSize = 40;
      ctx.setLineDash([lineSize, gap]);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 4;

      ctx.beginPath();
      ctx.moveTo(firstLine, 0);
      ctx.lineTo(firstLine, heightCard);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(secondLine, 0);
      ctx.lineTo(secondLine, heightCard);
      ctx.stroke();
      
      ctx.setLineDash([]);
    };

    const laneWidth = widthCard / 9;
    const roadStart = widthCard / 3;

    const getLaneCenter = (laneIndex) => {
        return roadStart + (laneIndex * laneWidth) + (laneWidth / 2);
    };

    // --- Helper: Draw the Player Car ---
    const drawCar = () => {
      const laneIndex = game.carLane + 1; 
      const carX = getLaneCenter(laneIndex);

      ctx.fillStyle = "white";
      ctx.font = "50px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      ctx.drawImage(carImage, carX - 25, game.carY-40 , 50, 50);
    };

    // --- LOGIC A: Spawner ---
    const spawnItem = () => {
      const laneIndex = Math.floor(Math.random() * 3); 
       const isCoin = Math.random() > 0.4; 
      
      const newItem = {
        type: isCoin ? 'COIN' : 'OBSTACLE',
        lane: laneIndex,
        x: getLaneCenter(laneIndex),
        y: -50, 
        speed: 5,
        passed: false ,
        captured: false
      };

      newItemRef.current.push(newItem);
     const randomdelay=()=>{
        return Math.random() * 1500 + 1000;
      };
      // Speed up spawn slightly as obstacles increase? (Optional: currently fixed at 2s)
      spawnTimerId = setTimeout(spawnItem, randomdelay());
    };

    // --- LOGIC B: Animation Loop ---
    const render = () => {
      handleOnChange();
      ctx.clearRect(0, 0, widthCard, heightCard);

      drawRoad();
      drawCar();

      let activeItems = [];

      newItemRef.current.forEach((item) => {
        item.y += item.speed; 
        
        ctx.fillStyle = item.type === 'COIN' ? 'gold' : 'red';
        ctx.font = "50px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.drawImage(item.type === 'COIN' ? coinImage : rockImage, item.x - 25, item.y - 25, 50, 50);

        // --- COLLISION CHECK ---
        const carLaneIndex = game.carLane + 1;
        const sameLane = carLaneIndex === item.lane; 
        const verticalHit = Math.abs(game.carY - item.y) < 40; // Hitbox

        if (sameLane && verticalHit && item.type === 'OBSTACLE') {
          // --- GAME OVER ---
          cancelAnimationFrame(animationFrameId);
          clearTimeout(spawnTimerId);
           props.setGameStarted(false);
          setGameStart(false); 
        props.setLastMove("");
          alert("Game Over! Final Score: " + props.score);
         
          return; 
        } else if (sameLane && verticalHit && item.type === 'COIN') {
          // --- COLLECT COIN ---
          props.setscore((prev) => prev + 5); // +5 Points for coin!
          item.captured = true; // Mark as collected so it vanishes
        }

        // 3. Score for Dodging Rocks (Optional: +1 for surviving)
        if (item.type === 'OBSTACLE' && !item.passed && item.y > game.carY + 20) {
          props.setscore((prev) => prev + 1); // +1 Point for dodging
          item.passed = true;
        }

        // Keep item if it is still on screen (and not a collected coin)
        if (item.y < heightCard + 100) {
             // If it's a collected coin, we can drop it from array to save memory
             if (!item.captured) activeItems.push(item);
             else if (item.type === 'OBSTACLE') activeItems.push(item); // Keep obstacles for "passed" check logic if needed
        }
      });

      newItemRef.current = activeItems;

      // Continue Loop
      if (gameStart) {
          animationFrameId = requestAnimationFrame(render);
      }
    };

    // Start Engine
    spawnItem();
    render();

    
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(spawnTimerId);
    };

  }, [gameStart]); // Re-run this entire effect when gameStart changes

  return (
    <div style={{ display: "flex", justifyContent: "center", backgroundColor: "orange", height: "100vh" }}>
      
      <div style={{ position: "relative" }}>
        <canvas
          ref={canvasRef}
          width={widthCard}
          height={heightCard}
          style={{ border: "2px solid black", marginTop: "30px", backgroundColor: '#2ecc71' }}
        />

      
        {!gameStart && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center rounded-lg"
               style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <h1 className="text-6xl font-bold text-white mb-4" style={{color:'white', fontSize:'40px', marginBottom:'20px'}}>🚗 Car Racing</h1>
            <p className="text-xl text-gray-300 mb-8" style={{color:'#ddd', marginBottom:'30px'}}>Ready to race?</p>
            
            <button
              onClick={handleClickStart}
              className="bg-green-500 hover:bg-green-600 text-white px-12 py-4 rounded-lg font-bold text-2xl"
              style={{ cursor: "pointer", padding: "15px 40px", fontSize: "20px", background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px' }}
            >
              Start Game
            </button>
           
          </div>
        )}
           
        {gameStart && (
            <button
              onClick={handleClickstop}
              style={{ position: 'absolute', top: '40px', right: '10px', cursor: "pointer", padding: "10px", fontSize: "16px", background: 'red', color: 'white', border: 'none' }}
            >
              Stop Game
            </button>
        )}
      </div>
    </div>
  );
}

export default CarGame;






