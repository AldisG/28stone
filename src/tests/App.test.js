import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../App';
import { Provider } from 'react-redux';
import store from '../store/redux/store';

const AppElement = (
  <Provider store={store}>   
    <App />
  </Provider>    
)
describe('Render input', () =>{
  it('Should render Input bar', () => {
    render(AppElement);
    const billInput = screen.getByTestId("search-input")
    expect(billInput).toBeInTheDocument()
  });

  it('Should focus Input bar on load', () => {
    render(AppElement);
    const billInput = screen.getByTestId("search-input")
    expect(document.activeElement).toEqual(billInput)
  });
})