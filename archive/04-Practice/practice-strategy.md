# FAM Practice & Exam-Day Strategy

A concrete, practical playbook for building exam-readiness on the SOA **Fundamentals of Actuarial Mathematics (FAM)** exam. FAM is a 3.5-hour computer-based exam of multiple-choice questions covering both the short-term (FAM-S) and long-term (FAM-L) syllabus content.

---

## 1. Where to Get Practice Problems

### A. SOA official sample questions (free, do these first)
These are the gold standard because they match the exam's style, difficulty, and answer choices.

- **soa.org FAM page** — download the official **FAM Sample Questions** and **Sample Solutions** PDFs. These are split (or labeled) by the **FAM-S (short-term)** and **FAM-L (long-term)** portions. Work the full set.
- The SOA periodically refreshes these; always pull the **current edition** that matches your sitting, and re-check the page a few weeks before your exam for updates/errata.
- Also download the **FAM syllabus** and the **Introductory Study Note** — they list the exact learning objectives and tell you which legacy material does and does not carry over.

### B. Legacy SOA exams that overlap (free, high-value supplement)
FAM was assembled from the old **STAM** (short-term) and **MLC/LTAM** (long-term) exams. Their released problems are an enormous free question bank — but you must filter to in-scope topics.

- **STAM released exams / sample questions** → overlaps the **FAM-S** half: frequency/severity models, coverage modifications (deductibles, limits, coinsurance), aggregate loss models, empirical estimation, credibility, basic pricing/reserving for short-term insurance.
  - *Skip:* STAM material dropped from FAM (e.g., the deeper severity/parametric-estimation and advanced credibility content beyond the FAM objectives).
- **MLC / LTAM released exams and sample questions** → overlaps the **FAM-L** half: survival models and life tables, life insurance and annuity present values, premiums (net and gross), policy values/reserves, basic multi-state/Markov models, and Poisson processes.
  - *Skip:* the LTAM written-answer questions and topics beyond FAM-L scope (advanced multiple-decrement, profit testing depth, etc.).
- Use the FAM syllabus objectives as your filter: if a legacy problem tests something not on the FAM learning objectives, drop it.

### C. Commercial question banks (paid, for volume + analytics)
Worth it for the sheer number of fresh problems and the tracking tools.

- **Coaching Actuaries — ADAPT**: large adaptive question bank with the **Earned Level (EL)** metric, custom quizzes by topic, and timed mock exams. The adaptive engine and EL are the single most useful readiness signal available. Often paired with their manual/video lessons (GOAL-style learning).
- **ACTEX**: study manuals with end-of-section problems and full-length practice exams; good for structured learning and worked solutions.
- Optionally a second source (e.g., another published manual) for extra problem variety — but don't over-buy; depth of practice beats breadth of materials.

**Priority order:** SOA official samples → filtered STAM + MLC/LTAM legacy problems → commercial bank (ADAPT) for volume and analytics.

---

## 2. How to Practice Effectively

Doing problems is not the same as *learning* from problems. Build these habits:

- **Timed sets, always.** Once you're past initial learning, practice in timed blocks at the real pace (~6 min/question). Untimed practice hides your biggest exam risk: pacing.
- **Track your earned level / accuracy trend.** In ADAPT, watch your **Earned Level** climb over time — it's calibrated to predict exam performance. If you're not using ADAPT, track rolling accuracy on timed mixed sets (e.g., last 50 questions).
- **Redo every missed problem — twice.** First, redo it the same day after reviewing the solution (confirm you understand). Then redo it again **cold, 1-2 weeks later** with no notes. A problem isn't "learned" until you can solve it cold.
- **Keep a mistake log.** This is the highest-leverage habit. For every miss, record:
  | Date | Topic | What the question asked | Why I missed it (concept gap / formula / calculator / misread / time) | The fix / key formula |
  - Tag the **root cause**, not just the topic. Patterns emerge fast — e.g., "I keep mixing up `a-due` vs `a-immediate`," or "I drop the deductible before applying the limit."
  - Review the log weekly and **before every mock**. Most repeat mistakes are a handful of recurring errors.
- **Separate concept errors from execution errors.** Concept gaps → go back and relearn the section. Execution errors (calculator, table lookup, sign, misread) → drill speed and build checklists.

---

## 3. Recommended Phase Order

Move through four phases. Don't jump to mock exams before you've drilled topics individually.

1. **Learn (build the toolbox).** Read/watch each topic, derive the key formulas yourself once, and do the worked examples. Goal: understand *why*, not memorize. Don't worry about speed yet.
2. **Drill by topic (untimed → lightly timed).** Hammer one topic at a time until you can solve its standard problem types reliably. Use the mistake log from day one. End each topic with a short focused quiz.
3. **Mixed timed sets.** Combine topics in random order under time pressure. This builds the skill of *recognizing what kind of problem you're looking at* — the real exam doesn't tell you the topic. Keep redoing misses cold.
4. **Full mock exams.** Sit complete, timed, simulated exams (full 3.5 hours, FAM tables + calculator only, no breaks beyond what the real exam allows). Do a thorough post-mortem on each. Aim for several mocks spread over your final 2-4 weeks.

