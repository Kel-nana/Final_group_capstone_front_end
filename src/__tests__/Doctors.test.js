import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Doctors from '../routes/Doctors';

describe('Doctors', () => {
  test('Should render doctors list correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Doctors />
        </BrowserRouter>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
