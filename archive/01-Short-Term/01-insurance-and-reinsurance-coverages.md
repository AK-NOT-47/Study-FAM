# Insurance and Reinsurance Coverages

> **Exam FAM — Short-Term Insurance**
> Notation follows *Loss Models: From Data to Decisions* (Klugman, Panjer, Willmot, 5th ed.).

---

## Learning Objectives

After studying this topic, you should be able to:

1. Define and apply the standard policy modifications that transform a **ground-up loss** $X$ into an **amount paid**: ordinary deductibles, franchise deductibles, policy limits, maximum covered losses, and coinsurance.
2. Distinguish the **per-loss** random variable $Y^L$ from the **per-payment** random variable $Y^P$, and compute their expected values, second moments, and variances.
3. Combine deductible + limit + coinsurance + inflation into the **general per-loss expected-payment formula** and evaluate it.
4. Compute and interpret the **loss elimination ratio (LER)** and the effect of **inflation** on expected payments.
5. Define the main **reinsurance arrangements** — proportional (quota share, surplus share) and non-proportional (excess of loss, stop-loss) — and split a loss between cedant (insurer) and reinsurer.
6. Define the **individual risk model** and the **collective risk model**, state their aggregate-loss distributions, and compute the mean and variance of aggregate losses under each.
7. Explain the key ways **short-term** insurance differs from **long-term** (life-contingent) insurance.

---

## Key Concepts

### 1. Ground-up loss vs. amount paid

Start with the **ground-up loss** $X \ge 0$: the full economic loss the policyholder suffers, before any policy provisions are applied. Coverage modifications shrink what the insurer actually pays. The two perspectives you must keep separate:

- **Per-loss variable** $Y^L$: the payment **per loss event**, including the zeros for losses that produce no payment (e.g., losses below the deductible). This is the natural variable for the *insurer*, because every loss event is one observation.
- **Per-payment variable** $Y^P$: the payment **conditional on a payment being made** ($Y^P = Y^L \mid Y^L > 0$). The zeros are discarded. This is what you observe in a *claims database* (you only see claims that were actually paid).

**Mantra:** *per-loss includes the zeros; per-payment conditions them away.* They are linked by
$$E[Y^P] = \frac{E[Y^L]}{\Pr(X > d)}.$$

### 2. Deductibles

- **Ordinary deductible** $d$: insurer pays $\max(X - d, 0) = (X-d)_+$. Below $d$ nothing is paid; above $d$ the deductible is subtracted. This is by far the most common.
- **Franchise deductible** $d$: if $X \le d$, pay 0; if $X > d$, pay the **full** $X$ (the deductible is *not* subtracted once exceeded). So the franchise pays $d$ more than the ordinary deductible whenever a payment is made.

Intuition: a deductible removes small, high-frequency, expensive-to-administer claims and gives the policyholder "skin in the game."

### 3. Policy limit vs. maximum covered loss

Be careful — these are **not** the same once a deductible is present.

- **Maximum covered loss** $u$: the largest *ground-up loss* the policy will recognize. The insurer caps the loss at $u$ before applying the deductible.
- **Policy limit**: the largest *payment* the insurer will make. With an ordinary deductible $d$ and maximum covered loss $u$, the policy limit is $u - d$.

The limited loss variable $X \wedge u = \min(X, u)$ is the workhorse here.

### 4. Coinsurance

A coinsurance factor $\alpha$ ($0 < \alpha \le 1$) means the insurer pays only the fraction $\alpha$ of the (post-deductible, post-limit) amount; the policyholder retains $1-\alpha$. Coinsurance is applied **last**, after deductible and limit.

### 5. Inflation

Uniform inflation at rate $r$ scales every loss to $(1+r)X$. Deductibles and limits are stated in nominal dollars and do **not** inflate, so inflation increases the *fraction* of losses that clear the deductible — payments grow faster than $r$.

### 6. Reinsurance — splitting the loss again

Reinsurance is "insurance for insurers." The **cedant** (direct insurer) transfers part of its risk to a **reinsurer**. Two families:

- **Proportional**: reinsurer takes a fixed *fraction* of every loss.
  - **Quota share** with retention $\alpha$: cedant keeps $\alpha X$, reinsurer pays $(1-\alpha)X$, on **every** loss. Premiums and losses are split in the same ratio.
  - **Surplus share**: applies per-risk. The cedant sets a **retention line** $R$. For a risk with sum insured $M$, the cedant retains the fraction $\min(R, M)/M$ and cedes the rest. So large risks are ceded more heavily; small risks ($M \le R$) are kept entirely.
