# Parametric and Non-Parametric Estimation

Study note for SOA Exam FAM (Short-Term, Severity/Frequency Estimation). Notation follows *Loss Models: From Data to Decisions* (Klugman, Panjer, Willmot).

---

## Learning Objectives

After studying this topic you should be able to:

- Construct and use the **empirical distribution** (and empirical survival/cdf) for complete, individual data.
- Estimate parameters via the **method of moments** and **percentile matching**.
- Write the **likelihood and log-likelihood** for complete, **censored**, and **truncated** data, and find the **maximum likelihood estimate (MLE)**.
- Derive MLEs for common parametric distributions (exponential, gamma scale, Pareto, Weibull, lognormal, Poisson, binomial, negative binomial, uniform).
- Construct the **Kaplan–Meier** product-limit estimator and the **Nelson–Aalen** estimator of the cumulative hazard from left-truncated, right-censored data.
- Estimate the **variance** of estimators: empirical, Greenwood's formula, Aalen's variance, and the asymptotic variance of MLEs via the information matrix; build **confidence intervals** (linear and log-transformed).

---

## Key Concepts

### Data types: the four words that change everything

- **Complete (individual) data**: every observation is a single exact value $x_i$. No information loss.
- **Grouped data**: you only know counts in intervals.
- **Truncated data**: observations below (left) or above (right) a threshold are **not in the data set at all** — you don't even know how many there were. A deductible $d$ produces **left truncation**: claims below $d$ are never reported. You must condition on the value exceeding the truncation point.
- **Censored data**: the observation **is** in the data set, but you only know it exceeds (right-censored) or is below (left-censored) some value. A policy limit $u$ produces **right censoring**: any loss $\geq u$ is recorded as exactly $u$. You know it happened and that it was at least $u$.

The single most important distinction on this exam:
- **Truncation** affects the *denominator* (it conditions the density/probability) and removes data points.
- **Censoring** keeps the data point but replaces a density factor $f(x)$ with a survival factor $S(u)$.

### Non-parametric (empirical) models

