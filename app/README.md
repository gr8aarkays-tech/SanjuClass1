# AI School Learning Assistant

A Progressive Web App (PWA) that helps parents organize school learning materials and support their child's education.

## 🚀 Quick Start

```bash
cd SanjuClass1/app
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## ✨ Features (Phase 1 MVP)

| Module | Description |
|--------|-------------|
| **Dashboard** | Exam countdown, study progress, topics needing attention, recent uploads |
| **Upload Materials** | Upload images, PDFs, or links — AI extracts and organizes content |
| **Study Guide** | AI-generated What to Read / Highlight / Understand / Practice / Quick Revision |
| **Exam Preparation** | Manage exams, track subject progress, generate AI study plans |
| **Question Generator** | 18+ question types, custom quantities, 6-step wizard |
| **Practice Mode** | Interactive quizzes, automatic scoring, performance analysis |
| **Weekly Plan** | Track daily lessons, mark completion status |
| **Question Library** | Browse and review all generated papers |
| **Children** | Manage multiple children with separate data |
| **AI Assistant** | Chat interface for study guidance |
| **Settings** | Configure AI provider (Mock / OpenAI / watsonx.ai / Anthropic) |

## 📱 PWA

The app works offline and can be installed on mobile and desktop devices.

## ⚙️ Configuration

Copy `.env.example` to `.env` and configure:

```
VITE_AI_PROVIDER=mock       # mock | openai | watsonx | anthropic
VITE_AI_API_KEY=             # your API key (not needed for mock)
```

### AI Provider Notes

- **Mock** (default): No API key needed. Uses realistic simulated responses for development.
- **OpenAI**: Set `VITE_AI_PROVIDER=openai` and add your OpenAI API key.
- **watsonx.ai**: Set `VITE_AI_PROVIDER=watsonx` and configure IBM Cloud credentials.
- **Anthropic**: Set `VITE_AI_PROVIDER=anthropic` and add your Anthropic key.

> API keys are stored in browser memory only and never sent to any external server other than the configured AI provider.

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **Build**: Vite 8
- **PWA**: vite-plugin-pwa + Workbox
- **Icons**: Lucide React
- **State**: React Context API

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout.tsx          # Sidebar + top bar
│   └── shared/UI.tsx       # Reusable components
├── contexts/
│   └── AppContext.tsx       # Global state
├── data/
│   └── mockData.ts         # Sample data for Sanju (Class 3)
├── pages/                  # One file per page/module
├── services/
│   └── aiService.ts        # AI abstraction layer (mock + provider)
└── types/
    └── index.ts            # All TypeScript types
```

## 🗺️ Roadmap

### Phase 2
- Exam preparation planner with day-wise scheduling
- Performance analytics with charts
- Natural-language content search
- Multiple child profiles

### Phase 3
- WhatsApp Business Platform integration
- Multi-language support
- Voice-based learning assistant
- Personalized learning recommendations
