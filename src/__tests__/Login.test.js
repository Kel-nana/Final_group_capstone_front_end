import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../routes/Login';

describe('Login component', () => {
  it('Shoul render the component correctly', () => {
    const { container } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
