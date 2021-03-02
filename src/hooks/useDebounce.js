import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const clearId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay);

    return () => {
      clearInterval(clearId)
    }
  }, [delay, value])

  return debouncedValue;
}

export default useDebounce;