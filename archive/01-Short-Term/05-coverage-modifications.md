# Coverage Modifications

> **Exam FAM — Short-Term Actuarial Mathematics**
> Reference: Klugman, Panjer & Willmot, *Loss Models: From Data to Decisions*

---

## Learning Objectives

After mastering this topic you should be able to:

- Define and compute the **per-loss random variable** $Y^L$ and the **per-payment random variable** $Y^P$, and explain how they differ.
- Calculate the effect of an **ordinary deductible** $d$, a **policy limit** $u$ (or maximum covered loss), a **coinsurance factor** $\alpha$, and **inflation** $(1+r)$ on both the severity distribution and aggregate losses.
- Compute **expected cost per loss** and **expected cost per payment**.
- Compute and interpret the **Loss Elimination Ratio (LER)**.
- Work with the **limited expected value** $E[X \wedge u]$ and use it as the building block for almost every coverage-modification computation.
- Handle a **franchise deductible** and contrast it with an ordinary deductible.
- Combine deductible, limit, coinsurance, and inflation **in the correct order** to find expected payments, variances, and moments.
- Find the second moment / variance of $Y^L$ and $Y^P$, including using $E[(X \wedge u)^2]$.

---

## Key Concepts

### The ground-up loss $X$

Everything starts with the **ground-up loss** $X$ — the full economic loss to the policyholder before any policy provisions are applied. The insurer rarely pays $X$ in full; the policy *modifies* coverage through deductibles, limits, and coinsurance.

### Ordinary deductible $d$

With an **ordinary deductible** $d$, the insurer pays nothing on the first $d$ of loss and pays the excess above $d$:

- If $X \le d$: payment is $0$.
- If $X > d$: payment is $X - d$.

There are two natural ways to record payments, and **keeping them straight is the single most important idea in this topic.**

### Per-loss vs. per-payment: the central distinction

- **Per-loss variable $Y^L$**: defined for *every* loss event, including those that produce a payment of $0$. So $Y^L = 0$ whenever $X \le d$. This is a **mixed** random variable (a point mass at 0 plus a continuous piece).

$$ Y^L = (X-d)_+ = \begin{cases} 0 & X \le d \\ X - d & X > d \end{cases} $$

- **Per-payment variable $Y^P$**: defined *only* when a payment actually occurs, i.e. conditional on $X > d$. It is $Y^L$ conditioned on $Y^L > 0$:

$$ Y^P = X - d \mid X > d $$

**Intuition:** $Y^L$ answers "averaged over all losses, how much do we pay?" $Y^P$ answers "given that we wrote a check, how big was it?" Because $Y^P$ excludes the zero payments, its mean is always **larger** than the mean of $Y^L$. The link between them is the survival probability $S_X(d) = P(X > d)$:

$$ E[Y^P] = \frac{E[Y^L]}{S_X(d)} $$

This is just the definition of conditional expectation: $E[Y^L] = E[Y^P]\cdot P(\text{payment}) + 0 \cdot P(\text{no payment})$.

### Expected cost per loss vs. expected cost per payment

- **Expected cost per loss** $= E[Y^L]$ — the right quantity for **aggregate** / **pure premium** calculations, because you can multiply it by the expected *number of losses*.
- **Expected cost per payment** $= E[Y^P]$ — the right quantity when you only observe (or only care about) the claims that generate a payment, e.g. when the frequency is the number of *payments*.

### Limited expected value $E[X \wedge u]$ — your master tool

Define the **limited loss variable** $X \wedge u = \min(X, u)$. Its mean, the **limited expected value (LEV)**, is

$$ E[X \wedge u] = \int_0^u S_X(x)\,dx \quad\text{(for } X \ge 0\text{)}. $$

Almost every coverage-modification expectation can be written as a difference of LEVs. The key identity:

$$ E[(X-d)_+] = E[X] - E[X \wedge d]. $$