- **Non-proportional**: reinsurer pays only the part of the loss above a **retention** (an "attachment point") — this is structurally a deductible held by the cedant.
  - **Excess of loss (XL)** with retention $d$: applies to **individual** losses. Cedant pays $\min(X, d)$, reinsurer pays $(X - d)_+$.
  - **Stop-loss**: applies to **aggregate** losses $S$ over a period. Cedant pays $\min(S, d)$, reinsurer pays $(S-d)_+$. A stop-loss is just an XL treaty written on the aggregate $S$ instead of on each $X$.

Recognise the recurring algebra: every retention/deductible produces a $(\cdot - d)_+$ for the upper layer and a $\min(\cdot, d)$ for the lower layer, and the two always sum to the whole.

### 7. Two aggregate-loss models

Aggregate loss $S$ = total of all claims in a period. Two standard constructions:

- **Individual risk model**: $S = X_1 + X_2 + \cdots + X_n$, a **fixed** number $n$ of policies, each $X_i$ the (possibly zero) loss on policy $i$. The $X_i$ need not be identically distributed. Natural for a group of $n$ distinct insureds (e.g., group life).
- **Collective risk model**: $S = X_1 + \cdots + X_N$, where $N$ (the **claim count / frequency**) is itself **random**, and the $X_i$ (the **severities**) are i.i.d., independent of $N$. This is a **compound distribution** (compound Poisson, compound negative binomial, etc.).

### 8. Short-term vs. long-term insurance

| Feature | Short-term (FAM-S, Loss Models) | Long-term (FAM-L, AMLCR) |
|---|---|---|
| Coverage period | One year or less, frequently renewed | Decades (whole life, pensions) |
| Main random element | Loss **amount/severity** and **frequency** | **Timing of death/survival** |
| Time value of money | Often ignored (short horizon) | Central — heavy discounting |
| Typical lines | Auto, home, health, liability | Life insurance, annuities, pensions |
| Number of claims per policy | 0, 1, or many | Usually exactly one (death) |
| Models | Frequency–severity, aggregate loss | Survival models, life tables |

---

## Formulas

Throughout, $X \ge 0$ is the ground-up loss with survival function $S_X(x)=\Pr(X>x)$.

### Limited expected value

$$E[X \wedge u] = \int_0^u S_X(x)\,dx = \int_0^u \big(1 - F_X(x)\big)\,dx.$$

Symbols: $u$ = maximum covered loss (cap); $X \wedge u = \min(X,u)$.

### Ordinary deductible — per loss

$$Y^L = (X - d)_+ = \max(X - d, 0), \qquad E[(X-d)_+] = E[X] - E[X \wedge d].$$

Symbols: $d$ = deductible.

### Ordinary deductible — per payment

$$Y^P = (X - d) \mid X > d, \qquad E[Y^P] = \frac{E[X] - E[X \wedge d]}{S_X(d)} = \frac{E[(X-d)_+]}{1 - F_X(d)}.$$

### Franchise deductible

$$E[Y^L_{\text{franchise}}] = E[(X-d)_+] + d\,S_X(d), \qquad
E[Y^P_{\text{franchise}}] = E[Y^P_{\text{ordinary}}] + d.$$

### Loss elimination ratio (LER)

The fraction of expected ground-up loss removed by a deductible $d$:
$$\text{LER}(d) = \frac{E[X \wedge d]}{E[X]}.$$

### Layer (deductible + maximum covered loss), per loss

For coverage of the layer from $d$ to $u$ (insurer pays $(X\wedge u) - (X \wedge d)$):
$$E[(X \wedge u) - (X \wedge d)] = E[X \wedge u] - E[X \wedge d].$$

### General per-loss expected payment (the "master formula")

With coinsurance $\alpha$, inflation $r$, deductible $d$, maximum covered loss $u$ (all $d, u$ stated in pre-inflation dollars):

$$E[Y^L] = \alpha (1+r)\left[ E\!\left(X \wedge \tfrac{u}{1+r}\right) - E\!\left(X \wedge \tfrac{d}{1+r}\right) \right].$$

Symbols: $\alpha$ = coinsurance fraction paid by insurer; $r$ = inflation rate; $d$ = deductible; $u$ = maximum covered loss; the policy limit (max payment) is $\alpha(u-d)$.

The **per-payment** version divides by the probability of a payment:
$$E[Y^P] = \frac{E[Y^L]}{S_X\!\left(\frac{d}{1+r}\right)}.$$

