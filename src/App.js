import React, { useState, useEffect } from 'react';
import colors from './constants/colors';
import './App.css';

function App() {
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const [difficulty, setDifficulty] = useState('легкий');
  const [correctColor, setCorrectColor] = useState(getRandomColor());
  const [options, setOptions] = useState(generateOptions(correctColor, difficulty));
  const [message, setMessage] = useState('');

  function generateOptions(correctColor, difficulty) {
    const numberOfOptions = difficulty === 'легкий' ? 3 : difficulty === 'средний' ? 6 : 9;
    const options = [correctColor];
    while (options.length < numberOfOptions) {
      const option = getRandomColor();
      if (!options.includes(option)) {
        options.push(option);
      }
    }
    return shuffleArray(options);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleOptionClick = (option) => {
    if (option.hex === correctColor.hex) {
      setMessage('Правильно!');
      const newColor = getRandomColor();
      setCorrectColor(newColor);
      setOptions(generateOptions(newColor, difficulty));
    } else {
      setMessage('Попробуйте снова!');
    }
  };

  const handleDifficultyChange = (event) => {
    const newDifficulty = event.target.value;
    setDifficulty(newDifficulty);
    const newColor = getRandomColor();
    setCorrectColor(newColor);
    setOptions(generateOptions(newColor, newDifficulty));
    setMessage('');
  };

  useEffect(() => {
    console.log(`Проект: Угадай Цвет
        Кастомные функции:
        1. getRandomColor: Выбирает случайный цвет из предопределенного списка.
        2. generateOptions: Генерирует массив цветовых опций в зависимости от уровня сложности.
        3. shuffleArray: Перемешивает массив, чтобы рандомизировать порядок элементов.
        4. handleOptionClick: Обрабатывает логику при клике пользователя на цветовую опцию.
        5. handleDifficultyChange: Обрабатывает логику при изменении уровня сложности пользователем.`);
  }, []);

  return (
    <div className="App">
      <h1>Игра угадай цвет</h1>
      <div className="color-box" style={{ backgroundColor: correctColor.hex }}></div>
      <div>
        <label htmlFor="difficulty">Выберите сложность: </label>
        <select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
          <option value="easy">Легкая</option>
          <option value="medium">Средняя</option>
          <option value="hard">Сложная</option>
        </select>
      </div>
      <div className="options">
        {options.map((option) => (
          <button key={option.hex} onClick={() => handleOptionClick(option)}>
            {option.name}
          </button>
        ))}
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;