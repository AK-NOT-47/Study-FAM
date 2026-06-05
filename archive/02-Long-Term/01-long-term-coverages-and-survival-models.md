# Long-Term Coverages and Survival Models

## Learning Objectives

After studying this note, you should be able to:

- **Describe** the main long-term insurance and retirement products: term insurance, whole life insurance, endowment insurance, universal life, life annuities, and pension plans, and explain how they differ in benefit structure and risk.
- **Define** the future lifetime random variable $T_x$ and the curtate future lifetime $K_x$, and state their relationship.
- **Define** the survival function $S_0(x)$, the cumulative distribution function $F_0(x)$, the probability density function $f_0(x)$, and the force of mortality $\mu_x$, and **derive** the relationships among them.
- **Compute** and **interpret** the standard actuarial survival/death probabilities ${}_tp_x$, ${}_tq_x$, and the deferred mortality probability ${}_{t|u}q_x$.
- **Calculate** the complete expectation of life $\overset{\circ}{e}_x$ and the curtate expectation of life $e_x$, including under recursive relationships.
- **Apply** the common analytic survival laws — constant force (exponential), De Moivre / uniform, Gompertz, and Makeham — to compute survival probabilities, forces of mortality, and life expectancies.

(Notation and framework follow Dickson, Hardy & Waters, *Actuarial Mathematics for Life Contingent Risks*, Chapters 1–3.)

## Key Concepts

### 1. The menu of long-term coverages

Long-term products are contracts whose payoff depends on **when** (or **whether**) a life survives or dies over a multi-year horizon. The candidate needs a qualitative grip on each:

- **Term insurance.** Pays a death benefit only if death occurs **within a fixed term** of $n$ years. No benefit if the insured survives to the end. Pure protection; cheapest; no maturity/savings value.
- **Whole life insurance.** Pays a death benefit **whenever** death occurs — coverage never expires. Premiums may be paid for life or for a limited period.
- **Endowment insurance.** Pays the benefit on death **if death occurs within $n$ years**, OR pays a (usually equal) **pure endowment** if the life **survives** to time $n$. It is the combination: *term insurance* + *pure endowment*. So a benefit is paid either way — this is the most "savings-like" of the traditional contracts.
- **Universal life (UL).** A flexible-premium product with a transparent "account value." The policyholder pays premiums into an account that earns interest (credited rate); the insurer deducts mortality charges (cost of insurance) and expense charges. Death benefit and premiums are adjustable. It bundles protection and a cash-accumulation account.
- **Life annuities.** A series of payments made **while the annuitant survives**. Can be paid annually, monthly, etc.; can be **immediate** (payments start now) or **deferred** (start later, e.g., at retirement); can be **whole life** (until death) or **temporary** (for at most $n$ years). The mirror image of life insurance — the insurer's risk is **longevity** (people living too long) rather than mortality.
- **Pensions.** Employer-sponsored retirement arrangements. **Defined benefit (DB)** plans promise a retirement benefit (often a life annuity) based on salary and service; the sponsor bears investment/longevity risk. **Defined contribution (DC)** plans accumulate contributions in an individual account; the member bears the risk.

**Big-picture intuition:** Insurance benefits are large when death is *early*; annuity benefits are large when death is *late*. Pricing all of them requires a probability model for the timing of death — that is the survival model.

### 2. The future lifetime random variable

Fix a life currently aged exactly $x$ (denoted $(x)$). The central random variable is:

- $T_x$ = **complete future lifetime** = the additional time, in years (continuous, $\ge 0$), that $(x)$ survives. Death occurs at age $x + T_x$.

For a **newborn**, $T_0$ is the age at death. The whole model can be built from $T_0$ and then "conditioned" to age $x$.

The **curtate future lifetime** is the integer part:
$$K_x = \lfloor T_x \rfloor$$
i.e. the number of **complete** future years lived. If you die at $T_x = 7.6$, then $K_x = 7$. $K_x$ is a discrete random variable taking values $0, 1, 2, \dots$ — useful when benefits are paid at year-ends.

### 3. Survival function, density, CDF, and force of mortality

Work from the newborn lifetime $T_0$ with age-at-death distribution:

- **Survival function** $S_0(x) = \Pr[T_0 > x]$: probability a newborn survives past age $x$. It satisfies $S_0(0)=1$, is non-increasing, and $S_0(x)\to 0$ as $x\to\infty$ (or at the limiting age $\omega$).
- **CDF** $F_0(x) = \Pr[T_0 \le x] = 1 - S_0(x)$.
- **Density** $f_0(x) = F_0'(x) = -S_0'(x)$.

