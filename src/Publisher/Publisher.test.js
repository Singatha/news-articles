import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { PublisherContext } from "../App/App";
import Publisher from "./Publisher";

const setPublisher = jest.fn();

test('Should return no results paragraph tag', () => {
    const publishers = [];

    render(
        <PublisherContext.Provider value={[setPublisher]}>
            <Publisher publishers={publishers}/>
        </PublisherContext.Provider>
    );

    expect(screen.getByText('No results')).toBeInTheDocument();
});

test('Should return a list of publishers', () => {
    const publishers = [{ name: 'BBC News', count: 1 }];

    render(
        <PublisherContext.Provider value={[setPublisher]}>
            <Publisher publishers={publishers}/>
        </PublisherContext.Provider>
    );

    fireEvent.click(screen.getByText('BBC News'));

    expect(screen.getByText('BBC News')).toBeInTheDocument();
    expect(setPublisher).toHaveBeenCalledTimes(1);

});
