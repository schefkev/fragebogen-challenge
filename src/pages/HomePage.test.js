import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('creates a new iteration when the button is clicked', () => {
    const onIterationCreateMock = jest.fn();
    render(
      <MemoryRouter>
        <HomePage onIterationCreate={onIterationCreateMock} />
      </MemoryRouter>,
    );

    const iterationTitle = screen.getByPlaceholderText('Iterations Titel');
    fireEvent.change(iterationTitle, { target: { value: 'New Iteration' } });

    const iterationBtn = screen.getByRole('button', {
      name: 'Neue Iteration Starten',
    });
    fireEvent.click(iterationBtn);
  });
});
