/**
 * Mock AI Service — simulates AI responses for local development.
 * Replace with real AI provider calls (OpenAI / watsonx.ai / Anthropic) by
 * setting VITE_AI_PROVIDER and VITE_AI_API_KEY in .env.
 */

import type { ExtractedContent, QuestionPaperConfig, Question, QuestionType } from '../types';

const PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'mock';

// ─── OCR / Text Extraction ────────────────────────────────────────────────────

export async function extractTextFromImage(_file: File): Promise<string> {
  if (PROVIDER !== 'mock') {
    // TODO: call real OCR provider (e.g. Tesseract.js, Google Vision, etc.)
    throw new Error('OCR provider not configured');
  }
  // Simulate processing delay
  await delay(1500);
  return 'Sample extracted text from image.\nSubject: Mathematics\nTopic: Multiplication – 6× and 7× tables\nHomework: Complete worksheet page 47';
}

export async function extractTextFromPdf(_file: File): Promise<string> {
  if (PROVIDER !== 'mock') {
    throw new Error('PDF extraction provider not configured');
  }
  await delay(2000);
  return 'Sample extracted text from PDF.\nExamination Syllabus – October 2024\nMathematics: Chapters 1-3\nEnglish: Chapters 1-2\nEVS: Chapter 1';
}

export async function extractContentFromUrl(_url: string): Promise<string> {
  if (PROVIDER !== 'mock') {
    throw new Error('URL extraction not configured');
  }
  await delay(1000);
  return 'Sample educational content extracted from URL.';
}

// ─── AI Content Analysis ──────────────────────────────────────────────────────

export async function analyzeExtractedText(text: string): Promise<ExtractedContent> {
  if (PROVIDER !== 'mock') {
    throw new Error('AI provider not configured');
  }
  await delay(2000);

  // Very simple mock parser — in production, send to LLM
  const lower = text.toLowerCase();
  const subjects: string[] = [];
  const chapters: string[] = [];
  const topics: string[] = [];

  if (lower.includes('math')) subjects.push('Mathematics');
  if (lower.includes('english')) subjects.push('English');
  if (lower.includes('evs') || lower.includes('plant')) subjects.push('EVS');
  if (lower.includes('hindi')) subjects.push('Hindi');

  if (lower.includes('multiplication') || lower.includes('×')) chapters.push('Multiplication');
  if (lower.includes('division') || lower.includes('÷')) chapters.push('Division');
  if (lower.includes('fraction')) chapters.push('Fractions');
  if (lower.includes('noun')) chapters.push('Nouns');
  if (lower.includes('plant')) chapters.push('Plants Around Us');

  if (lower.includes('table')) topics.push('Times tables');
  if (lower.includes('word problem')) topics.push('Word problems');
  if (lower.includes('parts of a plant')) topics.push('Parts of a plant');

  const homework = lower.includes('homework') || lower.includes('worksheet')
    ? text.split('\n').find(l => l.toLowerCase().includes('homework') || l.toLowerCase().includes('worksheet'))
    : undefined;

  return {
    subjects: subjects.length ? subjects : ['Unknown'],
    chapters: chapters.length ? chapters : [],
    topics: topics.length ? topics : [],
    definitions: [],
    importantPoints: ['Review uploaded material carefully'],
    homework: homework || undefined,
    confidenceScore: 0.8,
    needsReview: subjects.length === 0,
  };
}

// ─── Study Guide Generation ───────────────────────────────────────────────────

export interface StudyGuideSection {
  whatToRead: string[];
  whatToHighlight: { item: string; reason: string; memorize: boolean }[];
  whatToUnderstand: { concept: string; explanation: string; example: string; commonMistakes: string[] }[];
  whatToPractice: string[];
  quickRevision: { keyPoints: string[]; importantWords: string[]; oralQuestions: string[] };
}

