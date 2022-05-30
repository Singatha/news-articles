import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "./App";

global.fetch = jest.fn();

test('loading list of articles', async () => {
    fetch.mockImplementationOnce(() => {
        return Promise.resolve({
            status: "ok",
            totalResults: 0,
            articles: []
        });
    });
    
    await act(() => {
        render(<App />);
    });
    
    expect(screen.getByText('could not load page !')).toBeInTheDocument();
});

test('loading list of articles when server down or no internet', async () => {
    fetch.mockImplementationOnce(() => {
        return Promise.reject({ status: 'error'});
    });
    
    await act(() => {
        render(<App />);
    });
    expect(screen.getByText('could not load page !')).toBeInTheDocument();
});
