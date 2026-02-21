import { useState } from 'react';

const AIAssistant = ({ city, onAsk, loading }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!question.trim()) {
      return;
    }

    onAsk(question);
  };

  return (
    <section className="card">
      <h3>AI Weather Assistant</h3>
      <form onSubmit={handleSubmit} className="assistant-form">
        <textarea
          placeholder={city ? `Ask about weather in ${city}...` : 'Search a city first'}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          disabled={!city || loading}
          rows={3}
        />
        <button type="submit" disabled={!city || loading}>
          {loading ? 'Thinking...' : 'Ask AI'}
        </button>
      </form>
    </section>
  );
};

export default AIAssistant;
