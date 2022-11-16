// import react-testing methods
import {render, screen} from '@testing-library/react'
// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

import { ModalComponent } from '../ModalComponent';

// the component to test
test("the modal with the correct message prop should be visible when the prop isVisible is true", () => {
    render(<ModalComponent isVisible={true} message={"my message"}/>);
    expect(screen.getByText('my message')).toBeInTheDocument();
});