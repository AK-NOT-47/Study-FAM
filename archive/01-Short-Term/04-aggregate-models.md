# Aggregate Loss Models

## Learning Objectives

By the end of this topic, the SOA expects you to be able to:

- Construct and distinguish between the **collective risk model** ($S = X_1 + X_2 + \dots + X_N$) and the **individual risk model** ($S = X_1 + X_2 + \dots + X_n$ with fixed $n$).
- Compute the **mean and variance** of aggregate losses $S$ using the compound moment formulas.
- Recognize and exploit the special properties of the **compound Poisson** distribution (additivity, simplified variance).
- Compute the distribution of $S$ via **convolution** for discrete severities, and find probabilities such as $\Pr(S = k)$ and $\Pr(S \le k)$.
- Apply the **Panjer (a, b, 0) recursion** to build the aggregate distribution efficiently.
- Compute **stop-loss premiums** $E[(S - d)_+]$, both exactly (discrete) and via the layer/limited-expected-value relationships.
- Approximate the distribution of $S$ using the **normal** and **lognormal** approximations (moment matching), and compute probabilities and stop-loss premiums from those approximations.

## Key Concepts

### Two ways to build aggregate losses

Aggregate losses $S$ for a portfolio over a period can be modeled two ways:

**Collective risk model (compound model):**
$$S = X_1 + X_2 + \dots + X_N,$$
where $N$ is a **random** number of claims (the *frequency*) and each $X_i$ is the *severity* (size) of an individual claim. Key assumptions:

1. $N, X_1, X_2, \dots$ are mutually independent.
2. The $X_i$ are i.i.d. with the same severity distribution.
3. $N$ is independent of the values of the $X_i$.

Here $S$ is a **random sum** — both the number of terms and the size of each term are random. When $N = 0$, we define $S = 0$.

**Individual risk model:**
$$S = X_1 + X_2 + \dots + X_n,$$
where $n$ is a **fixed**, known number of policies. Each $X_i$ is the loss on policy $i$. The $X_i$ are independent but **not necessarily identically distributed** (different policies can have different distributions). Typically each $X_i = I_i B_i$, where $I_i$ is a Bernoulli "did a claim occur" indicator and $B_i$ is the claim amount given a claim occurs.

Intuition: the *collective* model thinks "how many claims hit the whole book, and how big is each"; the *individual* model thinks "policy by policy, what's the loss on each."

### Compound distributions

When $N$ is random, $S$ has a **compound distribution**. Its name comes from the frequency: a **compound Poisson** has $N \sim \text{Poisson}$, a **compound negative binomial** has $N \sim$ negative binomial, etc.

The mean and variance come from conditioning on $N$ (double expectation / law of total variance). The key results are the most-tested formulas on this entire topic.

### Why compound Poisson is special

If $N \sim \text{Poisson}(\lambda)$, two beautiful things happen:

1. **Variance simplifies**: $\text{Var}(S) = \lambda \, E[X^2]$ (the second moment of severity, not the variance).
2. **Additivity**: The sum of independent compound Poisson random variables is again compound Poisson, with $\lambda = \sum \lambda_j$ and a severity distribution that is the $\lambda$-weighted mixture of the individual severities.

### Convolutions

To get the *exact* distribution of a sum of independent random variables, you **convolve**. For two independent discrete random variables $X$ and $Y$:
$$\Pr(X + Y = k) = \sum_{j} \Pr(X = j)\Pr(Y = k - j).$$
The $n$-fold convolution $f_X^{*n}$ is the distribution of $X_1 + \dots + X_n$. The aggregate distribution is then a frequency-weighted mixture of convolutions:
$$\Pr(S = x) = \sum_{n=0}^{\infty} \Pr(N = n)\, f_X^{*n}(x).$$
This is exact but slow. **Panjer recursion** replaces it with a fast recursion for an important class of frequencies.

### Stop-loss insurance

A **stop-loss** (or aggregate excess-of-loss) reinsurance with **retention/deductible** $d$ pays the insurer $(S - d)_+ = \max(S - d, 0)$. The **net stop-loss premium** is the expected payment:
$$E[(S - d)_+].$$
This is the aggregate analogue of an ordinary deductible on a single loss. It is convex and decreasing in $d$.

