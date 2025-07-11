name: test

on:
  pull_request:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    container:
      image: node:20

      strategy:
  matrix:
    node-version: [12.x, 14.x, 16.x]
    # This matrix will run the job multiple times, once for each specified Node.js version (12.x, 14.x, 16.x).
    # The job will be executed separately for each version, ensuring compatibility across these versions.

    


    steps:
      - uses: actions/checkout@v3

       - name: Cache Node Modules
        uses: actions/cache@v2
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-
            

      - name: Install dependencies
        run: npm install

      - name: Run Linter
        run: npx eslint .
        # Runs ESLint to check for code issues

      - name: Run tests
        run: npm test

      - name: Build project
        run: npm run build