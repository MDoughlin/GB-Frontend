module.exports = {
  preset: "react-native",
  // Remove this line: setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ["/node_modules/", "/android/", "/ios/"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-native-dropdown-select-list|expo-.*|@expo/.*|@react-navigation/.*)/)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testEnvironment: "jsdom",
  testMatch: [
    "**/__tests__/**/*.(js|jsx|ts|tsx)",
    "**/*.(test|spec).(js|jsx|ts|tsx)",
  ],
};
