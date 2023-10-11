import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../routes/SignUp';

describe('Sign up component', () => {
  it('Should render the component correctly', () => {
    const { container } = render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
