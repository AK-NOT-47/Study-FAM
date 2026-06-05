# Life Tables and Fractional Ages

*SOA Exam FAM — Long-Term. Notation follows Dickson, Hardy & Waters, "Actuarial Mathematics for Life Contingent Risks" (AMLCR), and the SOA Standard Ultimate Life Table (SULT).*

---

## Learning Objectives

After studying this note you should be able to:

- Define and interpret the life table functions $l_x$, $d_x$, and the radix $l_0$ (or $l_{x_0}$).
- Compute survival and death probabilities — ${}_tp_x$, ${}_tq_x$, ${}_{t|u}q_x$ — directly from a life table.
- Use the **Standard Ultimate Life Table (SULT)** efficiently, recognizing which quantities ($l_x$, $q_x$, $\overset{\circ}{e}_x$, $A_x$, $\ddot a_x$, etc.) are tabulated and how to read them.
- Apply the two standard **fractional age assumptions** to interpolate between integer ages:
  - **Uniform Distribution of Deaths (UDD)**, and
  - **Constant Force of Mortality (CFM)**.
- Derive and apply formulas for ${}_sq_x$, ${}_sp_x$, $\mu_{x+s}$, $f_x(s)$, and the curtate/complete life expectancies under each assumption, for $0 \le s < 1$.
- Understand **select and ultimate** mortality, read a **select life table**, use the $[x]+t$ notation, and identify when selection has worn off (the **select period**).

---

## Key Concepts

### 1. The Life Table — Intuition First

A **life table** is just a bookkeeping device. Imagine a large cohort of $l_{x_0}$ newborns (or lives starting at some initial age $x_0$). The number $l_{x_0}$ is called the **radix** — an arbitrary scaling constant (commonly 100,000). As the cohort ages, people die. The table records:

- $l_x$ = the **expected number of survivors** to exact age $x$.
- $d_x$ = the **expected number of deaths** between exact ages $x$ and $x+1$.

Because everyone who is alive at age $x$ either survives to $x+1$ or dies in that year:
$$d_x = l_x - l_{x+1}.$$

The whole power of the life table is this: **all survival probabilities are ratios of $l$ values.** If you want the probability a life aged $x$ survives $t$ years, just count how many of the $l_x$ survivors are still alive at $x+t$:
$$ {}_tp_x = \frac{l_{x+t}}{l_x}.$$

This is a frequentist reading of probability — proportion of the cohort that survives. It connects to the continuous survival model via $l_{x} = l_{x_0}\,\cdot\,{}_{x-x_0}p_{x_0}$, i.e. $l_x \propto S_0(x)$, the survival function.

### 2. Probabilities From the Table

The three core symbols (with FAM/AMLCR meaning):

- ${}_tp_x$ — probability $(x)$ survives at least $t$ years.
- ${}_tq_x$ — probability $(x)$ dies within $t$ years. ${}_tq_x = 1 - {}_tp_x$.
- ${}_{t|u}q_x$ — **deferred** mortality: probability $(x)$ survives $t$ years and then dies in the next $u$ years.

When $t=1$ the left subscript is dropped: $p_x = {}_1p_x$, $q_x = {}_1q_x$.

### 3. The Standard Ultimate Life Table (SULT)

The SULT is a **specific, exam-supplied table** built from Makeham's law with $A = 0.00022$, $B = 2.7\times10^{-6}$, $c = 1.124$, with a radix of $l_{20} = 100{,}000$ and starting age 20. On the exam you are *given* the SULT; you do not derive it. It tabulates, at integer ages (typically 20–100):

- $l_x$ and $q_x$ (sometimes $1000\,q_x$),
- the complete and curtate expectations $\overset{\circ}{e}_x$, $e_x$,
- annuity and insurance EPVs: $A_x$, ${}^2A_x$, $\ddot a_x$, and various term/endowment values at the standard interest rate $i = 0.05$.

**Why it matters:** the SULT lets you answer many problems by *table lookup* rather than computation. Master reading $l_x$ for ${}_tp_x = l_{x+t}/l_x$, and reading $\ddot a_x$, $A_x$ directly for insurance/annuity problems. Always confirm the interest rate (SULT uses 5%).

### 4. Fractional Ages — The Problem