The **empirical distribution** puts probability mass $1/n$ on each of the $n$ data points. It makes no distributional assumption.
$$F_n(x) = \frac{\#\{x_i \le x\}}{n}, \qquad S_n(x) = 1 - F_n(x).$$
When data are left-truncated and/or right-censored, the empirical cdf is generalized to the **Kaplan–Meier** estimator (for $S(x)$) and the cumulative hazard to the **Nelson–Aalen** estimator.

### Parametric estimation methods (in order of exam importance)

1. **Maximum likelihood (MLE)** — by far the most tested. Pick parameters that maximize the probability of the observed data. Works cleanly for censored/truncated data and has known asymptotic variance.
2. **Method of moments (MoM)** — set sample raw moments equal to theoretical raw moments and solve. Simple but inefficient; uses only complete data.
3. **Percentile matching** — set the fitted percentile equal to the **smoothed empirical percentile** and solve.

### Likelihood building blocks

For each observation, write one factor:

| Situation | Likelihood factor |
|---|---|
| Exact observation at $x$ (complete) | $f(x)$ |
| Right-censored at $u$ (e.g. policy limit) | $S(u)$ |
| Left-censored at $d$ | $F(d)$ |
| Left-truncated at $d$ (e.g. deductible), exact loss $x$ | $\dfrac{f(x)}{S(d)}$ |
| Left-truncated at $d$, right-censored at $u$ | $\dfrac{S(u)}{S(d)}$ |
| Interval / grouped $[c_{j-1}, c_j]$ | $F(c_j) - F(c_{j-1})$ |

Multiply all factors, take logs, differentiate, set to zero.

### Kaplan–Meier and Nelson–Aalen

These estimate the survival function $S(t)$ when each subject can enter late (left truncation) and leave early (right censoring). Define at each observed **death/loss time** $y_j$:
- $s_j$ = number of observed events (deaths) **at** $y_j$,
- $r_j$ = **risk set** = number under observation **at** time $y_j$ (those who have entered and not yet exited).

The conditional probability of surviving past $y_j$, given alive just before, is estimated by $1 - s_j/r_j$. The product of these gives Kaplan–Meier; summing the hazard contributions $s_j/r_j$ gives Nelson–Aalen (cumulative hazard $\hat H$), and $\hat S(t) = e^{-\hat H(t)}$.

---

## Formulas

### Empirical distribution (complete, individual data)

$$F_n(x) = \frac{1}{n}\sum_{i=1}^{n}\mathbf{1}(x_i \le x), \qquad S_n(x) = 1 - F_n(x).$$

Empirical raw moment (used for MoM):
$$\hat\mu_k' = \frac{1}{n}\sum_{i=1}^n x_i^k.$$

- $n$ = sample size; $x_i$ = $i$-th observation; $\mathbf{1}(\cdot)$ = indicator.

### Method of moments

Solve, for $p$ parameters, the first $p$ equations:
$$\frac{1}{n}\sum_{i=1}^n x_i^k = \mathrm{E}[X^k], \quad k = 1, 2, \dots, p.$$

### Percentile matching (smoothed empirical percentile)

Order the data $x_{(1)} \le \dots \le x_{(n)}$. The **smoothed empirical estimate** of the $100p$-th percentile uses
$$\hat\pi_p = x_{(j)} + h\,(x_{(j+1)} - x_{(j)}), \qquad \text{where } (n+1)p = j + h,$$
$j$ = integer part, $0 \le h < 1$. Then set the fitted percentile equal to $\hat\pi_p$: solve $F(\hat\pi_p \mid \theta) = p$ for the parameter(s).

- $p$ = chosen probability level; $j$ = integer index; $h$ = fractional part.

### Maximum likelihood

Likelihood and log-likelihood:
$$L(\theta) = \prod_{i=1}^n (\text{factor}_i), \qquad \ell(\theta) = \ln L(\theta) = \sum_{i=1}^n \ln(\text{factor}_i).$$
The MLE $\hat\theta$ solves $\dfrac{\partial \ell}{\partial \theta} = 0$ (and is a maximum).

### MLEs for common distributions (complete data)

Let $\bar x = \frac1n\sum x_i$.

- **Exponential** (mean $\theta$): $\quad \hat\theta = \bar x.$
- **Gamma** with **known** $\alpha$, scale $\theta$: $\quad \hat\theta = \bar x / \alpha.$
- **Normal**: $\hat\mu = \bar x, \quad \hat\sigma^2 = \frac1n\sum (x_i - \bar x)^2$ (note: divides by $n$, not $n-1$).
- **Lognormal**: let $y_i = \ln x_i$. Then $\hat\mu = \frac1n\sum y_i$, $\hat\sigma^2 = \frac1n\sum(y_i - \hat\mu)^2$.
- **Weibull** with **known** $\tau$, scale $\theta$: $\quad \hat\theta = \left(\frac1n\sum x_i^\tau\right)^{1/\tau}.$
- **Pareto** with **known** $\alpha$, scale $\theta$ (and generally): $\ell = n\ln\alpha + n\alpha\ln\theta - (\alpha+1)\sum\ln(x_i+\theta)$.
- **Uniform** $(0,\theta)$: $\quad \hat\theta = \max(x_i) = x_{(n)}$ (boundary MLE, not from a derivative).
- **Poisson** (mean $\lambda$): $\quad \hat\lambda = \bar x.$
- **Binomial** with known $m$: $\quad \hat q = \bar x / m.$
- **Negative binomial** with **known** $r$: $\quad \hat\beta = \bar x / r.$

### MLE with truncation and censoring (exponential, a key special case)

For data left-truncated at $d_i$ and right-censored at $u_i$, with exact losses $x_i$, the exponential MLE has the clean closed form:
$$\hat\theta = \frac{\sum_i (x_i - d_i)\ \text{[for exact]} + \sum_i (u_i - d_i)\ \text{[for censored]}}{\text{number of uncensored (exact) observations}} = \frac{\text{total time exposed (above truncation)}}{\text{number of deaths/exact claims}}.$$
- Numerator = sum of "amount above the truncation point" over **all** observations (censored contribute $u_i - d_i$, exact contribute $x_i - d_i$).
- Denominator = count of **exact** (uncensored) observations only.

### Kaplan–Meier (product-limit) estimator of $S(t)$

For observed event times $y_1 < y_2 < \dots < y_k$, with $s_j$ events and risk set $r_j$ at $y_j$:
$$\hat S(t) = \prod_{j:\,y_j \le t}\left(1 - \frac{s_j}{r_j}\right), \qquad \hat S(t) = 1 \text{ for } t < y_1.$$

### Nelson–Aalen estimator of cumulative hazard $H(t)$

$$\hat H(t) = \sum_{j:\,y_j \le t} \frac{s_j}{r_j}, \qquad \hat S(t) = e^{-\hat H(t)}.$$

### Variance estimates and confidence intervals

**Greenwood's formula** (variance of the Kaplan–Meier $\hat S(t)$):
$$\widehat{\mathrm{Var}}\big[\hat S(t)\big] = \big[\hat S(t)\big]^2 \sum_{j:\,y_j \le t} \frac{s_j}{r_j\,(r_j - s_j)}.$$

**Aalen's variance** (variance of the Nelson–Aalen $\hat H(t)$):
$$\widehat{\mathrm{Var}}\big[\hat H(t)\big] = \sum_{j:\,y_j \le t} \frac{s_j}{r_j^{2}} \quad\text{(textbook form)} \;\;\Big(\text{some texts: } \sum \tfrac{s_j (r_j - s_j)}{r_j^3}\Big).$$
On FAM use $\sum_{j} s_j / r_j^2$ unless told otherwise.

**Linear (normal) CI** for $S(t)$:
$$\hat S(t) \pm z_{1-\alpha/2}\,\sqrt{\widehat{\mathrm{Var}}[\hat S(t)]}.$$

**Log-transformed CI** for $S(t)$ (keeps endpoints in $(0,1)$):
$$\big(\hat S(t)^{1/U},\ \hat S(t)^{U}\big), \qquad U = \exp\!\left(\frac{z_{1-\alpha/2}\sqrt{\widehat{\mathrm{Var}}[\hat S(t)]}}{\hat S(t)\,\ln \hat S(t)}\right).$$

**Asymptotic variance of MLEs** via Fisher information. For a single parameter,
$$I(\theta) = -\mathrm{E}\!\left[\frac{\partial^2 \ell}{\partial\theta^2}\right], \qquad \widehat{\mathrm{Var}}[\hat\theta] \approx \frac{1}{I(\hat\theta)} \approx \left(-\frac{\partial^2 \ell}{\partial\theta^2}\bigg|_{\hat\theta}\right)^{-1}.$$
For multiple parameters, $\widehat{\mathrm{Var}}(\hat{\boldsymbol\theta}) = I(\hat{\boldsymbol\theta})^{-1}$ (inverse of the information matrix). The **delta method** gives the variance of a function $g(\hat\theta)$:
$$\widehat{\mathrm{Var}}[g(\hat\theta)] \approx [g'(\hat\theta)]^2\,\widehat{\mathrm{Var}}[\hat\theta].$$

- $z_{1-\alpha/2}$ = standard normal quantile (1.96 for 95%); $\ell$ = log-likelihood; $I$ = Fisher information.

---

## Worked Examples

### Example 1 — MLE for the exponential with censoring and truncation

A reinsurer observes 5 losses, all subject to an ordinary deductible of $d = 100$ and a maximum covered loss (policy limit) at $u = 1000$ (so the largest *recorded* value is the loss, censored at 1000). Ground-up losses (above the deductible) are assumed exponential with mean $\theta$. The recorded data (ground-up loss amounts) are:

$$250,\quad 400,\quad 1000^{+},\quad 600,\quad 1000^{+}$$

where $^+$ denotes a censored observation (loss reached the limit). All policies have the same deductible $d=100$. Find the MLE of $\theta$.

**Solution.**
Each observation is **left-truncated at $d=100$**. Two are right-censored at $u=1000$; three are exact.

Use the closed form: numerator = total amount above the truncation point; denominator = number of exact observations.

Exact contributions $(x_i - d)$: $(250-100) + (400-100) + (600-100) = 150 + 300 + 500 = 950.$
Censored contributions $(u - d)$: $(1000-100) + (1000-100) = 900 + 900 = 1800.$

Numerator $= 950 + 1800 = 2750$. Denominator = number of exact = 3.

$$\hat\theta = \frac{2750}{3} = 916.67.$$

**Answer:** $\boxed{\hat\theta = 2750/3 \approx 916.67}$

---

### Example 2 — Kaplan–Meier and Greenwood confidence interval

Ten policies are observed for time to first claim. Exact claim times (in months): 2, 3, 3, 5, 8. The remaining 5 policies were censored (no claim) at times 4, 6, 6, 9, 10. No left truncation. Estimate $S(5)$ by Kaplan–Meier and give a 95% linear confidence interval.

**Solution.**
Order the event times and build the risk sets. Total $n = 10$.

| $y_j$ | $s_j$ (events) | $r_j$ (risk set) | $1 - s_j/r_j$ |
|---|---|---|---|
| 2 | 1 | 10 | $9/10 = 0.9$ |
| 3 | 2 | 9 | $7/9 \approx 0.7778$ |
| 5 | 1 | 6 | $5/6 \approx 0.8333$ |

Risk sets: at $t=2$, all 10 are at risk. After $t=2$: one event removed, 9 remain. At $t=3$, $r=9$, two events; one censored at 4 leaves. At $t=5$: from 9, subtract 2 events (at 3) and 1 censored (at 4) = 6 at risk. Good.

$$\hat S(5) = 0.9 \times \tfrac{7}{9} \times \tfrac{5}{6} = 0.9 \times 0.77778 \times 0.83333 = 0.5833.$$

Greenwood sum:
$$\sum \frac{s_j}{r_j(r_j - s_j)} = \frac{1}{10\cdot 9} + \frac{2}{9\cdot 7} + \frac{1}{6\cdot 5} = 0.011111 + 0.031746 + 0.033333 = 0.076190.$$
$$\widehat{\mathrm{Var}}[\hat S(5)] = (0.5833)^2 (0.076190) = 0.34028 \times 0.076190 = 0.025927.$$
Standard error $= \sqrt{0.025927} = 0.16102$.

95% linear CI: $0.5833 \pm 1.96(0.16102) = 0.5833 \pm 0.3156 = (0.2677,\ 0.8989).$

**Answer:** $\boxed{\hat S(5) = 0.5833,\quad \text{95\% CI } \approx (0.268,\ 0.899)}$

---

### Example 3 — Method of moments and percentile matching for a Pareto

Five complete observations: 100, 150, 200, 400, 700.

**(a)** Fit a Pareto with **known** $\alpha = 3$ by method of moments (solve for $\theta$).
**(b)** Estimate the median of an exponential by percentile matching using the same data.

**Solution (a).**
Sample mean $\bar x = (100+150+200+400+700)/5 = 1550/5 = 310.$
Pareto mean (for $\alpha>1$): $\mathrm{E}[X] = \dfrac{\theta}{\alpha - 1} = \dfrac{\theta}{2}.$
Set equal: $\theta/2 = 310 \Rightarrow \hat\theta = 620.$

**Answer (a):** $\boxed{\hat\theta = 620}$

**Solution (b).**
Smoothed empirical median: $p = 0.5$, $(n+1)p = 6(0.5) = 3.0$, so $j=3$, $h=0$. The smoothed 50th percentile is the 3rd order statistic $= 200$.
For an exponential with mean $\theta$, the median solves $F(\hat\pi_{0.5}) = 0.5$:
$$1 - e^{-200/\theta} = 0.5 \;\Rightarrow\; e^{-200/\theta} = 0.5 \;\Rightarrow\; \frac{200}{\theta} = \ln 2 \;\Rightarrow\; \hat\theta = \frac{200}{0.6931} = 288.5.$$

**Answer (b):** $\boxed{\hat\theta = 200/\ln 2 \approx 288.5}$

---

### Example 4 — Nelson–Aalen with Aalen variance

Using the same data as Example 2 (events at 2, 3, 3, 5; risk sets 10, 9, 6), estimate $H(5)$ and $S(5)$ by Nelson–Aalen, and give the variance of $\hat H(5)$.

**Solution.**
$$\hat H(5) = \frac{1}{10} + \frac{2}{9} + \frac{1}{6} = 0.10000 + 0.22222 + 0.16667 = 0.48889.$$
$$\hat S(5) = e^{-0.48889} = 0.6134.$$
Aalen variance ($\sum s_j/r_j^2$):
$$\frac{1}{10^2} + \frac{2}{9^2} + \frac{1}{6^2} = 0.01000 + 0.024691 + 0.027778 = 0.062469.$$

**Answer:** $\boxed{\hat H(5) = 0.4889,\;\; \hat S(5) = 0.6134,\;\; \widehat{\mathrm{Var}}[\hat H(5)] = 0.06247}$

---

## Common Exam Traps

- **Truncation vs. censoring confusion.** A deductible truncates (divide by $S(d)$, drop unobserved small claims); a policy limit censors (replace $f$ with $S(u)$, keep the point). Mixing these up is the #1 error.
- **Forgetting to subtract the deductible** in the exponential MLE numerator. You sum *amounts above the truncation point* $(x_i - d)$, not the raw $x_i$. Same mistake: forgetting censored observations contribute $(u-d)$ to the numerator but **0** to the denominator.
- **Counting the wrong denominator** in the exponential MLE: it is the number of **exact (uncensored) deaths**, never the total sample size, when censoring is present.
- **MLE of $\sigma^2$ divides by $n$, not $n-1$.** The MLE is biased; do not "correct" it unless asked. Same for the normal/lognormal variance.
- **Uniform / shifted distributions:** the MLE is at the **boundary** ($\hat\theta = \max x_i$ for $U(0,\theta)$). Setting a derivative to zero gives the wrong answer.
- **Risk-set bookkeeping in Kaplan–Meier.** Censored observations leave the risk set but do **not** create a factor. Only event times produce factors $(1 - s_j/r_j)$. With **left truncation**, subjects enter the risk set *late* — add them in at their entry time; the risk set is not monotonically decreasing.
- **Greenwood vs. Aalen.** Greenwood's denominator is $r_j(r_j - s_j)$ and multiplies by $\hat S(t)^2$; Aalen's is $r_j^2$ with no leading factor. Don't swap them.
- **Percentile matching index.** Use $(n+1)p = j + h$ for the *smoothed* empirical percentile, not $np$. Interpolate between order statistics.
- **Lognormal MLE works on $\ln x$, not $x$.** Transform first, then take the ordinary normal MLEs.
- **Method of moments uses raw moments.** Match $\mathrm{E}[X], \mathrm{E}[X^2]$, etc. — not central moments — unless the algebra is cleaner with mean/variance (which is equivalent).

---

## Self-Check Questions

1. A loss is recorded as exactly 1000 because the policy has a 1000 limit. Is this observation censored or truncated, and what likelihood factor does it contribute?
2. For an exponential fit with deductible $d$ on every policy, three exact claims (above $d$) and two claims censored at limit $u$, write the MLE numerator and denominator in words.
3. In Kaplan–Meier, what happens to the survival estimate at a *censoring* time (no event)?
4. Give the MLE of $\theta$ for a $U(0,\theta)$ sample $\{4, 7, 2, 9, 5\}$.
5. State Greenwood's formula and what it estimates.

### Answers

1. **Censored** (right-censored at $u=1000$). It contributes the survival factor $S(1000)$ to the likelihood.
2. Numerator = $\sum(\text{exact } x_i - d) + \sum(\text{censored } u - d)$ = total amount exposed above the deductible across all five policies. Denominator = number of exact claims = **3**.
3. Nothing — the survival estimate $\hat S$ is unchanged (flat) at a censoring time; only the risk set $r_j$ for *later* event times is reduced. Factors $(1 - s_j/r_j)$ arise only at event times.
4. $\hat\theta = \max\{4,7,2,9,5\} = \mathbf{9}$ (boundary MLE; no derivative).
5. $\widehat{\mathrm{Var}}[\hat S(t)] = [\hat S(t)]^2 \sum_{y_j \le t} \dfrac{s_j}{r_j(r_j - s_j)}$. It estimates the variance of the Kaplan–Meier survival estimator $\hat S(t)$.