So the **expected cost per loss with deductible $d$** equals $E[X] - E[X\wedge d]$. With a policy limit too (see below), everything becomes $E[X\wedge \cdot] - E[X\wedge \cdot]$.

### Policy limit vs. maximum covered loss

A common point of confusion. Let $u$ be the **maximum covered loss** — the largest ground-up loss for which extra loss still increases the payment. With deductible $d$ and maximum covered loss $u$ (where $u > d$):

- The **policy limit** (the most the insurer will pay, before coinsurance) is $u - d$.
- The censoring of the loss happens at $u$, not at the policy limit.

So "limit" in the formulas refers to the **maximum covered loss $u$**, and the **maximum payment** is $u-d$.

### Coinsurance $\alpha$

A **coinsurance factor** $\alpha$ (with $0 < \alpha \le 1$) means the insurer pays only a fraction $\alpha$ of the modified loss. It multiplies the whole payment.

### Inflation $(1+r)$

Inflation by rate $r$ scales the **ground-up loss before any provisions**: losses become $(1+r)X$. Because deductibles and limits are fixed dollar amounts, inflation does **not** scale them — it effectively makes the (fixed) deductible and limit "smaller" relative to losses. The standard trick: a uniform scaling of $X$ by $(1+r)$ turns $E[X\wedge u]$ into $(1+r)\,E\!\left[X \wedge \frac{u}{1+r}\right]$.

### Loss Elimination Ratio (LER)

The **LER** measures the fraction of expected ground-up loss that is *eliminated* by introducing a deductible $d$:

$$ \mathrm{LER}(d) = \frac{E[X \wedge d]}{E[X]} = \frac{E[X] - E[(X-d)_+]}{E[X]}. $$

It ranges from $0$ (no deductible) to $1$ (deductible so large nothing is ever paid). "Eliminated" = the part the *insurer no longer pays* because of the deductible.

### Franchise deductible

A **franchise deductible** $d$ pays **nothing** if $X \le d$, but pays the **full loss $X$** (not $X-d$) once $X > d$:

$$ Y^L_{\text{franchise}} = \begin{cases} 0 & X \le d \\ X & X > d \end{cases} $$

Compared to the ordinary deductible, the franchise pays an *extra* $d$ on every payment. Hence:

$$ E[Y^L_{\text{franchise}}] = E[(X-d)_+] + d\,S_X(d), \qquad E[Y^P_{\text{franchise}}] = E[Y^P_{\text{ordinary}}] + d. $$

---

## Formulas

**Symbols used throughout:**
- $X$ = ground-up loss ($X \ge 0$); $f_X, F_X, S_X = 1-F_X$ are its pdf, cdf, survival function.
- $d$ = ordinary deductible; $u$ = maximum covered loss ($u > d$); policy limit $= u-d$.
- $\alpha$ = coinsurance factor; $r$ = inflation rate.
- $Y^L$ = per-loss payment; $Y^P$ = per-payment payment.
- $X \wedge u = \min(X,u)$; $(X-d)_+ = \max(X-d,0)$.

### Limited expected value

$$ E[X \wedge u] = \int_0^u x\,f_X(x)\,dx + u\,S_X(u) = \int_0^u S_X(x)\,dx. $$

$$ E[(X \wedge u)^2] = \int_0^u x^2 f_X(x)\,dx + u^2 S_X(u). $$

### Deductible only (ordinary)

$$ \boxed{E[Y^L] = E[(X-d)_+] = E[X] - E[X\wedge d]} $$

$$ \boxed{E[Y^P] = \frac{E[X]-E[X\wedge d]}{S_X(d)}} $$

### Deductible + limit (no coinsurance, no inflation)

Payment per loss $= (X\wedge u) - (X \wedge d)$. Therefore:

$$ E[Y^L] = E[X\wedge u] - E[X\wedge d], \qquad E[Y^P] = \frac{E[X\wedge u] - E[X\wedge d]}{S_X(d)}. $$

### Full combination — deductible, limit, coinsurance, inflation (the master formula)

