import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import App, { PublisherContext } from "../App/App";
import Publisher from "./Publisher";

test('loading list of publishers', () => {
    const setPublisher = jest.fn();
    const publishers = [{name: 'BBC News', count: 1}];

    render(
        <PublisherContext.Provider value={[setPublisher]}>
            <App>
                <Publisher publishers={publishers}/>
            </App>
        </PublisherContext.Provider>
    );

    expect(screen.getByText('loading...')).toBeInTheDocument();
});
