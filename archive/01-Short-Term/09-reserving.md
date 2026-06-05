# Loss Reserving for Short-Term Insurance

## Learning Objectives

By the end of this topic, the SOA expects you to be able to:

- Explain the purpose of loss reserving and distinguish between **case reserves**, **IBNR** (Incurred But Not Reported), and **total unpaid claim** estimates.
- Construct and interpret a **loss development triangle** (paid or incurred) organized by accident year and development year.
- Compute **age-to-age (link-ratio) factors** and **cumulative development factors (CDFs)** using the chain-ladder (development) method.
- Project **ultimate losses** and estimate **reserves** using:
  - The **Chain-Ladder (Development) Method**
  - The **Expected Claims Method** (a priori expected losses)
  - The **Bornhuetter-Ferguson (BF) Method**
  - The **Cape Cod (Stanard-Bühlmann) Method**
  - The **Frequency-Severity Method**
- Incorporate a **tail factor** to account for development beyond the observed triangle.
- Select age-to-age factors using simple, volume-weighted, and excluded-point averages.
- Compare methods and recognize when each is most appropriate (mature vs. immature years, stable vs. volatile experience).

## Key Concepts

### Why reserve at all?

When an insurer sells a short-term policy, claims do not all get paid immediately. A claim may be:
1. **Reported and paid** — already out the door.
2. **Reported but not yet (fully) paid** — the insurer sets up a **case reserve**, a claim-by-claim estimate by an adjuster.
3. **Incurred but not reported (IBNR)** — the loss event has occurred but the insurer doesn't even know about it yet (e.g., a car accident on Dec 31 reported in February).

The insurer must hold money today to cover all future payments on claims tied to past coverage. The **total unpaid claim estimate** (the reserve) is:

$$\text{Reserve} = \text{Ultimate Losses} - \text{Paid to Date}$$

and conceptually:

$$\text{Total Unpaid} = \text{Case Reserves} + \text{IBNR}$$

Here **IBNR** in the broad actuarial sense includes both "pure IBNR" (truly unreported claims) and **IBNER** (Incurred But Not Enough Reported — development on known claims). For FAM, treat IBNR as everything beyond case reserves unless told otherwise.

### The development triangle

Losses are grouped by **accident year (AY)** — the year the loss event occurred (rows) — and tracked as they develop over **development years (DY)** — how many years after the accident year we are observing (columns). Because recent accident years have had fewer years to develop, the data forms a **triangle**:

| AY \ DY | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| 2022 | ✓ | ✓ | ✓ | ✓ |
| 2023 | ✓ | ✓ | ✓ |   |
| 2024 | ✓ | ✓ |   |   |
| 2025 | ✓ |   |   |   |

The **diagonal** (lower-right edge) is the most recent valuation date — what we know today. The chain-ladder method fills in the missing lower-right corner.

Triangles can be **cumulative** (running totals, used for chain-ladder) or **incremental** (period-by-period payments). Always check which one the problem gives you.

### The Chain-Ladder (Development) Method — intuition

Assume each accident year develops in the **same proportional pattern**. If, historically, cumulative losses grow by a factor of 1.5 from age 0 to age 1, we apply 1.5 to the latest year too. Multiply the current diagonal value by all the future age-to-age factors to reach **ultimate**.

- **Strength:** Purely data-driven; great for **mature** years with stable patterns.
- **Weakness:** Extremely sensitive to the latest diagonal for **immature** years — a small reported amount times a large CDF produces a wildly leveraged (and unstable) ultimate.

### The Expected Claims Method — intuition

Ignore the actual reported losses entirely. Set ultimate equal to an **a priori expectation**, usually premium × expected loss ratio (ELR), or exposure × pure premium. 

- **Strength:** Stable; immune to noisy early development.
- **Weakness:** Ignores actual emerging experience — if the year is genuinely bad, you won't see it.

### The Bornhuetter-Ferguson Method — the compromise

BF **blends** chain-ladder and expected claims. The key insight: trust the chain-ladder only for the portion of losses **already developed**, and use the a priori expectation for the **unreported** portion.

$$\text{Ultimate}_{BF} = \text{Reported to date} + \text{Expected} \times (\text{\% unreported})$$

The "% unreported" is $1 - 1/\text{CDF}$. As a year matures (CDF → 1), BF converges to the chain-ladder; for green years (large CDF), BF leans on the expected claims. This is why BF is the workhorse for recent accident years.

### The Cape Cod (Stanard-Bühlmann) Method

Cape Cod is BF but with the **expected loss ratio estimated from the triangle itself** rather than assumed externally. It computes a single ELR for all years:

