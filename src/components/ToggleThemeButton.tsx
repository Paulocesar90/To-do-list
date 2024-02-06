import React from 'react';
import './ToggleThemeButton.css';

interface ToggleThemeButtonProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

const ToggleThemeButton: React.FC<ToggleThemeButtonProps> = ({ theme, onToggle }) => {
  const moonIconPath = '/sun-svgrepo-com.svg';
  const sunIconPath = '/moon-svgrepo-com.svg';

  return (
    <button onClick={onToggle} className={`themeButton ${theme === 'light' ? 'light' : 'dark'}`}>
      <img src={theme === 'light' ? sunIconPath : moonIconPath} alt={theme === 'light' ? 'Sun Icon' : 'Moon Icon'} className="themeIcon" />
    </button>
  );
};

export default ToggleThemeButton;
