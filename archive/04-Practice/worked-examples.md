# FAM Worked Examples — Mixed Set

A set of 12 exam-style multiple-choice problems spanning both halves of the SOA **Fundamentals of Actuarial Mathematics (FAM)** exam.

- **Problems 1–6:** Short-Term Actuarial Mathematics (severity, aggregate, coverage modifications, credibility, ratemaking, reserving).
- **Problems 7–12:** Long-Term Actuarial Mathematics (survival, life insurance, annuities, premiums, reserves, multiple decrements).

Each problem has five answer choices (A–E). Attempt all 12 problems first, then check the **Solutions** section at the bottom. Every solution shows the full step-by-step work and the correct letter.

Standard actuarial notation is used throughout.

---

## Problems

### Problem 1 — Severity: Per-Loss Expected Cost with Deductible and Limit

Ground-up losses $X$ follow an exponential distribution with mean $\theta = 1000$.
A policy applies an ordinary deductible of $d = 250$ and the maximum payment per loss is $u = 2000$ (so the maximum covered loss is $m = d + u = 2250$).

Calculate the expected payment **per loss** (averaging over all losses, including those below the deductible that pay $0$).

- (A) 597
- (B) 624
- (C) 651
- (D) 673
- (E) 702

---

### Problem 2 — Aggregate: Compound Poisson Standard Deviation

The number of claims $N$ is Poisson with mean $\lambda = 3$.
Individual claim sizes $X$ are i.i.d., independent of $N$, with $E[X] = 500$ and $E[X^2] = 750{,}000$.

Let $S = X_1 + \cdots + X_N$ be the aggregate loss.

Calculate the standard deviation of $S$.

- (A) 1225
- (B) 1369
- (C) 1500
- (D) 1620
- (E) 1732

---

### Problem 3 — Coverage Modification: Inflation with a Deductible

In year 1, ground-up loss severity $X$ is uniform on $[0, 5000]$, and a policy has an ordinary deductible of $500$.

In year 2, every loss is subject to **8% uniform inflation** (multiplied by $1.08$), but the deductible remains $500$.

Calculate the percentage increase, from year 1 to year 2, in the **expected payment per loss**.

- (A) 8.0%
- (B) 8.9%
- (C) 9.8%
- (D) 10.5%
- (E) 11.2%

---

### Problem 4 — Credibility: Limited Fluctuation (Classical)

For full credibility of **aggregate losses** you are given:

- The standard requires observed aggregate losses to be within $5\%$ of expected with probability $0.90$.
- Claim frequency is Poisson.
- Claim severity has mean $200$ and standard deviation $400$.
- Use the normal approximation with $z_{0.95} = 1.645$.

Calculate the number of **expected claims** required for full credibility.

- (A) 1082
- (B) 2706
- (C) 4330
- (D) 5413
- (E) 6764

---

### Problem 5 — Ratemaking: Loss Ratio Method

An insurer reviews a line of business:

- Developed, trended ultimate losses and LAE: $2{,}950{,}000$.
- Experience-period earned premium at current rates: $4{,}000{,}000$.
- Variable expense ratio: $20\%$ of premium.
- Fixed expense ratio: $6\%$ of premium.
- Target profit and contingencies provision: $4\%$ of premium.

Using the loss ratio method with permissible loss ratio $= 1 - (\text{variable} + \text{fixed} + \text{profit})$, calculate the indicated rate change.

- (A) +1.3%
- (B) +3.9%
- (C) +5.4%
- (D) +7.1%
- (E) +9.2%

---

### Problem 6 — Reserving: Chain-Ladder (Loss Development)

Cumulative paid losses (in thousands):

| Accident Year | Dev 12 | Dev 24 | Dev 36 |
|---|---|---|---|
| 2023 | 1000 | 1500 | 1650 |
| 2024 | 1200 | 1800 | — |
| 2025 | 1400 | — | — |

Development is complete at 36 months. Use **volume-weighted (all-year) average** age-to-age factors.

Calculate the total estimated unpaid (reserve) for accident years 2024 and 2025 combined, in thousands.

- (A) 910
- (B) 1010
- (C) 1090
- (D) 1180
- (E) 1290