$$\text{ELR} = \frac{\sum \text{Reported Losses}}{\sum (\text{Premium} \times \%\text{ reported})}$$

The denominator is the **"used-up premium"** — premium weighted by how developed each year is. Then it applies the BF formula using this fitted ELR. Cape Cod is more **responsive** than pure BF (it lets the data set the loss ratio) but more **stable** than chain-ladder (it pools across years).

### The Frequency-Severity Method

Estimate **ultimate claim counts** (frequency) and **ultimate average severity** separately, then multiply:

$$\text{Ultimate Losses} = \text{Ultimate Counts} \times \text{Ultimate Severity}$$

Each component can be developed with its own triangle. Useful when counts develop more stably than dollars, or for trending severity with inflation.

### Tail factors

The triangle only shows development up to the oldest available age. If losses keep developing **beyond** that (e.g., long-tail liability), you multiply the last cumulative development factor by a **tail factor** > 1.0 to capture development past the observed window.

## Formulas

### Age-to-age (link ratio) factors

For cumulative losses $C_{i,j}$ (accident year $i$, development age $j$), the age-to-age factor from age $j$ to age $j+1$:

$$f_j = \frac{\sum_i C_{i,j+1}}{\sum_i C_{i,j}} \quad \text{(volume-weighted / all-year weighted average)}$$

The **simple average** alternative:

$$f_j = \frac{1}{n}\sum_i \frac{C_{i,j+1}}{C_{i,j}}$$

- $C_{i,j}$ = cumulative reported (paid or incurred) loss for accident year $i$ at development age $j$.
- $f_j$ = selected factor to develop from age $j$ to age $j+1$. The volume-weighted version is the most common chain-ladder default; sum only over accident years $i$ that have **both** $C_{i,j}$ and $C_{i,j+1}$ available.

### Cumulative Development Factor (CDF) / Age-to-Ultimate

$$\text{CDF}_j = f_j \times f_{j+1} \times \cdots \times f_{n-1} \times f_{\text{tail}}$$

- $\text{CDF}_j$ = factor to bring losses at age $j$ all the way to ultimate. Also called **age-to-ultimate factor**.
- $f_{\text{tail}}$ = tail factor (use 1.0 if no tail development).

### Percent reported (developed)

$$\%\text{ reported at age } j = \frac{1}{\text{CDF}_j}$$

$$\%\text{ unreported at age } j = 1 - \frac{1}{\text{CDF}_j}$$

### Chain-Ladder (Development) Method

$$\hat{U}_i^{CL} = C_{i, \text{latest}} \times \text{CDF}_{\text{latest age of } i}$$

- $\hat{U}_i^{CL}$ = estimated ultimate loss for accident year $i$.
- $C_{i,\text{latest}}$ = the current diagonal value for AY $i$.

$$\text{Reserve}_i = \hat{U}_i - C_{i,\text{paid to date}}$$

### Expected Claims Method

$$\hat{U}_i^{EC} = \text{Premium}_i \times \text{ELR}_i \quad\text{(or)}\quad \text{Exposure}_i \times \text{Pure Premium}$$

- $\text{ELR}_i$ = a priori expected loss ratio for AY $i$.

### Bornhuetter-Ferguson Method

$$\hat{U}_i^{BF} = C_{i,\text{latest}} + \hat{U}_i^{EC}\left(1 - \frac{1}{\text{CDF}_i}\right)$$

Equivalently, the **BF reserve** (the IBNR / unpaid piece) is:

$$\text{IBNR}_i^{BF} = \hat{U}_i^{EC}\left(1 - \frac{1}{\text{CDF}_i}\right)$$

- $\hat{U}_i^{EC} = \text{Premium}_i \times \text{ELR}_i$ is the a priori expected ultimate.
- The first term ($C_{i,\text{latest}}$) is actual reported losses; the second term is **expected** development on the not-yet-reported portion.

### Cape Cod (Stanard-Bühlmann) Method

Fitted expected loss ratio:

$$\widehat{\text{ELR}} = \frac{\sum_i C_{i,\text{latest}}}{\sum_i \text{Premium}_i \times \dfrac{1}{\text{CDF}_i}}$$

Then apply BF with this single ELR:

$$\hat{U}_i^{CC} = C_{i,\text{latest}} + \text{Premium}_i \times \widehat{\text{ELR}} \times \left(1 - \frac{1}{\text{CDF}_i}\right)$$

- The denominator term $\text{Premium}_i / \text{CDF}_i$ is the **used-up (earned-developed) premium** for AY $i$.

### Frequency-Severity Method

$$\hat{U}_i = \hat{N}_i \times \hat{S}_i$$