export async function generateStudyGuide(subject: string, chapter: string): Promise<StudyGuideSection> {
  await delay(2500);

  // Mock study guides for demo subjects
  const guides: Record<string, StudyGuideSection> = {
    'Mathematics|Multiplication': {
      whatToRead: [
        'Multiplication tables from 2× to 10×',
        'How multiplication is related to repeated addition',
        'Solving multiplication word problems',
        'Properties of multiplication (commutative, associative)',
      ],
      whatToHighlight: [
        { item: '2× to 10× multiplication tables', reason: 'Core knowledge tested in every exam', memorize: true },
        { item: 'Commutative property: a × b = b × a', reason: 'Saves time when solving problems', memorize: true },
        { item: 'Multiplication as repeated addition', reason: 'Helps understand the concept deeply', memorize: false },
      ],
      whatToUnderstand: [
        {
          concept: 'Multiplication as repeated addition',
          explanation: 'Multiplication is just a quick way to add the same number many times. 4 × 3 means "4 added 3 times": 4 + 4 + 4 = 12.',
          example: '5 × 4 = 5 + 5 + 5 + 5 = 20',
          commonMistakes: ['Confusing 6 × 7 and 7 × 6 (they are the same!)', 'Forgetting zero-times-any-number is always 0'],
        },
      ],
      whatToPractice: [
        'Fill in multiplication tables (2× to 10×)',
        'Solve word problems from the textbook',
        'Write 5 examples of multiplication as repeated addition',
        'Practice missing factor problems: 7 × ___ = 42',
      ],
      quickRevision: {
        keyPoints: ['Multiplication = repeated addition', 'Order does not matter (3×4 = 4×3)', 'Any number × 0 = 0', 'Any number × 1 = that number'],
        importantWords: ['Product', 'Factor', 'Multiple', 'Times', 'Commutative'],
        oralQuestions: ['What is 8 × 7?', 'What is multiplication?', 'Give an example of multiplication as repeated addition'],
      },
    },
    'EVS|Plants Around Us': {
      whatToRead: [
        'Parts of a plant: root, stem, leaf, flower, fruit, seed',
        'Functions of each part',
        'Types of plants: trees, shrubs, herbs, climbers, creepers',
        'Uses of plants in daily life',
        'Important textbook examples on page 12–18',
      ],
      whatToHighlight: [
        { item: 'Six parts of a plant', reason: 'Direct exam question – name all 6 parts', memorize: true },
        { item: 'Photosynthesis – how plants make food', reason: 'Key concept for short answers', memorize: true },
        { item: 'Types of roots: taproot and fibrous root', reason: 'Often asked with examples', memorize: true },
      ],
      whatToUnderstand: [
        {
          concept: 'Photosynthesis',
          explanation: 'Plants make their own food using sunlight, water from roots, and air from leaves. This process is called photosynthesis and it happens in the leaves.',
          example: 'A mango tree uses sunlight on its leaves to make food for the whole tree.',
          commonMistakes: ['Thinking plants eat soil (they only get minerals from soil)', 'Forgetting that photosynthesis needs sunlight'],
        },
      ],
      whatToPractice: [
        'Label a diagram of a plant',
        'Match each part with its function',
        'Name 3 trees, 3 shrubs, and 3 herbs',
        'Write 5 uses of plants',
      ],
      quickRevision: {
        keyPoints: ['6 parts of a plant: root, stem, leaf, flower, fruit, seed', 'Roots absorb water', 'Stem carries water', 'Leaves make food (photosynthesis)', 'Flowers help in reproduction'],
        importantWords: ['Photosynthesis', 'Taproot', 'Fibrous root', 'Chlorophyll', 'Pollination'],
        oralQuestions: ['Name the 6 parts of a plant', 'What do roots do?', 'How do plants make food?'],
      },
    },
  };

  const key = `${subject}|${chapter}`;
  return guides[key] || {
    whatToRead: [`Read the complete chapter on ${chapter}`, 'Review all definitions', 'Study all examples given in the textbook'],
    whatToHighlight: [
      { item: 'All definitions in the chapter', reason: 'Definitions are frequently tested', memorize: true },
      { item: 'Important examples', reason: 'Examples help understand concepts', memorize: false },
    ],
    whatToUnderstand: [
      { concept: chapter, explanation: `${chapter} is an important topic in ${subject}. Make sure to understand all the concepts clearly.`, example: 'Refer to textbook examples', commonMistakes: ['Not reading the complete chapter', 'Skipping examples'] },
    ],
    whatToPractice: ['Answer all exercise questions in the textbook', 'Create 10 practice questions', 'Revise all definitions'],
    quickRevision: {
      keyPoints: ['Read all definitions', 'Practice all examples', 'Revise the entire chapter'],
      importantWords: [],
      oralQuestions: [`What is ${chapter}?`, 'Give one example', 'Why is this important?'],
    },
  };
}

// ─── Exam Study Plan ──────────────────────────────────────────────────────────

