import {render} from '@testing-library/react';
import {left, isLeft} from "@viamedici/fp-ts-extensions"

import App from '../app';

test('renders app component', () => {
    const {container, getByRole} = render(<App/>);

    expect(getByRole('main')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
});

test('isLeft', () => {
    const either = left("");

    expect(isLeft(either)).toBe(true);
});