### Approximations

For large portfolios, computing the exact distribution is impractical, so we **moment-match** a simple distribution to $S$:

- **Normal approximation**: match $E[S]$ and $\text{Var}(S)$; treat $S \approx N(\mu, \sigma^2)$. Simple but can be poor in the right tail because $S$ is usually right-skewed.
- **Lognormal approximation**: match $E[S]$ and $E[S^2]$ to a lognormal, capturing skewness better.

## Formulas

### Mean and variance (general compound model)

Let $E[N], \text{Var}(N)$ be the frequency moments and $E[X], \text{Var}(X)$ the severity moments.

$$E[S] = E[N]\,E[X]$$

$$\text{Var}(S) = E[N]\,\text{Var}(X) + \text{Var}(N)\,\big(E[X]\big)^2$$

- $S$ — aggregate loss (random sum).
- $N$ — claim count (frequency).
- $X$ — individual claim size (severity); $E[X]$ first moment, $E[X^2] = \text{Var}(X) + (E[X])^2$ second moment.

Equivalent form using the second moment of severity (handy when you have $E[X^2]$):
$$\text{Var}(S) = E[N]\,E[X^2] + \big(\text{Var}(N) - E[N]\big)\big(E[X]\big)^2.$$

### Compound Poisson ($N \sim \text{Poisson}(\lambda)$)

Since $E[N] = \text{Var}(N) = \lambda$:
$$E[S] = \lambda\,E[X], \qquad \text{Var}(S) = \lambda\,E[X^2].$$

Third central moment (for skewness):
$$E\big[(S - E[S])^3\big] = \lambda\,E[X^3], \qquad \text{Skew}(S) = \frac{\lambda E[X^3]}{\big(\lambda E[X^2]\big)^{3/2}}.$$

**Additivity:** If $S_1, \dots, S_m$ are independent compound Poisson with parameters $\lambda_j$ and severity cdfs $F_j$, then $S = \sum_j S_j$ is compound Poisson with
$$\lambda = \sum_{j=1}^{m}\lambda_j, \qquad F_X(x) = \sum_{j=1}^{m}\frac{\lambda_j}{\lambda}\,F_j(x).$$

### Compound negative binomial / binomial frequency

If $N \sim \text{Negative Binomial}(r, \beta)$: $E[N] = r\beta$, $\text{Var}(N) = r\beta(1+\beta)$.
If $N \sim \text{Binomial}(m, q)$: $E[N] = mq$, $\text{Var}(N) = mq(1-q)$.
Plug into the general $E[S]$ and $\text{Var}(S)$ formulas above.

### Individual risk model

For $S = \sum_{i=1}^{n} X_i$ with independent (not necessarily identical) $X_i$:
$$E[S] = \sum_{i=1}^{n} E[X_i], \qquad \text{Var}(S) = \sum_{i=1}^{n} \text{Var}(X_i).$$

If $X_i = I_i B_i$ with $\Pr(I_i = 1) = q_i$ (claim probability) and $B_i$ the claim amount (independent of $I_i$):
$$E[X_i] = q_i\,E[B_i],$$
$$\text{Var}(X_i) = q_i\,\text{Var}(B_i) + q_i(1 - q_i)\big(E[B_i]\big)^2.$$
If the claim amount is a fixed constant $b_i$ (so $\text{Var}(B_i)=0$):
$$E[X_i] = q_i b_i, \qquad \text{Var}(X_i) = q_i(1-q_i)\,b_i^2.$$

### Convolution

Discrete severity on $0, 1, 2, \dots$ with pmf $f_X$:
$$f_X^{*n}(x) = \sum_{y} f_X^{*(n-1)}(x - y)\,f_X(y), \qquad f_X^{*0}(0) = 1.$$
$$f_S(x) = \Pr(S = x) = \sum_{n=0}^{\infty}\Pr(N = n)\,f_X^{*n}(x).$$

### Panjer recursion — the $(a, b, 0)$ class