export async function generateExamPlan(examName: string, daysLeft: number, subjects: string[]): Promise<string[]> {
  await delay(1500);
  const plan: string[] = [];
  subjects.forEach((sub, i) => {
    plan.push(`Day ${i + 1}: Focus on ${sub} – read all chapters and highlight key points`);
    plan.push(`Day ${i + 2}: Practice ${sub} questions and review answers`);
  });
  plan.push(`Day ${daysLeft - 1}: Full revision of all subjects`);
  plan.push(`Day ${daysLeft}: Quick recap and rest well before the exam`);
  return plan.slice(0, daysLeft);
}

// ─── Question Paper Generation ────────────────────────────────────────────────

export async function generateQuestionPaper(config: QuestionPaperConfig): Promise<Question[]> {
  await delay(3000);
  const questions: Question[] = [];
  let qIdx = 0;

  const sampleQs: Record<QuestionType, (subject: string, idx: number) => Question> = {
    mcq: (sub, i) => ({
      id: `q-${++qIdx}`,
      type: 'mcq',
      question: `Sample MCQ question ${i + 1} for ${sub}`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      answer: 'Option A',
      explanation: 'Option A is correct because it matches the textbook definition.',
      marks: 1,
      topic: config.sourceChapters[0] || sub,
    }),
    fill_blanks: (sub, i) => ({
      id: `q-${++qIdx}`,
      type: 'fill_blanks',
      question: `The ___ is an important concept in ${sub} (question ${i + 1})`,
      answer: 'key term',
      explanation: 'This key term is defined in chapter 1.',
      marks: 1,
      topic: config.sourceChapters[0] || sub,
    }),
    true_false: (sub, i) => ({
      id: `q-${++qIdx}`,
      type: 'true_false',
      question: `Statement ${i + 1}: This statement about ${sub} is true.`,
      answer: 'True',
      explanation: 'This is true as stated in the textbook.',
      marks: 1,
      topic: config.sourceChapters[0] || sub,
    }),
    short_answer: (sub, i) => ({
      id: `q-${++qIdx}`,
      type: 'short_answer',
      question: `Explain concept ${i + 1} from ${sub} in your own words.`,
      answer: 'Sample short answer response with key points.',
      explanation: 'A good answer should include the definition and one example.',
      marks: 2,
      topic: config.sourceChapters[0] || sub,
    }),
    long_answer: (sub, i) => ({
      id: `q-${++qIdx}`,
      type: 'long_answer',
      question: `Write a detailed note on topic ${i + 1} in ${sub}.`,
      answer: 'Sample long answer covering introduction, main points, and conclusion.',
      explanation: 'The answer should be 4–6 sentences covering all key aspects.',
      marks: 5,
      topic: config.sourceChapters[0] || sub,
    }),
    one_word: (sub, i) => ({
      id: `q-${++qIdx}`, type: 'one_word', question: `One-word answer ${i + 1} for ${sub}:`, answer: 'Answer', marks: 1, topic: sub,
    }),
    match_following: (sub, i) => ({
      id: `q-${++qIdx}`, type: 'match_following', question: `Match column A with column B (${sub}, set ${i + 1}):\nA1: Term 1\nA2: Term 2\n\nB1: Definition 2\nB2: Definition 1`, answer: 'A1 – B2, A2 – B1', marks: 2, topic: sub,
    }),
    compare_contrast: (sub, i) => ({
      id: `q-${++qIdx}`, type: 'compare_contrast', question: `Compare and contrast the two concepts in ${sub} (set ${i + 1}).`, answer: 'Similarities: Both are... Differences: First is... while second is...', marks: 3, topic: sub,
    }),
    word_meanings: (sub, i) => ({
      id: `q-${++qIdx}`, type: 'word_meanings', question: `Write the meaning of this word from ${sub} (word ${i + 1}): "example"`, answer: 'A representative instance used to illustrate a concept.', marks: 1, topic: sub,
    }),
    opposites: (sub, i) => ({
      id: `q-${++qIdx}`, type: 'opposites', question: `Write the opposite of the word (${sub}, ${i + 1}): "hot"`, answer: 'cold', marks: 1, topic: sub,
    }),
    synonyms: (sub, i) => ({
      id: `q-${++qIdx}`, type: 'synonyms', question: `Write a synonym for (${sub}, ${i + 1}): "happy"`, answer: 'joyful', marks: 1, topic: sub,
    }),
    give_reasons: (sub, i) => ({
      id: `q-${++qIdx}`, type: 'give_reasons', question: `Give a reason why concept ${i + 1} is important in ${sub}.`, answer: 'Because it forms the foundation of understanding this topic.', marks: 2, topic: sub,
    }),
    name_following: (sub, i) => ({
      id: `q-${++qIdx}`, type: 'name_following', question: `Name the following (${sub}, ${i + 1}): The process described here is called ___`, answer: 'The process name', marks: 1, topic: sub,
    }),
    identify_correct: (sub, i) => ({
      id: `q-${++qIdx}`, type: 'identify_correct', question: `Identify the correct statement about ${sub} (set ${i + 1}):\na) Correct\nb) Incorrect\nc) Incorrect\nd) Incorrect`, answer: 'a) Correct', marks: 1, topic: sub,
    }),
    rearrange_words: (sub, i) => ({
      id: `q-${++qIdx}`, type: 'rearrange_words', question: `Rearrange the words to form a correct sentence (${sub}, ${i + 1}):\nplants / food / make / their / own`, answer: 'Plants make their own food.', marks: 1, topic: sub,
    }),
    grammar: (sub, i) => ({
      id: `q-${++qIdx}`, type: 'grammar', question: `Grammar exercise ${i + 1}: Fill in the correct form of the verb in brackets.\nShe ___ (go) to school every day.`, answer: 'goes', explanation: 'Use third-person singular present tense.', marks: 1, topic: sub,
    }),
    math_problems: (sub, i) => ({
      id: `q-${++qIdx}`, type: 'math_problems', question: `Solve (${i + 1}): A shopkeeper has 48 pens. He packs them in groups of 6. How many groups will he make?`, answer: '48 ÷ 6 = 8 groups', explanation: 'Divide total by group size.', marks: 2, topic: sub,
    }),
    application_based: (sub, i) => ({
      id: `q-${++qIdx}`, type: 'application_based', question: `Application question ${i + 1}: How would you apply what you learned about ${sub} in real life? Give an example.`, answer: 'Sample real-life application.', marks: 3, topic: sub,
    }),
  };

  for (const qt of config.questionTypes) {
    const gen = sampleQs[qt.type];
    if (gen) {
      for (let i = 0; i < qt.quantity; i++) {
        questions.push(gen(config.subject, i));
      }
    }
  }

  return questions;
}

