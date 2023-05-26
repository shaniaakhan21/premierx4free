import {useState, useRef, Dispatch, SetStateAction} from 'react';

function useDebounceState<T>(initialValue: T, delay: number): [T, Dispatch<SetStateAction<T>>] {
  const handlerRef = useRef<ReturnType<typeof setTimeout>>();
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  const setStateFn: typeof setDebouncedValue = (value: SetStateAction<T>) => {
    handlerRef.current && clearTimeout(handlerRef.current);
    handlerRef.current = setTimeout(() => setDebouncedValue(value), delay);
  }

  return [debouncedValue, setStateFn];
}

export default useDebounceState;
