import React, { useState } from 'react';

import './style.css'


const topics = ['Math', 'Science','Computer Science'];
const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

const questions = [
  { id: 1, topic: 'Math', difficulty: 'Beginner', type: 'multiple-choice', question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: '4', explanation: '2 + 2 equals 4.' },
  { id: 2, topic: 'Math', difficulty: 'Intermediate', type: 'true-false', question: 'Is the square root of 16 equal to 4?', answer: 'True', explanation: 'The square root of 16 is 4.' },
  { id: 3, topic: 'Math', difficulty: 'Advanced', type: 'true-false', question: 'Is the square root of 16 equal to 5?', answer: 'False', explanation: 'The square root of 16 is 4.' },
  { id: 4, topic: 'Science', difficulty: 'Beginner', type: 'true-false', question: 'Power house of cell is called Mitochondria.', answer: 'True', explanation: 'Power house of cell is called Mitochondria.' },
  { id: 5, topic: 'Science', difficulty: 'Intermediate', type: 'multiple-choice', question: 'Number of teeths in adult',options:['32','33','30','28'], answer: '32', explanation: 'Number of teeths in adult  is 32.' },
  { id: 6, topic: 'Science', difficulty: 'Advanced', type: 'multiple-choice', question: 'Number of bones in human body',options:['100','106','207','206'], answer: '206', explanation: 'Number of bones in human body is 206.' },
  { id: 7, topic: 'Computer Science', difficulty: 'Beginner', type: 'multiple-choice', question: 'Structure of web page is made by which language ?',options:['CSS','C#','C++','HTML'], answer: 'HTML', explanation: 'Structure of web page is made in HTML.' },
  { id: 8, topic: 'Computer Science', difficulty: 'Intermediate', type: 'true-false', question: 'CSS is scripting Language.', answer: 'False', explanation: 'CSS is style sheet.' },
  { id: 9, topic: 'Computer Science', difficulty: 'Advanced', type: 'true-false', question: 'ReactJS is frontend library.', answer: 'True', explanation: 'ReactJS is frontend JS library.' },
  // Add more questions if you want...
];

const QuizGenerator = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleTopicChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTopics([...selectedTopics, value]);
    } else {
      setSelectedTopics(selectedTopics.filter(topic => topic !== value));
    }
  };

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  const generateQuiz = () => {
    const filteredQuestions = questions.filter(question => selectedTopics.includes(question.topic) && question.difficulty === selectedDifficulty);
    const selectedQuestions = filteredQuestions.slice(0, 3); // Adjust the number of questions as needed
    setQuizQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setScore(0);
  };

  const handleAnswerSubmit = () => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestion.id];
    if (userAnswer === currentQuestion.answer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      alert(`Quiz completed! Your score is ${score}/${quizQuestions.length}`);
    }
  };

  const handleUserAnswerChange = (e) => {
    const { name, value } = e.target;
    setUserAnswers({ ...userAnswers, [name]: value });
  };

  return (
    <div className='main'>
      <h2>Quiz Generator</h2>
      <div className='box-1'>
        <h3>Select Topics:</h3>
        {topics.map(topic => (
          <label key={topic}>
            <input
              type="checkbox"
              value={topic}
              checked={selectedTopics.includes(topic)}
              onChange={handleTopicChange}
            />
            {topic}
          </label>
        ))}
      </div>
      <div className='box-2'>
        <h3>Select Difficulty:</h3>
        <select value={selectedDifficulty} onChange={handleDifficultyChange}>
          <option value="">Select</option>
          {difficulties.map(difficulty => (
            <option key={difficulty} value={difficulty}>{difficulty}</option>
          ))}
        </select>
      </div>
      <button className='btn-1' onClick={generateQuiz} disabled={selectedTopics.length === 0 || selectedDifficulty === ''}>Generate Quiz</button>
      {quizQuestions.length > 0 && (
        <div className='box-3'>
          <h3>Question {currentQuestionIndex + 1}:</h3>
          <p>{quizQuestions[currentQuestionIndex].question}</p>
          {quizQuestions[currentQuestionIndex].type === 'multiple-choice' && (
            <div>
              {quizQuestions[currentQuestionIndex].options.map(option => (
                <label key={option}>
                  <input
                    type="radio"
                    name={quizQuestions[currentQuestionIndex].id.toString()}
                    value={option}
                    checked={userAnswers[quizQuestions[currentQuestionIndex].id] === option}
                    onChange={handleUserAnswerChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
          {quizQuestions[currentQuestionIndex].type === 'true-false' && (
            <div>
              <label>
                <input
                  type="radio"
                  name={quizQuestions[currentQuestionIndex].id.toString()}
                  value="True"
                  checked={userAnswers[quizQuestions[currentQuestionIndex].id] === 'True'}
                  onChange={handleUserAnswerChange}
                />
                True
              </label>
              <label>
                <input
                  type="radio"
                  name={quizQuestions[currentQuestionIndex].id.toString()}
                  value="False"
                  checked={userAnswers[quizQuestions[currentQuestionIndex].id] === 'False'}
                  onChange={handleUserAnswerChange}
                />
                False
              </label>
            </div>
          )}
          <button className='btn-2' onClick={handleAnswerSubmit}>Next</button>
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;