Apply provisions in this **order**: (1) inflate the loss, (2) deductible, (3) limit/censor, (4) coinsurance. The expected cost **per loss** is

$$ \boxed{\,E[Y^L] = \alpha(1+r)\left[\,E\!\left[X \wedge \tfrac{u}{1+r}\right] - E\!\left[X \wedge \tfrac{d}{1+r}\right]\right]\,} $$

and the expected cost **per payment** divides by the probability that a payment occurs, $S_X\!\left(\tfrac{d}{1+r}\right)$:

$$ \boxed{\,E[Y^P] = \frac{\alpha(1+r)\left[\,E\!\left[X \wedge \tfrac{u}{1+r}\right] - E\!\left[X \wedge \tfrac{d}{1+r}\right]\right]}{S_X\!\left(\tfrac{d}{1+r}\right)}\,} $$

Here $d/(1+r)$ and $u/(1+r)$ are the deductible and maximum covered loss expressed in *pre-inflation* loss units.

### Second moment and variance (for $Y^L$ with deductible $d$, limit $u$, $\alpha$, $r$)

Let $\tilde d = d/(1+r)$, $\tilde u = u/(1+r)$. Then

$$ E[(Y^L)^2] = \alpha^2 (1+r)^2 \Big( E[(X\wedge \tilde u)^2] - E[(X\wedge \tilde d)^2] - 2\tilde d\big(E[X\wedge \tilde u]-E[X\wedge \tilde d]\big)\Big). $$

$$ \mathrm{Var}(Y^L) = E[(Y^L)^2] - \big(E[Y^L]\big)^2. $$

For the **per-payment** moments, divide each per-loss moment by $S_X(\tilde d)$ before taking the variance:

$$ E[(Y^P)^2] = \frac{E[(Y^L)^2]}{S_X(\tilde d)}, \qquad \mathrm{Var}(Y^P) = E[(Y^P)^2] - \big(E[Y^P]\big)^2. $$

### Loss Elimination Ratio

$$ \mathrm{LER}(d) = \frac{E[X\wedge d]}{E[X]}. $$

### Franchise deductible

$$ E[Y^L_{\text{fr}}] = E[(X-d)_+] + d\,S_X(d), \qquad E[Y^P_{\text{fr}}] = \frac{E[(X-d)_+]}{S_X(d)} + d. $$

---

## Worked Examples

### Example 1 — Per-loss vs. per-payment with an exponential severity

Losses $X$ are exponential with mean $\theta = 1000$, so $S_X(x)=e^{-x/1000}$. A policy has an ordinary deductible $d = 500$. Find (a) the expected cost per loss, (b) the expected cost per payment.

**Step 1 — LEV of an exponential.** For $X\sim$ Exponential($\theta$),
$$ E[X\wedge d] = \theta\left(1 - e^{-d/\theta}\right). $$
With $\theta=1000,\ d=500$: $E[X\wedge 500] = 1000(1-e^{-0.5}) = 1000(1-0.606531) = 393.469.$

**Step 2 — Expected cost per loss.**
$$ E[Y^L] = E[X]-E[X\wedge d] = 1000 - 393.469 = 606.531. $$
(Sanity check: for an exponential, the memoryless property gives $E[(X-d)_+] = \theta e^{-d/\theta} = 1000 e^{-0.5} = 606.531.$ ✓)

**Step 3 — Expected cost per payment.** Divide by $S_X(500)=e^{-0.5}=0.606531$:
$$ E[Y^P] = \frac{606.531}{0.606531} = 1000. $$
(Memoryless property: the conditional excess of an exponential is again Exponential($\theta$), mean $1000$. ✓)

**Answer:** $E[Y^L] = \mathbf{606.53}$, $E[Y^P] = \mathbf{1000}$.

---

### Example 2 — Full combination: deductible, limit, coinsurance, inflation

