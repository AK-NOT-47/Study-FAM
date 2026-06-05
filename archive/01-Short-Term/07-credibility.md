# Introduction to Credibility

## Learning Objectives

By the end of this topic, the SOA expects you to be able to:

- **Limited fluctuation (classical) credibility**
  - Compute the **full credibility standard** (number of claims, exposures, or expected aggregate losses) for claim **frequency**, claim **severity**, and **aggregate losses / pure premium**.
  - Apply the standard normal "within ±$k_0$ of the true mean with probability $p$" requirement to derive the standard $\lambda_0 = \left(z_p/k_0\right)^2$.
  - Determine the **partial credibility factor** $Z$ using the **square-root rule** and form the credibility-weighted (manual + observed) estimate $P_C = Z\bar{X} + (1-Z)M$.

- **Greatest-accuracy (Bühlmann / Bayesian) credibility**
  - Define and compute the **hypothetical mean** $\mu(\Theta)$ and **process variance** $v(\Theta)$.
  - Compute the **expected hypothetical mean** $\mu = E[\mu(\Theta)]$, the **expected process variance** $v = \text{EPV} = E[v(\Theta)]$, and the **variance of hypothetical means** $a = \text{VHM} = \text{Var}[\mu(\Theta)]$.
  - Compute the **Bühlmann credibility factor** $Z = \dfrac{n}{n+k}$ where $k = v/a$, and the credibility premium $Z\bar{X} + (1-Z)\mu$.
  - Apply **Bühlmann–Straub** credibility when exposures differ by year/policyholder.
  - Recognize that the Bühlmann estimate is the **best linear approximation** to the Bayesian (posterior mean) estimate.

## Key Concepts

### What problem does credibility solve?

You observe a policyholder (or class) for a while and get a sample mean $\bar{X}$ of their losses. You also have a **manual rate** $M$ — a prior/collective estimate from a big book of business. How much should next year's premium rely on **this policyholder's own experience** versus the **manual rate**?

The answer is a weighted average:
$$
\text{Credibility premium} = Z\bar{X} + (1-Z)M, \qquad 0 \le Z \le 1.
$$
$Z$ is the **credibility factor**. More data → larger $Z$ → trust the policyholder's own experience more.

There are two philosophies for choosing $Z$:

1. **Limited fluctuation (classical) credibility** — "How much data do I need before the observed mean is *stable enough* (small random fluctuation) to be fully trusted?" Heuristic, based on the normal approximation.
2. **Greatest accuracy (Bühlmann) credibility** — "What $Z$ *minimizes squared error*?" Rigorous, derived from variance components. This is the one that connects to Bayesian estimation.

---

### Limited Fluctuation (Classical) Credibility — intuition

We want the observed estimate to be **within $\pm 100k_0\%$ of the true mean with probability $p$**. Using the normal approximation, that requires the *number of expected claims* to exceed a threshold called the **full credibility standard** $\lambda_0$:
$$
\lambda_0 = \left(\frac{z_p}{k_0}\right)^2,
$$
where $z_p$ is the standard normal quantile with $\Phi(z_p) = (1+p)/2$ (two-sided).

- If expected claims $\ge \lambda_0$: assign **full credibility**, $Z = 1$.
- If expected claims $< \lambda_0$: assign **partial credibility** via the **square-root rule**:
$$
Z = \sqrt{\frac{n}{\lambda_0}} \quad(\text{capped at } 1),
$$
where $n$ is the actual expected number of claims observed.

**Frequency vs severity vs aggregate.** The basic $\lambda_0$ above is the standard *for frequency assuming Poisson claim counts*. For severity and aggregate losses we **inflate** $\lambda_0$ by a factor involving the coefficient of variation, because those quantities have extra variability beyond pure counting.

---

### Greatest Accuracy (Bühlmann) Credibility — intuition

Each policyholder has a hidden **risk parameter** $\Theta$ (their true riskiness). Given $\Theta = \theta$:

- **Hypothetical mean:** $\mu(\theta) = E[X \mid \Theta = \theta]$ — the long-run mean for *that* policyholder.
- **Process variance:** $v(\theta) = \text{Var}[X \mid \Theta = \theta]$ — the year-to-year randomness *within* that policyholder.

