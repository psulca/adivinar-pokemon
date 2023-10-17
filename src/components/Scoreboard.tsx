interface ScoreboardProps {
  bestStreak: number;
  currentStreak: number;
  totalGuesses: number;
  totalTries: number;
}

export function Scoreboard({currentStreak, bestStreak, totalGuesses, totalTries}: ScoreboardProps) {
  return (
    <section className="score-container">
      <div className="score-first-class">
        <h1>Streak</h1>
        <div className="score-second-class">
          <div>
            <h2>Best</h2>
            <p>{bestStreak}</p>
          </div>
          <div>
            <h2>Current</h2>
            <p>{currentStreak}</p>
          </div>
        </div>
      </div>
      <div className="score-first-class">
        <h1>Total</h1>
        <div className="score-second-class">
          <div>
            <h2>Guesses</h2>
            <p>{totalGuesses}</p>
          </div>
          <div>
            <h2>Tries</h2>
            <p>{totalTries}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
