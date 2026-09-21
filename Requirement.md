# Project Requirement: AI School Learning Assistant Web Application

## 1. Project Overview

Build a modern, user-friendly web application called **AI School Learning Assistant**.

The application is designed for parents who receive school-related information through WhatsApp, such as:

* Weekly lesson plans and upcoming topics.
* Monthly examination syllabus.
* Mid-term examination syllabus.
* Screenshots of classroom teaching, notes, and completed lessons.
* Homework instructions and study materials.
* PDF documents, worksheets, and educational links.

The objective is to provide a centralized platform where parents can upload or provide these materials, automatically extract and organize the educational content, identify what the child needs to study, and generate customized practice questions.

The application should help answer:

> "What did my child learn, what should my child study next, what is important for the upcoming exam, and how can I help my child practice?"

---

## 2. Target Users

### Primary User

Parents of school-going children, especially primary and middle school students.

### Example Use Case

A parent receives the following WhatsApp messages:

1. Next week's lesson plan as an image.
2. Monthly exam syllabus as a PDF.
3. Screenshots of lessons taught in class.
4. A link to an online educational resource.

The parent uploads these materials into the application.

The application should:

1. Read and extract the content.
2. Identify subjects, chapters, and topics.
3. Organize the content by subject and exam.
4. Highlight important topics to study.
5. Explain what the child should learn.
6. Recommend exercises and practice activities.
7. Generate customized question papers with selectable question types.
8. Track preparation progress.

---

# 3. Core Features

## Module 1: Dashboard

Create a dashboard displaying:

* Child's name and class.
* Current academic period.
* Upcoming weekly lessons.
* Upcoming examinations.
* Recently uploaded materials.
* Topics requiring attention.
* Study progress by subject.
* Pending practice exercises.
* Recently generated question papers.

### Dashboard Example

| Section          | Information                         |
| ---------------- | ----------------------------------- |
| This Week        | Upcoming lessons                    |
| Upcoming Exam    | Monthly Exam / Mid-Term             |
| Study Priority   | Topics requiring preparation        |
| Practice Pending | Exercises not completed             |
| Recent Uploads   | Images, PDFs, links                 |
| Progress         | Subject-wise preparation percentage |

Include visual indicators such as:

* Not Started
* In Progress
* Needs Revision
* Completed

---

## Module 2: Upload Learning Materials

Create a dedicated upload page supporting the following input types.

### A. Image Upload

Support:

* JPG
* JPEG
* PNG
* WEBP

Use cases:

* WhatsApp screenshots.
* Handwritten notes.
* School circulars.
* Lesson plan images.
* Classroom board screenshots.
* Homework screenshots.

### B. PDF Upload

Support:

* School syllabus PDFs.
* Worksheets.
* Examination circulars.
* Study materials.
* Question papers.
* Textbook extracts.

### C. Website / Educational Links

Allow users to paste URLs.

Examples:

* School portals.
* Educational websites.
* Online learning resources.
* Google Drive links, where accessible.
* YouTube educational videos, where supported.

The application should attempt to extract relevant educational content from accessible links.

### D. Additional Metadata

When uploading a document, allow the user to select:

* Child
* Class / Grade
* Subject
* Material Type
* Academic Term
* Examination Type
* Date Received
* Optional Notes

Material types:

* Weekly Lesson Plan
* Monthly Exam Syllabus
* Mid-Term Exam Syllabus
* Classroom Notes
* Homework
* Worksheet
* General Study Material
* Other

### Upload Processing

After upload:

1. Detect the file type.
2. Extract text using OCR for images.
3. Extract text from PDFs.
4. Retrieve readable content from supported URLs.
5. Identify subjects and topics.
6. Save the original file.
7. Store extracted text and structured information.
8. Display a processing status.

Possible statuses:

* Uploaded
* Processing
* Processed
* Requires Review
* Failed

If OCR or AI extraction is uncertain, clearly highlight the uncertain content and allow manual correction.

---

# 4. Module 3: AI Content Understanding

After processing uploaded material, the AI should analyze and categorize the information.

### Extract the Following

#### School Plan

