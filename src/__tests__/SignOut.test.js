import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignOut from '../routes/SignOut';

describe('Sign out button', () => {
  it('Should display on  the page', () => {
    const { container } = render(
      <BrowserRouter>
        <SignOut />
      </BrowserRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
