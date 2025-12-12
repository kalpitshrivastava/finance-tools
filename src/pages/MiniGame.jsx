import { useState, useRef } from "react";

export default function MiniGame() {
  const [gameState, setGameState] = useState("idle"); // idle | waiting | ready | result
  const [message, setMessage] = useState("Click START to begin!");
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);

  const timeoutRef = useRef(null);
  const startTimeRef = useRef(null);

  const startGame = () => {
    setGameState("waiting");
    setMessage("Wait for GREEN...");
    setReactionTime(null);

    const randomDelay = Math.floor(Math.random() * 3000) + 1000; // 1–4 sec

    timeoutRef.current = setTimeout(() => {
      setGameState("ready");
      setMessage("CLICK NOW!");
      startTimeRef.current = Date.now();
    }, randomDelay);
  };

  const handleClick = () => {
    if (gameState === "waiting") {
      // Clicked too early
      clearTimeout(timeoutRef.current);
      setGameState("result");
      setMessage("Too early! Try again.");
      return;
    }

    if (gameState === "ready") {
      // Calculate reaction time
      const time = Date.now() - startTimeRef.current;
      setReactionTime(time);
      setGameState("result");
      setMessage(`Your Reaction Time: ${time} ms`);

      if (!bestTime || time < bestTime) {
        setBestTime(time);
      }
    }
  };

  const resetGame = () => {
    clearTimeout(timeoutRef.current);
    setGameState("idle");
    setMessage("Click START to begin!");
    setReactionTime(null);
  };

  // Background color depending on state
  const bgColor = {
    idle: "#6c757d",
    waiting: "#dc3545",  // Red
    ready: "#28a745",    // Green
    result: "#17a2b8",
  }[gameState];

  return (
    <div
      style={{
        textAlign: "center",
        padding: "30px",
        maxWidth: "500px",
        margin: "auto",
        fontFamily: "Arial",
      }}
    >
      <h1>Reflex Speed Game</h1>
      <p>Click the box as SOON as it turns green!</p>

      {/* Game Box */}
      <div
        onClick={handleClick}
        style={{
          margin: "30px auto",
          width: "100%",
          height: "200px",
          borderRadius: "10px",
          backgroundColor: bgColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "1.4rem",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {message}
      </div>

      {/* Buttons */}
      {gameState === "idle" && (
        <button
          onClick={startGame}
          style={buttonStyle}
        >
          START
        </button>
      )}

      {gameState === "result" && (
        <>
          <button
            onClick={startGame}
            style={{ ...buttonStyle, backgroundColor: "#28a745" }}
          >
            PLAY AGAIN
          </button>
          <button
            onClick={resetGame}
            style={{ ...buttonStyle, backgroundColor: "#6c757d" }}
          >
            RESET
          </button>
        </>
      )}

      {/* Best Score */}
      {bestTime && (
        <p style={{ marginTop: "20px", fontSize: "1.2rem" }}>
          🏆 Best Reaction Time: <strong>{bestTime} ms</strong>
        </p>
      )}
    </div>
  );
}

// Button Styles
const buttonStyle = {
  padding: "10px 20px",
  fontSize: "1.1rem",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  margin: "10px",
  backgroundColor: "#007bff",
  color: "white",
};
