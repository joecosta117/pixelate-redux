// We'll dive deeper into middleware later.
// For now, it's enough to know that this loggerMiddleware prints out useful
// information about everything that happens in your store.
// Much like requests in express pass from middleware to middleware, actions in redux
// pass from middleware to middleware. The loggerMiddleware gets a chance to see
// actions before they are processed. They get in the middle, hence, middleware.
import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';

// We'll soon revisit the initial state of this application.
const initialState = {
  grid: [[...Array(20)].map(el => '')],
  chosenColor: "red"
};

// ACTION TYPES
/* we'll add some action types soon */
const ADD_ROW = "ADD_ROW";
const CHOSEN_COLOR = "CHOSEN_COLOR";
const COLORIZE = "COLORIZE";

// ACTION CREATORS
/* we'll also add the corresponding action creators */
export const addRow = () => ({type: ADD_ROW});
export const chosenColor = (color) => ({type: CHOSEN_COLOR, color});
export const colorize = (row, col) => ({type: COLORIZE, row, col});

// And we'll revisit this reducer.
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ROW:
      const numCols = state.grid[0].length
      const newRow = Array(numCols).fill('')
      return {...state, grid: [...state.grid, newRow]}
    case CHOSEN_COLOR:
      return {...state, chosenColor: action.color}
    case COLORIZE:
      const newGrid = [...state.grid]
      newGrid[action.row] = [...newGrid[action.row]]
      newGrid[action.row][action.col] = state.chosenColor
      return {...state, grid: newGrid}
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(loggerMiddleware));



export default store;