- $\hat{N}_i$ = ultimate claim count for AY $i$ (developed from a count triangle).
- $\hat{S}_i$ = ultimate average severity (developed from a severity triangle, possibly trended for inflation).

### Total reserve

$$\text{Total Unpaid} = \sum_i \left(\hat{U}_i - C_{i,\text{paid to date}}\right)$$

## Worked Examples

### Example 1 — Chain-Ladder Ultimate and Reserve

Given the following **cumulative paid loss** triangle ($000s):

| AY \ DY | 0 | 1 | 2 |
|---|---|---|---|
| 2023 | 1,000 | 1,500 | 1,650 |
| 2024 | 1,200 | 1,800 |  |
| 2025 | 1,100 |  |  |

Find the estimated reserve for all accident years combined using the chain-ladder method (no tail).

**Step 1 — Volume-weighted age-to-age factors.**

Age 0→1: years 2023 and 2024 have both columns.
$$f_0 = \frac{1{,}500 + 1{,}800}{1{,}000 + 1{,}200} = \frac{3{,}300}{2{,}200} = 1.500$$

Age 1→2: only 2023 has both columns.
$$f_1 = \frac{1{,}650}{1{,}500} = 1.100$$

**Step 2 — Cumulative development factors.**
- CDF at age 1 = $f_1 = 1.100$
- CDF at age 0 = $f_0 \times f_1 = 1.500 \times 1.100 = 1.650$

**Step 3 — Develop each diagonal to ultimate.**
- 2023 (at age 2, fully mature): $U = 1{,}650 \times 1.000 = 1{,}650$
- 2024 (at age 1): $U = 1{,}800 \times 1.100 = 1{,}980$
- 2025 (at age 0): $U = 1{,}100 \times 1.650 = 1{,}815$

**Step 4 — Reserve = Ultimate − Paid to date.**
- 2023: $1{,}650 - 1{,}650 = 0$
- 2024: $1{,}980 - 1{,}800 = 180$
- 2025: $1{,}815 - 1{,}100 = 715$

Total reserve $= 0 + 180 + 715 = 895$.

**Answer:** Total estimated reserve = **$895,000**.

### Example 2 — Bornhuetter-Ferguson

Using the **same triangle and CDFs** as Example 1 (CDF at age 0 = 1.650, age 1 = 1.100), suppose earned premium and an a priori expected loss ratio are:

| AY | Premium | ELR | Paid to date |
|---|---|---|---|
| 2024 | 2,500 | 0.75 | 1,800 |
| 2025 | 2,400 | 0.75 | 1,100 |

Find the BF ultimate and reserve for 2024 and 2025.

**Step 1 — Expected (a priori) ultimate.**
- 2024: $2{,}500 \times 0.75 = 1{,}875$
- 2025: $2{,}400 \times 0.75 = 1{,}800$

**Step 2 — Percent unreported = $1 - 1/\text{CDF}$.**
- 2024 (age 1, CDF 1.100): $1 - 1/1.100 = 1 - 0.9091 = 0.0909$
- 2025 (age 0, CDF 1.650): $1 - 1/1.650 = 1 - 0.6061 = 0.3939$

**Step 3 — BF ultimate = Paid + Expected × %unreported.**
- 2024: $1{,}800 + 1{,}875 \times 0.0909 = 1{,}800 + 170.5 = 1{,}970.5$
- 2025: $1{,}100 + 1{,}800 \times 0.3939 = 1{,}100 + 709.1 = 1{,}809.1$

**Step 4 — BF reserve = Ultimate − Paid (= the expected-unreported piece).**
- 2024: $1{,}970.5 - 1{,}800 = 170.5$
- 2025: $1{,}809.1 - 1{,}100 = 709.1$

Total BF reserve $= 170.5 + 709.1 = 879.6$.

**Answer:** BF ultimates ≈ **$1,970.5K (2024)** and **$1,809.1K (2025)**; total reserve ≈ **$879.6K**. (Note this is close to, but distinct from, the chain-ladder $895K — BF dampens the leverage on the green 2025 year.)

### Example 3 — Cape Cod (Stanard-Bühlmann)

Using the same data (Premiums 2,500 and 2,400; paid 1,800 and 1,800... use reported diagonals 1,800 and 1,100; CDFs 1.100 and 1.650), estimate the Cape Cod ELR and the 2025 ultimate. (For brevity include only AY 2024 and 2025.)

**Step 1 — Used-up premium = Premium / CDF.**
- 2024: $2{,}500 / 1.100 = 2{,}272.7$
- 2025: $2{,}400 / 1.650 = 1{,}454.5$
- Total used-up premium $= 2{,}272.7 + 1{,}454.5 = 3{,}727.2$

