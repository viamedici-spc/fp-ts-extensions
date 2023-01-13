export default {
    setupFilesAfterEnv: ["jest-extended/all"],
    transform: {
        "^.+\\.(t|j)sx?$": ["@swc/jest"],
    },
    "transformIgnorePatterns": [
        "!node_modules/"
    ]
}