import { useMemo, useState, useEffect } from 'react';
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Confetti from './Confetti.jsx';

const TOPICS = [
  {
    id: 'omgaan-met-geld',
    icon: '💳',
    title: 'Budget',
    subtitle: 'Overzicht van inkomsten en uitgaven en slimme keuzes maken.',
    theoryIntro:
      'Een budget is een overzicht van je inkomsten en uitgaven. Het helpt je om je geld verstandig te beheren en te weten hoeveel je kunt uitgeven.',
    theoryBullets: [
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
      { question: 'Wat is een budget?', answers: ['Een lening', 'Een overzicht van inkomsten en uitgaven', 'Een belasting', 'Een spaarrekening'], correct: 1 },
      { question: 'Welke uitgave is een behoefte?', answers: ['Nieuwe schoenen', 'Schoolboeken', 'Concertticket', 'Game'], correct: 1 }
    ],
    videoUrl: 'https://www.youtube.com/embed/PFWuMqRv5pk',
    simulationIntro:
      'Via de volgende link word je doorverwezen naar het budgetspel van KU Leuven. Daarnaast volgen nog twee oefeningen rond je persoonlijk budget en administratie. Volg de instructies op de pagina en keer daarna terug naar deze website nadat je alle drie de opdrachten hebt voltooid.',
    simulationButtons: [
      { title: 'Budgetspel KU Leuven', url: 'https://financiele-geletterdheid.org/1-budget-11-01/1-2-je-persoonlijk-budget/1-2-je-persoonlijk-budget-oefenen/' }
    ],
    resources: [
      { title: 'In deze video vind je extra informatie over het overzicht behouden tussen inkomsten en uitgaven.', url: 'https://www.youtube.com/watch?v=If7c6bhzf0M' },
      { title: 'Als leerkracht kan je het spel ‘Buget aan zet’ van wikifin implementeren in je les.', url: 'http://www.wikifin.be/nl/wikifin-school/budget-aan-zet' },
      { title: 'Om je leerlingen een budget te laten opstellen, kan je gebruikmaken van de Budgettool XL van Wikifin. Via een eenvoudige tekst en duidelijke opdrachten laat je hen zelfstandig aan de slag gaan om een persoonlijk budget op te stellen.', url: 'https://www.wikifin.be/nl/budgettool-xl' }
    ]
  },
  {
    id: 'geld-verdienen',
    icon: '💼',
    title: 'Geld verdienen & belastingen',
    subtitle: 'Hoe werkt inkomen en wat gebeurt er met belastingen?',
    theoryIntro:
      'Geld verdienen betekent dat je inkomen ontvangt door werk te doen, zoals een job, klusjes of een bijverdienste. Op dit inkomen betaal je vaak belastingen, die gebruikt worden om zaken zoals onderwijs, zorg en infrastructuur te financieren.',
    theoryBullets: [
      'Geld verdienen kan op verschillende manieren, zoals een job, vakantiewerk of zelfstandige activiteiten.',
      'Van je inkomen wordt vaak een deel ingehouden als belasting.',
      'Belastingen worden gebruikt om de samenleving te financieren, zoals scholen, ziekenhuizen en wegen.',
      'Hoe meer je verdient, hoe belangrijker het is om te begrijpen hoeveel je netto overhoudt (na belastingen).'
    ],
    practice: {
      caseText: 'Hoeveel verdient de volgende student? \n Emma werkt als jobstudent in een bakkerij en presteert **32 uur per maand**. Ze verdient daarbij **€12 per uur**. Vergeet de RSZ er niet af te trekken.',
      options: ['€ 326,47', '€ 345,78', '€ 373,59', '€ 380,69'],
      answer: 2,
      explain: 'Voorbeeldberekening zoals in de lesbundel: €373,59.'
    },
    quiz: [
      { question: 'Wat houdt men in op je loon?', answers: ['Niets', 'Belastingen en inhoudingen', 'Alleen vakantiegeld', 'Alleen pensioen'], correct: 1 },
      { question: 'Waarom bestaan belastingen?', answers: ['Voor privéwinst', 'Om publieke diensten te betalen', 'Om sparen te stoppen', 'Alleen voor volwassenen'], correct: 1 }
    ],
    videoUrl: 'https://www.youtube.com/embed/7Mnq88PmbFw',
    simulationIntro:
      'Via de volgende twee linken vind je uitleg over hoe een loonbrief van een werknemer is opgebouwd. Dit geldt voor een standaard loonbrief, aangevuld met die van een student.',
    simulationButtons: [
      { title: 'Standaard loonbrief', url: 'https://www.wikifin.be/nl/loonbrief' },
      { title: 'Loonbrief student', url: 'https://www.wikifin.be/nl/loonbrief-studenten' },
      { title: 'Bereken je nettoloon', url: 'https://www.jobat.be/nl/art/hoeveel-blijft-er-van-mijn-brutoloon-netto-over?cu=1' }
    ],
    simulationFollowup: 'Ga aan de slag met de casus en bereken je nettoloon via de link "Bereken je nettoloon":',
    simulationCaseTitle: '💼 Casus: bereken je nettoloon',
    simulationCaseText:
      'Je bent **gehuwd of wettelijk samenwonend** en werkt als **bediende** met een **brutoloon van €3.200 per maand**. Je partner heeft een beroepsinkomen. In je job krijg je enkele extra voordelen zoals een transportvergoeding, groepsverzekering, firmawagen en maaltijdcheques. Daarnaast zijn er geen personen ten laste en geen extra andere netto-inhoudingen of kosten.',
    resources: [
      { title: 'Via de volgende kink vind je veel laagdrempelige informatie over werken, geld verdienen en belastingen.', url: 'https://mijngeldenik.be/category:werken' },
      { title: 'Via volgende link vind je aanvullend op de algemene info, extra informatie over de specifieke onderdelen van belastingen en de berekening van je loon.', url: 'https://www.wikifin.be/nl/belasting-werk-en-inkomen' },
      { title: 'In de volgende video wordt een meer theoretische benadering van het belastbaar inkomen gegeven.', url: 'https://www.youtube.com/watch?v=dRUwcIyVEwg&t=263s' }
    ]
  },
  {
    id: 'sparen',
    icon: '💰',
    title: 'Sparen',
    subtitle: 'Slim opzijzetten voor later.',
    theoryIntro:
      'Sparen is geld opzijzetten dat je niet meteen uitgeeft, zodat je later iets belangrijks of duurder kunt betalen. Het helpt je om doelen te bereiken en onverwachte kosten op te vangen.',
    theoryBullets: [
      'Sparen betekent dat je een deel van je geld bewaart in plaats van alles uit te geven.',
      'Je kunt sparen voor iets op korte termijn (zoals een nieuwe gsm) of lange termijn (zoals een reis of studie).',
      'Zet eerst een vast bedrag opzij zodra je geld krijgt, dan pas geef je de rest uit.',
      'Stel een spaardoel en vraag jezelf af: waarvoor spaar ik, hoeveel heb ik nodig en hoe lang ga ik sparen?'
    ],
    practiceMode: 'document',
    practiceIntro: 'Via de volgende link word je doorverwezen naar een simulatie over sparen:',
    practiceButtons: [
      { title: 'Spaarcalculator', url: 'https://www.wikifin.be/nl/spaarcalculator-1?saving=monthlySaving' }
    ],
    practiceCaseTitle: '💰 Casus: bereken het te storten bedrag per maand',
    practiceParagraphs: [
      'Bereken hoeveel je per maand opzij moet leggen in het volgende geval.',
      'Je wil een **elektrische fiets van €8000** kopen binnen **5 jaar**. Je start met een **spaarsaldo van €500**. Dit geld staat op een spaarrekening met een **interest van 1,4% per jaar**.',
      'Elke maand stort je een vast bedrag op je rekening.'
    ],
    practiceOptions: ['112.30', '120.20', '128.60', '135.50'],
    practiceAnswer: 1,
    practiceExplain: '120.20 is het juiste antwoord.',
    practiceFollowup: 'Via de volgende link kan je verder aan de slag met voorbeelden uit je eigen leefwereld:',
    practiceFollowupButtons: [
      { title: 'Spaarcalculator extra voorbeelden', url: 'https://www.wikifin.be/nl/spaarcalculator' }
    ],
    quiz: [
      { question: 'Wat doe je best eerst wanneer je geld krijgt?', answers: ['Alles meteen uitgeven', 'Een vast bedrag sparen', 'Lenen van vrienden', 'Online shoppen'], correct: 1 },
      { question: 'Waarom spaar je?', answers: ['Alleen voor fun', 'Voor doelen en onverwachte kosten', 'Om belastingen te betalen', 'Omdat geld moet verdwijnen'], correct: 1 }
    ],
    videoUrl: 'https://www.youtube.com/embed/IDeeP51wBxE',
    simulationHeading: 'Vergelijk spaarrekeningen',
    simulationIntro: 'Elke spaarrekening is anders. Daarom heeft Wikifin een handige vergelijkingstool ontwikkeld:',
    simulationButtons: [
      {
        title: 'Vergelijk spaarrekeningen',
        url: 'https://www.wikifin.be/nl/sparen-en-beleggen/vergelijkingstool-spaarrekeningen'
      }
    ],
    simulationFollowup:
      'Neem **5 minuten de tijd** om deze tool te leren kennen. **Experimenteer** met je **startbedrag**, je **maandelijkse storting** en je **spaarperiode**. **Vergelijk** daarna de **verschillende spaarrekeningen** die banken in jouw geval aanbieden en bekijk hoe groot het verschil in eindbedrag kan zijn.',
    resources: [
      { title: 'Via de volgende kink vind je extra informatie over sparen, de verschillende aspecten staan onder elkaar genoteerd.', url: 'https://www.wikifin.be/nl/sparen-en-beleggen' },
      { title: 'Via de volgende link vind je aanvullende informatie over sparen, deze staat samen met beleggen. Dit wordt in deze weergave als een apart onderdeel besproken.', url: 'https://mijngeldenik.be/category:sparen-en-beleggen' },
      { title: 'Een meer uitgebreide weergave is ook mogelijk. Deze tool is in het Engels en toont de interesten per maand, met daarnaast een duidelijke grafische weergave van de groei van je spaargeld.', url: 'https://shortcut.ai/share/f6cf20fc-e1cb-411d-9706-cdd77524dd5b' }
    ]
  },
  {
    id: 'beleggen',
    icon: '📈',
    title: 'Beleggen',
    subtitle: 'Rendement, risico en spreiding begrijpen.',
    theoryIntro:
      'Beleggen betekent dat je geld investeert met de verwachting dat het op lange termijn meer waard wordt. In tegenstelling tot sparen kan de waarde ook dalen.',
    theoryBullets: [
      'Beleggen is geld investeren (bv. in aandelen of fondsen) om winst te maken op lange termijn.',
      'De waarde kan stijgen, maar ook dalen: er is dus risico.',
      'Beleggen doe je vooral op lange termijn om schommelingen op te vangen.',
      'Spreid je beleggingen om het risico te beperken.',
      'Vraag jezelf af: begrijp ik het, kan ik verlies aan, en kan ik het geld lang missen?'
    ],
    theoryOutro:
      'Beleggen kan best complex lijken. Gelukkig heeft **Febelfin** een reeks toegankelijke video\'s ontwikkeld waarin **Kamal Kharmach** de **basisprincipes van beleggen** op een heldere en vaak humoristische manier uitlegt. De **video\'s** maken moeilijke begrippen begrijpelijk en tonen dat je geen expert hoeft te zijn om meer te leren over beleggen. **Bekijk de video\'s** via de volgende link:',
    theoryOutroLink: 'https://www.youtube.com/watch?v=-Ehhche0t08&list=PLb-yHoQ5fKK_X4r-apJVQCxQpYF9-VQoD',
    practiceMode: 'document',
    practiceIntro: 'Bereken hoeveel je aandelen waard zullen zijn in de volgende casus. Duid hierna het juiste antwoord aan.',
    practiceCaseTitle: '📈 Casus: een gespreide belegging',
    practiceParagraphs: [
      'Je beslist om **€2.000** te beleggen. Je verdeelt dit bedrag als volgt:'
    ],
    practiceBullets: [
      '**60%** investeer je in een technologiefonds. Na één jaar stijgt dit fonds met **12%**.',
      '**40%** investeer je in een energiebedrijf. Na één jaar daalt dit aandeel met **4%**.'
    ],
    practiceOptions: ['€ 2.048', '€ 2.080', '€ 2.112', '€ 2.144'],
    practiceAnswer: 2,
    practiceExplain: 'OPLOSSING= 2112',
    quiz: [
      { question: 'Wat is spreiden?', answers: ['Alles in één aandeel', 'Investeren in meerdere opties', 'Niet meer investeren', 'Alleen cash bewaren'], correct: 1 },
      { question: 'Waarom spreiden?', answers: ['Meer risico', 'Risico beperken', 'Geen verschil', 'Meer kosten'], correct: 1 }
    ],
    videoUrl: 'https://www.youtube.com/embed/GmUBevhJYCg',
    simulationIntro: 'Via de volgende link word je doorverwezen naar een online simulatie over beleggen. Volg de instructies en word zo een echte belegger!',
    simulationButtons: [
      { title: 'Online beleggingssimulatie', url: 'https://smgiq.org/' }
    ],
    resources: [
      { title: 'Via Club beleg vind je aanvullend een reeks informatie, deze webpagina werd ontworpen door Febelfin.', url: 'https://clubbeleg.be/' },
      { title: 'Via Wikifin vind je een reeks antwoorden op verschillende vragen over beleggen. Deze volgen onder de rubriek sparen.', url: 'https://www.wikifin.be/nl/sparen-en-beleggen' },
      { title: 'Aanvullend op deze informatie vind je aanvullend op mijngeldenik zeer toegankelijke info.', url: 'https://mijngeldenik.be/category:sparen-en-beleggen' }
    ]
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

function renderFormattedText(text) {
  return text.split(/(\*\*.*?\*\*)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

function getUniqueLinks(links = []) {
  return links.filter((link, index, array) => index === array.findIndex((item) => item.url === link.url));
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
        <h2>Uitleg</h2>
        {topic.theoryIntro && <p className="simulation-copy">{renderFormattedText(topic.theoryIntro)}</p>}
        {topic.theoryBullets && (
          <ul className="theory-list">
            {topic.theoryBullets.map((point) => (
              <li key={point}>{renderFormattedText(point)}</li>
            ))}
          </ul>
        )}
        {topic.theoryOutro && <p className="simulation-copy">{renderFormattedText(topic.theoryOutro)}</p>}
        {topic.theoryOutroLink && (
          <div className="simulation-buttons">
            <a className="btn btn-secondary simulation-button" href={topic.theoryOutroLink} target="_blank" rel="noreferrer">
              Bekijk de video's
            </a>
          </div>
        )}
      </section>

      <section className="content-card">
        <h2>Simulatie</h2>
        {topic.simulationHeading && <p className="simulation-copy simulation-copy-top"><strong>{topic.simulationHeading}</strong></p>}
        {topic.simulationIntro && <p className="simulation-copy simulation-copy-top">{renderFormattedText(topic.simulationIntro)}</p>}
        {topic.simulationButtons && topic.simulationButtons.length > 0 && (
          <div className="simulation-buttons">
            {getUniqueLinks(topic.simulationButtons).map((link, index) => (
                <a
                  key={`${link.url}-${index}`}
                  className="btn btn-secondary simulation-button"
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.title}
                </a>
              ))}
          </div>
        )}
        {topic.simulationFollowup && <p className="simulation-copy simulation-copy-bottom">{renderFormattedText(topic.simulationFollowup)}</p>}
        {topic.simulationCaseTitle && <p className="simulation-copy simulation-copy-bottom"><strong>{topic.simulationCaseTitle}</strong></p>}
        {topic.simulationCaseText && <p className="simulation-copy simulation-copy-bottom">{renderFormattedText(topic.simulationCaseText)}</p>}
      </section>

      <section className="content-card">
        <h2>Praktijkvoorbeeld</h2>
        {topic.practiceMode === 'document' ? (
          <>
            {topic.practiceIntro && <p className="simulation-copy">{renderFormattedText(topic.practiceIntro)}</p>}
            {topic.practiceButtons && topic.practiceButtons.length > 0 && (
              <div className="simulation-buttons">
                {getUniqueLinks(topic.practiceButtons).map((link, index) => (
                  <a
                    key={`${link.url}-${index}`}
                    className="btn btn-secondary simulation-button"
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            )}
            {topic.practiceCaseTitle && <p className="simulation-copy simulation-copy-bottom"><strong>{topic.practiceCaseTitle}</strong></p>}
            {topic.practiceParagraphs && topic.practiceParagraphs.map((paragraph) => (
              <p key={paragraph} className="simulation-copy simulation-copy-bottom">{renderFormattedText(paragraph)}</p>
            ))}
            {topic.practiceBullets && (
              <ul className="theory-list">
                {topic.practiceBullets.map((bullet) => (
                  <li key={bullet}>{renderFormattedText(bullet)}</li>
                ))}
              </ul>
            )}
            {topic.practiceOptions && (
              <div className="options-grid practice-options">
                {topic.practiceOptions.map((option, idx) => (
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
            )}
            {topic.practiceOptions && practiceChoice !== null && (
              <p className={practiceChoice === topic.practiceAnswer ? 'feedback good' : 'feedback bad'}>
                {practiceChoice === topic.practiceAnswer ? 'Correct. ' : 'Nog niet juist. '}
                {topic.practiceExplain}
              </p>
            )}
            {topic.practiceFollowup && <p className="simulation-copy simulation-copy-bottom">{renderFormattedText(topic.practiceFollowup)}</p>}
            {topic.practiceFollowupButtons && topic.practiceFollowupButtons.length > 0 && (
              <div className="simulation-buttons">
                {getUniqueLinks(topic.practiceFollowupButtons).map((link, index) => (
                  <a
                    key={`${link.url}-${index}`}
                    className="btn btn-secondary simulation-button"
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <p className="quiz-prompt" style={{ whiteSpace: 'pre-line' }}>{renderFormattedText(topic.practice.caseText)}</p>
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
          </>
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

      <section className="content-card resources-card">
        <h2>📚 Extra</h2>
        <ul className="resources-list">
          {topic.resources && topic.resources.map((resource) => (
            <li key={resource.title}>
              <a href={resource.url} target="_blank" rel="noreferrer">
                {resource.title} ↗
              </a>
            </li>
          ))}
        </ul>
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