A frequency $N$ is in the **$(a, b, 0)$ class** if its pmf $p_n = \Pr(N = n)$ satisfies
$$\frac{p_n}{p_{n-1}} = a + \frac{b}{n}, \qquad n = 1, 2, 3, \dots$$

| Distribution | $a$ | $b$ | $p_0$ |
|---|---|---|---|
| Poisson$(\lambda)$ | $0$ | $\lambda$ | $e^{-\lambda}$ |
| Binomial$(m, q)$ | $-\dfrac{q}{1-q}$ | $(m+1)\dfrac{q}{1-q}$ | $(1-q)^m$ |
| Neg. Binomial$(r, \beta)$ | $\dfrac{\beta}{1+\beta}$ | $(r-1)\dfrac{\beta}{1+\beta}$ | $(1+\beta)^{-r}$ |

With a severity defined on $0, 1, 2, \dots$ with pmf $f_X(j)$ (let $f_k = f_X(k)$), the aggregate pmf $g_s = \Pr(S = s)$ is built by:

**Starting value** (probability of zero aggregate loss):
$$g_0 = P_N\big(f_X(0)\big),$$
the probability generating function of $N$ evaluated at $f_X(0)$. Common cases:
- Poisson: $g_0 = e^{-\lambda(1 - f_0)}$.
- If $f_X(0) = 0$ (severity has no mass at 0): $g_0 = p_0 = \Pr(N=0)$.

**Recursion** for $s = 1, 2, 3, \dots$:
$$g_s = \frac{1}{1 - a\,f_0}\sum_{j=1}^{s}\left(a + \frac{b\,j}{s}\right) f_j\, g_{s-j}.$$
- $a, b$ — the frequency's $(a,b,0)$ parameters.
- $f_j = f_X(j)$ — severity pmf at $j$.
- $g_{s-j}$ — previously computed aggregate probabilities.

(If $f_0 = 0$, the $\frac{1}{1 - a f_0}$ factor is just $1$.)

### Stop-loss premium

General definition:
$$E[(S - d)_+] = \int_d^\infty \big(1 - F_S(x)\big)\,dx = \int_d^\infty (x - d)\,f_S(x)\,dx.$$

Relation to the mean and the limited expected value $E[S \wedge d]$:
$$E[(S - d)_+] = E[S] - E[S \wedge d].$$

**Discrete $S$** (mass points $0, 1, 2, \dots$), integer retention $d$:
$$E[(S - d)_+] = \sum_{x > d}(x - d)\,f_S(x) = \sum_{x=d}^{\infty}\big(1 - F_S(x)\big).$$

**Recursion across integer retentions** (very efficient on exams):
$$E[(S - (d+1))_+] = E[(S - d)_+] - \big(1 - F_S(d)\big).$$
Each unit increase in the deductible reduces the stop-loss premium by the survival probability at $d$.

### Normal approximation

Set $\mu = E[S]$, $\sigma^2 = \text{Var}(S)$. Then $S \approx N(\mu, \sigma^2)$:
$$\Pr(S \le s) \approx \Phi\!\left(\frac{s - \mu}{\sigma}\right).$$
Stop-loss premium under the normal approximation:
$$E[(S - d)_+] \approx \sigma\,\phi\!\left(\frac{d - \mu}{\sigma}\right) - (d - \mu)\left[1 - \Phi\!\left(\frac{d - \mu}{\sigma}\right)\right],$$
where $\phi$ is the standard normal pdf and $\Phi$ the standard normal cdf.

### Lognormal approximation

Match the first two moments of $S$ to a lognormal with parameters $\mu_L, \sigma_L$. Using $m_1 = E[S]$, $m_2 = E[S^2]$:
$$\sigma_L^2 = \ln\!\left(\frac{m_2}{m_1^2}\right), \qquad \mu_L = \ln m_1 - \tfrac{1}{2}\sigma_L^2.$$
Then for a lognormal,
$$\Pr(S \le s) \approx \Phi\!\left(\frac{\ln s - \mu_L}{\sigma_L}\right),$$
$$E[(S - d)_+] \approx e^{\mu_L + \sigma_L^2/2}\,\Phi\!\left(\frac{\mu_L + \sigma_L^2 - \ln d}{\sigma_L}\right) - d\left[1 - \Phi\!\left(\frac{\ln d - \mu_L}{\sigma_L}\right)\right].$$