Across the population, $\Theta$ is random, giving three structural quantities:

- $\mu = E[\mu(\Theta)]$ — the **collective/overall mean** (this is what $M$ becomes in Bühlmann).
- $v = \text{EPV} = E[v(\Theta)]$ — **Expected Process Variance**: average within-risk noise.
- $a = \text{VHM} = \text{Var}[\mu(\Theta)]$ — **Variance of Hypothetical Means**: how much policyholders *differ* from each other.

The credibility factor is
$$
Z = \frac{n}{n+k}, \qquad k = \frac{v}{a} = \frac{\text{EPV}}{\text{VHM}}.
$$

**Intuition for $k = v/a$:**
- Large EPV (noisy individual data) → large $k$ → small $Z$ → trust the data less.
- Large VHM (policyholders are very different) → small $k$ → large $Z$ → an individual's own data is very informative.

The Bühlmann estimate $Z\bar{X} + (1-Z)\mu$ is the **least-squares linear approximation to the Bayesian posterior mean** $E[\mu(\Theta)\mid \mathbf{X}]$. For some conjugate models (Poisson–gamma, Bernoulli–beta, Normal–Normal) the Bühlmann and exact Bayesian estimates coincide.

---

### Bühlmann–Straub

When each year (or policyholder) has a different **exposure** $m_i$ (e.g., number of policies, payroll units), use Bühlmann–Straub. Replace counts with total exposure $m = \sum m_i$:
$$
Z = \frac{m}{m+k}, \qquad \bar{X} = \frac{\sum_i m_i X_i}{\sum_i m_i},
$$
where $X_i$ is the loss **per unit of exposure** in cell $i$. The estimate is still $Z\bar{X} + (1-Z)\mu$.

## Formulas

### Limited fluctuation credibility

**Full credibility standard for frequency** (expected number of claims), targeting "$\bar{N}$ within $\pm k_0$ of mean with prob $p$":
$$
\lambda_0 = \left(\frac{z_p}{k_0}\right)^2
$$
- $z_p$ = standard normal value with $\Phi(z_p) = \frac{1+p}{2}$.
- $k_0$ = tolerance (e.g. 0.05 means "within 5%").
- $\lambda_0$ = required **expected number of claims** for full credibility of frequency *(Poisson assumption: $\text{Var}(N)=E(N)$)*.

If frequency is **not** Poisson, multiply by $\dfrac{\sigma_N^2}{\mu_N}$:
$$
\lambda_f = \lambda_0 \cdot \frac{\sigma_N^2}{\mu_N}.
$$

**Full credibility standard for severity** (in *number of claims*):
$$
\lambda_S = \lambda_0 \cdot \frac{\sigma_S^2}{\mu_S^2} = \lambda_0 \cdot \text{CV}_S^2
$$
- $\mu_S,\ \sigma_S^2$ = mean and variance of the **severity** (individual claim size).
- $\text{CV}_S = \sigma_S/\mu_S$ = coefficient of variation of severity.

**Full credibility standard for aggregate losses / pure premium** (in *number of claims*, Poisson frequency):
$$
\lambda_{\text{agg}} = \lambda_0\left(\frac{\sigma_N^2}{\mu_N} + \frac{\sigma_S^2}{\mu_S^2}\right)
\;\overset{\text{Poisson}}{=}\; \lambda_0\left(1 + \text{CV}_S^2\right).
$$
- Under Poisson frequency $\sigma_N^2/\mu_N = 1$, so it reduces to $\lambda_0(1+\text{CV}_S^2)$.
- $\text{CV}_S^2 = \sigma_S^2/\mu_S^2 = E[S^2]/\big(E[S]\big)^2 - 1$.

**Converting the claim-count standard to an exposure or dollar standard:**
- Required **exposures** $= \lambda / \mu_N$ (divide the claim standard by expected claims per exposure unit).
- Required **expected aggregate dollars** $= \lambda \cdot \mu_S$ (for the aggregate/pure-premium standard, multiply by mean severity).

