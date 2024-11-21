interface CardProps {
  rank: string;
  suit: string;
}

const suitSymbols: Record<string, string> = {
  Spades: '♠',
  Hearts: '♥',
  Diamonds: '♦',
  Clubs: '♣',
};

const Card: React.FC<CardProps> = ({ rank, suit }) => {
  return (
    <div className="w-48 h-72 bg-white rounded-lg shadow-2xl flex flex-col justify-between p-4 transform transition-transform duration-300">
      <div className="flex justify-between text-xl font-bold text-gray-800">
        <span>{rank}</span>
        <span>{suitSymbols[suit]}</span>
      </div>
      <div className="flex justify-center items-center text-5xl font-bold text-gray-800">
        <span>{suitSymbols[suit]}</span>
      </div>
      <div className="flex justify-between text-xl font-bold text-gray-800">
        <span>{suitSymbols[suit]}</span>
        <span>{rank}</span>
      </div>
    </div>
  );
};

export default Card;