---

### Problem 7 — Survival Models: Constant Force, Deferred Mortality

Mortality follows a constant force $\mu = 0.02$ at all ages.

Calculate $\,_{10|}q_{40}$, the probability that $(40)$ survives 10 years and then dies within the following year.

- (A) 0.0156
- (B) 0.0162
- (C) 0.0175
- (D) 0.0184
- (E) 0.0198

---

### Problem 8 — Life Insurance: Whole Life APV (Recursion)

For a fully discrete whole life insurance of $1000$ on $(x)$:

- $i = 0.05$
- $q_x = 0.010$
- $A_{x+1} = 0.350$

Calculate $1000\,A_x$.

- (A) 332
- (B) 336
- (C) 340
- (D) 344
- (E) 348

---

### Problem 9 — Annuities: Temporary Life Annuity-Due

For a life aged 65:

- $i = 0.04$
- $\ddot{a}_{65} = 13.550$
- $\ddot{a}_{75} = 9.900$
- $\,_{10}p_{65} = 0.750$

Calculate $\ddot{a}_{65:\overline{10}|}$, the APV of a 10-year temporary life annuity-due of $1$ per year on $(65)$.

- (A) 8.10
- (B) 8.34
- (C) 8.53
- (D) 8.92
- (E) 9.18

---

### Problem 10 — Premiums: Fully Discrete Net Premium

For a fully discrete whole life insurance of $100{,}000$ on $(x)$:

- $i = 0.05$
- $A_x = 0.30$

Calculate the annual net (benefit) premium.

- (A) 1837
- (B) 1955
- (C) 2041
- (D) 2143
- (E) 2250

---

### Problem 11 — Reserves: Fully Discrete Net Premium Reserve

For a fully discrete whole life insurance of $1000$ on $(x)$:

- $A_x = 0.25$
- $A_{x+10} = 0.35$

Calculate the net premium reserve at time 10, $\,_{10}V$.

- (A) 120
- (B) 127
- (C) 133
- (D) 140
- (E) 148

---

### Problem 12 — Multiple Decrements: Associated Single-Decrement Probability

In a double-decrement model (decrement 1 = withdrawal, decrement 2 = death), forces of decrement are constant over the year of age $x$:

- $\mu_x^{(1)} = 0.05$
- $\mu_x^{(2)} = 0.03$

Calculate $q_x^{\prime(2)}$, the independent (associated single-decrement) probability of death over the year.

- (A) 0.0273
- (B) 0.0288
- (C) 0.0296
- (D) 0.0305
- (E) 0.0769

---

## Solutions

---

### Solution 1 — Answer: (D) 673

For an exponential with mean $\theta$, the limited expected value is
$$E[X \wedge a] = \theta\left(1 - e^{-a/\theta}\right).$$

The expected payment **per loss** with deductible $d$ and maximum covered loss $m = d+u$ is
$$E[X \wedge m] - E[X \wedge d].$$

With $\theta = 1000$, $d = 250$, $m = 2250$:
$$E[X \wedge 2250] = 1000\left(1 - e^{-2.25}\right) = 1000(1 - 0.105399) = 894.601,$$
$$E[X \wedge 250] = 1000\left(1 - e^{-0.25}\right) = 1000(1 - 0.778801) = 221.199.$$

$$E[\text{payment per loss}] = 894.601 - 221.199 = 673.40.$$

Memoryless cross-check: $e^{-d/\theta}\,\theta\left(1 - e^{-u/\theta}\right) = 0.778801 \times 1000 \times (1 - e^{-2}) = 0.778801 \times 864.665 = 673.40.\ \checkmark$

**Answer: (D) 673.**

---

### Solution 2 — Answer: (C) 1500

For a compound **Poisson** aggregate, $\operatorname{Var}(S) = \lambda\, E[X^2]$.

$$\operatorname{Var}(S) = 3 \times 750{,}000 = 2{,}250{,}000.$$
$$\operatorname{SD}(S) = \sqrt{2{,}250{,}000} = 1500.$$