## Worked Examples

### Example 1 — Mean and variance of a compound distribution

The number of claims $N$ has $E[N] = 5$ and $\text{Var}(N) = 8$ (negative-binomial-type). Claim severity $X$ has mean $E[X] = 200$ and variance $\text{Var}(X) = 30{,}000$. Find $E[S]$ and $\text{Var}(S)$.

**Solution.**

Mean:
$$E[S] = E[N]E[X] = 5 \times 200 = 1000.$$

Variance, using $\text{Var}(S) = E[N]\text{Var}(X) + \text{Var}(N)(E[X])^2$:
$$\text{Var}(S) = 5(30{,}000) + 8(200)^2 = 150{,}000 + 8(40{,}000) = 150{,}000 + 320{,}000 = 470{,}000.$$

**Answer:** $E[S] = 1000$, $\text{Var}(S) = 470{,}000$ (so $\text{SD}(S) \approx 685.6$).

### Example 2 — Compound Poisson with additivity and normal approximation

A book has two independent compound Poisson lines:
- Line A: $\lambda_A = 3$, severity is exponential with mean $100$ (so $E[X_A] = 100$, $E[X_A^2] = 2(100)^2 = 20{,}000$).
- Line B: $\lambda_B = 2$, severity is a constant $500$ (so $E[X_B] = 500$, $E[X_B^2] = 250{,}000$).

(a) Find $E[S]$ and $\text{Var}(S)$ for the combined book $S = S_A + S_B$.
(b) Use the normal approximation to estimate $\Pr(S > 3000)$.

**Solution.**

By additivity, $S$ is compound Poisson with $\lambda = 3 + 2 = 5$ and a mixed severity. We can just add moments of the two independent compound Poissons.

Means:
$$E[S_A] = 3(100) = 300, \quad E[S_B] = 2(500) = 1000, \quad E[S] = 1300.$$

Variances (compound Poisson: $\text{Var} = \lambda E[X^2]$):
$$\text{Var}(S_A) = 3(20{,}000) = 60{,}000,$$
$$\text{Var}(S_B) = 2(250{,}000) = 500{,}000,$$
$$\text{Var}(S) = 60{,}000 + 500{,}000 = 560{,}000.$$

So $\text{SD}(S) = \sqrt{560{,}000} \approx 748.33$.

(b) Normal approximation:
$$\Pr(S > 3000) \approx 1 - \Phi\!\left(\frac{3000 - 1300}{748.33}\right) = 1 - \Phi(2.272).$$
$\Phi(2.27) \approx 0.9884$, so the probability $\approx 1 - 0.9884 = 0.0116$.

**Answer:** $E[S] = 1300$, $\text{Var}(S) = 560{,}000$; $\Pr(S > 3000) \approx 0.0116$.

### Example 3 — Panjer recursion and a stop-loss premium

Claim frequency $N \sim \text{Poisson}(\lambda = 1.5)$. Severity $X$ is discrete with
$$f_X(1) = 0.5, \quad f_X(2) = 0.3, \quad f_X(3) = 0.2, \quad f_X(0) = 0.$$
(a) Use Panjer recursion to find $\Pr(S = 0), \Pr(S = 1), \Pr(S = 2), \Pr(S = 3)$.
(b) Find the stop-loss premium $E[(S - 2)_+]$.

**Solution.**

Poisson $(a, b, 0)$ parameters: $a = 0$, $b = \lambda = 1.5$. Since $f_0 = 0$, the recursion is
$$g_s = \sum_{j=1}^{s}\frac{b\,j}{s}\,f_j\,g_{s-j} = \frac{1.5}{s}\sum_{j=1}^{s} j\,f_j\,g_{s-j}.$$

**Starting value:** $g_0 = e^{-\lambda(1 - f_0)} = e^{-1.5} = 0.223130$.

