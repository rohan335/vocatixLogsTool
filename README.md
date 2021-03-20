# Typescript Express Server Template

## Quick Notes

1. A numbered list means perform these actions in order.

- A bulleted list means perform this or that action.
- A lot of these settings/configurations will require VSCode to be restarted before they start working.

## Setup

1. Ensure you have at least Node 12 installed by running `node --version`
2. Run `npm install` to download dependencies.

## NPM Commands

### Development

1. Run `npm run dev` to start the server. `tsc-watch` will restart the server if any files are changed.

### Testing

- Run `npm test` to run Jest unit tests.
- Run `npm test-watch` and tests related to any changed files will automatically be re-ran.

### Deployment

1. Run `npm start` after deployment to start the server.

### Linting

- Run `npm run lint` to lint.
- Run `npm run lint-fix` to automatically fix all fixable lint errors.
- Setup VSCode to automatically fix lint errors on save (see configuration below).

### Prettier

- Run `npm run prettier` to format files.
- Setup VSCode to automatically format on save (see configuration below).

## Husky Hooks

- One hook will not allow a commit if there are any lint errors (lint warnings pass). This is debatable, but I think you should finish your work by solving lint errors before committing.
- Another hook will not allow a push if any tests fail. This is less debatable in my opinion, I don't think we should be pushing broken code that could then be picked up by others.
- Note: We will need to improve this process because right now if there are unstaged changes they will be included in the hook commands but not in the following commit/push.

## Configuration

### Typescript

- Compiles to ES2019 which is supported by Node 12. If we use Node 14 we can change to ES2020.
- Tried to have strict rules to enforce higher code quality.

### Common Imports/Middleware

- `dotenv`: support for reading .env files.
- `cors`: Cross-Origin Resource Sharing support
- note: `body-parser` is deprecated, so added middleware to parse json and urlencoded requests using Express.

### Jest

- Test files are in test directory with file extension \*.test.ts.
- Mocks are cleared and reset after each test.
- Code coverage and reporting is setup but no coverage threshold is enforced.
- To reduce repeated imports, add any imports to /test/config.ts and they will be included in every test file.
- ts-jest is used to compile the test files to Typescript

### Linting

- Used recommended ESLint settings.
- Added settings to enforce sorting of imports.
- Prettier settings must be included last so that they override previous rules. If they are not last, ESLint and Prettier will constantly be in conflict.
- Ignores node_modules/ and dist/.

### Prettier

- Tabs are 2 spaces.
- Everything else is default.
- Ignores node_modules/ and dist/.

### Git

- Ignores node_modules/, dist/, package-lock.json, .eslintcache, .vscode/ and .env.

### VSCode

#### .vscode/settings.json

- Included in gitignore so that if people want different settings they are not overwritted.
- However, I highly suggest you use at least the following VSCode settings to be consistent with the ESLint and Prettier settings above.

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.insertSpaces": true,
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true
}
```

- `"typescript.tsdk": "node_modules\\typescript\\lib"`: add this setting to use the Typescript version you installed with NPM rather than the version VSCode is using.
- `"files.eol": "\n"`: add this setting to have consistent file endings (Unix-style) between Mac and Windows machines. If on Windows, then run `git config core.autocrlf false` to prevent git from converting the Unix-style ending (LF) to the Windows-style ending (CRLF).

#### Extensions

- Install the `ESLint` and `Prettier` extensions for the above to work.
