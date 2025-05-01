// jest.config.js
module.exports = {
    preset: 'ts-jest', // Použijeme preset pro TypeScript
    testEnvironment: 'node', // Pro testování datových souborů nám stačí Node.js prostředí
    // Můžeme přidat další konfigurace později, např. pro aliasy cest
    moduleNameMapper: {
        // Pokud používáš aliasy jako @/* v importech, nastav je i zde
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    // Specifikujeme, kde hledat testovací soubory
    testMatch: [
        '**/__tests__/**/*.+(ts|tsx|js)', // Soubory v adresářích __tests__
        '**/?(*.)+(spec|test).+(ts|tsx|js)', // Soubory končící na .spec.ts nebo .test.ts
    ],
    // Transformace pro TypeScript soubory
    transform: {
        '^.+\.(ts|tsx)$': ['ts-jest', {
            tsconfig: 'tsconfig.json', // Řekneme ts-jest, kde najít tsconfig
        }],
    },
}; 