Ground-up losses $X$ are uniform on $[0, 10000]$. Next year a policy has deductible $d = 1000$, maximum covered loss $u = 8000$, coinsurance $\alpha = 0.80$, and losses inflate by $r = 0.05$. Find the expected cost **per loss** for next year.

**Step 1 — Pre-inflation thresholds.**
$$ \tilde d = \frac{1000}{1.05} = 952.381, \qquad \tilde u = \frac{8000}{1.05} = 7619.048. $$

**Step 2 — LEV of a uniform $(0,b)$.** For $X\sim U(0,b)$ with $b=10000$,
$$ E[X\wedge m] = m - \frac{m^2}{2b}, \quad 0\le m \le b. $$

At $\tilde u = 7619.048$:
$$ E[X\wedge \tilde u] = 7619.048 - \frac{7619.048^2}{20000} = 7619.048 - 2902.494 = 4716.554. $$

At $\tilde d = 952.381$:
$$ E[X\wedge \tilde d] = 952.381 - \frac{952.381^2}{20000} = 952.381 - 45.351 = 907.030. $$

**Step 3 — Apply the master formula.**
$$ E[Y^L] = \alpha(1+r)\big(E[X\wedge\tilde u] - E[X\wedge \tilde d]\big) = 0.80(1.05)(4716.554 - 907.030). $$
$$ = 0.84 \times 3809.524 = 3200.00. $$

**Answer:** Expected cost per loss $= \mathbf{3200.00}$.

---

### Example 3 — Loss Elimination Ratio and a franchise deductible comparison

Losses $X$ follow a Pareto distribution with $\alpha = 3$, $\theta = 2000$ (so $S_X(x) = \left(\frac{2000}{x+2000}\right)^3$). A deductible $d = 1000$ is introduced.
(a) Find the LER. (b) Find the expected cost per **payment** under an *ordinary* deductible. (c) Find the expected cost per **payment** under a *franchise* deductible.

**Step 1 — Pareto moments.** Mean: $E[X] = \dfrac{\theta}{\alpha-1} = \dfrac{2000}{2} = 1000.$

Limited expected value for Pareto:
$$ E[X\wedge d] = \frac{\theta}{\alpha-1}\left[1 - \left(\frac{\theta}{d+\theta}\right)^{\alpha-1}\right]. $$
With $\alpha=3,\ \theta=2000,\ d=1000$:
$$ \frac{\theta}{d+\theta} = \frac{2000}{3000} = 0.66667, \qquad \left(0.66667\right)^{2} = 0.44444. $$
$$ E[X\wedge 1000] = 1000\,(1 - 0.44444) = 555.556. $$

**Step 2 — (a) LER.**
$$ \mathrm{LER}(1000) = \frac{E[X\wedge 1000]}{E[X]} = \frac{555.556}{1000} = 0.55556. $$

**Answer (a):** $\mathrm{LER} = \mathbf{0.5556}$ (about 55.6% of expected loss is eliminated).

**Step 3 — (b) Ordinary deductible, per payment.**
Expected cost per loss: $E[(X-d)_+] = E[X]-E[X\wedge d] = 1000 - 555.556 = 444.444.$
Probability of a payment: $S_X(1000) = \left(\frac{2000}{3000}\right)^3 = (0.66667)^3 = 0.296296.$
$$ E[Y^P_{\text{ord}}] = \frac{444.444}{0.296296} = 1500.00. $$

**Answer (b):** Ordinary per payment $= \mathbf{1500.00}$.

**Step 4 — (c) Franchise deductible, per payment.** The franchise pays an extra $d=1000$ on each payment:
$$ E[Y^P_{\text{fr}}] = E[Y^P_{\text{ord}}] + d = 1500.00 + 1000 = 2500.00. $$

**Answer (c):** Franchise per payment $= \mathbf{2500.00}$.

---

## Common Exam Traps

