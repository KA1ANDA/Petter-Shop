import React, {memo, useEffect, useState} from 'react';


const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

const Ball = ({ color, containerWidth, containerHeight }) => {
  const [ballSize] = useState(getRandomNumber(5, 20));
  const [position, setPosition] = useState({
    x: getRandomNumber(0, containerWidth - ballSize),
    y: getRandomNumber(0, containerHeight - ballSize),
    speedX: getRandomNumber(-1, 1),
    speedY: getRandomNumber(-1, 1),
  });

  useEffect(() => {
    const updatePosition = () => {
      setPosition((prevPosition) => {
        let nextX = prevPosition.x + prevPosition.speedX;
        let nextY = prevPosition.y + prevPosition.speedY;
        
        let nextSpeedX = prevPosition.speedX;
        let nextSpeedY = prevPosition.speedY;

        // Check boundaries and reverse direction if hitting the edges
        if (nextX <= 0 || nextX >= containerWidth - ballSize) {
          nextX = Math.max(0, Math.min(nextX, containerWidth - ballSize));
          nextSpeedX = -prevPosition.speedX; // Reverse horizontal speed
        }
        if (nextY <= 0 || nextY >= containerHeight - ballSize) {
          nextY = Math.max(0, Math.min(nextY, containerHeight - ballSize));
          nextSpeedY = -prevPosition.speedY; // Reverse vertical speed
        }

        return {
          ...prevPosition,
          x: nextX,
          y: nextY,
          speedX: nextSpeedX,
          speedY: nextSpeedY,
        };
      });
    };

    const animate = () => {
      updatePosition();
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [containerWidth, containerHeight, ballSize]);

  return (
    <div
      className="ball"
      style={{
        backgroundColor: color,
        width: `${ballSize}px`,
        height: `${ballSize}px`,
        transform: `translate(${position.x}px, ${position.y}px)`,
        position: 'absolute',
      }}
    ></div>
  );
};

const BallAnimation = ({ containerWidth, containerHeight, numBalls }) => {
  const colors = ['#7c58d3', '#ffda47', '#ff47a2'];
  const balls = Array.from({ length: numBalls }).map((_, index) => (
    <Ball
      key={index}
      color={colors[index % colors.length]}
      containerWidth={containerWidth}
      containerHeight={containerHeight}
    />
  ));

  return <div className="ball-container" style={{ position: 'relative' }}>{balls}</div>;
};

export default BallAnimation;