// import react-testing methods
import {render, screen} from '@testing-library/react'
// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

import Header from '../Header';

// the component to test
test("the header title with prop", () => {
    render(<Header title={"current employee"} />);
    expect(screen.getByRole('heading', {name: 'current employee'})).toBeInTheDocument();
});