Life tables only give values at **integer** ages. But policies pay, and people die, at non-integer times. We need a rule to "fill in" the gap between age $x$ and age $x+1$. The two standard rules are **UDD** and **constant force**. In all that follows, take $0 \le s < 1$ and $0 \le s+t \le 1$, and let $q_x$ be the known integer-age value.

#### (a) Uniform Distribution of Deaths (UDD)

**Intuition:** spread the year's deaths evenly across the year. The deaths in $[x, x+1)$ are uniform, so the number dying in the first $s$ of the year is proportional to $s$:
$$ {}_sq_x = s\, q_x. $$
This is *linear interpolation of $l_x$*: $l_{x+s} = l_x - s\,d_x = (1-s)\,l_x + s\,l_{x+1}$.

Consequences:
- ${}_sp_x = 1 - s\,q_x$ (linear, decreasing).
- The **force of mortality increases** through the year (denominator shrinks): $\mu_{x+s} = \dfrac{q_x}{1 - s\,q_x}$.
- The future-lifetime density within the year is **constant**: $f_x(s) = q_x$ for $0 \le s < 1$.

#### (b) Constant Force of Mortality (CFM)

**Intuition:** assume the hazard rate $\mu$ is a constant $\mu^*$ throughout the year. Then survival is exponential within the year:
$$ {}_sp_x = e^{-\mu^* s} = (p_x)^s, \qquad \mu^* = -\ln p_x. $$
Consequences:
- ${}_sq_x = 1 - (p_x)^s$.
- The force is **flat** within the year (by construction): $\mu_{x+s} = -\ln p_x = \mu^*$.
- Deaths are *not* uniform — slightly more deaths early in the year because the exponential decays.

**Mnemonic:** UDD → "deaths uniform, force rising." CFM → "force flat, survival exponential ($p^s$)."

### 5. Select and Ultimate Mortality

When someone **buys a life insurance policy** they are usually **underwritten** — screened for health. So a newly-selected 60-year-old is healthier (lower mortality) than a randomly chosen 60-year-old who may have bought a policy years ago. This is **selection**.

- $[x]$ denotes a life **selected at age $x$** (just underwritten).
- $[x]+t$ denotes a life selected at age $x$, now $t$ years later (current age $x+t$), still carrying the effect of selection.
- The beneficial effect of selection **wears off** after the **select period** of $n$ years. After that, mortality depends only on attained age — this is the **ultimate** portion.

So $q_{[x]+t}$ (select) is generally **smaller** than $q_{x+t}$ (ultimate) for the same attained age, because the selected life was screened. Once $t \ge n$, $q_{[x]+t} = q_{x+t}$, the ultimate rate.

A **select life table** is read **across the row** for the select period, then **down the ultimate column** once selection wears off. Survival probabilities still come from $l$ ratios, but you must track *both* the selection age and duration:
$$ {}_tp_{[x]+s} = \frac{l_{[x]+s+t}}{l_{[x]+s}}.$$
Once attained age $\ge x+n$, you use the ultimate $l_{x+t}$ values.

---

## Formulas

### Life table relationships

$$ d_x = l_x - l_{x+1}, \qquad {}_tp_x = \frac{l_{x+t}}{l_x}, \qquad {}_tq_x = \frac{l_x - l_{x+t}}{l_x} = 1 - \frac{l_{x+t}}{l_x}. $$

$$ {}_{t|u}q_x = {}_tp_x \cdot {}_uq_{x+t} = \frac{l_{x+t} - l_{x+t+u}}{l_x}, \qquad {}_{t|}q_x \equiv {}_{t|1}q_x = \frac{l_{x+t}-l_{x+t+1}}{l_x} = \frac{d_{x+t}}{l_x}. $$

**Symbols:** $l_x$ = expected survivors to age $x$; $d_x$ = expected deaths in $[x,x+1)$; ${}_tp_x$, ${}_tq_x$ = $t$-year survival / death probabilities for a life now aged $x$; ${}_{t|u}q_x$ = probability of surviving $t$ then dying within the next $u$; $\mu_{x}$ = force of mortality at exact age $x$.

### Force of mortality and density (general)

$$ \mu_{x} = -\frac{1}{l_x}\frac{d\,l_x}{dx} = -\frac{d}{dx}\ln l_x, \qquad {}_tp_x = \exp\!\left(-\int_0^t \mu_{x+r}\,dr\right), \qquad f_x(t) = {}_tp_x\,\mu_{x+t}. $$

