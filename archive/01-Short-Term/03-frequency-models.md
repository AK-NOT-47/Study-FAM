# Frequency Models

*SOA Exam FAM — Short-Term Insurance. Notation follows Klugman, Panjer & Willmot, "Loss Models: From Data to Decisions."*

---

## Learning Objectives

After studying this topic, you should be able to:

- Identify and parametrize the four core frequency distributions: **Poisson**, **binomial**, **negative binomial**, and **geometric** (a special case of the negative binomial).
- Compute probabilities, means, and variances for each, and use the **mean-to-variance relationship** to recognize which distribution fits a data set.
- State the defining property of the **(a, b, 0) class**, identify which distributions belong to it, and back out parameters from the recursion coefficients $a$ and $b$.
- Use the **(a, b, 0) recursion** $p_k = (a + b/k)\,p_{k-1}$ to compute successive probabilities.
- Understand the **(a, b, 1) class**: zero-truncated and zero-modified distributions, and convert between the base and modified probabilities.
- Work with **probability generating functions (PGFs)**, extract moments from them, and use them to identify compound and mixed distributions.
- Build and analyze **compound frequency** (e.g., Poisson primary with a secondary counting distribution — "Neyman Type A," "Poisson–Poisson," etc.).
- Determine the effect of **exposure changes** and **coverage modifications** (deductibles, via thinning) on the frequency distribution.

---

## Key Concepts

### 1. What is a frequency model?

A **frequency model** describes the *number of claims* $N$ (a non-negative integer random variable) over a fixed period. It is the "how many" half of the risk; the "how much" half is the **severity** $X$. Together they build the **aggregate loss** $S = X_1 + \dots + X_N$ (a compound distribution). Mastering frequency is the foundation for aggregate-loss modeling.

We always denote $p_k = \Pr(N = k)$ for $k = 0, 1, 2, \dots$.

### 2. The four core distributions — intuition

- **Poisson** $(\lambda)$: the "default" claim-count model. Counts of rare events over time/space. Its signature feature is **mean = variance = $\lambda$** (equidispersion). Memorize this.
- **Binomial** $(m, q)$: a *finite* number of independent trials $m$, each producing a claim with probability $q$. Count is capped at $m$. **Variance < mean** (underdispersion): $\text{Var} = mq(1-q) < mq = $ mean.
- **Negative binomial** $(r, \beta)$: counts with **variance > mean** (overdispersion). Arises naturally as a **Poisson mixed over a gamma-distributed $\lambda$** — i.e., heterogeneous risks. This is the workhorse when real data are more variable than Poisson allows.
- **Geometric** $(\beta)$: the negative binomial with $r = 1$. The discrete analogue of the exponential; "memoryless" in the count sense.

**The dispersion test** (a hugely common exam shortcut):

| Distribution | Relationship |
|---|---|
| Binomial | Variance **<** Mean |
| Poisson | Variance **=** Mean |
| Negative binomial / Geometric | Variance **>** Mean |

Given sample mean $\bar{x}$ and sample variance $s^2$, compare them to pick the family before fitting.

### 3. The (a, b, 0) class

A distribution belongs to the **(a, b, 0) class** if there exist constants $a$ and $b$ such that

$$\frac{p_k}{p_{k-1}} = a + \frac{b}{k}, \qquad k = 1, 2, 3, \dots$$

The "0" means the recursion starts at $k = 1$ and uses the natural $p_0$. **There are exactly four members: Poisson, binomial, negative binomial, and geometric.** (Geometric is the $r=1$ negative binomial, so really three families.) No other distribution satisfies this.

Why it matters: the ratio $p_k / p_{k-1}$ plotted against $1/k$ is **linear** with slope $b$ and intercept $a$. The **sign of $a$** identifies the family:

| Sign of $a$ | Distribution | $a$ | $b$ |
|---|---|---|---|
| $a = 0$ | Poisson | $0$ | $\lambda$ |
| $a < 0$ | Binomial | $-\dfrac{q}{1-q}$ | $(m+1)\dfrac{q}{1-q}$ |
| $a > 0$ | Negative binomial | $\dfrac{\beta}{1+\beta}$ | $(r-1)\dfrac{\beta}{1+\beta}$ |
| $a > 0,\ b = 0$ | Geometric | $\dfrac{\beta}{1+\beta}$ | $0$ |

This recursion is also the computational engine for compound (aggregate) distributions via the **Panjer recursion**.

### 4. The (a, b, 1) class — truncation and modification