* Date
* Subject
* Chapter
* Topic
* Lesson planned
* Homework
* Required preparation
* Important instructions

#### Examination Syllabus

* Examination name
* Subject
* Chapter
* Topics included
* Subtopics
* Important concepts
* Textbook pages, if mentioned
* Suggested preparation priority

#### Classroom Screenshots

Identify:

* Subject
* Chapter being taught
* Concepts explained
* Definitions
* Examples
* Exercises
* Homework
* Important teacher instructions

### Important Requirement

Do not blindly assume that every uploaded screenshot contains complete information.

If content is unclear, display:

> "Some information could not be confidently identified. Please review or correct it."

Allow parents to edit extracted information.

---

# 5. Module 4: What Should My Child Study?

Create a page called:

## "Study Guide"

This is one of the most important features of the application.

For each subject and chapter, generate the following sections.

### A. What to Read

Identify the textbook sections, concepts, definitions, and topics the child should read.

Example:

**Subject:** EVS
**Chapter:** Plants Around Us

What to read:

1. Parts of a plant.
2. Functions of roots, stems, leaves, and flowers.
3. Types of plants.
4. Uses of plants.
5. Important textbook examples.

### B. What to Highlight

Identify important information that the child should mark in the textbook or notes.

Categories:

* Important definitions.
* Key facts.
* Formulas.
* Rules.
* Dates.
* Vocabulary.
* Important examples.
* Frequently testable concepts.

For every highlighted item, explain:

* Why it is important.
* Whether it should be memorized.
* Whether the child should understand the concept.
* Whether it is useful for a particular question type.

### C. What to Understand

Explain concepts in simple, child-friendly language.

Provide:

* Simple explanation.
* Real-life examples.
* Step-by-step explanation.
* Common mistakes.
* Quick recap.

### D. What to Practice

Recommend exercises based on the topic:

* Fill in the blanks.
* Multiple-choice questions.
* Match the following.
* True or False.
* Short answers.
* Long answers.
* Compare and contrast.
* Give reasons.
* Word meanings.
* Opposites.
* Grammar exercises.
* Mathematical problems.
* Application-based questions.

### E. Quick Revision

Generate a concise revision section:

* Key points.
* Important words.
* Formulas.
* One-minute recap.
* Questions to ask the child orally.

---

# 6. Module 5: Exam Preparation Planner

Create a page for managing examinations.

### Exam Types

Allow users to create:

* Monthly Exam
* Unit Test
* Mid-Term Exam
* Quarterly Exam
* Half-Yearly Exam
* Annual Exam
* Other

### Exam Details

* Exam name
* Start date
* End date
* Subjects
* Syllabus
* Exam timetable
* Preparation status

### Exam Subject View

For each subject, display:

| Field              | Example     |
| ------------------ | ----------- |
| Subject            | Mathematics |
| Chapters           | 1, 2, 3     |
| Topics Covered     | 8           |
| Topics Studied     | 5           |
| Topics Pending     | 3           |
| Practice Completed | 60%         |
| Revision Status    | In Progress |

### AI Exam Preparation Plan

Generate a study plan based on:

* Exam date.
* Number of chapters.
* Topics pending.
* Child's available study time.
* Difficulty level.
* Previous practice performance.

Example:

> "Your Mathematics exam is in 7 days. Complete Fractions today, revise Multiplication tomorrow, and practice mixed questions on Saturday."

Allow parents to manually adjust the plan.

---

# 7. Module 6: Question Paper Generator

Create a powerful and flexible question generation interface.

The parent should be able to select:

### Step 1: Select Subject

* English
* Mathematics
* EVS
* Science
* Social Studies
* Hindi
* Kannada
* Telugu
* Other subjects

### Step 2: Select Source Material

Allow selection of:

* Entire syllabus.
* Specific chapter.
* Multiple chapters.
* Uploaded classroom notes.
* Uploaded textbook material.
* Specific topics.
* Previously studied topics.

### Step 3: Select Difficulty

* Easy
* Medium
* Difficult
* Mixed Difficulty

### Step 4: Select Question Types and Quantities

Allow parents to select multiple question types and specify the number of questions for each.