**Partial credibility (square-root rule):**
$$
Z = \min\!\left(\sqrt{\frac{n}{\lambda}},\, 1\right)
$$
- $n$ = actual observed expected claims (or exposures / dollars, matching the units of $\lambda$).
- $\lambda$ = relevant full credibility standard.

**Credibility-weighted estimate:**
$$
P_C = Z\bar{X} + (1-Z)\,M
$$
- $\bar{X}$ = observed mean (frequency, severity, or pure premium).
- $M$ = manual / prior rate.

---

### Bühlmann credibility

**Conditional moments (per risk):**
$$
\mu(\theta) = E[X\mid \Theta=\theta], \qquad v(\theta) = \text{Var}[X\mid \Theta=\theta].
$$

**Structural parameters:**
$$
\mu = E[\mu(\Theta)] \quad(\text{overall mean})
$$
$$
v = \text{EPV} = E[v(\Theta)]
$$
$$
a = \text{VHM} = \text{Var}[\mu(\Theta)] = E\!\big[\mu(\Theta)^2\big] - \mu^2
$$

**Total variance check (law of total variance):**
$$
\text{Var}(X) = E[v(\Theta)] + \text{Var}[\mu(\Theta)] = v + a.
$$

**Credibility factor and premium:**
$$
k = \frac{v}{a} = \frac{\text{EPV}}{\text{VHM}}, \qquad Z = \frac{n}{n+k},
$$
$$
P_C = Z\bar{X} + (1-Z)\mu,
$$
- $n$ = number of observations (years/exposures) for the policyholder.
- $\bar{X}$ = average of the policyholder's $n$ observations.
- $\mu$ = collective mean (the credibility complement).

---

### Bühlmann–Straub credibility

For cells $i=1,\dots,n$ with exposures $m_i$ and per-exposure loss $X_i$:
$$
m = \sum_{i} m_i, \qquad \bar{X} = \frac{\sum_i m_i X_i}{m}, \qquad Z = \frac{m}{m+k}, \qquad k=\frac{v}{a},
$$
$$
P_C = Z\bar{X} + (1-Z)\mu.
$$
Here $v(\theta)$ and $a$ refer to the process variance and VHM **per unit of exposure**.

## Worked Examples

### Example 1 — Full credibility standards (frequency, severity, aggregate)

An insurer wants the estimate to be within **5%** of the true mean with probability **90%**. Claim frequency is **Poisson**. Severity has mean $\mu_S = 2{,}000$ and standard deviation $\sigma_S = 4{,}000$.

Find the full credibility standard, in **expected number of claims**, for (a) frequency, (b) severity, (c) aggregate losses.

**Solution.**

Tolerance $k_0 = 0.05$, $p = 0.90$. Two-sided: $\Phi(z_p) = (1+0.90)/2 = 0.95 \Rightarrow z_p = 1.645$.

Base standard:
$$
\lambda_0 = \left(\frac{1.645}{0.05}\right)^2 = (32.9)^2 = 1{,}082.41 \approx 1{,}082 \text{ claims}.
$$

(a) **Frequency** (Poisson): $\lambda_f = \lambda_0 = 1{,}082.41$ claims.

(b) **Severity:** $\text{CV}_S^2 = (\sigma_S/\mu_S)^2 = (4000/2000)^2 = 4.$
$$
\lambda_S = \lambda_0\cdot \text{CV}_S^2 = 1{,}082.41 \times 4 = 4{,}329.64 \approx 4{,}330 \text{ claims}.
$$

(c) **Aggregate (Poisson):** $\lambda_{\text{agg}} = \lambda_0(1+\text{CV}_S^2) = 1{,}082.41\times(1+4) = 5{,}412.05.$

**Answer:** Frequency $\approx \mathbf{1{,}082}$ claims; Severity $\approx \mathbf{4{,}330}$ claims; Aggregate $\approx \mathbf{5{,}412}$ claims.

---

### Example 2 — Partial credibility (square-root rule)

Using the **aggregate** standard from Example 1 ($\lambda_{\text{agg}} = 5{,}412.05$ claims), a policyholder generated an experience-period mean pure premium of $\bar{X} = 1{,}500$ based on an expected **n = 1,200 claims**. The manual pure premium is $M = 1{,}800$. Compute the credibility-weighted pure premium.

