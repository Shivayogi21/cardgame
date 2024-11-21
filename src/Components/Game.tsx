"use client";
import { useState } from "react";
import { createDeck, getCardValue, Card } from "../utils/deck";
import CardComponent from "./Card";
import { motion } from "framer-motion";

const Game = () => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [wins, setWins] = useState<number>(0);
  const [losses, setLosses] = useState<number>(0);

  // Start a new game
  const newGame = () => {
    const shuffledDeck = createDeck().sort(() => Math.random() - 0.5);
    setDeck(shuffledDeck);
    setScore(0);
    setGameOver(false);
    setMessage("");
    setCurrentCard(shuffledDeck.pop() || null);
  };

  // Handle player's guess: higher or lower
  const handleGuess = (guess: "higher" | "lower") => {
    if (deck.length < 1) {
      setMessage("Deck is empty. Game Over!");
      setGameOver(true);
      return;
    }

    const nextCard = deck.pop(); // Get next card
    if (!nextCard) return;

    setDeck(deck);

    const currentCardValue = getCardValue(currentCard!);
    const nextCardValue = getCardValue(nextCard);

    // Check if guess is correct
    if (
      (guess === "higher" && nextCardValue > currentCardValue) ||
      (guess === "lower" && nextCardValue < currentCardValue)
    ) {
      setScore((prevScore) => prevScore + 1);
      setMessage("Correct! Keep going.");
      setCurrentCard(nextCard);
      if (score + 1 >= 5) {
        setMessage("🎉 You win! Score 5 points!");
        setWins((prevWins) => prevWins + 1);
        setGameOver(true);
      }
    } else {
      setGameOver(true);
      setMessage(
        `❌ Game Over! The correct card was ${nextCard.rank} of ${nextCard.suit}.`
      );
      setLosses((prevLosses) => prevLosses + 1);
    }
  };

  // Clear wins and losses
  const clearStats = () => {
    setWins(0);
    setLosses(0);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-green-500 to-blue-500 min-h-screen py-8 font-serif">
      <h1 className="text-4xl font-bold text-white m-8">SHIVA'S  CARDS</h1>
      <div className="flex justify-center items-center w-full max-w-md mb-8">
        {currentCard && (
          <motion.div
            key={`${currentCard.rank}-${currentCard.suit}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CardComponent rank={currentCard.rank} suit={currentCard.suit} />
          </motion.div>
        )}
      </div>

      {/* Controls */}
      {!gameOver && (
        <div className="flex space-x-6 mb-8">
          <motion.button
            onClick={() => handleGuess("higher")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-green-600 transition-transform"
          >
            Higher
          </motion.button>
          <motion.button
            onClick={() => handleGuess("lower")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-red-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-red-600 transition-transform"
          >
            Lower
          </motion.button>
        </div>
      )}

      {/* Score, Wins, Losses */}
      <div className="mt-6 text-center text-white">
        <p className="text-2xl font-bold">Score: {score}</p>
        <p className="text-xl mt-2">{message}</p>
        <p className="text-lg mt-2">Wins: {wins} | Losses: {losses}</p>
      </div>

      {/* Buttons for New Game and Clear Stats */}
      <div className="mt-6 flex space-x-4">
        <motion.button
          onClick={newGame}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-600 transition-transform"
        >
          New Game
        </motion.button>
        <motion.button
          onClick={clearStats}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-gray-600 transition-transform"
        >
          Clear Stats
        </motion.button>
      </div>
    </div>
  );
};

export default Game;
