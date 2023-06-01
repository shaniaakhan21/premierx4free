import { SetStateAction, useEffect, useState } from "react";
import { createCustomSetStateFn, loadLocalStorage } from "../helpers/global";


export const useLocalStorageState = <T>(
  path: string,
  initialState?: T,
  noRemove = false
): [T | undefined, (u?: SetStateAction<T | undefined>) => void] => {
  const [state, setState] = useState<T | undefined>(initialState)

  useEffect(() => {
    loadLocalStorage<T>(path, setState)
  }, [])

  return [state, createCustomSetStateFn<T>(path, setState, noRemove)]
}
