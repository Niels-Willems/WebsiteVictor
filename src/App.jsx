import { useMemo, useState, useEffect } from 'react';
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Confetti from './Confetti.jsx';

const TOPICS = [
  {
    id: 'geld-verdienen',
    icon: '💼',
    title: 'Geld verdienen & belastingen',
    subtitle: 'Ontdek hoe inkomen werkt en waarom belastingen bestaan.',
    theory: [
      'Je kan geld verdienen via een studentenjob, vakantiejob of kleine opdrachten.',
      'Belastingen zijn bijdragen waarmee overheid scholen, wegen en zorg betaalt.',
      'Check altijd je loonfiche zodat je ziet wat je brutoloon en nettoloon is.'
    ],
    practice: {
      caseText: 'Milan verdient 280 euro met een weekendjob en geeft 120 euro uit. Hoeveel houdt hij over?',
      options: ['120 euro', '140 euro', '160 euro', '180 euro'],
      answer: 2,
      explain: '280 - 120 = 160 euro.'
    },
    quiz: [
      {
        question: 'Wat is nettoloon?',
        answers: ['Loon zonder belastingen', 'Loon na inhoudingen', 'Enkel vakantiegeld', 'Werkbonus'],
        correct: 1
      },
      {
        question: 'Waarom bestaan belastingen?',
        answers: ['Voor privéwinst', 'Om publieke diensten te betalen', 'Om sparen te stoppen', 'Alleen voor volwassenen'],
        correct: 1
      }
    ],
    videoUrl: 'https://www.youtube.com/embed/bE6t4hWkqEs',
    simulationUrl: 'https://www.wikifin.be/nl/wikifin-school/online-oefenen-dankzij-financial-literacy-school'
  },
  {
    id: 'omgaan-met-geld',
    icon: '💳',
    title: 'Omgaan met geld',
    subtitle: 'Leer budgetteren en maak slimme keuzes met je uitgaven.',
    theory: [
      'Een budget toont hoeveel geld je krijgt en hoeveel je uitgeeft.',
      'Betaal eerst behoeften zoals eten, schoolmateriaal en vervoer.',
      'Stel voor een aankoop drie vragen: heb ik dit nodig, kan ik het betalen, wil ik dit morgen nog?'
    ],
    practice: {
      caseText: 'Lars krijgt 100 euro. Hij koopt een game voor 40 euro, gaat naar de cinema voor 15 euro en spaart 30 euro. Hoeveel blijft over?',
      options: ['5 euro', '10 euro', '15 euro', '20 euro'],
      answer: 2,
      explain: '100 - 40 - 15 - 30 = 15 euro.'
    },
    quiz: [
      {
        question: 'Wat is een budget?',
        answers: ['Een lening', 'Een overzicht van inkomsten en uitgaven', 'Een belasting', 'Een spaarrekening'],
        correct: 1
      },
      {
        question: 'Welke uitgave is een behoefte?',
        answers: ['Nieuwe schoenen', 'Schoolboeken', 'Concertticket', 'Game'],
        correct: 1
      },
      {
        question: 'Waarom is sparen belangrijk?',
        answers: ['Om voorbereid te zijn op toekomstige kosten', 'Om meer uit te geven', 'Om belastingen te betalen', 'Om rijk te lijken'],
        correct: 0
      }
    ],
    videoUrl: 'https://www.youtube.com/embed/L9WQjCccv8k',
    simulationUrl: 'https://www.wikifin.be/nl/wikifin-school/online-oefenen-dankzij-financial-literacy-school'
  },
  {
    id: 'sparen',
    icon: '🏦',
    title: 'Sparen',
    subtitle: 'Bouw spaardoelen op en leer prioriteiten stellen.',
    theory: [
      'Sparen werkt beter met een concreet doel en een deadline.',
      'Gebruik de 24-uursregel om impulsaankopen te vermijden.',
      'Automatisch sparen maakt volhouden makkelijker.'
    ],
    practice: {
      caseText: 'Noor wil 360 euro sparen in 6 maanden. Hoeveel moet ze elke maand sparen?',
      options: ['40 euro', '50 euro', '60 euro', '70 euro'],
      answer: 2,
      explain: '360 / 6 = 60 euro per maand.'
    },
    quiz: [
      {
        question: 'Wat helpt het meest om een spaardoel te halen?',
        answers: ['Geen plan maken', 'Wekelijks bijhouden', 'Alles tegelijk kopen', 'Spaargeld uitlenen aan vrienden'],
        correct: 1
      },
      {
        question: 'Wat is een goed spaardoel?',
        answers: ['Iets vaags', 'Iets meetbaar met bedrag en datum', 'Iets zonder deadline', 'Iets dat anderen kiezen'],
        correct: 1
      }
    ],
    videoUrl: 'https://www.youtube.com/embed/L9WQjCccv8k',
    simulationUrl: 'https://www.wikifin.be/nl/wikifin-school/online-oefenen-dankzij-financial-literacy-school'
  },
  {
    id: 'beleggen',
    icon: '📈',
    title: 'Beleggen',
    subtitle: 'Maak kennis met risico, rendement en lange termijn denken.',
    theory: [
      'Beleggen is geld laten groeien op lange termijn, met kans op winst en verlies.',
      'Spreiden over meerdere investeringen verlaagt risico.',
      'Beleg alleen geld dat je niet meteen nodig hebt.'
    ],
    practice: {
      caseText: 'Twee leerlingen beleggen elk 20 euro per maand. Wie bouwt meer op: 1 jaar of 5 jaar?',
      options: ['1 jaar', '5 jaar', 'Evenveel', 'Onmogelijk te weten'],
      answer: 1,
      explain: 'Langer beleggen geeft meer tijd voor mogelijke groei.'
    },
    quiz: [
      {
        question: 'Wat betekent risico bij beleggen?',
        answers: ['Dat je nooit verliest', 'Dat waarde kan stijgen of dalen', 'Dat je altijd winst hebt', 'Dat sparen verboden is'],
        correct: 1
      },
      {
        question: 'Wat is spreiden?',
        answers: ['Alles in een aandeel', 'Investeren in meerdere opties', 'Niet meer investeren', 'Alleen cash bewaren'],
        correct: 1
      }
    ],
    videoUrl: 'https://www.youtube.com/embed/FLKJ9Qz5u5w',
    simulationUrl: 'https://www.wikifin.be/nl/wikifin-school/online-oefenen-dankzij-financial-literacy-school'
  }
];