Sometimes the count of zeros doesn't match an (a,b,0) model (e.g., a "claim/no-claim" gate, or data where zero is over- or under-represented). The **(a, b, 1) class** keeps the *same* recursion **but only for $k \ge 2$**:

$$\frac{p_k}{p_{k-1}} = a + \frac{b}{k}, \qquad k = 2, 3, 4, \dots$$

This frees up $p_0$ (and hence $p_1$) to be set arbitrarily. Two important special cases:

- **Zero-truncated (ZT):** $p_0^T = 0$. We *condition on at least one claim*.
- **Zero-modified (ZM):** $p_0^M$ is an arbitrary chosen value in $[0,1)$; the rest is rescaled.

If $p_k$ is the original (a,b,0) probability, the modified probabilities are:

$$p_k^M = \frac{1 - p_0^M}{1 - p_0}\, p_k, \qquad k = 1, 2, 3, \dots$$

The zero-truncated case is just the special case $p_0^M = 0$:

$$p_k^T = \frac{p_k}{1 - p_0}, \qquad k \ge 1.$$

The factor $\frac{1 - p_0^M}{1 - p_0}$ rescales all the positive-mass probabilities so they sum (with $p_0^M$) to 1.

### 5. Probability generating functions (PGFs)

The **PGF** of $N$ is

$$P_N(z) = \mathrm{E}[z^N] = \sum_{k=0}^{\infty} p_k\, z^k.$$

Key properties (these are exam gold):

- $P_N(0) = p_0$, and $P_N(1) = 1$.
- $p_k = \dfrac{P_N^{(k)}(0)}{k!}$ — recover probabilities by differentiating.
- $\mathrm{E}[N] = P_N'(1)$.
- $\mathrm{E}[N(N-1)] = P_N''(1)$, so $\text{Var}(N) = P_N''(1) + P_N'(1) - [P_N'(1)]^2$.
- **Sum of independent variables:** PGF of a sum is the *product* of PGFs.
- **Compound distribution:** if $N$ has primary PGF $P_1$ and each "cluster" has secondary PGF $P_2$, the compound PGF is the **composition** $P(z) = P_1\big(P_2(z)\big)$.

### 6. Compound frequency distributions

A **compound frequency** distribution models $N = M_1 + M_2 + \dots + M_K$, where $K$ (the *primary* count) is itself a counting variable and each $M_i$ (the *secondary* count) is i.i.d. counting variable. Think: number of *accidents* $K$ is Poisson, and each accident produces a random number of *claims* $M_i$.

The PGF composition rule $P_N(z) = P_K\big(P_M(z)\big)$ generates these. Named cases you may see:

- **Poisson primary + Poisson secondary** = **Neyman Type A**.
- **Poisson primary + logarithmic secondary** = **negative binomial** (a neat identity).
- A **Poisson–binomial**, **Poisson–negative binomial**, etc.

The mean and variance follow from the compound-variance formula (see Formulas).

### 7. Effect of exposure

If a frequency distribution is calibrated on **$n_1$ exposure units** (e.g., 100 policies, or 1 year) and you want the count over **$n_2$ units**, the parameter scales for the **infinitely divisible** distributions:

- **Poisson:** $\lambda \to \lambda \cdot \frac{n_2}{n_1}$.
- **Negative binomial:** $r \to r \cdot \frac{n_2}{n_1}$ (the $\beta$ stays fixed).
- **Binomial:** $m \to m \cdot \frac{n_2}{n_1}$ (requires $m$ to scale to a whole number).

Intuition: more exposure = more independent copies summed = parameter that counts "size" scales linearly.

### 8. Effect of coverage modifications (thinning)

Suppose only a fraction $v$ of ground-up losses actually generate a payment (e.g., a deductible $d$ means a loss is paid only if $X > d$, so $v = \Pr(X > d)$). The **claim count of payments** $N^P$ is obtained by **thinning** the loss count $N^L$: each loss independently "survives" with probability $v$. The remarkable result:

- **Poisson:** $\lambda \to v\lambda$ (still Poisson).
- **Binomial:** $q \to vq$ (still binomial, same $m$).
- **Negative binomial:** $\beta \to v\beta$ (still negative binomial, same $r$).

So thinning a member of the (a,b,0) class stays in the *same family* with one parameter scaled by $v$. This is the key bridge between "number of losses" and "number of payments."

---

## Formulas

Throughout, $p_k = \Pr(N=k)$.

### Poisson $(\lambda)$, $\lambda > 0$
$$p_k = \frac{e^{-\lambda}\lambda^k}{k!}, \qquad \mathrm{E}[N] = \lambda, \quad \text{Var}(N) = \lambda, \quad P_N(z) = e^{\lambda(z-1)}.$$
$$(a, b, 0):\quad a = 0,\quad b = \lambda.$$

