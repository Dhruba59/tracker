import React, { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debounceText, setDebounceText] = useState<string>();
  
  useEffect(() => {
    const timerId =   setTimeout(() => {
      setDebounceText(value);
    }, delay);
    return (() => {
      clearTimeout(timerId);
    });
  }, [value, delay]);

  return debounceText;
};

export default useDebounce;