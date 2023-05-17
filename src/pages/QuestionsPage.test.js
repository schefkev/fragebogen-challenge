import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import questions from '../components/Questions';
import QuestionsPage from './QuestionsPage';

describe('QuestionsPage', () => {
  it('renders the questions page', () => {
    const handleComplete = jest.fn();

    render(
      <MemoryRouter initialEntries={['/questions']}>
        <Routes>
          <Route
            path="/questions"
            element={
              <QuestionsPage
                questions={questions}
                onComplete={handleComplete}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    /* ----- 1. QUESTION ----- */
    const firstQuestion = questions[0];
    const firstQuestionTitle = screen.getByText(firstQuestion.question);
    expect(firstQuestionTitle).toBeInTheDocument();

    const firstAnswer = firstQuestion.answers[0];
    const firstAnswerCheckbox = screen.getByLabelText(firstAnswer.text);
    fireEvent.click(firstAnswerCheckbox);

    const nextButton = screen.getByText('Nächste Frage');
    fireEvent.click(nextButton);

    /* ----- 2. QUESTION ----- */
    const secondQuestion = questions[1];
    const secondQuestionTitle = screen.getByText(secondQuestion.question);
    expect(secondQuestionTitle).toBeInTheDocument();

    const secondAnswer = secondQuestion.answers[1];
    const secondAnswerCheckbox = screen.getByLabelText(secondAnswer.text);
    fireEvent.click(secondAnswerCheckbox);
    fireEvent.click(nextButton);

    /* ----- 3. QUESTION ----- */
    const thirdQuestion = questions[2];
    const thirdQuestionTitle = screen.getByText(thirdQuestion.question);
    expect(thirdQuestionTitle).toBeInTheDocument();

    const thirdAnswer = thirdQuestion.answers[2];
    const thirdAnswerCheckbox = screen.getByLabelText(thirdAnswer.text);
    fireEvent.click(thirdAnswerCheckbox);
    fireEvent.click(nextButton);

    /* ----- 4. QUESTION ----- */
    const fourthQuestion = questions[3];
    const fourthQuestionTitle = screen.getByText(fourthQuestion.question);
    expect(fourthQuestionTitle).toBeInTheDocument();

    const fourthAnswer = fourthQuestion.answers[3];
    const fourthAnswerCheckbox = screen.getByLabelText(fourthAnswer.text);
    fireEvent.click(fourthAnswerCheckbox);
    fireEvent.click(nextButton);

    /* ----- LAST QUESTION ----- */
    const lastQuestion = questions[questions.length - 1];
    const lastQuestionTitle = screen.getByText(lastQuestion.question);
    expect(lastQuestionTitle).toBeInTheDocument();

    const lastAnswer = lastQuestion.answers[lastQuestion.answers.length - 1];
    const lastAnswerCheckbox = screen.getByLabelText(lastAnswer.text);
    fireEvent.click(lastAnswerCheckbox);

    const completeButton = screen.getByText('Iteration beenden');
    fireEvent.click(completeButton);

    expect(handleComplete).toHaveBeenCalledWith([
      {
        questionId: firstQuestion.id,
        answerIds: [firstAnswer.id],
      },
      {
        questionId: secondQuestion.id,
        answerIds: [secondAnswer.id],
      },
      {
        questionId: thirdQuestion.id,
        answerIds: [thirdAnswer.id],
      },
      {
        questionId: fourthQuestion.id,
        answerIds: [fourthAnswer.id],
      },
      {
        questionId: lastQuestion.id,
        answerIds: [lastAnswer.id],
      },
    ]);
  });
});
