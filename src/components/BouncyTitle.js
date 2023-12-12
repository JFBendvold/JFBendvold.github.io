import { useState, useEffect } from 'react';
import styles from '../style/bouncyTitle.module.css';

function BouncyTitle({ title }) {
  const [hoverStates, setHoverStates] = useState(
    Array.from(title).map(() => false)
  );

  function handleKeyDown(e) {
    const index = title.toLowerCase().indexOf(e.key);
    if (index !== -1) {
      const newHoverStates = [...hoverStates];
      newHoverStates[index] = true;
      setHoverStates(newHoverStates);
    }
  }

  function handleKeyUp(e) {
    const index = title.toLowerCase().indexOf(e.key);
    if (index !== -1) {
      const newHoverStates = [...hoverStates];
      newHoverStates[index] = false;
      setHoverStates(newHoverStates);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [hoverStates]);

  return (
    <div className={styles.title}>
      {Array.from(title).map((letter, index) => (
        <h1 key={index} style={{ marginTop: hoverStates[index] ? '0.5rem' : '0' }} className={styles.letter}>
          {letter}
        </h1>
      ))}
    </div>
  );
}

export default BouncyTitle;