// ─── Chat assistant ───────────────────────────────────────────────────────────

export async function chatWithAssistant(message: string, childName: string): Promise<string> {
  await delay(1200);
  const lower = message.toLowerCase();

  if (lower.includes('study today') || lower.includes('what to study')) {
    return `For ${childName} today, I recommend focusing on **Fractions** (Mathematics) which needs revision, and **Plants Around Us** (EVS). Both are in the upcoming monthly exam. Start with the definitions, then practice 5 questions from each topic.`;
  }
  if (lower.includes('exam syllabus') || lower.includes('monthly exam')) {
    return `The **Monthly Examination** covers:\n- **Mathematics**: Chapters 1 & 2 (Multiplication, Division)\n- **English**: Chapters 1–3 (Nouns, Verbs, Adjectives)\n- **EVS**: Chapter 1 (Plants Around Us)\n\nThe exam starts on October 28th. ${childName} has 7 days to prepare.`;
  }
  if (lower.includes('struggle') || lower.includes('practice')) {
    return `I can see ${childName} needs more practice with fractions and EVS. Here are 3 quick exercises:\n1. Write the fraction for 3 out of 5 equal parts\n2. Draw a plant and label its 6 parts\n3. Solve: 5 × ___ = 35`;
  }
  if (lower.includes('revision plan') || lower.includes('study plan')) {
    return `Here is a 5-day revision plan for ${childName}:\n- **Day 1**: Mathematics – Multiplication (revise tables, solve 10 problems)\n- **Day 2**: Mathematics – Division (concept + word problems)\n- **Day 3**: English – Nouns, Verbs, Adjectives (definitions + exercises)\n- **Day 4**: EVS – Plants Around Us (label diagram, know functions)\n- **Day 5**: Full revision + attempt one practice paper`;
  }

  return `I'm your AI learning assistant for ${childName}. I can help you understand what to study, generate practice questions, explain concepts, or create a revision plan. What would you like help with?`;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