**$s = 1$:**
$$g_1 = \frac{1.5}{1}\big[(1)(0.5)(g_0)\big] = 1.5(0.5)(0.223130) = 0.167348.$$

**$s = 2$:**
$$g_2 = \frac{1.5}{2}\big[(1)(0.5)(g_1) + (2)(0.3)(g_0)\big].$$
Inside: $(0.5)(0.167348) + (0.6)(0.223130) = 0.083674 + 0.133878 = 0.217552.$
$$g_2 = 0.75 \times 0.217552 = 0.163164.$$

**$s = 3$:**
$$g_3 = \frac{1.5}{3}\big[(1)(0.5)(g_2) + (2)(0.3)(g_1) + (3)(0.2)(g_0)\big].$$
Inside: $(0.5)(0.163164) + (0.6)(0.167348) + (0.6)(0.223130)$
$= 0.081582 + 0.100409 + 0.133878 = 0.315869.$
$$g_3 = 0.5 \times 0.315869 = 0.157934.$$

So:
$$\Pr(S=0)=0.22313,\ \Pr(S=1)=0.16735,\ \Pr(S=2)=0.16316,\ \Pr(S=3)=0.15793.$$

(b) Stop-loss with $d = 2$. Use $E[(S-2)_+] = E[S] - E[S\wedge 2]$, or sum survival functions $\sum_{x \ge 2}(1 - F_S(x))$. Easiest exact route here: $E[(S-d)_+] = E[S] - \sum_{x=0}^{d-1}\Pr(S>x)\cdot 1$... let us use the clean identity.

First $E[S] = \lambda E[X] = 1.5\,[(1)(0.5)+(2)(0.3)+(3)(0.2)] = 1.5(1.7) = 2.55.$

Now $E[(S-2)_+] = E[S] - E[S \wedge 2]$. Compute $E[S\wedge 2] = \sum_{x=1}^{2}\Pr(S \ge x)$ (for nonnegative integer $S$, $E[S\wedge d]=\sum_{x=0}^{d-1}\Pr(S>x)=\sum_{x=1}^{d}\Pr(S\ge x)$).

$\Pr(S \ge 1) = 1 - g_0 = 1 - 0.223130 = 0.776870.$
$\Pr(S \ge 2) = 1 - g_0 - g_1 = 1 - 0.223130 - 0.167348 = 0.609522.$
$$E[S\wedge 2] = 0.776870 + 0.609522 = 1.386392.$$
$$E[(S-2)_+] = 2.55 - 1.386392 = 1.163608.$$

**Answer:** $g_0=0.22313$, $g_1=0.16735$, $g_2=0.16316$, $g_3=0.15793$; and $E[(S-2)_+] \approx 1.1636$.

### Example 4 — Individual risk model

A group of 3 independent policies:
- Policy 1: claim prob $q_1 = 0.10$, fixed benefit $b_1 = 1$.
- Policy 2: claim prob $q_2 = 0.05$, fixed benefit $b_2 = 2$.
- Policy 3: claim prob $q_3 = 0.20$, fixed benefit $b_3 = 1$.

Find $E[S]$ and $\text{Var}(S)$.

**Solution.**

$E[X_i] = q_i b_i$:
$$E[S] = 0.10(1) + 0.05(2) + 0.20(1) = 0.10 + 0.10 + 0.20 = 0.40.$$

$\text{Var}(X_i) = q_i(1-q_i)b_i^2$:
$$\text{Var}(X_1) = 0.10(0.90)(1) = 0.090,$$
$$\text{Var}(X_2) = 0.05(0.95)(4) = 0.190,$$
$$\text{Var}(X_3) = 0.20(0.80)(1) = 0.160.$$
$$\text{Var}(S) = 0.090 + 0.190 + 0.160 = 0.440.$$

**Answer:** $E[S] = 0.40$, $\text{Var}(S) = 0.440$.

## Common Exam Traps