A rough time split: ~40% learn, ~30% topic drilling, ~20% mixed sets, ~10% full mocks — but let your weak-area analytics shift the weight.

---

## 4. Time Management on Exam Day (3.5 hours)

- **Budget ~6 minutes per question.** 3.5 hours = 210 minutes. Divide by the number of questions and you land near 6 min each, leaving a small buffer. Know your specific count from the current exam rules and compute your own per-question budget before exam day.
- **Two-pass strategy with flag-and-move.** On pass 1, solve everything that comes quickly. The moment a question runs long (roughly 1.5-2x your per-question budget with no clear path), **flag it and move on**. Bank the easy points first; never let one hard problem eat the time of three easy ones.
- **Pass 2: return to flagged questions** with your remaining time, hardest-but-doable first.
- **Never leave a blank — there is no penalty for wrong answers.** Before time runs out, make sure **every** question has an answer. For pure guesses, eliminate any obviously wrong choices first, and consider committing to a single "default letter" for time-outs to avoid wasting seconds deciding.
- **Watch the clock at checkpoints.** Set mental milestones (e.g., "halfway through the questions by the halfway time mark"). If you're behind, speed up the easy ones — don't gold-plate.
- **Use the answer choices.** They're often close together to penalize rounding errors, but sometimes spread enough that estimation, plugging in, or working backward from the choices is faster than a full derivation.

---

## 5. Using the FAM Tables and the TI-30XS MultiView Efficiently

### The provided FAM tables
- **Print and study them during prep** — the *exact same* tables are provided in the exam. Knowing their layout cold saves real minutes.
- Know **where each thing lives**: the **Standard Ultimate Life Table** (and any select tables) for `l_x`, `A_x`, `a-due_x`, `2A_x`, etc.; distribution tables (means, variances, key formulas) for the FAM-S severity/frequency models; and any aggregate/credibility reference formulas.
- **Read directly from the table whenever possible** instead of re-deriving. For example, pull `A_x` and `a-due_x` straight from the life table rather than summing — and remember the bridge identities (e.g., `A_x = 1 - d·a-due_x`) to cross-check or get one value from another.
- Practice **only** with the official tables so you build muscle memory for their notation and rounding conventions.

### The TI-30XS MultiView (an approved exam calculator)
- **Confirm your calculator model is on the SOA's current approved list** before exam day; the TI-30XS/TI-30XB MultiView family is commonly permitted. Bring a backup and fresh batteries.
- **Learn its time-savers cold:**
  - **Table feature (`table`)** — generate `f(x)` over a range; great for stepping through values or finding a break-even.
  - **`data` + `stat` (1-Var / 2-Var)** — enter a discrete distribution as values + frequencies/probabilities to get mean and standard deviation in one shot (huge for expected value / variance of severity and aggregate problems).
  - **Multiple lines / `[2nd][enter]` to recall and edit** a prior expression — invaluable when a problem changes one input (e.g., a different deductible) and you'd otherwise retype everything.
  - **Fraction and `x²`/`√`/`^` keys, `Ans` reuse, and stored values** to chain calculations without transcription errors.
  - Set and verify **mode** (degrees vs radians rarely matters here; decimal display does) before you start.
- **Minimize keystrokes and transcription.** Most exam-day arithmetic errors come from re-keying intermediate numbers. Use `Ans`, stored variables, and the stat registers to keep values in the machine.
- **Time your calculator work in practice** so the keystrokes are automatic; you don't want to be learning the `data`/`stat` flow during the exam.

---

## 6. A Realistic Readiness Benchmark Before You Sit

Don't book confidence on a single good day. Use multiple converging signals:

- **ADAPT Earned Level.** A widely used rule of thumb is an **EL of about 6-7+ (sustained, not a one-off spike)** as a strong indicator of readiness; many students target **7** for comfortable margin. Treat EL as the headline metric if you have it.
- **Mock exam scores.** Score **consistently at or above the passing threshold on full, timed mock exams you haven't seen before** — ideally with **margin** (the real exam has nerves, fatigue, and harder-than-average draws). One pass isn't enough; you want a *repeatable* pass across multiple fresh mocks.
- **Pacing.** You finish full mocks **with time to spare for a review pass**, not scraping the buzzer.
- **Coverage / no soft spots.** No topic is a reliable miss. Check your topic-level analytics — a single weak area (say, multi-state models or credibility) can quietly cost you the exam.
- **Mistake log is shrinking.** Your repeat-error rate is trending toward zero; new misses are genuinely new, not the same old traps.

**Bottom line:** sit the exam when you are *consistently* passing fresh, full-length, timed mocks with margin, your ADAPT EL is solidly in the high range, your pacing leaves a buffer, and you have no untreated weak topic. Hitting all of these at once — not just one on a lucky day — is the green light.
