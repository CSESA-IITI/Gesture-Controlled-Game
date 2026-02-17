import * as handpose from '@tensorflow-models/handpose';
import * as tf from '@tensorflow/tfjs';



const fingerPoints={
    thumb:[0,1,2,3,4],
    indexFinger:[0,5,6,7,8],
    middleFinger:[0,9,10,11,12],
    ringFinger:[0,13,14,15,16],
    pinky:[0,17,18,19,20],
};





export const drawHand=async(predictions,ctx)=>{
    if(predictions.length>0){
        predictions.forEach((prediction)=>{
            const landmarks=prediction.landmarks;

            for(let j=0;j<Object.keys(fingerPoints).length;j++ ){
                let finger=Object.keys(fingerPoints)[j];
                for(let k=0;k<fingerPoints[finger].length-1;k++){
                    const firstPointIndex=fingerPoints[finger][k];
                    const secondPointIndex=fingerPoints[finger][k+1];
                    ctx.beginPath();
                    ctx.moveTo(
                        landmarks[firstPointIndex][0],
                        landmarks[firstPointIndex][1]
                    );
                    ctx.lineTo(
                        landmarks[secondPointIndex][0], 
                        landmarks[secondPointIndex][1]
                    );
                    ctx.strokeStyle="blue";
                    ctx.lineWidth=4;
                    ctx.stroke();
                }
            }
               

            for(let i=0;i<landmarks.length;i++){
                const x=landmarks[i][0];
                const y=landmarks[i][1];    
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.arc(x,y,5,0,3*Math.PI);
                ctx.fillStyle="green";
                ctx.fill();
            }
        });
    }
};       
// export const drawGuides = (ctx, width, height) => {
//   const thirdX = width / 3;
//   const thirdY = height / 3;

//   ctx.strokeStyle = "yellow";
//   ctx.lineWidth = 3;

//   // UP (center top)
//   ctx.strokeRect(thirdX, 0, thirdX, thirdY);

//   // LEFT (middle left)
//   ctx.strokeRect(0, thirdY, thirdX, thirdY);

//   // CENTER
//   ctx.strokeRect(thirdX, thirdY, thirdX, thirdY);

//   // RIGHT (middle right)
//   ctx.strokeRect(2 * thirdX, thirdY, thirdX, thirdY);

//   // DOWN (center bottom)
//   ctx.strokeRect(thirdX, 2 * thirdY, thirdX, thirdY);
//   console.log("5 box");
// };
export const drawGuides = (ctx, width, height) => {
  if (!ctx) return;

  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "yellow";
  ctx.lineWidth = 3;
  ctx.font = "22px Arial";
  ctx.fillStyle = "yellow";

  
  // Outer rectangle
  ctx.strokeRect(0, 0, width, height);

  // Core rectangle
  ctx.strokeRect(0, 0, width, height);
   ctx.moveTo(width/3,height)
   ctx.lineTo(width/3,0);
   ctx.stroke();


   ctx.moveTo(2*width/3,height)
   ctx.lineTo(2*width/3,0);
   ctx.stroke();

   

  
 
};



export const detectZone = (landmarks, width, height) => {
  const [x, y] = landmarks[0]; // palm position

  const thirdX = width / 3;
  

  // Center Zone
  if (x > 0 && x < thirdX ) {
    return "LEFT";
  }

  // Up Zone
  if ( x > thirdX && x < 2* thirdX) {
    return "MID";
  }

  // Down Zone
  if ( x > 2*thirdX && x < 3 * thirdX) {
    return "RIGHT";
  }

  
  return null;
}; 

export const isVictory = (landmarks) => {
  const palm = landmarks[0];
 
  
  const dist = (i) => {
    const dx = landmarks[i][0] - palm[0];
    const dy = landmarks[i][1] - palm[1];
    return Math.sqrt(dx * dx + dy * dy);
  };

  const indexOpen  = dist(8)  > 60;
  const middleOpen = dist(12) > 60;
  const ringClosed = dist(16) < 60;
  const pinkyClosed = dist(20) < 60;

 
  if(indexOpen && middleOpen && ringClosed && pinkyClosed){return "VICTORY";}
  
};