import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {
    // first we store items in state
    const [storedValue, setStoredValue] = useState(() => {
        // we always check if we're in a browser
        if (typeof window === 'undefined') return initialValue;

        try {
            const item = window.localStorage.getItem(key);

            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error)
            return initialValue;
        }
    })

    // create a wrapped setter that plonks our gear into local storage
    const setValue = (value) => {
        try {
            // we can pass a function like we can to regular useState setter
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error(error)
        }
    }

    // return our getter and setter
    return [storedValue, setValue]
}