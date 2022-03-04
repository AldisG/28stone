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
describe('Render input values', () =>{
  it('Should be able to enter anything', () => {
    render(AppElement);
    const billInput = screen.getByTestId("search-input")
    fireEvent.change(billInput, { target: {value: 'abcd'} })
    waitFor (() => expect(billInput.value).toBe("abcd"))
  });

  it('Should find and render result (if api works, that is)', () => {
    render(AppElement);
    const billInput = screen.getByTestId("search-input")
    fireEvent.change(billInput, { target: {value: 'acc'} })
    const res = screen.findAllByText('ACC')
    waitFor (() => expect(res).toBeInTheDocument())
  });
  
  it('Should render ERROR text under Input component, if failed to find', () => {
    render(AppElement);
    const billInput = screen.getByTestId("search-input")
    fireEvent.change(billInput, { target: {value: 'was dwaawawwd awd dawdwaw '} })
    const res = screen.findAllByText("Sorry, couldn't find any matches...")
    waitFor (() => expect(res).toBeInTheDocument())
  });
})