(General check: $\operatorname{Var}(S) = E[N]\operatorname{Var}(X) + \operatorname{Var}(N)E[X]^2$. Here $\operatorname{Var}(X) = 750{,}000 - 500^2 = 500{,}000$, and $\operatorname{Var}(N) = 3$, so $3(500{,}000) + 3(250{,}000) = 1{,}500{,}000 + 750{,}000 = 2{,}250{,}000.\ \checkmark$)

**Answer: (C) 1500.**

---

### Solution 3 — Answer: (C) 9.8%

For $X \sim U(0,b)$ with deductible $d \le b$, the expected payment per loss is
$$E[(X-d)_+] = \frac{(b-d)^2}{2b}.$$

**Year 1:** $b = 5000$, $d = 500$:
$$\frac{(5000-500)^2}{2(5000)} = \frac{4500^2}{10000} = \frac{20{,}250{,}000}{10000} = 2025.$$

**Year 2:** losses inflate to $U(0, 5400)$, deductible still $500$:
$$\frac{(5400-500)^2}{2(5400)} = \frac{4900^2}{10800} = \frac{24{,}010{,}000}{10800} = 2223.15.$$

**Percentage increase:**
$$\frac{2223.15 - 2025}{2025} = \frac{198.15}{2025} = 0.0978 = 9.8\%.$$

**Answer: (C) 9.8%.**

---

### Solution 4 — Answer: (D) 5413

The classical full-credibility standard for **aggregate losses**, in expected number of claims, is
$$n_0 = \left(\frac{z_p}{r}\right)^2\left(1 + \frac{\sigma_X^2}{\mu_X^2}\right).$$

Frequency-only base:
$$\left(\frac{1.645}{0.05}\right)^2 = 32.9^2 = 1082.41.$$

Severity adjustment (coefficient of variation squared):
$$1 + \frac{\sigma_X^2}{\mu_X^2} = 1 + \frac{400^2}{200^2} = 1 + \frac{160{,}000}{40{,}000} = 1 + 4 = 5.$$

$$n_0 = 1082.41 \times 5 = 5412.05 \approx 5413.$$

**Answer: (D) 5413.**

---

### Solution 5 — Answer: (C) +5.4%

**Permissible loss ratio (PLR):**
$$\text{PLR} = 1 - (0.20 + 0.06 + 0.04) = 1 - 0.30 = 0.70.$$

**Experience loss & LAE ratio:**
$$\frac{2{,}950{,}000}{4{,}000{,}000} = 0.7375.$$

**Indicated rate change:**
$$\frac{\text{Loss Ratio}}{\text{PLR}} - 1 = \frac{0.7375}{0.70} - 1 = 1.05357 - 1 = 0.05357 = +5.4\%.$$

**Answer: (C) +5.4%.**

---

### Solution 6 — Answer: (C) 1090

**Volume-weighted age-to-age factors.**

$12 \to 24$ (use all years with both points, 2023 and 2024):
$$f_{12} = \frac{1500 + 1800}{1000 + 1200} = \frac{3300}{2200} = 1.500.$$

$24 \to 36$ (only 2023 has both points):
$$f_{24} = \frac{1650}{1500} = 1.100.$$

**Project to ultimate.**

AY2024 at Dev 24 $= 1800$:
$$\text{Ult}_{2024} = 1800 \times 1.100 = 1980, \qquad \text{Unpaid}_{2024} = 1980 - 1800 = 180.$$

AY2025 at Dev 12 $= 1400$:
$$\text{Ult}_{2025} = 1400 \times 1.500 \times 1.100 = 1400 \times 1.65 = 2310, \qquad \text{Unpaid}_{2025} = 2310 - 1400 = 910.$$

**Total reserve (2024 + 2025):**
$$180 + 910 = 1090 \text{ (thousands)}.$$

**Answer: (C) 1090.**

---

### Solution 7 — Answer: (B) 0.0162

With constant force $\mu = 0.02$, $\,_t p_x = e^{-\mu t}$ for every age.

$$\,_{10}p_{40} = e^{-0.2} = 0.818731,$$
$$q_{50} = 1 - e^{-0.02} = 1 - 0.980199 = 0.019801.$$

$$\,_{10|}q_{40} = \,_{10}p_{40}\cdot q_{50} = 0.818731 \times 0.019801 = 0.016212.$$