**Solution.**

Since $n = 1{,}200 < 5{,}412.05$, use partial credibility:
$$
Z = \sqrt{\frac{n}{\lambda_{\text{agg}}}} = \sqrt{\frac{1{,}200}{5{,}412.05}} = \sqrt{0.22173} = 0.4709.
$$

Credibility-weighted estimate:
$$
P_C = Z\bar{X} + (1-Z)M = 0.4709(1{,}500) + 0.5291(1{,}800).
$$
$$
P_C = 706.34 + 952.38 = 1{,}658.72.
$$

**Answer:** $Z \approx 0.471$ and the credibility pure premium is $\boxed{\approx \mathbf{1{,}658.7}}$.

---

### Example 3 — Bühlmann credibility from a conditional model

A risk parameter $\Theta$ takes values with the following distribution. Given $\Theta=\theta$, annual claims $X$ have mean $\mu(\theta)=\theta$ and variance $v(\theta)=\theta$ (Poisson-type). The prior on $\Theta$ is:

| $\theta$ | $P(\Theta=\theta)$ |
|---:|---:|
| 1 | 0.5 |
| 3 | 0.3 |
| 5 | 0.2 |

A policyholder is observed for **n = 4** years with mean $\bar{X} = 2.5$. Find the Bühlmann credibility premium.

**Solution.**

Overall mean:
$$
\mu = E[\mu(\Theta)] = 1(0.5)+3(0.3)+5(0.2) = 0.5+0.9+1.0 = 2.4.
$$

EPV (here $v(\theta)=\theta$, so $E[v(\Theta)]=E[\Theta]$):
$$
v = E[v(\Theta)] = 2.4.
$$

VHM: $E[\mu(\Theta)^2] = 1^2(0.5)+3^2(0.3)+5^2(0.2)=0.5+2.7+5.0=8.2.$
$$
a = \text{VHM} = E[\mu(\Theta)^2]-\mu^2 = 8.2 - 2.4^2 = 8.2 - 5.76 = 2.44.
$$

Credibility:
$$
k = \frac{v}{a} = \frac{2.4}{2.44} = 0.98361, \qquad Z = \frac{n}{n+k} = \frac{4}{4+0.98361} = \frac{4}{4.98361}=0.80263.
$$

Premium:
$$
P_C = Z\bar{X}+(1-Z)\mu = 0.80263(2.5)+0.19737(2.4) = 2.00658 + 0.47369 = 2.48027.
$$

**Answer:** $k \approx 0.984$, $Z \approx 0.803$, credibility premium $\approx \boxed{\mathbf{2.480}}$.

---

### Example 4 — Bühlmann–Straub with varying exposures

A class of business has structural parameters $\mu = 0.20$ (losses per exposure), $\text{EPV} = v = 0.60$, $\text{VHM} = a = 0.0025$. Observed data:

| Year | Exposures $m_i$ | Losses | Loss per exposure $X_i$ |
|---:|---:|---:|---:|
| 1 | 100 | 24 | 0.24 |
| 2 | 150 | 27 | 0.18 |
| 3 | 250 | 60 | 0.24 |

Find the Bühlmann–Straub credibility estimate of the loss per exposure.

**Solution.**

Total exposure: $m = 100+150+250 = 500.$

Exposure-weighted mean (= total losses / total exposures):
$$
\bar{X} = \frac{24+27+60}{500} = \frac{111}{500} = 0.222.
$$

$$
k = \frac{v}{a} = \frac{0.60}{0.0025} = 240, \qquad Z = \frac{m}{m+k} = \frac{500}{500+240} = \frac{500}{740} = 0.67568.
$$

$$
P_C = Z\bar{X} + (1-Z)\mu = 0.67568(0.222) + 0.32432(0.20).
$$
$$
P_C = 0.150000 + 0.064865 = 0.214865.
$$

**Answer:** $Z \approx 0.676$; estimated loss per exposure $\approx \boxed{\mathbf{0.2149}}$ per unit (so $\approx 0.2149 \times 500 = 107.4$ total expected losses).

## Common Exam Traps

