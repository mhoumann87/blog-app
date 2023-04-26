import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowsSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowsSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    const cleanUp = () => window.removeEventListener('resize', handleResize);

    return cleanUp;
  }, []);

  return windowSize;
};

export default useWindowSize;
