# AI-Visu Agent Permanent Rules & Context

This file serves as the permanent configuration and context for the AI Assistant working on the `ai-visu` project. The agent should read and follow these rules at the beginning of any task.

## 🎯 Project Goal
We are building a highly interactive, intuitive, and premium educational web platform designed to explain Large Language Models (LLMs) and Machine Learning concepts to **non-coders**. Our primary mechanism for teaching is through rich, dynamic, and physics-based visualizations (sandboxes) accompanied by concise, jargon-free metaphors.

## 🛠 Tech Stack
- **Framework:** React 19 + TypeScript + Vite
- **Routing:** React Router v7
- **Styling:** Vanilla Modern CSS (No Tailwind CSS). Focus on advanced CSS capabilities (variables, Grid, Flexbox, glassmorphism, gradients).
- **Physics Engine:** \`matter-js\` (Used for interactive mechanical visualizers, like sorting data or neural network pathways).
- **Animations:** \`framer-motion\` for smooth micro-interactions, page transitions, and UI fluidity.
- **Icons:** \`lucide-react\`

## 🎨 Design & UX Guidelines
1. **Premium First Impression:** The application *must* look state-of-the-art. Avoid generic styling. 
2. **Visual Vocabulary:** Use dark modes, vibrant curated color palettes, elegant typography, and smooth hover effects. Every interactive element should provide visual feedback.
3. **Show, Don't Tell:** Never rely on a wall of text. Text should be short, punchy, and metaphorical. The heavy lifting of the explanation should happen in the interactive `sandboxComponent` inside our `ConceptSkeleton`.
4. **Physicality:** Use Matter.js to create tangible, jam-free physical representations of abstract concepts (like data items sliding down physics-enabled funnels). 

## 💻 Code & Architecture Patterns
1. **Component Structure:** Reusable foundational layouts are preferred. E.g., `ConceptSkeleton` for pairing textual context with a visual interactive component.
2. **TypeScript:** Strictly type components, physics objects, and state.
3. **Matter.js Best Practices:** When building Matter.js engines in React, properly clean up the render and engine instances in `useEffect` return statements to avoid memory leaks or duplicated canvases during Hot Module Replacement (HMR).
4. **Modularity:** Keep logic for the UI distinct from the physics engines. Break down complex visualizers into smaller React pieces or helper functions.

## ✍️ Content Tone
- Friendly, accessible, professional, yet informal.
- Avoid abstract math unless accompanied by a very clear physical analogy.
- Use metaphors (e.g., "Big Data as a massive flow of physical items", "Layers as filters or pipelines").