**Step 2 — Sum of reported losses (the diagonals).**
$$1{,}800 + 1{,}100 = 2{,}900$$

**Step 3 — Fitted ELR.**
$$\widehat{\text{ELR}} = \frac{2{,}900}{3{,}727.2} = 0.7780$$

**Step 4 — Cape Cod ultimate for 2025.**
$$\hat{U}_{2025} = 1{,}100 + 2{,}400 \times 0.7780 \times \left(1 - \frac{1}{1.650}\right)$$
$$= 1{,}100 + 2{,}400 \times 0.7780 \times 0.3939 = 1{,}100 + 735.4 = 1{,}835.4$$

**Step 5 — Cape Cod reserve for 2025.**
$$1{,}835.4 - 1{,}100 = 735.4$$

**Answer:** Cape Cod ELR ≈ **0.778**; 2025 ultimate ≈ **$1,835.4K**, reserve ≈ **$735.4K**. (The fitted ELR exceeds the a priori 0.75, so Cape Cod produces a slightly larger 2025 reserve than BF.)

## Common Exam Traps

- **Cumulative vs. incremental confusion.** Chain-ladder factors require **cumulative** triangles. If the problem gives incremental payments, you must accumulate the rows first. Mixing them up is the #1 error.
- **Wrong factors in the volume-weighted average.** When computing $f_j$, only include accident years that have **both** age $j$ and age $j+1$ entries. Including a year that's missing the next column understates the denominator.
- **Forgetting the tail factor.** If a tail factor is given, it multiplies into **every** CDF, including the oldest year you thought was "fully developed." A mature year with a tail factor still has a reserve.
- **BF uses reported (the diagonal), not chain-ladder ultimate, for the first term.** $\hat U_{BF} = C_{\text{reported}} + \text{Expected}\times(1-1/\text{CDF})$. Don't accidentally add the expected piece to the chain-ladder ultimate.
- **Mixing up $1/\text{CDF}$ (percent reported) and $1-1/\text{CDF}$ (percent unreported).** BF and Cape Cod multiply the **expected** losses by the **unreported** percentage. The used-up premium in Cape Cod uses the **reported** percentage ($1/\text{CDF}$).
- **Reserve vs. ultimate.** The question may ask for the **reserve** (= ultimate − paid to date), not the ultimate itself. Subtract the current diagonal.
- **Cape Cod uses a single pooled ELR**, not a per-year ELR. Compute the ratio of total reported to total used-up premium across all years, then apply it.
- **Paid vs. incurred triangles.** A paid triangle's reserve is total unpaid; an incurred (= paid + case reserve) triangle's "reserve" relative to incurred is essentially IBNR. Read which base the question uses.

## Self-Check Questions

1. Write the formula for the Bornhuetter-Ferguson ultimate and state what each of the two terms represents.
2. A cumulative paid triangle shows AY 2024 at $4,000 at age 1, and the age-1-to-ultimate CDF is 1.25. What is the chain-ladder ultimate and reserve?
3. How does the Cape Cod method differ from a standard Bornhuetter-Ferguson application?
4. As an accident year matures (CDF → 1.0), does the BF estimate converge toward the chain-ladder estimate or the expected-claims estimate? Why?
5. Define IBNR and explain how it relates to case reserves and total unpaid claims.

### Answers

1. $\hat U_{BF} = C_{\text{reported}} + \text{Expected}\times(1 - 1/\text{CDF})$. The first term is **actual losses reported to date** (the diagonal); the second is the **expected losses on the still-unreported portion** (a priori expected ultimate times percent unreported).
2. Ultimate $= 4{,}000 \times 1.25 = 5{,}000$. Reserve $= 5{,}000 - 4{,}000 = 1{,}000$.
3. Cape Cod **estimates the expected loss ratio from the triangle itself** (total reported losses ÷ total used-up premium) instead of using an externally assumed a priori ELR. It then plugs that fitted ELR into the BF formula, making it more responsive to actual data than pure BF but more stable than chain-ladder.
4. It converges toward the **chain-ladder** estimate. As CDF → 1, the unreported percentage $(1 - 1/\text{CDF}) \to 0$, so the expected piece vanishes and the ultimate approaches the reported losses developed to ultimate — which is exactly the chain-ladder result for a mature year.
5. **IBNR** (Incurred But Not Reported) is the estimated cost of claims that have been incurred but not yet captured by case reserves — including truly unreported claims and future development on known claims (IBNER). **Total unpaid claims = case reserves + IBNR.** Case reserves are adjuster estimates on known claims; IBNR is the actuarial provision for everything beyond them.
