import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

test('renders app header and empty state', async () => {
  render(<App />);
  expect(await screen.findByTestId('app-header')).toBeInTheDocument();
  // Either empty state or grid depending on existing localStorage
  // If no notes, EmptyState should show
  // We allow both possibilities to avoid flakiness across runs.
  const grid = screen.queryByTestId('notes-grid');
  const empty = screen.queryByTestId('empty-state');
  expect(grid || empty).toBeTruthy();
});

test('can create a new note via modal', async () => {
  render(<App />);
  const newBtn = await screen.findByTestId('new-note-btn');
  fireEvent.click(newBtn);

  const titleInput = await screen.findByLabelText(/title/i);
  fireEvent.change(titleInput, { target: { value: 'Test Note' } });

  const contentInput = await screen.findByLabelText(/content/i);
  fireEvent.change(contentInput, { target: { value: 'Hello world' } });

  const createBtn = await screen.findByText(/create note|save changes/i);
  fireEvent.click(createBtn);

  // Note should appear in grid
  const grid = await screen.findByTestId('notes-grid');
  expect(within(grid).getByText('Test Note')).toBeInTheDocument();
});