- **Using $\text{Var}(X)$ instead of $E[X^2]$ in the compound Poisson variance.** For compound Poisson, $\text{Var}(S) = \lambda\,E[X^2]$ — the **second raw moment**, not the variance. A frequent slip is plugging in $\text{Var}(X)$.
- **Forgetting the $(E[X])^2$ term in the general variance.** $\text{Var}(S) = E[N]\text{Var}(X) + \text{Var}(N)(E[X])^2$. Candidates routinely drop the second term.
- **Confusing the two models.** Collective: $N$ random, $X_i$ i.i.d. Individual: $n$ fixed, $X_i$ independent but possibly different. Their variance formulas are completely different — don't apply the compound variance formula to an individual-risk problem.
- **Panjer starting value.** $g_0 = P_N(f_0)$, the PGF of $N$ at $f_0 = \Pr(X=0)$. It equals $p_0 = \Pr(N=0)$ **only when $f_0 = 0$**. If severity has mass at 0 (e.g., a deductible truncates small losses to 0), you must use the full PGF, e.g. $e^{-\lambda(1-f_0)}$ for Poisson.
- **Panjer index/severity at 0.** The recursion sum runs $j = 1$ to $s$, and you need $f_0$ in the leading factor $1/(1 - a f_0)$. For Poisson $a = 0$, so that factor is 1 — but don't forget it for binomial/negative binomial where $a \ne 0$.
- **Severity must start at the right support.** Panjer requires severity on $0, 1, 2, \dots$. Rescale/round to a common monetary unit ("span") first; mismatched spans give wrong $g_s$.
- **Stop-loss sign and which tail.** $E[(S-d)_+]$ integrates the **survival** function $1 - F_S$ above $d$ (or sums $(x-d)f_S(x)$ for $x > d$). Don't accidentally use $F_S$ or include the mass at/below $d$.
- **Continuity correction confusion.** When approximating a discrete $S$ with the normal, the exam usually wants the plain $\Phi((s-\mu)/\sigma)$ unless a continuity correction is explicitly requested — but read carefully.
- **Lognormal parameterization.** $\sigma_L^2 = \ln(E[S^2]/E[S]^2)$ and $\mu_L = \ln E[S] - \tfrac12\sigma_L^2$. Mixing up which is $\mu_L$ vs $\sigma_L$, or using $\text{Var}(S)$ where $E[S^2]$ is needed, is a classic error.
- **Additivity only for compound Poisson.** You can merge independent compound Poissons into one compound Poisson. This does **not** hold for compound negative binomial or compound binomial.

## Self-Check Questions

1. Frequency $N$ has mean 4 and variance 6; severity $X$ has mean 50 and variance 900. Find $E[S]$ and $\text{Var}(S)$.
2. For a compound Poisson with $\lambda = 10$ and severity having $E[X] = 3$, $E[X^2] = 20$, what are $E[S]$ and $\text{Var}(S)$?
3. State the Panjer starting value $g_0$ for a compound Poisson with $\lambda = 2$ when the severity has $f_X(0) = 0.25$.
4. Two independent compound Poissons have $\lambda_1 = 4, \lambda_2 = 6$. What is $\lambda$ for the combined compound Poisson, and how is the combined severity cdf formed?
5. Given an integer-valued $S$ with $E[S] = 5$ and $E[(S-3)_+] = 2.4$, find $E[S \wedge 3]$.

### Answers

1. $E[S] = 4(50) = 200$. $\text{Var}(S) = 4(900) + 6(50)^2 = 3600 + 15{,}000 = 18{,}600$.
2. $E[S] = \lambda E[X] = 10(3) = 30$. $\text{Var}(S) = \lambda E[X^2] = 10(20) = 200$.
3. $g_0 = e^{-\lambda(1 - f_0)} = e^{-2(1 - 0.25)} = e^{-1.5} \approx 0.22313$.
4. $\lambda = \lambda_1 + \lambda_2 = 10$. The combined severity is the mixture $F_X(x) = \frac{4}{10}F_1(x) + \frac{6}{10}F_2(x)$ (weights proportional to the $\lambda_j$).
5. $E[S \wedge 3] = E[S] - E[(S-3)_+] = 5 - 2.4 = 2.6$.