Here $f_x(t)$ is the probability density of the future lifetime $T_x$ of $(x)$.

### Fractional ages — let $0 \le s < 1$, $q_x$ the integer-age death prob

| Quantity | **UDD** | **Constant Force (CFM)** |
|---|---|---|
| ${}_sq_x$ | $s\,q_x$ | $1 - (p_x)^s = 1 - e^{-\mu^* s}$ |
| ${}_sp_x$ | $1 - s\,q_x$ | $(p_x)^s = e^{-\mu^* s}$ |
| $\mu_{x+s}$ | $\dfrac{q_x}{1 - s\,q_x}$ | $\mu^* = -\ln p_x$ |
| $f_x(s)$ | $q_x$ | $(p_x)^s\,\mu^* = -(p_x)^s\ln p_x$ |
| ${}_{s}q_{x+(1-s)}$ wear-style (within year), $0\le s+u\le 1$:  ${}_uq_{x+s}$ | $\dfrac{u\,q_x}{1 - s\,q_x}$ | $1 - (p_x)^u$ |

where $\mu^* = -\ln p_x$ is the constant force over the year $[x,x+1)$.

**Symbol notes:** $p_x = 1-q_x$; $s$, $u$ are fractional offsets within a single year of age; under CFM the within-year survival depends only on the *length* $u$ of the interval, not where it starts (memoryless), so ${}_uq_{x+s} = 1-(p_x)^u$.

### Complete expectation of life under each assumption

Define the **curtate expectation** $e_x = \sum_{k=1}^{\infty} {}_kp_x$ (whole years only). The **complete expectation** $\overset{\circ}{e}_x = \int_0^\infty {}_tp_x\,dt$ adds the average fractional year lived in the year of death.

- **UDD** (deaths uniform → on average die mid-year):
$$ \overset{\circ}{e}_x = e_x + \tfrac{1}{2}. $$
This is the famous "add a half" rule, exact under UDD.

- **Constant force**: there is no clean "+½"; integrate within each year:
$$ \overset{\circ}{e}_x = \sum_{k=0}^{\infty} {}_kp_x \int_0^1 (p_{x+k})^s\,ds = \sum_{k=0}^{\infty} {}_kp_x\cdot \frac{p_{x+k}-1}{\ln p_{x+k}} = \sum_{k=0}^{\infty} {}_kp_x\cdot \frac{1-p_{x+k}}{\mu^*_{x+k}}. $$
For the contribution of a *single* year (life certain to start it), the mean fraction lived is $\displaystyle \int_0^1 {}_sp_x\,ds = \frac{1-p_x}{-\ln p_x} = \frac{q_x}{\mu^*}$ under CFM, versus $\tfrac{1}{2}(1+p_x)$ under UDD.

### Select and ultimate

$$ {}_tp_{[x]+s} = \frac{l_{[x]+s+t}}{l_{[x]+s}}, \qquad q_{[x]+t} = q_{x+t}\ \text{ for } t \ge n\ (\text{select period}). $$

**Symbols:** $[x]+t$ = life selected at age $x$, now $t$ years past selection (attained age $x+t$); $n$ = length of select period; $l_{[x]+t}$ = select life table survivor count.

---

## Worked Examples

### Example 1 — Probabilities straight from $l_x$ (with a deferred death)

You are given the following extract:

| $x$ | 60 | 61 | 62 | 63 | 64 |
|---|---|---|---|---|---|
| $l_x$ | 88,950 | 87,400 | 85,700 | 83,820 | 81,740 |

Compute (a) ${}_3p_{60}$, (b) ${}_2q_{61}$, (c) ${}_{2|1}q_{60}$ (survive 2 years, die in the 3rd).

**Solution.**

(a) $\displaystyle {}_3p_{60} = \frac{l_{63}}{l_{60}} = \frac{83{,}820}{88{,}950} = 0.94233.$

(b) $\displaystyle {}_2q_{61} = 1 - \frac{l_{63}}{l_{61}} = 1 - \frac{83{,}820}{87{,}400} = 1 - 0.95904 = 0.04096.$

(c) Deferred: survive to 62, die before 63.
$$ {}_{2|1}q_{60} = \frac{l_{62} - l_{63}}{l_{60}} = \frac{85{,}700 - 83{,}820}{88{,}950} = \frac{1{,}880}{88{,}950} = 0.021136. $$

