import { createContext, useContext, useState } from "react";
import fakeLetter from '../letters/fakeData.json';


export const LetterContext = createContext();
export function LetterContextProvider({ children }) {
    const [letters, setLetters] = useState(fakeLetter);
    const filters = ['All', '민지', '하니', '다니엘', '해린', '혜인'];
    const [filter, setFilter] = useState(filters[0]);
    const onAdd = (letter) => {
        setLetters([...letters, letter])
    }
    const onDelete = (deleteId) => {
        setLetters(letters.filter(letter => letter.id !== deleteId));
    }
    const onUpdate = (updated) => {
        setLetters(letters.map(letter => letter.id === updated.id ? updated : letter));
    }

    const onFilterChange = (updateFilter) => {
        setFilter(updateFilter);
    }
    return (
        <LetterContext.Provider value={{ letters, filter, filters, onAdd, onDelete, onUpdate, onFilterChange }}>
            {children}
        </LetterContext.Provider>
    )
}

export function useLetterContext() {
    return useContext(LetterContext);
}

export function filterLetters(letters, filter) {
    if (filter === 'All') return letters;
    return letters.filter(letter => letter.writedTo === filter);
}