### Second moment / variance of $Y^L$ and $Y^P$

For an ordinary deductible (no coinsurance/limit), using $Z = (X-d)_+$:
$$E[Z^2] = E\big[(X-d)_+^2\big], \qquad \operatorname{Var}(Y^L) = E[Z^2] - \big(E[Z]\big)^2.$$
$$E\big[(Y^P)^2\big] = \frac{E[Z^2]}{S_X(d)}, \qquad \operatorname{Var}(Y^P) = E[(Y^P)^2] - (E[Y^P])^2.$$

### Reinsurance splits

**Quota share**, cedant retention $\alpha$:
$$\text{Cedant} = \alpha X, \quad \text{Reinsurer} = (1-\alpha) X, \quad \operatorname{Var}(\text{Reinsurer}) = (1-\alpha)^2 \operatorname{Var}(X).$$

**Surplus share**, retention line $R$, sum insured $M$ (cession fraction $c = \max(0, (M-R)/M)$):
$$\text{Reinsurer pays} = c \cdot X, \qquad \text{Cedant pays} = (1-c)\,X.$$

**Excess of loss (XL)** per loss, retention $d$:
$$\text{Cedant} = X \wedge d, \quad \text{Reinsurer} = (X-d)_+, \quad E[\text{Reinsurer}] = E[X] - E[X \wedge d].$$

**Stop-loss** on aggregate $S$, retention $d$:
$$\text{Reinsurer} = (S-d)_+, \qquad E[(S-d)_+] = E[S] - E[S \wedge d].$$
For discrete $S$:
$$E[(S-d)_+] = \sum_{s > d} (s-d)\,\Pr(S=s).$$

### Individual risk model

$$S = \sum_{i=1}^{n} X_i, \qquad E[S] = \sum_{i=1}^n E[X_i], \qquad \operatorname{Var}(S) = \sum_{i=1}^n \operatorname{Var}(X_i) \ \ (\text{independent } X_i).$$

If each policy pays benefit $b_i$ with probability $q_i$ and 0 otherwise:
$$E[X_i] = b_i q_i, \qquad \operatorname{Var}(X_i) = b_i^2 q_i (1 - q_i).$$

### Collective risk model (compound distribution)

$$S = \sum_{i=1}^{N} X_i, \quad N \perp \{X_i\}, \ X_i \text{ i.i.d.}$$
$$E[S] = E[N]\,E[X],$$
$$\operatorname{Var}(S) = E[N]\operatorname{Var}(X) + \operatorname{Var}(N)\,\big(E[X]\big)^2.$$

Symbols: $N$ = number of claims (frequency); $X$ = severity of one claim. For the **compound Poisson** with $N \sim \text{Poisson}(\lambda)$, since $\operatorname{Var}(N)=E[N]=\lambda$:
$$E[S] = \lambda E[X], \qquad \operatorname{Var}(S) = \lambda\, E[X^2].$$

---

## Worked Examples

### Example 1 — Deductible, limit, coinsurance, inflation (master formula)

Losses $X$ are exponential with mean $\theta = 1000$. A policy has ordinary deductible $d = 500$, maximum covered loss $u = 5000$, and coinsurance $\alpha = 0.80$. All losses are subject to **10% inflation** next year (the deductible and limit are unchanged). Find next year's **expected payment per loss**.

For an exponential, $E[X \wedge m] = \theta(1 - e^{-m/\theta})$.

Use the master formula with $r = 0.10$, so $\frac{d}{1+r} = 500/1.1 = 454.545$ and $\frac{u}{1+r} = 5000/1.1 = 4545.455$.

$$E\!\left[X \wedge \tfrac{u}{1+r}\right] = 1000\big(1 - e^{-4545.455/1000}\big) = 1000(1 - e^{-4.545455}) = 1000(1 - 0.010600) = 989.400.$$
$$E\!\left[X \wedge \tfrac{d}{1+r}\right] = 1000\big(1 - e^{-454.545/1000}\big) = 1000(1 - e^{-0.454545}) = 1000(1 - 0.634764) = 365.236.$$

Difference $= 989.400 - 365.236 = 624.164$. Apply $\alpha(1+r) = 0.80 \times 1.10 = 0.88$:
$$E[Y^L] = 0.88 \times 624.164 = 549.26.$$

**Answer:** $E[Y^L] \approx \boxed{549.3}$ per loss.

---

### Example 2 — Per-loss vs. per-payment with a deductible

