# Stock Api call app!

![](<https://github.com/AldisG/28stone-img/blob/main/Hnet.com-image%20(1).gif>)

## You can try this app here!

- https://stock-api-28stone-ag.netlify.app

---

### This app fetches API of stock data and displays it in a chart.

- Stock API data is coming from https://www.alphavantage.co/

#### Project

- Components folder is split between big components, that are located in related components folder, and elements folder, containing smaller or more universal components (like Error component)

- Styles are located in two places, since it is a very small project,
  in /src and in components inner folders, corresponding to the component it is related to.

- Store folder contains Redux, API call logic as well as util.ts file, for some functions, and types.ts for easy access of types.

- Tests are in test folder.

### To run the project

1.  Clone this directory and enter " npm i " in the terminal
2.  CD in the freshly installed project and run " npm start " to run it or " npm run test " to run tests
