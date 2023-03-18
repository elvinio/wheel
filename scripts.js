const phrases = [
    "wheel of fortune",
    "artificial intelligence",
    "machine learning",
    "deep learning",
    "natural language processing",
  ];
  
  const wheelValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, "Bankrupt", "Lose a Turn"];
  
  const player1 = {
      element: document.getElementById("player1"),
      score: 0,
  };
  
  const player2 = {
      element: document.getElementById("player2"),
      score: 0,
  };
  
  let currentPlayer = player1;
  let otherPlayer = player2;
  
  function updateScore(player, amount) {
      player.score += amount;
      player.element.querySelector("span").textContent = player.score;
  }
  
  function spinWheel() {
      return wheelValues[Math.floor(Math.random() * wheelValues.length)];
  }
  
  function switchPlayers() {
      [currentPlayer, otherPlayer] = [otherPlayer, currentPlayer];
  }
  
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];
  const revealedPhrase = phrase.replace(/[a-z]/gi, "_");
  
  const phraseDiv = document.getElementById("phrase");
  const guessInput = document.getElementById("guess");
  const spinButton = document.getElementById("spin");
  const solveButton = document.getElementById("solve");
  const messageDiv = document.getElementById("message");
  
  phraseDiv.textContent = revealedPhrase;
  
  spinButton.addEventListener("click", () => {
      const wheelResult = spinWheel();
      messageDiv.textContent = `Wheel result: ${wheelResult}`;
  
      if (wheelResult === "Bankrupt") {
          updateScore(currentPlayer, -currentPlayer.score);
          messageDiv.textContent += " You are bankrupt!";
          switchPlayers();
      } else if (wheelResult === "Lose a Turn") {
          messageDiv.textContent += " You lose a turn!";
          switchPlayers();
      } else {
          guessInput.focus();
          guessInput.addEventListener("keypress", (e) => {
              if (e.key === "Enter") {
                  const letter = guessInput.value.toLowerCase();
                  if (letter.length !== 1) {
                      messageDiv.textContent = "Please enter a single letter.";
                      return;
                  }
  
                  let updatedRevealedPhrase = "";
  
                  for (let i = 0; i < phrase.length; i++) {
                      if (phrase[i] === letter || phrase[i] === " " || phraseDiv.textContent[i] !== "_") {
                          updatedRevealedPhrase += phrase[i];
                      } else {
                          updatedRevealedPhrase += "_";
                      }
                  }
  
                  if (updatedRevealedPhrase !== phraseDiv.textContent) {
                      updateScore(currentPlayer, wheelResult);
                      messageDiv.textContent = `Good guess, ${letter} is in the phrase.`;
                  } else {
                      messageDiv.textContent = `Sorry, ${letter} is not in the phrase.`;
                      switchPlayers();
                  }
  
                  phraseDiv.textContent = updatedRevealedPhrase;
                  guessInput.value = "";
              }
          });
      }
  });
  
  solveButton.addEventListener("click", () => {
      const guess = guessInput.value.toLowerCase();
      guessInput.value = "";
  
      if (guess === phrase) {
          phraseDiv.textContent = phrase;
          messageDiv.textContent = `Congratulations ${currentPlayer.element.id}! You solved the phrase!`;
      } else {
          messageDiv.textContent = "Sorry, that's not the correct phrase.";
          switchPlayers();
      }
  });
  