Losses are exponential with mean $\theta = 2000$. An ordinary deductible of $d = 1000$ applies. Find (a) $E[Y^L]$, (b) the probability a loss produces a payment, and (c) $E[Y^P]$.

For an exponential, the memoryless property gives a clean result.

(a) $E[Y^L] = E[(X-d)_+] = E[X] - E[X\wedge d] = \theta - \theta(1 - e^{-d/\theta}) = \theta e^{-d/\theta}.$
$$E[Y^L] = 2000\,e^{-1000/2000} = 2000\,e^{-0.5} = 2000(0.606531) = 1213.06.$$

(b) $\Pr(X > d) = e^{-d/\theta} = e^{-0.5} = 0.606531.$

(c) $E[Y^P] = \dfrac{E[Y^L]}{\Pr(X>d)} = \dfrac{1213.06}{0.606531} = 2000.$
(Memorylessness: conditional on exceeding $d$, the excess is again exponential with mean $\theta$.)

**Answer:** (a) $\boxed{1213.06}$, (b) $\boxed{0.6065}$, (c) $\boxed{2000}$.

---

### Example 3 — Stop-loss reinsurance on a discrete aggregate

Aggregate annual losses $S$ have the distribution:

| $s$ | 0 | 1000 | 2000 | 3000 | 4000 |
|---|---|---|---|---|---|
| $\Pr(S=s)$ | 0.40 | 0.25 | 0.20 | 0.10 | 0.05 |

A stop-loss reinsurance with retention $d = 1500$ is purchased. Find the **expected reinsurance payment** $E[(S-1500)_+]$.

Only outcomes with $s > 1500$ contribute:
$$
\begin{aligned}
E[(S-1500)_+] &= (2000-1500)(0.20) + (3000-1500)(0.10) + (4000-1500)(0.05)\\
&= 500(0.20) + 1500(0.10) + 2500(0.05)\\
&= 100 + 150 + 125 = 375.
\end{aligned}
$$

Check via $E[S] - E[S \wedge 1500]$:
$E[S] = 1000(0.25)+2000(0.20)+3000(0.10)+4000(0.05) = 250+400+300+200 = 1150.$
$E[S\wedge 1500] = 0(0.40)+1000(0.25)+1500(0.20+0.10+0.05) = 250 + 1500(0.35) = 250+525 = 775.$
$E[S]-E[S\wedge 1500] = 1150-775 = 375.$ ✓

**Answer:** $E[(S-1500)_+] = \boxed{375}$.

---

### Example 4 — Collective risk model mean and variance

Claim counts $N \sim \text{Poisson}(\lambda = 3)$. Severities $X$ are exponential with mean $500$ (so $E[X]=500$, $E[X^2]=2\theta^2 = 2(500)^2 = 500{,}000$, $\operatorname{Var}(X)=500^2=250{,}000$). Find $E[S]$ and $\operatorname{Var}(S)$.

Compound Poisson shortcuts:
$$E[S] = \lambda E[X] = 3 \times 500 = 1500.$$
$$\operatorname{Var}(S) = \lambda\,E[X^2] = 3 \times 500{,}000 = 1{,}500{,}000.$$

(Equivalently $\operatorname{Var}(S) = E[N]\operatorname{Var}(X) + \operatorname{Var}(N)(E[X])^2 = 3(250{,}000) + 3(250{,}000) = 1{,}500{,}000$.)

**Answer:** $E[S] = \boxed{1500}$, $\operatorname{Var}(S) = \boxed{1{,}500{,}000}$ (std dev $\approx 1224.7$).

---

### Example 5 — Individual risk model (group life)

A group has 3 independent members. Member $i$ pays benefit $b_i$ on death (prob $q_i$):

| $i$ | $b_i$ | $q_i$ |
|---|---|---|
| 1 | 100 | 0.10 |
| 2 | 200 | 0.05 |
| 3 | 300 | 0.02 |

Find $E[S]$ and $\operatorname{Var}(S)$ where $S = X_1+X_2+X_3$.

$E[X_i] = b_i q_i$: $\ 100(0.10)=10,\ 200(0.05)=10,\ 300(0.02)=6.$ Sum $E[S]=26.$

$\operatorname{Var}(X_i)=b_i^2 q_i(1-q_i)$:
- $X_1: 100^2(0.10)(0.90)=10{,}000(0.09)=900.$
- $X_2: 200^2(0.05)(0.95)=40{,}000(0.0475)=1900.$
- $X_3: 300^2(0.02)(0.98)=90{,}000(0.0196)=1764.$

