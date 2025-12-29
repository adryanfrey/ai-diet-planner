# AI Diet Planner - Solution Documentation

## Executive Summary

**AI Diet Planner** is a web application that transforms the complex goal of "creating a diet" into guided actionable steps with a full solution as output. Users describe their high-level health goals through a guided questionnaire, the AI structures this into scientifically-calculated nutrition targets and varied meal options, and users receive immediately actionable meal plans they can follow.

### How It Addresses the Challenge

| Challenge Requirement            | Implementation                                                             |
| -------------------------------- | -------------------------------------------------------------------------- |
| User describes a high-level goal | 4-step questionnaire captures weight goals, preferences, and restrictions  |
| AI helps structure it            | Multi-agent pipeline calculates nutrition targets and generates meal plans |
| User can act on it               | 3 complete daily meal plan options with ingredient proportions             |
| User iterates with AI _(v2)_     | Chat interface to ask questions and modify plans through conversation      |

## 1. Product Thinking

### User Problem

**The Problem:** Creating a personalized, scientifically-grounded diet plan is challenging for most people because it requires:

- Knowing what personal data is even relevant (the questionnaire guides users through exactly what's needed)
- Understanding complex nutritional formulas (BMR, TDEE, macros)
- Accounting for individual factors
- Translating calorie targets into actual meals
- Ensuring variety to maintain adherence

**Existing Solutions Fall Short:**

- Generic diet plans ignore individual context
- Manual calculation is tedious and error-prone
- Nutritionist consultations are expensive and inaccessible
- ChatGPT-style interfaces lack structure and validation

**Our Solution:** A structured, guided experience where users provide their context once, and AI handles the complex nutrition science while presenting actionable, varied meal plans.

### UX/UI Decisions

#### 1. Multi-Step Questionnaire Over Single Form

**Decision:** Split data collection into 4 focused steps rather than one long form.

**Reasoning:**

- Reduces cognitive load - users focus on one topic at a time
- Progress indicator (stepper) provides motivation
- Each step can validate before proceeding
- Allows localStorage persistence per step (user can refresh without losing progress)

```
Step 1: Personal Info → Step 2: Goals → Step 3: Restrictions → Step 4: Preferences
```

#### 2. Hybrid UI Over Pure Chat

**Decision:** Form-based input with AI-generated structured output, not conversational chat.

**Reasoning:**

- Diet planning requires specific data points (weight, height, activity level) - forms capture these efficiently
- Structured output (meal cards, nutrition overview) is more actionable than prose
- Users can quickly scan and compare 3 meal plan options
- Chat refinement planned for v2 (shown as "Coming Soon" in UI)

#### 3. Three Meal Plan Options

**Decision:** Generate exactly 3 daily meal plan options, not 1 or 7.

**Reasoning:**

- 1 option feels prescriptive; 3 provides choice without overwhelming
- Variety prevents dietary monotony and encourages adherence
- Each option is a complete day, immediately actionable
- Fixed count ensures consistent AI output and UI layout

#### 4. Ingredient Proportions Over Exact Quantities

**Decision:** Present ingredients as percentage ranges (e.g., "30% - 40%") rather than grams.

**Reasoning:**

- More flexible for different portion sizes and hunger levels
- Teaches proportional thinking (what a balanced plate looks like)
- AI can reliably generate proportions; exact gram calculations require ingredient databases
- Each brand has slightly different macro values; for precise calculations users should read product labels

### AI Output Presentation

The results page presents AI output in layers of detail:

```
┌─────────────────────────────────────────────────────────────┐
│  NUTRITION OVERVIEW                                          │
│  ┌──────────────────────┬───────────────────────────────┐   │
│  │  🔥 2,150 kcal       │   [Ring Chart]   Protein: 160g │   │
│  │  Daily target        │                  Carbs: 215g   │   │
│  │                      │                  Fats: 72g     │   │
│  └──────────────────────┴───────────────────────────────┘   │
│  ▼ View more (expandable detailed explanation)              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   Option 1      │ │   Option 2      │ │   Option 3      │
│   [4 meals]  ℹ️ │ │   [4 meals]  ℹ️ │ │   [4 meals]  ℹ️ │
│                 │ │                 │ │                 │
│   Breakfast     │ │   Breakfast     │ │   Breakfast     │
│   • Eggs (30%)  │ │   • Oatmeal...  │ │   • Greek...    │
│   • Toast (20%) │ │                 │ │                 │
│   ...           │ │   ...           │ │   ...           │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

**Key UX Features:**

- **Progressive disclosure:** Summary visible first, details on demand
- **Visual hierarchy:** Calories prominent, macros secondary, explanation tertiary
- **Actionable cards:** Each meal plan is self-contained and immediately usable
- **Info tooltips:** Plan descriptions accessible via hover (HoverCard component)

---

## 2. Fullstack + AI Execution

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              User's Browser                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    React Frontend (Mantine UI)                       │    │
│  │  • Multi-step questionnaire with validation                          │    │
│  │  • Meal plan display with nutrition visualization                    │    │
│  │  • localStorage for step persistence and results caching             │    │
│  └──────────────────────────────────┬──────────────────────────────────┘    │
└─────────────────────────────────────┼───────────────────────────────────────┘
                                      │ HTTP POST /api/plan-diet
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FastAPI Backend                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    DietGeneratorService                              │    │
│  │                                                                      │    │
│  │  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐    │    │
│  │  │ Input Guardrail │ → │  Diet Planner   │ → │  Meal Planner   │    │    │
│  │  │     Agent       │   │     Agent       │   │     Agent       │    │    │
│  │  └─────────────────┘   └────────┬────────┘   └─────────────────┘    │    │
│  │                                 │                                    │    │
│  │                    ┌────────────┴────────────┐                       │    │
│  │                    │ calculate_calorie_targets│                       │    │
│  │                    │ (Mifflin-St Jeor tool)  │                       │    │
│  │                    └─────────────────────────┘                       │    │
│  └──────────────────────────────────┬──────────────────────────────────┘    │
└─────────────────────────────────────┼───────────────────────────────────────┘
                                      │
                                      ▼
                              ┌───────────────┐
                              │   OpenAI API  │
                              │  (AI Agents)  │
                              └───────────────┘
```

### Multi-Agent AI Pipeline

The core AI logic uses OpenAI's Agents SDK with three specialized agents working in sequence:

#### Agent 1: Input Guardrail Agent

**Purpose:** Security validation before processing user input.

**Why a Separate Agent:**

- Prompt injection attacks could manipulate diet recommendations
- Users might submit off-topic requests (code generation, harmful content)
- Separating security from business logic follows defense-in-depth principles

**Implementation Highlights:**

- Uses a low cost llm (lower cost, sufficient for classification)
- Checks for: prompt injection, code injection, harmful content, off-topic requests
- Returns structured output: `{is_input_safe: boolean, reasoning: string}`
- Friendly error messages (no technical jargon like "injection detected")

#### Agent 2: Diet Planner Agent

**Purpose:** Calculate personalized nutrition targets with scientific backing.

**Key Features:**

- Uses a high cost llm for complex reasoning
- Has access to two tools:
  1. `calculate_calorie_targets_tool` - Deterministic Mifflin-St Jeor calculation
  2. `WebSearchTool` - Research any question when needed

**Why a Custom Tool for Calories:**

LLMs can hallucinate numbers. By implementing the Mifflin-St Jeor formula as a Python function tool, we ensure:

- Deterministic, verifiable calculations
- Consistent results across requests
- AI still decides protein/fat ratios based on user context

**Why WebSearchTool:**

LLM training data has a cutoff date and nutritional science evolves. By using web search, the agent can:

- Research any question it needs to answer (medical conditions, ingredient substitutes, dietary trends)
- Access up-to-date dietary guidelines and recent research
- Avoid relying on potentially outdated training data for health-sensitive decisions

**Output:** Structured nutrition plan with explanation of methodology.

#### Agent 3: Meal Planner Agent

**Purpose:** Generate 3 varied daily meal plans matching nutrition targets.

**Key Features:**

- Takes output from Diet Planner as input context
- Enforces constraint priority: Medical > Restrictions > Nutrition > Preferences
- Creates practical, accessible meals (not exotic ingredients)
- Ensures variety across the 3 plans

### Frontend Implementation

#### Tech Stack Choices

| Technology      | Why Chosen                                             |
| --------------- | ------------------------------------------------------ |
| React Router v7 | Server-side rendering + actions for API calls          |
| Mantine UI      | Rapid development with polished, accessible components |
| TypeScript      | Type safety matching backend Pydantic schemas          |
| localStorage    | Simple persistence without database complexity         |

#### Key Components

**Questionnaire Flow (`web/app/routes/questionnaire.tsx`):**

- Stepper component with 4 steps
- Each step is a separate component with its own form and validation
- Server action pattern for form submission

**Results Display (`web/app/routes/my-diet.tsx`):**

- NutritionOverview component with RingProgress visualization
- 3 MealDailyPlanCard components in responsive grid
- Empty state with CTA to questionnaire
- Data loaded from localStorage (set after successful API response)

**Error Handling:**

- Custom ErrorBoundary with configurable error configs
- Specific handling for 403 (guardrail blocked) and 408 (timeout)
- Friendly error messages with retry and home navigation

### Data Flow

```
1. User fills questionnaire steps
   └── Each step: validate → save to localStorage

2. User submits final step
   └── Collect all localStorage data → POST to /api/plan-diet

3. Backend processes request
   └── Guardrail → Diet Planner → Meal Planner → Return DietPlan

4. Frontend receives response
   └── Save to localStorage → Navigate to /my-diet

5. My Diet page loads
   └── Read from localStorage → Render nutrition + meal cards
```

---

## 3. Design & Architecture Communication

### Key Architectural Decisions

#### 1. Multi-Agent vs. Single Agent

**Decision:** Three specialized agents instead of one general agent.

**Trade-off:**

- ✅ Each agent has focused instructions (better output quality)
- ✅ Security isolation (guardrail can't be bypassed)
- ✅ Different model tiers for cost optimization (mini for guardrail)
- ❌ Increased latency (sequential calls)
- ❌ More complex orchestration code

#### 2. Function Tool for Calculations

**Decision:** Implement calorie calculation as a Python function tool, not LLM reasoning.

**Trade-off:**

- ✅ Deterministic, verifiable results
- ✅ Faster than LLM arithmetic
- ✅ Users can trust the science
- ❌ Less flexible (can't easily change formula)
- ❌ LLM must correctly call the tool with right parameters

#### 3. localStorage Over Database

**Decision:** Store diet plans in browser localStorage, not a database.

**Trade-off:**

- ✅ Zero backend persistence complexity
- ✅ Instant reads, no network latency
- ✅ Great for MVP and quick development
- ❌ Data lost if user clears browser
- ❌ No cross-device access
- ❌ No analytics on generated plans

#### 4. Structured Forms Over Chat

**Decision:** Form-based questionnaire for input, structured cards for output.

**Trade-off:**

- ✅ Efficient data collection (no back-and-forth)
- ✅ Guaranteed complete data (validation)
- ✅ Scannable, comparable output
- ✅ More guidable than open-ended chat (users know exactly what to provide)
- ❌ Less conversational/engaging
- ❌ Users can't ask follow-up questions (yet)

### Trade-offs Made for MVP

| Feature              | Decision             | Reasoning                                  |
| -------------------- | -------------------- | ------------------------------------------ |
| **Persistence**      | localStorage only    | Prioritized AI quality over infrastructure |
| **Authentication**   | None                 | Unnecessary complexity for demo            |
| **Chat refinement**  | Marked "Coming Soon" | Core flow more valuable than iteration     |
| **Exact quantities** | Proportions instead  | More flexible, reliable AI output          |
| **Plan count**       | Fixed at 3           | Consistent UI, sufficient variety          |
| **Rate limiting**    | None                 | Demo/testing focus                         |

### Known Technical Limitations

1. **No Tests:** Unit and E2E tests not implemented due to time constraints
2. **Basic CORS:** Allows all origins (development configuration)
3. **Limited Logging:** Minimal observability infrastructure
4. **No CI/CD:** Manual deployment only
5. **No Mobile Optimization:** Mobile-friendliness was not prioritized; responsive design can be implemented in v2 if needed

---

## 4. What I'd Build in V2

### Immediate Improvements

1. **Chat-Based Refinement**
   - After viewing plan, user can say "I don't like eggs, replace breakfast"
   - Context-aware responses using plan as memory

2. **Core Experience Improvements**
   - Expand questionnaire to collect more detailed user information
   - Continue iterating on AI prompts and workflow for higher quality outputs
   - Make AI processing async for better scalability and user experience (show progress, allow background generation)

3. **Persistent Database**
   - Allow users to save their generated plans
   - Replace localStorage with server-side storage

### Technical Improvements

1. **Observability**
   - Structured logging with correlation IDs
   - AI response quality monitoring
   - Latency tracking per agent

2. **Testing Suite**
   - Unit tests for calorie calculator
   - Integration tests for agent pipeline
   - E2E tests for critical user flows

3. **Frontend Theme**
   - Implement a proper design system with consistent styling
   - Create a polished, cohesive visual identity for the app

---

## Conclusion

AI Diet Planner demonstrates a complete AI-powered product that transforms a complex goal (diet planning) into structured, actionable output (personalized meal plans). The solution prioritizes:

- **User experience:** Guided questionnaire, clear results, helpful errors
- **AI reliability:** Multi-agent pipeline, function tools, structured outputs
- **Development speed:** Modern frameworks, component libraries, pragmatic trade-offs