### Binomial $(m, q)$, $m \in \{1,2,\dots\}$, $0 < q < 1$
$$p_k = \binom{m}{k} q^k (1-q)^{m-k}, \quad k = 0,\dots,m, \qquad \mathrm{E}[N] = mq, \quad \text{Var}(N) = mq(1-q).$$
$$P_N(z) = \big(1 + q(z-1)\big)^m, \qquad a = -\frac{q}{1-q},\quad b = (m+1)\frac{q}{1-q}.$$

### Negative binomial $(r, \beta)$, $r > 0$, $\beta > 0$
$$p_k = \binom{r + k - 1}{k}\left(\frac{1}{1+\beta}\right)^r \left(\frac{\beta}{1+\beta}\right)^k,$$
$$\mathrm{E}[N] = r\beta, \qquad \text{Var}(N) = r\beta(1+\beta), \qquad P_N(z) = \big(1 - \beta(z-1)\big)^{-r}.$$
$$a = \frac{\beta}{1+\beta},\qquad b = (r-1)\frac{\beta}{1+\beta}.$$

### Geometric $(\beta)$ — negative binomial with $r = 1$
$$p_k = \frac{\beta^k}{(1+\beta)^{k+1}}, \qquad \mathrm{E}[N] = \beta, \quad \text{Var}(N) = \beta(1+\beta), \quad P_N(z) = \big(1-\beta(z-1)\big)^{-1}.$$
$$a = \frac{\beta}{1+\beta},\qquad b = 0.$$

**Symbol key:** $\lambda$ = Poisson rate; $m$ = number of binomial trials; $q$ = per-trial success (claim) probability; $r$ = negative-binomial "shape" (number of failures parameter); $\beta$ = negative-binomial scale (odds-like parameter, **not** a probability). $z$ = PGF argument.

### (a, b, 0) recursion
$$p_k = \left(a + \frac{b}{k}\right) p_{k-1}, \qquad k \ge 1,$$
with $p_0$ given by the distribution ($e^{-\lambda}$, $(1-q)^m$, or $(1+\beta)^{-r}$).

### (a, b, 1): zero-modified and zero-truncated
$$p_k^M = \frac{1 - p_0^M}{1 - p_0}\, p_k \ (k\ge 1), \qquad p_k^T = \frac{p_k}{1 - p_0}\ (k \ge 1).$$
Moments of a ZM distribution: if $c = \dfrac{1 - p_0^M}{1 - p_0}$, then for any moment that ignores the zero atom,
$$\mathrm{E}[N^M] = c\,\mathrm{E}[N], \qquad \mathrm{E}[(N^M)^2] = c\,\mathrm{E}[N^2],$$
so $\text{Var}(N^M) = c\,\mathrm{E}[N^2] - \big(c\,\mathrm{E}[N]\big)^2$. (Here $\mathrm{E}[N]$, $\mathrm{E}[N^2]$ are the *original* base-distribution moments.)