| Question Type               | Quantity |
| --------------------------- | -------- |
| Multiple Choice Questions   | 10       |
| Fill in the Blanks / Dashes | 10       |
| True or False               | 10       |
| One-Word Answers            | 10       |
| Short Answers               | 10       |
| Long Answers                | 5        |
| Match the Following         | 10       |
| Compare and Contrast        | 5        |
| Word Meanings               | 10       |
| Opposites                   | 10       |
| Synonyms                    | 10       |
| Give Reasons                | 5        |
| Name the Following          | 10       |
| Identify the Correct Answer | 10       |
| Rearrange the Words         | 10       |
| Grammar Exercises           | 10       |
| Mathematical Problems       | 10       |
| Application-Based Questions | 5        |

The user should be able to:

* Add custom question types.
* Change quantities.
* Remove question types.
* Reorder sections.
* Save question paper configurations as templates.

### Step 5: Additional Options

Allow selection of:

* Include answers.
* Generate questions only.
* Include explanations.
* Include marks per question.
* Randomize questions.
* Avoid duplicate questions.
* Use textbook terminology.
* Use child-friendly language.
* Include questions from classroom notes only.
* Include diagrams where applicable.

### Step 6: Generate

Display a prominent button:

**Generate Question Paper**

The AI should generate questions based strictly on the selected source materials and syllabus.

---

# 8. Question Paper Output

Display the generated question paper in a clean, printable format.

### Example Structure

# Mathematics – Monthly Examination Practice

**Class:** 3
**Chapters:** Multiplication, Division
**Total Questions:** 30
**Total Marks:** 40

---

### Section A: Multiple Choice Questions

1. What is 6 × 4?

   a) 20
   b) 24
   c) 26
   d) 28

### Section B: Fill in the Blanks

1. 8 × ___ = 40

### Section C: Short Answers

1. Explain multiplication using repeated addition.

### Section D: Compare

1. Compare multiplication and addition.

---

### Output Actions

Provide buttons to:

* View Question Paper.
* View Answer Key.
* View Explanations.
* Print.
* Export as PDF.
* Download.
* Regenerate.
* Generate a different version.
* Save to Question Paper Library.

---

# 9. Module 7: Answer Key and Explanations

For every generated question paper, generate an answer key.

Include:

* Correct answer.
* Explanation.
* Step-by-step solution for Mathematics.
* Expected answer for descriptive questions.
* Alternative acceptable answers where applicable.
* Marks allocation.

For primary school students, explanations should be simple and age-appropriate.

Example:

**Question:** What is 5 × 3?

**Answer:** 15

**Explanation:** 5 × 3 means adding 5 three times: 5 + 5 + 5 = 15.

---

# 10. Module 8: Practice Mode

Allow the child to attempt generated question papers directly in the application.

Features:

* Interactive MCQs.
* Fill-in-the-blank answers.
* Text answers.
* Automatic evaluation where possible.
* Manual review for descriptive answers.
* Score calculation.
* Topic-wise performance.
* Incorrect answer review.
* Retry incorrect questions.
* Practice history.

### Performance Analysis

After completion, show:

* Total score.
* Correct answers.
* Incorrect answers.
* Topics needing revision.
* Recommended next exercises.

Example:

> "You need more practice with division word problems. Review the examples and try these 5 questions again."

---

# 11. Module 9: Weekly Lesson Tracker

Create a weekly learning calendar.

### Features

* View upcoming lessons.
* Track lessons completed in school.
* Mark lessons as studied at home.
* Associate classroom screenshots with lessons.
* Track homework.
* Identify lessons requiring revision.

### Weekly View

| Day       | Subject     | Topic     | Status         |
| --------- | ----------- | --------- | -------------- |
| Monday    | English     | Nouns     | Completed      |
| Tuesday   | Mathematics | Fractions | Needs Revision |
| Wednesday | EVS         | Plants    | Not Started    |

Allow filtering by:

* Subject.
* Date.
* Completion status.
* Exam relevance.

---

# 12. Module 10: Content Search

Provide a global search feature.

The parent should be able to search:

* Chapter names.
* Topics.
* Exam names.
* Uploaded documents.
* Questions.
* Definitions.
* Previous study guides.