- **Units of $\lambda$.** The full credibility standard is naturally in **expected number of claims**. To get a standard in **exposures**, divide by claims-per-exposure $\mu_N$; to get a standard in **dollars**, multiply by mean severity $\mu_S$. Make sure $n$ in the square-root rule is in the **same units** as $\lambda$.

- **$z_p$ vs $z_{p}$ tail.** $\Phi(z_p) = (1+p)/2$, not $\Phi(z_p)=p$. For $p=0.90$ you need $z = 1.645$ (the 0.95 quantile), **not** 1.282.

- **Forgetting the Poisson assumption.** $\lambda_0 = (z_p/k_0)^2$ is the frequency standard *only if frequency is Poisson*. If $\sigma_N^2 \ne \mu_N$, multiply by $\sigma_N^2/\mu_N$. The aggregate standard is $\lambda_0(\sigma_N^2/\mu_N + \text{CV}_S^2)$, which simplifies to $\lambda_0(1+\text{CV}_S^2)$ **only under Poisson**.

- **Severity uses $\text{CV}^2$, not variance.** The severity standard multiplier is $\sigma_S^2/\mu_S^2 = \text{CV}_S^2$ (dimensionless), not $\sigma_S^2$.

- **Confusing EPV and VHM.** EPV $= E[\text{Var}(X\mid\Theta)]$ (average *within*-risk variance); VHM $= \text{Var}[E(X\mid\Theta)]$ (variance *between* risks). $k = \text{EPV}/\text{VHM}$. Swapping them inverts $Z$.

- **VHM via the shortcut.** $a = E[\mu(\Theta)^2] - \mu^2$. Do **not** use $E[\mu(\Theta)]^2$ in the first term — it must be $E[\mu(\Theta)^2]$.

- **Bühlmann $\bar{X}$ weighting.** In ordinary Bühlmann, $\bar{X}$ is the simple average over $n$ equal periods. In **Bühlmann–Straub**, $\bar{X}$ is the **exposure-weighted** average and $Z = m/(m+k)$ uses total exposure $m$, not the number of cells.

- **$Z$ moves the right way.** More data ($n$ up) → $Z$ up. Noisier risk (EPV up) → $k$ up → $Z$ down. If your $Z$ moves the wrong way, recheck $k$.

- **Credibility complement.** In classical credibility the complement is the **manual rate $M$**; in Bühlmann it is the **collective mean $\mu$**. Don't mix them.

- **Bühlmann never exceeds full data trust.** $Z\in(0,1)$ always for finite $n$ — it never hits 1 exactly (unlike classical, which caps at 1).

## Self-Check Questions

1. For $p = 0.95$ and $k_0 = 0.10$, what is the base full-credibility standard $\lambda_0$ in expected claims (Poisson frequency)?

2. Severity has mean 500 and standard deviation 1,500. By what factor is the *severity* full-credibility standard larger than the base frequency standard $\lambda_0$?

3. A risk needs 3,000 expected claims for full credibility but only 750 are observed. What is the partial credibility factor $Z$?

4. Given EPV $= 8$, VHM $= 2$, and $n = 5$ observations, find $k$ and $Z$.

5. In Bühlmann–Straub, total exposure is $m = 800$, $k = 200$, exposure-weighted mean $\bar{X} = 0.15$, collective mean $\mu = 0.10$. Find the credibility estimate.

### Answers

1. $z_{0.95}$ tail: $\Phi(z)=(1+0.95)/2=0.975 \Rightarrow z=1.96.$ $\lambda_0 = (1.96/0.10)^2 = 19.6^2 = 384.16 \approx \mathbf{384}$ claims.

2. $\text{CV}_S^2 = (1500/500)^2 = 3^2 = \mathbf{9}$. The severity standard is **9×** the base standard.

3. $Z = \sqrt{750/3000} = \sqrt{0.25} = \mathbf{0.5}.$

4. $k = \text{EPV}/\text{VHM} = 8/2 = 4.$ $Z = 5/(5+4) = 5/9 \approx \mathbf{0.556}.$

5. $Z = 800/(800+200) = 0.8.$ $P_C = 0.8(0.15) + 0.2(0.10) = 0.12 + 0.02 = \mathbf{0.14}.$