function shuffleAnswers(answers, correctIndex) {
  const items = answers.map((answer, originalIndex) => ({ answer, originalIndex }));

  for (let index = items.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
  }

  const correctPosition = items.findIndex((item) => item.originalIndex === correctIndex);
  if (correctPosition === 1) {
    const swapIndex = items.length > 2 ? 2 : 0;
    [items[correctPosition], items[swapIndex]] = [items[swapIndex], items[correctPosition]];
  }

  return items;
}

function buildShuffledQuiz(topic) {
  return topic.quiz.map((question) => {
    return {
      ...question,
      shuffledAnswers: shuffleAnswers(question.answers, question.correct)
    };
  });
}

function getMaxScore(topic) {
  return topic.quiz.length;
}

function getTotalQuestionCount() {
  return TOPICS.reduce((total, topic) => total + getMaxScore(topic), 0);
}

function HomePage({ completedSet, quizScores, onResetProgress }) {
  const completedPercent = Math.round((completedSet.size / TOPICS.length) * 100);
  const totalBestScore = TOPICS.reduce((total, topic) => total + (quizScores[topic.id] ?? 0), 0);
  const totalQuestions = getTotalQuestionCount();
  const perfectQuizCount = TOPICS.filter((topic) => (quizScores[topic.id] ?? 0) === getMaxScore(topic)).length;

  return (
    <main className="page page-home">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Financiele Reis</p>
          <h1>Financieel Slim</h1>
          <p className="hero-sub">Leer alles over geldzaken via videos, oefeningen en praktische uitdagingen.</p>
          <a className="btn btn-primary" href="#/topic/omgaan-met-geld">
            Start je financiele reis
          </a>
        </div>
        <div className="hero-progress">
          <h2>Voortgang</h2>
          <div className="progress-track" aria-label="Voortgangsbalk">
            <div className="progress-fill" style={{ width: `${completedPercent}%` }} />
          </div>
          <p>{completedPercent}% afgerond</p>
        </div>
      </section>

      <section className="classroom-panel" aria-label="Klasoverzicht">
        <div>
          <p className="section-kicker">Klasoverzicht</p>
          <h2>Voortgang in een oogopslag</h2>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <span>{completedSet.size}/{TOPICS.length}</span>
            <p>Afgewerkte lessen</p>
          </div>
          <div className="stat-card">
            <span>{totalBestScore}/{totalQuestions}</span>
            <p>Beste quizscore</p>
          </div>
          <div className="stat-card">
            <span>{perfectQuizCount}</span>
            <p>Perfecte quizzes</p>
          </div>
        </div>
        <div className="classroom-actions">
          <button className="btn btn-secondary" onClick={() => window.print()}>
            Print voortgang
          </button>
          <button className="btn btn-quiet" onClick={onResetProgress}>
            Reset voortgang
          </button>
        </div>
      </section>

      <section className="topics-grid" aria-label="Onderwerpen">
        {TOPICS.map((topic) => (
          <article className={`topic-card ${topic.id}`} key={topic.id}>
            {(() => {
              const topicScore = quizScores[topic.id] ?? 0;
              const maxScore = getMaxScore(topic);

              return (
                <div className="topic-card-top">
                  <p className="topic-icon" aria-hidden>
                    {topic.icon}
                  </p>
                  <span className={topicScore === maxScore ? 'score-pill perfect' : 'score-pill'}>
                    Score: {topicScore}/{maxScore}
                  </span>
                </div>
              );
            })()}
            <h3>{topic.title}</h3>
            <p>{topic.subtitle}</p>
            <div className="topic-card-footer">
              <Link className="btn btn-card" to={`/topic/${topic.id}`}>
                Ontdek meer
              </Link>
              {completedSet.has(topic.id) && <span className="chip">Klaar</span>}
            </div>
          </article>
        ))}
      </section>

      <section className="map">
        <h2>Game-map</h2>
        <ol>
          {TOPICS.map((topic) => (
            <li key={topic.id} className={completedSet.has(topic.id) ? 'done' : 'open'}>
              <span>{completedSet.has(topic.id) ? '✅' : '🔄'}</span>
              <Link to={`/topic/${topic.id}`}>{topic.title}</Link>
              <span className="map-score">
                {quizScores[topic.id] ?? 0}/{getMaxScore(topic)}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

function TopicPage({ completedSet, setCompletedSet, quizScores, setQuizScores }) {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = TOPICS.find((item) => item.id === topicId);

  if (!topic) return <Navigate to="/" replace />;

  const index = TOPICS.findIndex((item) => item.id === topic.id);
  const prev = index > 0 ? TOPICS[index - 1] : null;
  const next = index < TOPICS.length - 1 ? TOPICS[index + 1] : null;

  const [practiceChoice, setPracticeChoice] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [shuffledQuiz, setShuffledQuiz] = useState(() => buildShuffledQuiz(topic));

  useEffect(() => {
    // clear answers when switching topics so selections don't carry over
    setPracticeChoice(null);
    setQuizAnswers({});
    setShuffledQuiz(buildShuffledQuiz(topic));
  }, [topic, topicId]);

  const score = useMemo(() => {
    return topic.quiz.reduce((total, q, qIndex) => {
      return total + (quizAnswers[qIndex] === q.correct ? 1 : 0);
    }, 0);
  }, [quizAnswers, topic.quiz]);

  const [showConfetti, setShowConfetti] = useState(false);
  const bestScore = quizScores[topic.id] ?? 0;
  const maxScore = getMaxScore(topic);
  const hasMaxScore = Math.max(score, bestScore) === maxScore;

  const reshuffleQuiz = () => {
    setQuizAnswers({});
    setShuffledQuiz(buildShuffledQuiz(topic));
  };

  const updateQuizAnswer = (qIndex, aIndex) => {
    const nextAnswers = { ...quizAnswers, [qIndex]: aIndex };
    const nextScore = topic.quiz.reduce((total, q, index) => {
      return total + (nextAnswers[index] === q.correct ? 1 : 0);
    }, 0);

    setQuizAnswers(nextAnswers);
    setQuizScores((prevScores) => {
      const nextScores = {
        ...prevScores,
        [topic.id]: Math.max(prevScores[topic.id] ?? 0, nextScore)
      };
      localStorage.setItem('quizScores', JSON.stringify(nextScores));
      return nextScores;
    });
  };

  const onComplete = () => {
    if (!hasMaxScore) return;

    const nextSet = new Set(completedSet);
    nextSet.add(topic.id);
    setCompletedSet(nextSet);
    localStorage.setItem('completedTopics', JSON.stringify([...nextSet]));
    setShowConfetti(true);
  };

  return (
    <main className="page page-topic">
      <nav className="breadcrumbs">
        <Link to="/">Home</Link> <span>{'>'}</span> <span>{topic.title}</span>
      </nav>

      <header className="topic-header">
        <p className="topic-big-icon">{topic.icon}</p>
        <div>
          <h1>{topic.title}</h1>
          <p>{topic.subtitle}</p>
        </div>
      </header>

      <section className="lesson-status" aria-label="Lesstatus">
        <div>
          <span className="status-label">Huidige score</span>
          <strong>{score}/{maxScore}</strong>
        </div>
        <div>
          <span className="status-label">Beste score</span>
          <strong>{bestScore}/{maxScore}</strong>
        </div>
        <div>
          <span className="status-label">Voorwaarde</span>
          <strong>{hasMaxScore ? 'Klaar om af te werken' : `${maxScore}/${maxScore} nodig`}</strong>
        </div>
      </section>

      <section className="content-card">
        <h2>Video</h2>
        <div className="video-wrap">
          <iframe
            src={topic.videoUrl}
            title={`Video over ${topic.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      <section className="content-card">
        <h2>Korte uitleg</h2>
        <ul>
          {topic.theory.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="content-card">
        <h2>Oefening</h2>
        <p>Speel het budgetspel van Wikifin en werk minstens 10 minuten aan je keuzes.</p>
        <a className="btn btn-primary" href={topic.simulationUrl} target="_blank" rel="noreferrer">
          Open simulatie
        </a>
      </section>

      <section className="content-card">
        <h2>Praktijkvoorbeeld</h2>
        <p className="quiz-prompt">{topic.practice.caseText}</p>
        <div className="options-grid practice-options">
          {topic.practice.options.map((option, idx) => (
            <button
              key={option}
              className={`option ${practiceChoice === idx ? 'selected' : ''}`}
              onClick={() => setPracticeChoice(idx)}
            >
              <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
              <span>{option}</span>
            </button>
          ))}
        </div>
        {practiceChoice !== null && (
          <p className={practiceChoice === topic.practice.answer ? 'feedback good' : 'feedback bad'}>
            {practiceChoice === topic.practice.answer ? 'Correct. ' : 'Nog niet juist. '}
            {topic.practice.explain}
          </p>
        )}
      </section>

      <section className="content-card">
        <div className="section-title-row">
          <h2>Test jezelf</h2>
          <button className="btn btn-secondary btn-small" onClick={reshuffleQuiz}>
            Schud antwoorden
          </button>
        </div>
        <div className="quiz-list">
          {shuffledQuiz.map((q, qIndex) => (
            <div key={q.question} className="quiz-item">
              <h3>
                <span>{qIndex + 1}</span>
                {q.question}
              </h3>
              <div className="options-grid">
                {q.shuffledAnswers.map(({ answer, originalIndex }, optionIndex) => (
                  <button
                    key={answer}
                    className={`option ${quizAnswers[qIndex] === originalIndex ? 'selected' : ''}`}
                    onClick={() => updateQuizAnswer(qIndex, originalIndex)}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + optionIndex)}</span>
                    <span>{answer}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="quiz-summary">
          <p className="score">Score: {score}/{maxScore}</p>
          <p className={hasMaxScore ? 'quiz-note ready' : 'quiz-note'}>
            {hasMaxScore ? 'Maximumscore behaald.' : 'Behaal de maximumscore om deze les af te werken.'}
          </p>
        </div>
      </section>

      <section className="topic-nav">
        <button className="btn btn-secondary" onClick={() => navigate(prev ? `/topic/${prev.id}` : '/')}>
          {prev ? `Vorige: ${prev.title}` : 'Terug naar home'}
        </button>
        <button className="btn btn-primary" onClick={onComplete} disabled={!hasMaxScore}>
          {hasMaxScore ? 'Markeer als afgewerkt' : `Haal eerst ${maxScore}/${maxScore}`}
        </button>
        <button className="btn btn-secondary" onClick={() => navigate(next ? `/topic/${next.id}` : '/')}>
          {next ? `Volgende: ${next.title}` : 'Naar home'}
        </button>
      </section>
      {showConfetti && <Confetti onDone={() => setShowConfetti(false)} />}
    </main>
  );
}

function App() {
  const [completedSet, setCompletedSet] = useState(() => {
    try {
      const raw = localStorage.getItem('completedTopics');
      return new Set(raw ? JSON.parse(raw) : []);
    } catch {
      return new Set();
    }
  });
  const [quizScores, setQuizScores] = useState(() => {
    try {
      const raw = localStorage.getItem('quizScores');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const validCompletedTopics = [...completedSet].filter((topicId) => {
      const topic = TOPICS.find((item) => item.id === topicId);
      return topic && (quizScores[topicId] ?? 0) === getMaxScore(topic);
    });

    if (validCompletedTopics.length !== completedSet.size) {
      const nextSet = new Set(validCompletedTopics);
      setCompletedSet(nextSet);
      localStorage.setItem('completedTopics', JSON.stringify(validCompletedTopics));
    }
  }, [completedSet, quizScores]);

  const resetProgress = () => {
    if (!window.confirm('Weet je zeker dat je alle voortgang wil resetten?')) return;

    setCompletedSet(new Set());
    setQuizScores({});
    localStorage.removeItem('completedTopics');
    localStorage.removeItem('quizScores');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage completedSet={completedSet} quizScores={quizScores} onResetProgress={resetProgress} />}
      />
      <Route
        path="/topic/:topicId"
        element={
          <TopicPage
            completedSet={completedSet}
            setCompletedSet={setCompletedSet}
            quizScores={quizScores}
            setQuizScores={setQuizScores}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