Example searches:

* "Show all Mathematics topics for the monthly exam."
* "Find all questions related to nouns."
* "What chapters are pending for EVS?"
* "Show all classroom notes for this week."

Support natural-language search where feasible.

---

# 13. AI Assistant / Chat Interface

Include an optional AI chat assistant that understands the uploaded educational content.

### Example Questions Parents Can Ask

* What should my child study today?
* Summarize the monthly exam syllabus.
* Explain this chapter in simple language.
* What are the important questions from this topic?
* Generate 20 questions from today's lesson.
* My child is struggling with multiplication. Give practice exercises.
* Explain this concept like a teacher.
* Create a 5-day revision plan.
* Compare the weekly lesson plan with the exam syllabus.
* Identify topics mentioned in classroom screenshots but missing from my study tracker.

The assistant should use the uploaded and processed materials as its primary knowledge source.

---

# 14. Multi-Child Support

Allow parents to manage multiple children.

Each child should have a separate:

* Class.
* School.
* Academic year.
* Subject list.
* Uploaded materials.
* Exam schedule.
* Study progress.
* Question paper history.

---

# 15. User Interface Requirements

Create a clean, modern, responsive UI.

### Design Preferences

* Parent-friendly interface.
* Simple navigation.
* Mobile-first responsive design.
* Works well on desktop and mobile browsers.
* Clear cards and dashboards.
* Minimal clutter.
* Easy-to-understand icons.
* Accessible typography.
* Suitable for users who are not technically advanced.

### Suggested Navigation

1. Dashboard
2. Upload Materials
3. Weekly Plan
4. Exam Preparation
5. Study Guide
6. Question Generator
7. Practice Mode
8. Question Paper Library
9. Children
10. Settings

---

# 16. Recommended Technology Stack

Use a practical, maintainable technology stack.

### Frontend

* React
* TypeScript
* Tailwind CSS
* Modern component library
* Responsive design

### Backend

Choose one:

* Node.js with Express
* Node.js with NestJS
* Supabase backend

### Database

* PostgreSQL

### Storage

* Supabase Storage or equivalent object storage.

### AI Integration

Design an abstraction layer supporting configurable AI providers, such as:

* IBM Cloud AI / watsonx.ai
* OpenAI-compatible APIs
* Anthropic-compatible APIs
* Local LLMs, where supported

Do not hardcode API keys.

### OCR

Use a pluggable OCR service that can process:

* Printed text.
* Screenshots.
* Tables.
* Handwritten content, where supported.

### PDF Generation

Support downloadable question papers and answer keys in PDF format.

---

# 17. Data Model

Design a normalized database with entities such as:

### Users

* id
* name
* email
* created_at

### Children

* id
* user_id
* name
* class
* school
* academic_year

### Uploaded Materials

* id
* child_id
* file_name
* file_type
* file_url
* material_type
* subject
* upload_date
* processing_status

### Extracted Content

* id
* material_id
* extracted_text
* structured_content
* confidence_score

### Subjects

* id
* child_id
* name

### Chapters

* id
* subject_id
* name
* description

### Topics

* id
* chapter_id
* name
* importance
* study_status

### Exams

* id
* child_id
* name
* exam_type
* start_date
* end_date

### Exam Syllabus

* id
* exam_id
* subject_id
* chapter_id
* topic_id

### Study Plans

* id
* child_id
* exam_id
* plan_date
* activities
* status

### Generated Question Papers

* id
* child_id
* subject_id
* title
* configuration
* questions
* answer_key
* created_at

### Practice Attempts

* id
* question_paper_id
* score
* answers
* completed_at

---

# 18. AI Processing Rules

The AI must follow these rules:

1. Prioritize uploaded school materials over generic knowledge.
2. Do not invent syllabus topics that are not present in the source material.
3. Clearly distinguish extracted facts from AI-generated recommendations.
4. Use age-appropriate language based on the child's class.
5. Preserve textbook terminology where appropriate.
6. Identify unclear or incomplete information.
7. Avoid generating questions unrelated to the selected syllabus.
8. Avoid duplicate questions within the same question paper.
9. Ensure generated answers are factually correct.
10. Allow the parent to review and edit AI-generated content.
11. Do not claim that a topic is important based on exam prediction unless the source explicitly indicates its importance.
12. Keep uploaded documents private and secure.

