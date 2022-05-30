import { render, screen } from '@testing-library/react';
import Card from './Card';

test('Card that spans two columns', () => {
    render(<Card />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("separator")).toBeInTheDocument();
});

test('Card', () => {
    render(
        <Card articleIndex={2}/>
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
})