**Answer:** (a) $\boxed{0.94233}$  (b) $\boxed{0.04096}$  (c) $\boxed{0.02114}$.

---

### Example 2 — UDD vs Constant Force within a year

Given $q_{70} = 0.04$ (so $p_{70} = 0.96$). Under **each** fractional-age assumption, find: (a) ${}_{0.5}q_{70}$, (b) $\mu_{70.5}$, (c) ${}_{0.3}q_{70.5}$ (die between ages 70.5 and 70.8).

**Solution — UDD.**

(a) ${}_{0.5}q_{70} = s\,q_x = 0.5 \times 0.04 = 0.02.$

(b) $\displaystyle \mu_{70.5} = \frac{q_{70}}{1 - 0.5\,q_{70}} = \frac{0.04}{1 - 0.02} = \frac{0.04}{0.98} = 0.040816.$

(c) Use ${}_uq_{x+s} = \dfrac{u\,q_x}{1 - s\,q_x}$ with $s = 0.5,\ u = 0.3$:
$$ {}_{0.3}q_{70.5} = \frac{0.3 \times 0.04}{1 - 0.5\times0.04} = \frac{0.012}{0.98} = 0.012245. $$

**Solution — Constant Force.** $\mu^* = -\ln(0.96) = 0.040822.$

(a) ${}_{0.5}q_{70} = 1 - (0.96)^{0.5} = 1 - 0.979796 = 0.020204.$

(b) $\mu_{70.5} = \mu^* = 0.040822$ (flat).

(c) Memoryless in length $u = 0.3$: ${}_{0.3}q_{70.5} = 1 - (0.96)^{0.3} = 1 - 0.987879 = 0.012121.$

**Answer (UDD):** (a) $\boxed{0.02000}$  (b) $\boxed{0.040816}$  (c) $\boxed{0.012245}$.
**Answer (CFM):** (a) $\boxed{0.020204}$  (b) $\boxed{0.040822}$  (c) $\boxed{0.012121}$.

*Note how close the two methods are when $q$ is small — and how the UDD force exceeds $\mu^*$ at mid-year while CFM stays flat.*

---

### Example 3 — Complete expectation under UDD, and a select-table lookup

**Part A.** A life table gives curtate expectation $e_{65} = 14.20$. Assuming UDD over each year of age, find the complete expectation $\overset{\circ}{e}_{65}$.

Under UDD, $\overset{\circ}{e}_x = e_x + \tfrac12$:
$$ \overset{\circ}{e}_{65} = 14.20 + 0.5 = 14.70. $$

**Answer:** $\boxed{\overset{\circ}{e}_{65} = 14.70}$.

**Part B.** A select table has a **2-year select period**. Extract (radix arbitrary):

| $[x]$ | $l_{[x]}$ | $l_{[x]+1}$ | $l_{x+2}$ | $x+2$ |
|---|---|---|---|---|
| 70 | 92,000 | 90,400 | 88,100 | 72 |
| 71 | 90,100 | 88,300 | 85,900 | 73 |
| 72 | 88,050 | 86,000 | 83,400 | 74 |

Compute ${}_3p_{[70]}$ (a life selected at 70, surviving 3 years to attained age 73).

**Solution.** Start in the $[70]$ row, move across the select period, then drop into the ultimate column. The select period is 2 years, so after duration 2 (attained age 72) we are ultimate. We need $l$ at attained age 73, which is the ultimate $l_{73}$. From the table, $l_{73}$ appears as $l_{x+2}$ in the $[71]$ row: $l_{73} = 85{,}900$.
$$ {}_3p_{[70]} = \frac{l_{73}}{l_{[70]}} = \frac{85{,}900}{92{,}000} = 0.933696. $$

**Answer:** $\boxed{{}_3p_{[70]} = 0.93370}$.

---

## Common Exam Traps

1. **Inverting the $l$ ratio.** ${}_tp_x = l_{x+t}/l_x$ — the **older** age is in the **numerator**. Writing $l_x/l_{x+t}$ gives a number $> 1$. Sanity check: a probability is $\le 1$.

2. **Confusing $d_x$ direction.** $d_x = l_x - l_{x+1}$ (current minus next), never the reverse. The deferred-death formula ${}_{t|}q_x = d_{x+t}/l_x$ uses the deaths at the *attained* age $x+t$, divided by the *original* $l_x$ — not $l_{x+t}$.