**Answer: (B) 0.0162.**

---

### Solution 8 — Answer: (C) 340

Recursion: $A_x = v\big(q_x + p_x\,A_{x+1}\big)$, with $v = 1/1.05 = 0.952381$.

$$A_x = 0.952381\big(0.010 + 0.990 \times 0.350\big) = 0.952381(0.010 + 0.34650) = 0.952381 \times 0.35650 = 0.339524.$$

$$1000\,A_x = 339.5 \approx 340.$$

**Answer: (C) 340.**

---

### Solution 9 — Answer: (C) 8.53

Use the recursion $\ddot{a}_{65} = \ddot{a}_{65:\overline{10}|} + \,_{10}E_{65}\,\ddot{a}_{75}$, where $\,_{10}E_{65} = v^{10}\,_{10}p_{65}$.

$$v^{10} = 1.04^{-10} = 0.675564,$$
$$\,_{10}E_{65} = 0.675564 \times 0.750 = 0.506673.$$

$$\ddot{a}_{65:\overline{10}|} = 13.550 - 0.506673 \times 9.900 = 13.550 - 5.01606 = 8.534.$$

**Answer: (C) 8.53.**

---

### Solution 10 — Answer: (C) 2041

Fully discrete whole life net premium:
$$P = B\,\frac{A_x}{\ddot{a}_x}, \qquad \ddot{a}_x = \frac{1 - A_x}{d}, \qquad d = \frac{i}{1+i} = \frac{0.05}{1.05} = 0.047619.$$

$$\ddot{a}_x = \frac{1 - 0.30}{0.047619} = \frac{0.70}{0.047619} = 14.700.$$

$$P = 100{,}000 \times \frac{0.30}{14.700} = 100{,}000 \times 0.020408 = 2040.8 \approx 2041.$$

Cross-check: $P = B\,\dfrac{d\,A_x}{1 - A_x} = 100{,}000\cdot\dfrac{0.047619 \times 0.30}{0.70} = 2040.8.\ \checkmark$

**Answer: (C) 2041.**

---

### Solution 11 — Answer: (C) 133

Whole life net premium reserve via the insurance form:
$$\,_{t}V = B\,\frac{A_{x+t} - A_x}{1 - A_x}.$$

$$\,_{10}V = 1000\cdot\frac{0.35 - 0.25}{1 - 0.25} = 1000\cdot\frac{0.10}{0.75} = 133.33.$$

(Equivalently $\,_{10}V = B\left(1 - \dfrac{\ddot{a}_{x+10}}{\ddot{a}_x}\right)$; the answer depends only on the given $A$ values, not on $i$.)

**Answer: (C) 133.**

---

### Solution 12 — Answer: (C) 0.0296

With constant forces over the year, the independent (associated single-decrement) probability is
$$q_x^{\prime(j)} = 1 - e^{-\mu_x^{(j)}}.$$

For death:
$$q_x^{\prime(2)} = 1 - e^{-0.03} = 1 - 0.970446 = 0.029554 \approx 0.0296.$$

Cross-check on the dependent rate: $p_x^{(\tau)} = e^{-0.08} = 0.923116$; $q_x^{(2)} = \dfrac{\mu^{(2)}}{\mu^{(\tau)}}\big(1 - p_x^{(\tau)}\big) = \dfrac{0.03}{0.08}(0.076884) = 0.028832$, slightly below the independent value $0.0296$, as expected (option B is this distractor).

**Answer: (C) 0.0296.**

---

## Answer Key (Quick Reference)

| Problem | Topic | Answer |
|---|---|---|
| 1 | Severity (deductible + limit) | D |
| 2 | Compound Poisson SD | C |
| 3 | Inflation with deductible | C |
| 4 | Limited-fluctuation credibility | D |
| 5 | Loss ratio ratemaking | C |
| 6 | Chain-ladder reserving | C |
| 7 | Constant-force survival | B |
| 8 | Whole life APV recursion | C |
| 9 | Temporary annuity-due | C |
| 10 | Net premium | C |
| 11 | Net premium reserve | C |
| 12 | Associated single decrement | C |