1. **Dividing by the wrong survival probability.** $E[Y^P] = E[Y^L]/S_X(d)$. When inflation is present, the divisor is $S_X\big(\tfrac{d}{1+r}\big)$ — evaluated at the *deflated* deductible, **not** $S_X(d)$. Forgetting the $1/(1+r)$ inside the survival function is a classic error.

2. **Confusing maximum covered loss $u$ with the policy limit $u-d$.** The LEV is taken at the **maximum covered loss $u$**, not at the policy limit. If the problem gives you the policy limit, add the deductible to get $u$ before plugging into $E[X\wedge u]$.

3. **Applying provisions in the wrong order.** Correct order: **inflate, then deductible, then limit, then coinsurance.** Coinsurance $\alpha$ and the inflation factor $(1+r)$ multiply the *outside* of the bracketed difference of LEVs; deductible and limit thresholds get *divided* by $(1+r)$ inside.

4. **Scaling the deductible/limit by inflation.** Deductibles and limits are fixed contract dollar amounts; they do **not** inflate. Only the loss $X$ inflates. The algebra moves the $(1+r)$ outward and divides the thresholds — a frequent sign/placement mistake.

5. **Using $E[Y^P]$ where $E[Y^L]$ belongs (and vice versa) in aggregate calculations.** For aggregate loss = (frequency of *losses*) × (severity), use $E[Y^L]$. Only use $E[Y^P]$ when the frequency counts *payments*.

6. **Franchise deductible: forgetting the extra $d$.** A franchise pays the *full* loss once $X>d$. Per payment it is exactly $d$ more than the ordinary deductible; per loss it is $E[(X-d)_+] + d\,S_X(d)$.

7. **Variance shortcuts that don't exist.** $\mathrm{Var}(Y^P) \ne \mathrm{Var}(Y^L)/S_X(d)$. You must compute $E[(Y^P)^2] = E[(Y^L)^2]/S_X(d)$ first, then subtract $(E[Y^P])^2$. Coinsurance contributes $\alpha^2$ to second moments, not $\alpha$.

8. **Dropping the $-2\tilde d(\cdots)$ cross term** in $E[(Y^L)^2]$ when both a deductible and a limit are present. The squared payment is $((X\wedge u)-(X\wedge d))^2$, which expands with a cross term.

---

## Self-Check Questions

1. State the relationship between $E[Y^L]$ and $E[Y^P]$ for an ordinary deductible $d$, and explain why $E[Y^P]$ is always at least as large.

2. A policy has deductible 500 and maximum covered loss 5000. What is the *policy limit* (the largest possible payment, ignoring coinsurance)?

3. Losses are exponential with mean 2000. Compute the LER for a deductible of 1000. (Use $E[X\wedge d]=\theta(1-e^{-d/\theta})$.)

4. With deductible $d$, limit $u$, coinsurance $\alpha$, and inflation $r$, write the expected cost per loss as a difference of limited expected values.

5. A franchise deductible of 300 applies to losses that are Pareto with $E[(X-300)_+]=700$ and $S_X(300)=0.5$. Find the expected cost per *payment*.

### Answers

1. $E[Y^P] = E[Y^L]/S_X(d)$. Since $0 < S_X(d) \le 1$, dividing by it can only increase (or keep equal) the value. Intuitively, $Y^P$ excludes the zero-payment losses ($X\le d$), so averaging only over actual payments raises the mean.

2. Policy limit $= u - d = 5000 - 500 = \mathbf{4500}$.

3. $E[X\wedge 1000] = 2000(1-e^{-0.5}) = 2000(1-0.606531) = 786.939.$ $\mathrm{LER} = 786.939/2000 = \mathbf{0.3935}.$

4. $E[Y^L] = \alpha(1+r)\Big(E\big[X\wedge \tfrac{u}{1+r}\big] - E\big[X\wedge \tfrac{d}{1+r}\big]\Big).$

5. Ordinary per payment $= 700/0.5 = 1400$. Franchise adds $d=300$: $E[Y^P_{\text{fr}}] = 1400 + 300 = \mathbf{1700}.$
