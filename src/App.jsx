
import React, { useState, useEffect } from 'react';

const mockUser = {
  username: 'CatLady234',
  level: 13,
};

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://fodqewmztwzttkdvtizo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZHFld216dHd6dHRrZHZ0aXpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NjkzNzMsImV4cCI6MjA2NDA0NTM3M30.8P7Zi7p08Jk-Y0Yh_qSOB4ZMnLuvnKvgs-UDz0WwFD0'
);

const PuzzlePlatform = () => {
  const [user, setUser] = useState(mockUser);
  const [games, setGames] = useState([]);
  const [dailyProgress, setDailyProgress] = useState([true, false, false]);
  const [dailyStreak, setDailyStreak] = useState(3); // example streak value

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase.from('games').select('*');
      if (error) {
        console.error('Error fetching games:', error);
      } else {
        setGames(data);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    if (dailyProgress.every(status => status)) {
      setDailyStreak(prev => prev + 1);
    }
  }, [dailyProgress]);

  const renderGameThumbnailsByTag = (tag) =>
    games.filter((game) => game.tags.includes(tag)).map((game) => (
      <a
        key={game.id}
        href={game.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-56 bg-[#B3DDF2] rounded shadow-md shrink-0 flex flex-col items-center text-xs text-center p-2 cursor-pointer hover:shadow-md"
      >
        <div className="relative w-full">
          <img src={game.thumbnail} alt={game.name} className="w-full aspect-video object-cover rounded mb-1" />
          <div className="absolute bottom-2 left-1 flex items-center gap-1 text-[10px] text-red-600 bg-white/70 px-1 rounded">
            ❤️ {Math.floor(Math.random() * (9000 - 16 + 1)) + 16}
          </div>
        </div>
        <div className="font-semibold truncate mb-1">{game.name}</div>
      </a>
    ));

  return (
    <div className="min-h-screen bg-[#FF9933] text-gray-800 font-sans p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">JUST PUZZLES, LOL</h1>
        <nav className="flex gap-6">
          <button className="text-sm hover:underline">Friends</button>
          <button className="text-sm hover:underline">Leaderboards</button>
          <button className="text-sm hover:underline">Achievements</button>
          <button className="text-sm hover:underline">Create</button>
          <button className="bg-yellow-300 px-3 py-1 rounded font-semibold">Get Puzzle Pass</button>
        </nav>
      </header>
      ...
    </div>
  );
};

export default PuzzlePlatform;