---

# 19. Important Privacy and Security Requirements

Since the application processes school documents and potentially children's information:

* Require authentication.
* Restrict access to the user's own children and materials.
* Secure uploaded files.
* Do not expose uploaded documents publicly.
* Do not log sensitive document contents unnecessarily.
* Use secure API key storage.
* Provide deletion options for uploaded materials.
* Avoid sending data to external AI providers without user awareness and appropriate controls.
* Clearly communicate which AI provider processes the content.

---

# 20. MVP Scope

Build the first working version with the following features.

### Phase 1 – MVP

1. Parent login.
2. Add child.
3. Upload images and PDFs.
4. OCR and text extraction.
5. Manual review of extracted content.
6. AI syllabus and topic organization.
7. Study Guide with:

   * What to Read
   * What to Highlight
   * What to Understand
   * What to Practice
8. Question Paper Generator.
9. Select question types and quantities.
10. Generate questions and answer key.
11. Export question paper as PDF.
12. Basic dashboard.

### Phase 2

1. Weekly lesson tracker.
2. Exam preparation planner.
3. Practice mode.
4. Performance analysis.
5. AI chat assistant.
6. Multiple children.
7. Question paper history.
8. Natural-language search.

### Phase 3

1. WhatsApp integration, subject to platform API permissions.
2. Automatic processing of incoming school messages.
3. Scheduled study reminders.
4. Multi-language support.
5. Voice-based learning assistant.
6. Personalized learning recommendations.

---

# 21. WhatsApp Integration – Future Enhancement

Initially, the application should support manual upload of WhatsApp screenshots, PDFs, and copied links.

In a future version, explore official WhatsApp Business Platform integration where legally and technically feasible.

Potential capabilities:

* Receive school messages through an authorized integration.
* Detect weekly plans.
* Identify examination announcements.
* Extract syllabus from images.
* Create draft study plans.
* Notify parents about upcoming preparation tasks.

Do not implement unofficial WhatsApp scraping or unauthorized access to personal WhatsApp accounts.

---

# 22. Development Expectations

Build this application as a functional product, not just a static UI mockup.

Requirements:

1. Create a modular and scalable architecture.
2. Use reusable components.
3. Include loading, error, and empty states.
4. Validate uploaded files.
5. Handle OCR failures gracefully.
6. Make AI provider configuration flexible.
7. Provide mock data and mock AI responses for local development.
8. Include clear setup instructions.
9. Include environment variable configuration.
10. Include database schema and migrations.
11. Include API documentation.
12. Include basic automated tests.
13. Ensure the application is responsive.
14. Do not hardcode sensitive credentials.
15. Clearly identify features requiring external API configuration.

---

# 23. First Development Task

Start by building the MVP in the following order:

### Step 1

Create the project structure and technology stack.

### Step 2

Implement the dashboard and child management.

### Step 3

Implement image and PDF upload with a material library.

### Step 4

Implement OCR/text extraction using a pluggable service.

### Step 5

Implement AI content structuring and syllabus extraction.

### Step 6

Implement the Study Guide.

### Step 7

Implement the Question Paper Generator with dynamic question type selection and quantities.

### Step 8

Implement answer key generation and PDF export.

### Step 9

Add sample data for a primary school student.

### Step 10

Test the complete flow:

Upload → Extract → Organize → Study Guide → Generate Questions → Answer Key → Export PDF.

Before proceeding to each major module, explain the implementation approach briefly and then create the required code.

---

## Final Goal

Create a reliable AI-powered education companion that transforms scattered school WhatsApp updates, screenshots, PDFs, and links into an organized learning system.

The parent should be able to answer these questions from one application:

1. What was taught this week?
2. What will be taught next week?
3. What is included in the upcoming exam?
4. What should my child read and highlight?
5. What exercises should my child practice?
6. Can I generate a customized question paper?
7. How well is my child prepared?
8. Which topics need more revision?

Build the application with simplicity, accuracy, extensibility, and real-world usability as the primary priorities.
