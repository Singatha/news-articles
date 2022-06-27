import { render, screen, waitFor } from "@testing-library/react";
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from "./App";

const server = setupServer(
    rest.get('https://newsapi.org/v2/everything', (req, res, ctx) => {
      return res(ctx.json({greeting: 'hello there'}))
    }),
);
  
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loading empty array', async () => {
    server.use(
        rest.get('https://newsapi.org/v2/everything', (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    status: "ok",
                    totalResults: 0,
                    articles: []
                })
            )
        }),
    );

    render(<App />);

    await waitFor(() => {screen.getByText('loading...')});
    expect(screen.getByText('loading...')).toBeInTheDocument();

    await waitFor(() => {screen.getAllByText('No results')});
    expect(screen.getAllByText('No results')[0]).toBeInTheDocument();
});

test('return could not load page', async () => {
    server.use(
        rest.get('https://newsapi.org/v2/everything', (req, res, ctx) => {
            return res(
                ctx.status(500)
            )
        }),
    );

    render(<App />);

    await waitFor(() => { screen.getByText('loading...') });
    expect(screen.getByText('loading...')).toBeInTheDocument();

    await waitFor(() => { screen.getByText('could not load page !') });
    expect(screen.getByText('could not load page !')).toBeInTheDocument();
});