$\operatorname{Var}(S) = 900+1900+1764 = 4564.$

**Answer:** $E[S] = \boxed{26}$, $\operatorname{Var}(S) = \boxed{4564}$.

---

## Common Exam Traps

1. **Per-loss vs. per-payment confusion.** If the problem says "average payment **per payment**," divide $E[Y^L]$ by $S_X(d)$. If it says "per loss" (or "expected cost to the insurer per loss"), do **not** divide. Read carefully — this single division is the most common point lost on this topic.

2. **Policy limit ≠ maximum covered loss.** When a deductible $d$ is present, a stated **policy limit** $L$ (max payment) means the maximum covered loss is $u = L + d$. Plugging the limit directly in as $u$ understates the cap.

3. **Order of operations.** Always: cap at $u$ → subtract deductible $d$ → apply coinsurance $\alpha$ → (inflation scales the loss first). Applying coinsurance before the deductible, or inflating the deductible, gives wrong answers.

4. **Inflated deductible.** Deductibles and limits are nominal and fixed. In the master formula you divide $d$ and $u$ by $(1+r)$ *inside* the limited expectations and multiply the *outside* by $(1+r)$ — never inflate $d$ itself.

5. **Franchise deductible.** Remember the franchise pays $d$ **more** than the ordinary deductible *per payment* (add $d\,S_X(d)$ per loss). Candidates routinely treat it like an ordinary deductible.

6. **Compound variance formula.** $\operatorname{Var}(S) = E[N]\operatorname{Var}(X) + \operatorname{Var}(N)(E[X])^2$ — do **not** write $\operatorname{Var}(N)\operatorname{Var}(X)$. For compound Poisson the shortcut is $\lambda E[X^2]$ (uses the **second moment**, not the variance, of severity).

7. **Individual vs. collective model mix-up.** Individual model has a **fixed** $n$ and possibly **non-identical** $X_i$; you sum variances directly. Collective model has **random** $N$ and **i.i.d.** severities; you must use the compound variance formula. Using the wrong one is a classic error.

8. **Quota share variance.** Reinsurer's variance is $(1-\alpha)^2 \operatorname{Var}(X)$ — the proportion is **squared**.

9. **Excess of loss vs. stop-loss.** XL attaches to **each individual loss** $X$; stop-loss attaches to the **aggregate** $S$. Applying the retention to the wrong quantity is a guaranteed wrong answer.

10. **Forgetting to subtract.** $E[(X-d)_+] = E[X] - E[X\wedge d]$. Candidates sometimes compute $E[X \wedge d]$ and report it as the deductible payment — that's the *eliminated* amount, not the payment.

---

## Self-Check Questions

1. A policy has ordinary deductible 250 and you are told the expected cost **per payment** is 1800. The probability a loss exceeds the deductible is 0.40. What is the expected cost **per loss**?

2. State the master per-loss formula for expected payment with coinsurance $\alpha$, inflation $r$, deductible $d$, maximum covered loss $u$.

3. A quota-share treaty cedes 30% of every loss. If $\operatorname{Var}(X) = 4{,}000{,}000$, what is the variance of the reinsurer's payment?

4. In the collective risk model with $N\sim\text{Poisson}(\lambda)$, write $\operatorname{Var}(S)$ in terms of $\lambda$ and a moment of $X$. Which moment?

5. A franchise deductible of 300 applies to losses with $\Pr(X>300)=0.6$ and ordinary per-loss expected payment $E[(X-300)_+]=900$. What is the expected payment **per loss** under the franchise deductible?

### Answers

1. Per loss $= E[Y^P] \times \Pr(X>d) = 1800 \times 0.40 = \mathbf{720}$.

2. $E[Y^L] = \alpha(1+r)\left[E\!\left(X \wedge \frac{u}{1+r}\right) - E\!\left(X \wedge \frac{d}{1+r}\right)\right]$.

3. Reinsurer pays $0.30 X$, so variance $= (0.30)^2 \times 4{,}000{,}000 = 0.09 \times 4{,}000{,}000 = \mathbf{360{,}000}$.

4. $\operatorname{Var}(S) = \lambda\,E[X^2]$ — the **second (raw) moment** of severity (because for Poisson $\operatorname{Var}(N)=E[N]=\lambda$, which collapses the general formula to $\lambda E[X^2]$).

5. Franchise per-loss $= E[(X-300)_+] + d\,S_X(300) = 900 + 300(0.6) = 900 + 180 = \mathbf{1080}$.
