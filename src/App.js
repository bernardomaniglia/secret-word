// CSS
import "./App.css";

// React
import { useCallback, useEffect, useState } from "react";

// Data
import { wordsList } from "./data/words";

// Components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState("");

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState([]);

  const pickWordAndCategory = () => {
    //pick a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    console.log(category);

    // pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    console.log(word);

    return { word, category };
  };

  const starGame = () => {
    // pick word and pick category
    const { word, category } = pickWordAndCategory();
    // create an array of letters and get get a lower case off then
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    console.log(wordLetters);

    // fill stages
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  };

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // check if letter has alredy been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };
  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      // reset all states
      clearLetterStates();
      
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  const retryGame = () => {
    setScore(0);
    setGuesses(guessesQty);

    setGameStage(stages[0].name);
  };

  // Contrução do sistema
  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={starGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retryGame={retryGame} />}
    </div>
  );
}

export default App;
