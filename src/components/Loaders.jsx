import React, { useState, useEffect } from 'react';
import './BonosLoader.css';

const BonosLoader = ({ isLoading, onLoaded }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setFadeOut(true);
      setTimeout(() => {
        setIsVisible(false);
        onLoaded();
      }, 1000);
    }
  }, [isLoading, onLoaded]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`bonos-loader ${fadeOut ? 'fade-out' : ''}`}>
      <span className="letter b">B</span>
      <span className="letter o1">O</span>
      <span className="letter n">N</span>
      <span className="letter o2">O</span>
      <span className="letter s">S</span>
    </div>
  );
};

export default BonosLoader;