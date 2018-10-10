import React, { Component } from 'react';
import store, { addRow, chosenColor, colorize } from '../store';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.handleAddRow = this.handleAddRow.bind(this)
    this.handleChosenColor = this.handleChosenColor.bind(this)
    this.handleColorize = this.handleColorize.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleAddRow() {
    store.dispatch(addRow())
  }

  handleChosenColor(evt) {
    // evt.preventDefault()
    store.dispatch(chosenColor(evt.target.value))
  }

  handleColorize(row, col) {
    // console.log('colorize target: ', evt.target)
    // const target = evt.target;
    // if (target.tagName !== 'TD') {
    //   return;
    // }
    // if (target.className === store.getState().chosenColor) {
    //   target.className = '';
    //   store.dispatch(colorize(3, 2))
    // } else {
    //   target.className = store.getState().chosenColor;
    // }
    store.dispatch(colorize(row, col))

  }

  render() {
    const { grid } = this.state;
    return (
      <div id="pixelate">
        <h1>Pixelate</h1>
        <div>
          <button id="add-row" onClick={this.handleAddRow}>Add a row</button>
          <select onClick={this.handleChosenColor}>
            <option value="red">Red</option>
            <option value="orange">Orange</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="indigo">Indigo</option>
            <option value="violet">Violet</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="brown">Brown</option>
          </select>
        </div>
        <table>
          <tbody>
          {grid.map((row, rowIndex) =>
            <tr key={rowIndex}>
              {row.map((color, cellIndex) =>
                <td key={cellIndex} className={color} onClick={() => this.handleColorize(rowIndex, cellIndex)}></td>
                )}
            </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