3. **UDD force vs CFM force.** Under UDD the force $\mu_{x+s} = q_x/(1-s q_x)$ **increases** with $s$; under CFM it is **constant** $=-\ln p_x$. Candidates routinely swap these. Also: under UDD the *density* is constant ($f_x(s)=q_x$), while under CFM the *force* is constant — opposite functions are flat.

4. **Using $s q_x$ for a sub-interval not starting at the integer.** ${}_uq_{x+s} = \dfrac{u\,q_x}{1-s q_x}$ under UDD (note the denominator), **not** $u\,q_x$. The naive $u q_x$ is wrong because the survivor base has shrunk to $1 - s q_x$.

5. **CFM is memoryless in length, UDD is not.** Under CFM ${}_uq_{x+s}$ depends only on $u$; under UDD it depends on both $s$ and $u$. Don't carry the CFM shortcut into a UDD problem.

6. **"+½" rule is UDD-only.** $\overset{\circ}{e}_x = e_x + \tfrac12$ holds **exactly only under UDD**. Under constant force it is an approximation that is generally slightly off (the within-year mean lived is $q_x/\mu^*$, not exactly ½).

7. **Select tables: read across, then down.** For a life $[x]+t$, advance along the row for the whole select period, then switch to the ultimate column at attained age $x+n$. Don't jump straight to the ultimate column at duration 0. And remember $q_{[x]+t} \le q_{x+t}$ — selection *lowers* mortality.

8. **Wrong interest rate / wrong table.** The SULT is at $i = 0.05$. If a problem states a different interest rate you cannot use the tabulated $A_x$, $\ddot a_x$ — only the $l_x$ and $q_x$ columns are interest-free.

9. **Mixing select age and attained age.** $[60]+2$ and $[62]$ are both attained age 62 but have **different** mortality (the first was selected 2 years ago, the second just now). Track the bracket.

---

## Self-Check Questions

1. Write ${}_tq_x$ in terms of $l$ values, and ${}_{t|u}q_x$ in terms of $l$ values.

2. Under UDD with $q_x = 0.10$, what is $\mu_{x+0.5}$? Under constant force with the same $q_x$, what is $\mu_{x+0.5}$?

3. True/False: Under constant force of mortality, ${}_{0.4}q_{x+0.3}$ equals ${}_{0.4}q_{x}$ ... within the same year of age. Explain.

4. A life table gives $e_{40} = 38.6$. Find $\overset{\circ}{e}_{40}$ under UDD.

5. A select table has a 3-year select period. A life is selected at age 55. Which of $q_{[55]+1}$, $q_{[55]+3}$, $q_{56}$ are necessarily equal, and which differ? Express $q_{[55]+3}$ as an ultimate rate.

### Answers

1. $\displaystyle {}_tq_x = \frac{l_x - l_{x+t}}{l_x} = 1 - \frac{l_{x+t}}{l_x}$;  $\displaystyle {}_{t|u}q_x = \frac{l_{x+t} - l_{x+t+u}}{l_x}$.

2. **UDD:** $\mu_{x+0.5} = \dfrac{0.10}{1 - 0.5(0.10)} = \dfrac{0.10}{0.95} = 0.10526$.  **CFM:** $\mu_{x+0.5} = -\ln(0.90) = 0.10536$ (constant, so same at any $s$).

3. **True.** Under constant force the within-year survival is exponential and therefore memoryless: ${}_uq_{x+s} = 1 - (p_x)^u$ depends only on the interval length $u=0.4$, not the starting offset $s$. So ${}_{0.4}q_{x+0.3} = {}_{0.4}q_{x} = 1-(p_x)^{0.4}$. (This would be **false** under UDD, where the denominator $1 - s q_x$ matters.)

4. $\overset{\circ}{e}_{40} = e_{40} + \tfrac12 = 38.6 + 0.5 = 39.1$.

5. Select period 3 means selection wears off at duration 3 (attained age 58). $q_{[55]+1}$ (attained 56, still select) is generally **lower** than $q_{56}$ (just selected at 56) — they **differ**. $q_{[55]+3}$ is at attained age 58 with duration $= 3 = $ select period, so selection has worn off: $q_{[55]+3} = q_{58}$ (ultimate). So $q_{[55]+1} \ne q_{56}$ in general, and $q_{[55]+3} = q_{58}$.
