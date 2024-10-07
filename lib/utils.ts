import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PWD_WORDS } from "./constants";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getInitials = (name: string): string =>
    name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("");

export const generateWordBasedPassword = (
    wordCount: number,
    options: {
        addNumbersAndSymbols?: boolean;
        camelCase?: boolean;
        separator?: string;
        randomCase?: boolean;
    } = {}
): string => {
    const {
        addNumbersAndSymbols = false,
        camelCase = false,
        separator = "",
        randomCase = false,
    } = options;

    const words = PWD_WORDS;

    // Randomly select the words
    const selectedWords = Array.from(
        { length: wordCount },
        () => words[Math.floor(Math.random() * words.length)]
    );

    // Shuffle selected words for added randomness
    const shuffledWords = selectedWords.sort(() => 0.5 - Math.random());

    // Apply CamelCase or separator if needed
    let password = shuffledWords
        .map((word) => {
            if (camelCase) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
            return word;
        })
        .join(separator);

    // Apply random casing to characters if required
    if (randomCase) {
        password = password
            .split("")
            .map((char) =>
                Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
            )
            .join("");
    }

    // Optionally add numbers and symbols for extra security
    if (addNumbersAndSymbols) {
        const number = Math.floor(Math.random() * 100);
        const specialChars = "!@#$%^&*";
        const specialChar =
            specialChars[Math.floor(Math.random() * specialChars.length)];
        password += `${number}${specialChar}`;
    }

    return password;
};
