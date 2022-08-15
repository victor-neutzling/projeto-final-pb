# ProjetoFinalPb - <img src="https://img.shields.io/github/languages/code-size/victor-neutzling/projeto-final-pb">


This project is being built as a conclusion to an internship that focuses on the Angular framework. its purpose is to serve as a way to expand and test my knowledge of the Angular framework and several other areas of front-end development, such as:

  - Storybook;
  - Docker;
  - Firebase authentication;
  - unit testing;
  - consuming several APIs

## Dependencies

to run properly, this project requires the following:

  - Node v16.15.0 ([download](https://nodejs.org/dist/v16.16.0/node-v16.16.0-x64.msi))
  
  - Angular v14 ([setup guide](https://angular.io/guide/setup-local))

To install other dependencies open a terminal window on the project directory and run:

```
npm install
```

## Usage

 - Development build:

    To start a development build, open a console window on the directory of the project and run:
    ```
    npm run start
    ```
    you can then access it on the browser through http://localhost:4200
    
    
- Production build:

    To compile a production-ready build, open a console window on the directory of the project and run:
    ```
    npm run build
    ```
    you can find the compiled build inside the 'dist' folder in the project's root directory
    
    
- Unit tests:
    
    To run the unit tests, open a console window on the directory of the project and run:
    ```
    npm run test
    ```
    it will show the code coverage on the console and automatically open a browser window showing the results of the test