### PGF moment extraction
$$\mathrm{E}[N] = P_N'(1), \qquad \text{Var}(N) = P_N''(1) + P_N'(1) - \big[P_N'(1)\big]^2.$$

### Compound frequency $N = \sum_{i=1}^{K} M_i$
$$P_N(z) = P_K\big(P_M(z)\big),$$
$$\mathrm{E}[N] = \mathrm{E}[K]\,\mathrm{E}[M], \qquad \text{Var}(N) = \mathrm{E}[K]\,\text{Var}(M) + \text{Var}(K)\,\big(\mathrm{E}[M]\big)^2.$$
(This is the conditional-variance / compound-variance formula.)

### Exposure scaling (units $n_1 \to n_2$, ratio $c = n_2/n_1$)
$$\text{Poisson: } \lambda \to c\lambda; \qquad \text{NB: } r \to cr; \qquad \text{Binomial: } m \to cm.$$

### Coverage modification / thinning (survival probability $v$)
$$\text{Poisson: } \lambda \to v\lambda; \qquad \text{Binomial: } q \to vq; \qquad \text{NB: } \beta \to v\beta.$$

---

## Worked Examples

### Example 1 — Identify the (a, b, 0) member and recover parameters

A discrete distribution satisfies $p_k / p_{k-1} = 0.25 + 0.75/k$ for $k \ge 1$, with $p_0 = e^{-3}$... *(wait — check consistency)*. Suppose instead we are only told the recursion $a = 0.25$, $b = 0.75$, and that it is a genuine (a,b,0) distribution. Identify it and find its mean and variance.

**Solution.**
Since $a = 0.25 > 0$, this is a **negative binomial**. Use $a = \beta/(1+\beta)$:
$$0.25 = \frac{\beta}{1+\beta} \implies 0.25(1+\beta) = \beta \implies 0.25 = 0.75\beta \implies \beta = \tfrac{1}{3}.$$
Use $b = (r-1)\,a$:
$$0.75 = (r-1)(0.25) \implies r - 1 = 3 \implies r = 4.$$
Then
$$\mathrm{E}[N] = r\beta = 4 \cdot \tfrac{1}{3} = \tfrac{4}{3} \approx 1.333,$$
$$\text{Var}(N) = r\beta(1+\beta) = \tfrac{4}{3}\cdot\tfrac{4}{3} = \tfrac{16}{9} \approx 1.778.$$
Check: variance > mean, consistent with negative binomial. **Answer: Negative binomial with $r = 4$, $\beta = 1/3$; mean $= 4/3 \approx 1.333$, variance $= 16/9 \approx 1.778$.**

### Example 2 — Zero-modified Poisson

Losses follow a Poisson distribution with $\lambda = 2$. An insurer reports that the probability of zero claims is modified to $p_0^M = 0.40$. Find $p_1^M$, $p_2^M$, and $\mathrm{E}[N^M]$.

**Solution.**
Base Poisson: $p_0 = e^{-2} = 0.135335$, $p_1 = 2e^{-2} = 0.270671$, $p_2 = 2e^{-2} = 0.270671$.
Rescale factor:
$$c = \frac{1 - p_0^M}{1 - p_0} = \frac{1 - 0.40}{1 - 0.135335} = \frac{0.60}{0.864665} = 0.693910.$$
Then
$$p_1^M = c\,p_1 = 0.693910 \times 0.270671 = 0.187822,$$
$$p_2^M = c\,p_2 = 0.693910 \times 0.270671 = 0.187822.$$
Mean: the base mean is $\mathrm{E}[N] = \lambda = 2$, so
$$\mathrm{E}[N^M] = c\,\mathrm{E}[N] = 0.693910 \times 2 = 1.387820.$$
**Answer: $p_1^M = p_2^M \approx 0.18782$, and $\mathrm{E}[N^M] \approx 1.3878$.**

### Example 3 — Compound (Poisson–Poisson, Neyman Type A) mean and variance

The number of *storms* per year $K$ is Poisson with mean $\mathrm{E}[K] = 3$. Each storm produces a number of *claims* $M$ that is Poisson with mean $\mathrm{E}[M] = 4$. Let $N$ be the total annual claim count. Find $\mathrm{E}[N]$ and $\text{Var}(N)$.

**Solution.**
For Poisson, mean = variance, so $\text{Var}(K) = 3$ and $\text{Var}(M) = 4$.
$$\mathrm{E}[N] = \mathrm{E}[K]\,\mathrm{E}[M] = 3 \times 4 = 12.$$
$$\text{Var}(N) = \mathrm{E}[K]\,\text{Var}(M) + \text{Var}(K)\,(\mathrm{E}[M])^2 = 3(4) + 3(4^2) = 12 + 48 = 60.$$
**Answer: $\mathrm{E}[N] = 12$, $\text{Var}(N) = 60$.**

### Example 4 — Exposure and coverage modification together

A portfolio of 500 policies has an annual loss count that is negative binomial with $r = 2$, $\beta = 0.5$ (per the full 500-policy portfolio). (a) The insurer adds policies to reach 1,500 policies. (b) A deductible is then introduced such that only $v = \Pr(X > d) = 0.6$ of losses produce a payment. Find the distribution and mean of the **payment count** $N^P$.

**Solution.**
(a) Exposure ratio $c = 1500/500 = 3$. For negative binomial, $r$ scales: $r \to 3 \times 2 = 6$; $\beta$ unchanged at $0.5$. Loss count is NB$(r=6, \beta=0.5)$, mean $= r\beta = 6(0.5) = 3$.
(b) Thinning a negative binomial with survival $v = 0.6$ scales $\beta$: $\beta \to v\beta = 0.6 \times 0.5 = 0.30$; $r$ unchanged at $6$. Payment count is NB$(r = 6, \beta = 0.30)$.
$$\mathrm{E}[N^P] = r\beta = 6 \times 0.30 = 1.80.$$
**Answer: Payment count is negative binomial with $r = 6$, $\beta = 0.30$; mean $= 1.80$.** (Sanity check: thinning a mean-3 count by 0.6 gives $0.6 \times 3 = 1.8$.)

---

## Common Exam Traps

- **Confusing the negative-binomial $\beta$ with a probability.** $\beta$ is a *scale/odds* parameter, not in $[0,1]$. The "success probability" is $\frac{1}{1+\beta}$. Watch the parametrization — Loss Models uses $\beta$, not the textbook $p$ from Exam P.
- **Mis-signing $a$.** Binomial has $a < 0$; negative binomial/geometric have $a > 0$; Poisson has $a = 0$. Reversing these is the single most common error in identification problems.
- **Forgetting geometric is $b = 0$.** If you find $a > 0$ and $b = 0$, it's geometric (NB with $r = 1$), not "some other distribution."
- **(a,b,1) starts the recursion at $k = 2$, not $k = 1$.** The whole point is that $p_1$ relative to $p_0$ is *not* constrained by the recursion — only $p_2, p_3, \dots$ are.
- **Using the wrong base $p_0$ in the rescale factor.** In $p_k^M = \frac{1-p_0^M}{1-p_0}p_k$, the $p_0$ in the denominator is the **original** (untruncated) probability, and the $p_k$ on the right is the **original** probability — not the modified one.
- **Scaling the wrong parameter.** Exposure scales the "size" parameter ($\lambda$, $r$, or $m$). Thinning/coverage scales the "intensity" parameter ($\lambda$, $q$, or $\beta$). For Poisson both are $\lambda$, which masks the distinction — don't generalize the Poisson shortcut to NB/binomial.
- **Compound-variance formula order.** It is $\mathrm{E}[K]\text{Var}(M) + \text{Var}(K)(\mathrm{E}[M])^2$ — the *primary* variance multiplies the *squared secondary mean*. Swapping $K$ and $M$ gives the wrong answer.
- **PGF vs MGF.** The PGF uses $z^N$ (good for integer counts); the MGF uses $e^{tN}$. $\mathrm{E}[N] = P'(1)$, not $P'(0)$. And $P''(1) = \mathrm{E}[N(N-1)]$, a *factorial* moment — remember to add $P'(1)$ back when computing variance.
- **Thinning changes the family only for (a,b,0) members.** A zero-modified or compound distribution may not stay in the same family under thinning. Apply the "stays in family" shortcut only to plain Poisson/binomial/NB.

---

## Self-Check Questions

1. A claim-count data set has sample mean 1.5 and sample variance 0.9. Which of the four core distributions is the natural candidate, and why?
2. For a Poisson with $\lambda = 4$, write the (a,b,0) constants $a$ and $b$ and use the recursion to express $p_3$ in terms of $p_2$.
3. A distribution is zero-truncated Poisson with base $\lambda = 1$. Find $p_1^T$.
4. The PGF of $N$ is $P_N(z) = e^{2(z-1)}$. What is $\text{Var}(N)$? Identify the distribution.
5. Storm count is negative binomial with $r = 5$, $\beta = 0.4$. Each storm causes a Poisson($3$) number of claims. Find the mean and variance of total claims $N$.

### Answers

1. **Binomial.** Variance (0.9) < mean (1.5), i.e., underdispersion, which only the binomial among the four exhibits.
2. **Poisson:** $a = 0$, $b = \lambda = 4$. Recursion: $p_3 = \left(0 + \frac{4}{3}\right)p_2 = \frac{4}{3}p_2$.
3. Base $p_0 = e^{-1}$, $p_1 = e^{-1}$. Then $p_1^T = \dfrac{p_1}{1 - p_0} = \dfrac{e^{-1}}{1 - e^{-1}} = \dfrac{0.367879}{0.632121} = 0.58198 \approx \mathbf{0.5820}$.
4. $P_N(z) = e^{2(z-1)}$ is the **Poisson PGF with $\lambda = 2$**, so $\mathrm{E}[N] = 2$ and $\text{Var}(N) = \mathbf{2}$.
5. Primary $K \sim$ NB: $\mathrm{E}[K] = r\beta = 5(0.4) = 2$, $\text{Var}(K) = r\beta(1+\beta) = 2(1.4) = 2.8$. Secondary $M \sim$ Poisson(3): $\mathrm{E}[M] = 3$, $\text{Var}(M) = 3$.
   $\mathrm{E}[N] = 2 \times 3 = \mathbf{6}$;  $\text{Var}(N) = \mathrm{E}[K]\text{Var}(M) + \text{Var}(K)(\mathrm{E}[M])^2 = 2(3) + 2.8(9) = 6 + 25.2 = \mathbf{31.2}$.