The **force of mortality** $\mu_x$ is the instantaneous death rate at age $x$ — the analogue of a hazard rate. Intuitively, for small $dt$,
$$\Pr[\text{life aged } x \text{ dies before } x+dt] \approx \mu_x\, dt.$$
It is the density of death at age $x$ *relative to* the survivors to age $x$. The force of mortality **completely determines** the survival model: knowing $\mu_x$ for all $x$ lets you reconstruct $S_0$.

**Key relationship (memorize):**
$$\mu_x = -\frac{S_0'(x)}{S_0(x)} = -\frac{d}{dx}\ln S_0(x) \quad\Longleftrightarrow\quad S_0(x) = \exp\!\left(-\int_0^x \mu_s\, ds\right).$$

### 4. Conditioning to age x: the actuarial probabilities

Because we usually care about a life already aged $x$, we condition on survival to $x$. Define $S_x(t) = \Pr[T_x > t]$ = probability $(x)$ survives a further $t$ years. Then:

- ${}_tp_x = \Pr[T_x > t] = \dfrac{S_0(x+t)}{S_0(x)}$ — probability $(x)$ **survives** $t$ years.
- ${}_tq_x = \Pr[T_x \le t] = 1 - {}_tp_x$ — probability $(x)$ **dies within** $t$ years.
- ${}_{t|u}q_x = \Pr[t < T_x \le t+u]$ — **deferred** probability: $(x)$ survives $t$ years and then dies in the following $u$ years.

When $t=1$ the left subscript is dropped: $p_x = {}_1p_x$, $q_x = {}_1q_x$.

A crucial structural fact is the **multiplicative (consistency) rule** for survival, which comes straight from the conditional probability definition:
$${}_{t+u}p_x = {}_tp_x \cdot {}_up_{x+t}.$$
Survival over $t+u$ years = survive the first $t$ years, then (given you're now $x+t$) survive the next $u$. This is the single most-used identity in the whole subject.

### 5. Expected future lifetime

- **Complete expectation of life** $\overset{\circ}{e}_x = \mathrm{E}[T_x]$ — average additional years lived, measured continuously.
- **Curtate expectation of life** $e_x = \mathrm{E}[K_x]$ — average **complete** years lived.

Because $T_x$ is non-negative, both can be written as sums/integrals of survival probabilities (the "tail-sum" formula for expectation). Under the **uniform distribution of deaths (UDD)** approximation within each year of age, $\overset{\circ}{e}_x \approx e_x + \tfrac12$.

### 6. Analytic survival laws — the four you must know

These are closed-form choices for $\mu_x$ or $S_0(x)$ that make integrals tractable. Know each one's $\mu_x$, ${}_tp_x$, and life-expectancy shortcut.

- **Constant force / exponential:** $\mu_x = \mu$ for all $x$. "Memoryless" — future lifetime distribution is the same at every age.
- **De Moivre / uniform:** deaths uniform on $[0,\omega]$; force rises to infinity at the limiting age $\omega$.
- **Gompertz:** force grows **exponentially** with age, $\mu_x = B c^x$ — captures the empirical fact that adult mortality roughly doubles every 8 years.
- **Makeham:** Gompertz plus a constant "accident" term, $\mu_x = A + Bc^x$. The $A$ term represents age-independent causes.

## Formulas

### Core distribution relationships

$$F_0(x) = 1 - S_0(x), \qquad f_0(x) = -S_0'(x) = F_0'(x)$$

$$\mu_x = \frac{f_0(x)}{S_0(x)} = -\frac{S_0'(x)}{S_0(x)} = -\frac{d}{dx}\ln S_0(x)$$

$$S_0(x) = \exp\!\left(-\int_0^x \mu_s\, ds\right), \qquad f_0(x) = S_0(x)\,\mu_x$$

- $S_0(x)$: probability a newborn survives to age $x$.
- $F_0(x), f_0(x)$: CDF and pdf of the age at death $T_0$.
- $\mu_x$: force of mortality at exact age $x$ ($\mu_x \ge 0$).

### Survival/death probabilities for a life aged $x$

$$
{}_tp_x = \frac{S_0(x+t)}{S_0(x)} = \exp\!\left(-\int_0^t \mu_{x+s}\, ds\right)
$$

$$
{}_tq_x = 1 - {}_tp_x = \frac{S_0(x) - S_0(x+t)}{S_0(x)}
$$

$$
{}_{t|u}q_x = {}_tp_x - {}_{t+u}p_x = {}_tp_x \cdot {}_uq_{x+t} = {}_{t+u}q_x - {}_tq_x
$$

$$
{}_{t+u}p_x = {}_tp_x \cdot {}_up_{x+t} \qquad\text{(consistency rule)}
$$

$$
{}_tp_x \,\mu_{x+t} = -\frac{d}{dt}\,{}_tp_x = f_{T_x}(t) \qquad\text{(density of } T_x \text{)}
$$

- ${}_tp_x$: $(x)$ survives $t$ more years; ${}_tq_x$: $(x)$ dies within $t$ years.
- ${}_{t|u}q_x$: $(x)$ survives $t$ years then dies within the next $u$ years. ($t|q_x$ means $u=1$.)
- $\mu_{x+t}$: force of mortality at age $x+t$.

### Expectations of future lifetime

$$
\overset{\circ}{e}_x = \mathrm{E}[T_x] = \int_0^\infty {}_tp_x\, dt, \qquad
\mathrm{E}[T_x^2] = 2\int_0^\infty t\,{}_tp_x\, dt
$$

$$
\overset{\circ}{e}_{x:\overline{n}|} = \int_0^n {}_tp_x\, dt \qquad\text{(complete temporary, capped at } n\text{)}
$$

$$
e_x = \mathrm{E}[K_x] = \sum_{k=1}^{\infty} {}_kp_x, \qquad
\mathrm{E}[K_x^2] = \sum_{k=1}^{\infty} (2k-1)\,{}_kp_x
$$

$$
e_x = p_x\,(1 + e_{x+1}) \qquad\text{(recursion)}, \qquad
\overset{\circ}{e}_x \approx e_x + \tfrac{1}{2} \ \ (\text{UDD})
$$

- $\overset{\circ}{e}_x$: complete (continuous) expected future lifetime.
- $e_x$: curtate (integer) expected future lifetime.
- $\mathrm{Var}(T_x) = \mathrm{E}[T_x^2] - (\overset{\circ}{e}_x)^2$, and $\mathrm{Var}(K_x) = \mathrm{E}[K_x^2] - e_x^2$.

### The four analytic laws

**Constant force (exponential), $\mu_x = \mu$:**
$$
S_0(x) = e^{-\mu x}, \quad {}_tp_x = e^{-\mu t}, \quad {}_tq_x = 1 - e^{-\mu t}, \quad \overset{\circ}{e}_x = \frac{1}{\mu}
$$

**De Moivre / uniform on $[0,\omega]$:**
$$
S_0(x) = 1 - \frac{x}{\omega} \ \ (0\le x\le \omega), \quad \mu_x = \frac{1}{\omega - x}, \quad {}_tp_x = 1 - \frac{t}{\omega - x}, \quad {}_tq_x = \frac{t}{\omega - x}
$$
$$
\overset{\circ}{e}_x = \frac{\omega - x}{2}, \qquad T_x \sim \text{Uniform}(0,\ \omega - x), \qquad \mathrm{Var}(T_x) = \frac{(\omega-x)^2}{12}
$$
*Generalized De Moivre* with parameter $\alpha$: $S_0(x) = \left(1 - \tfrac{x}{\omega}\right)^\alpha$, $\mu_x = \dfrac{\alpha}{\omega - x}$, $\overset{\circ}{e}_x = \dfrac{\omega - x}{\alpha + 1}$.

**Gompertz, $\mu_x = B c^x$ ($B>0,\ c>1$):**
$$
{}_tp_x = \exp\!\left(-\int_0^t B c^{x+s}\, ds\right) = \exp\!\left(-\frac{B c^x (c^t - 1)}{\ln c}\right)
$$

**Makeham, $\mu_x = A + B c^x$ ($A \ge -B,\ B>0,\ c>1$):**
$$
{}_tp_x = \exp\!\left(-A t - \frac{B c^x (c^t - 1)}{\ln c}\right)
$$

- $A$: age-independent ("accident") component; $B, c$: Gompertz scale and growth. Setting $A=0$ recovers Gompertz; setting $B=0$ recovers constant force.

## Worked Examples

### Example 1 — Force of mortality to survival probability

You are given $\mu_x = \dfrac{1}{120 - x}$ for $0 \le x < 120$. Find ${}_{10}p_{40}$, ${}_{10}q_{40}$, ${}_{5|10}q_{40}$, and $\overset{\circ}{e}_{40}$.

**Solution.** This is De Moivre with $\omega = 120$ (since $\mu_x = 1/(\omega - x)$).

Survival: ${}_tp_x = 1 - \dfrac{t}{\omega - x}$, so
$$
{}_{10}p_{40} = 1 - \frac{10}{120 - 40} = 1 - \frac{10}{80} = \frac{70}{80} = 0.875.
$$
Death: ${}_{10}q_{40} = 1 - 0.875 = 0.125.$

Deferred: ${}_{5|10}q_{40} = {}_5p_{40} - {}_{15}p_{40}$.
$$
{}_5p_{40} = 1 - \frac{5}{80} = \frac{75}{80} = 0.9375, \qquad {}_{15}p_{40} = 1 - \frac{15}{80} = \frac{65}{80} = 0.8125.
$$
$$
{}_{5|10}q_{40} = 0.9375 - 0.8125 = 0.125.
$$

Complete expectation: $\overset{\circ}{e}_{40} = \dfrac{\omega - x}{2} = \dfrac{120 - 40}{2} = 40.$

**Answer:** ${}_{10}p_{40} = 0.875$, ${}_{10}q_{40} = 0.125$, ${}_{5|10}q_{40} = 0.125$, $\overset{\circ}{e}_{40} = 40$ years.

### Example 2 — Constant force, expectation and variance

A life is subject to a **constant force of mortality** $\mu = 0.02$. Find ${}_{5}p_{30}$, $\overset{\circ}{e}_{30}$, and $\mathrm{Var}(T_{30})$.

**Solution.** Under constant force, ${}_tp_x = e^{-\mu t}$ regardless of $x$ (memoryless).
$$
{}_5p_{30} = e^{-0.02 \times 5} = e^{-0.10} = 0.904837.
$$
$T_{30}$ is **exponential** with rate $\mu = 0.02$, so its mean is $1/\mu$ and its variance is $1/\mu^2$:
$$
\overset{\circ}{e}_{30} = \frac{1}{0.02} = 50, \qquad \mathrm{Var}(T_{30}) = \frac{1}{0.02^2} = \frac{1}{0.0004} = 2500.
$$
(Standard deviation $= 50$ years — exponential lifetimes have very large spread.)

**Answer:** ${}_5p_{30} = 0.9048$, $\overset{\circ}{e}_{30} = 50$ years, $\mathrm{Var}(T_{30}) = 2500$ (SD $=50$).

### Example 3 — Curtate expectation from a survival table (recursion)

You are given the survival probabilities for a life aged 90, where the limiting age is $\omega = 94$ (so ${}_5p_{90}=0$):

| $k$ | ${}_kp_{90}$ |
|----|------------|
| 1  | 0.80 |
| 2  | 0.58 |
| 3  | 0.32 |
| 4  | 0.12 |
| 5  | 0.00 |

Find the curtate expectation of life $e_{90}$, and estimate $\overset{\circ}{e}_{90}$ under UDD.

**Solution.** Curtate expectation is the sum of the survival probabilities:
$$
e_{90} = \sum_{k=1}^{\infty} {}_kp_{90} = 0.80 + 0.58 + 0.32 + 0.12 + 0.00 = 1.82.
$$
Under the UDD approximation,
$$
\overset{\circ}{e}_{90} \approx e_{90} + \tfrac12 = 1.82 + 0.5 = 2.32.
$$

**Answer:** $e_{90} = 1.82$ years; $\overset{\circ}{e}_{90} \approx 2.32$ years.

### Example 4 — Gompertz / Makeham survival

A life follows **Makeham's law** with $A = 0.0005$, $B = 0.0000075$, $c = 1.09$. Find ${}_{10}p_{50}$.

**Solution.** Use
$$
{}_tp_x = \exp\!\left(-A t - \frac{B c^x (c^t - 1)}{\ln c}\right).
$$
Compute the pieces with $x=50,\ t=10$:
- $A t = 0.0005 \times 10 = 0.005.$
- $c^x = 1.09^{50}$. $\ln(1.09)=0.0861777$; $50 \times 0.0861777 = 4.308886$; $c^{50}=e^{4.308886}=74.3575.$
- $c^t = 1.09^{10} = e^{0.861777} = 2.367364$, so $c^t - 1 = 1.367364.$
- $\ln c = 0.0861777.$

Gompertz term:
$$
\frac{B c^x (c^t-1)}{\ln c} = \frac{0.0000075 \times 74.3575 \times 1.367364}{0.0861777} = \frac{0.00076258}{0.0861777} = 0.0088489.
$$
Total exponent: $-(0.005 + 0.0088489) = -0.0138489.$
$$
{}_{10}p_{50} = e^{-0.0138489} = 0.98625.
$$

**Answer:** ${}_{10}p_{50} \approx 0.9863$.

## Common Exam Traps

- **Confusing $T_x$ and $K_x$.** $K_x = \lfloor T_x \rfloor$. Use $e_x$ (sum starting at $k=1$) for the curtate; use $\overset{\circ}{e}_x$ (integral) for the complete. Mixing the two costs easy points.
- **Forgetting to condition on age $x$.** ${}_tp_x = S_0(x+t)/S_0(x)$, **not** $S_0(t)$. Constant force is the *only* law where the age $x$ drops out (memoryless).
- **De Moivre denominator.** ${}_tq_x = \tfrac{t}{\omega - x}$, with $\omega - x$ in the denominator, *not* $\omega$. The remaining lifetime is uniform on $(0, \omega - x)$, so $\overset{\circ}{e}_x = (\omega-x)/2$ and the variance is $(\omega-x)^2/12$.
- **UDD adjustment direction.** $\overset{\circ}{e}_x \approx e_x + \tfrac12$. The *complete* expectation is the *larger* one (you add the half-year). A common error is subtracting.
- **Curtate sum index.** $e_x = \sum_{k=1}^{\infty}{}_kp_x$ starts at $k=1$, **not** $k=0$. (Including $k=0$ would add ${}_0p_x = 1$ and overstate by exactly 1.)
- **Sign of the force in the integral.** ${}_tp_x = \exp\!\big(-\int_0^t \mu_{x+s}\,ds\big)$. The minus sign and the integration over $\mu_{x+s}$ (argument shifts with $s$) are both easy to drop.
- **$\ln c$ vs $c$ in Gompertz/Makeham.** The integral of $Bc^{x+s}$ over $s$ divides by $\ln c$, not by $c$. Always include the $\ln c$.
- **${}_{t|u}q_x$ structure.** It equals ${}_tp_x - {}_{t+u}p_x$, equivalently ${}_tp_x\cdot{}_uq_{x+t}$. Do **not** write it as ${}_tp_x \cdot {}_uq_x$ — the death must be evaluated at age $x+t$.
- **Insurance vs annuity risk direction.** For insurance the insurer loses on *early* death; for annuities the insurer loses on *late* death (longevity). Conceptual questions test this distinction.
- **Endowment = term + pure endowment.** Don't treat endowment insurance as paying twice; it pays on death-within-$n$ *or* survival-to-$n$, never both.

## Self-Check Questions

1. Write the two-way relationship between $\mu_x$ and $S_0(x)$ (derivative form and integral form).
2. Under a constant force $\mu = 0.03$, what is $\overset{\circ}{e}_x$ and does it depend on $x$?
3. For De Moivre with $\omega = 100$, compute ${}_{20}q_{30}$ and $\overset{\circ}{e}_{30}$.
4. Express ${}_{3|2}q_x$ in terms of $p$-probabilities, and separately as a product of a survival and a death probability.
5. Which product pays a benefit *whether the life dies within the term or survives to the end of the term*: term, whole life, or endowment? Briefly say why.

### Answers

1. $\displaystyle \mu_x = -\frac{d}{dx}\ln S_0(x)$ and $\displaystyle S_0(x) = \exp\!\left(-\int_0^x \mu_s\,ds\right)$.

2. $\overset{\circ}{e}_x = 1/\mu = 1/0.03 = 33.\overline{3}$ years. It does **not** depend on $x$ — constant force is memoryless, so $T_x$ is exponential at every age.

3. ${}_{20}q_{30} = \dfrac{20}{\omega - x} = \dfrac{20}{100 - 30} = \dfrac{20}{70} = 0.2857$. $\overset{\circ}{e}_{30} = \dfrac{\omega - x}{2} = \dfrac{70}{2} = 35$ years.

4. ${}_{3|2}q_x = {}_3p_x - {}_5p_x = {}_3p_x \cdot {}_2q_{x+3}$.

5. **Endowment insurance.** It is term insurance (death within $n$) plus a pure endowment (survival to $n$), so a benefit is paid in either case.
