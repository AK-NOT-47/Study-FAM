# Life Insurance Present Values

> **Textbook:** Dickson, Hardy & Waters, *Actuarial Mathematics for Life Contingent Risks* (AMLCR), Chapter 4.
> **Notation reminders:** $T_x$ = future lifetime random variable of a life aged $x$ (continuous); $K_x = \lfloor T_x \rfloor$ = curtate future lifetime (integer years completed); $v = 1/(1+i)$ = annual discount factor; $\delta = \ln(1+i)$ = force of interest.

---

## Learning Objectives

After mastering this topic you should be able to:

- Define the **present-value-of-benefit random variable** $Z$ for each standard insurance and write its functional form in terms of $T_x$ or $K_x$.
- Compute the **Expected Present Value** (EPV), also called the **Actuarial Present Value** (APV) or the **net single premium**, denoted with the standard $A$-symbols.
- Distinguish the **continuous** ($\bar{A}_x$, benefit paid at the moment of death) from the **discrete** ($A_x$, benefit paid at end of year of death) and the **$1/m$-thly** ($A_x^{(m)}$, end of $1/m$-year of death) models.
- Handle the five building blocks: **whole life, term, endowment, deferred, and pure endowment** insurances, plus combinations.
- Compute the **variance** of $Z$ using the "second-moment-at-double-force" rule.
- Use **recursion relationships** to move between ages.
- **Relate continuous to discrete** functions under the **Uniform Distribution of Deaths (UDD)** assumption and the claims-acceleration approximation.
- Describe and quantify the **effect of the interest rate** on EPVs.

---

## Key Concepts

### 1. The random variable comes first

Everything in this chapter starts from a single random variable: **the present value, at issue, of whatever benefit the contract pays.** Call it $Z$. Because the time of payment depends on when the life dies, $Z$ is a function of $T_x$ (continuous models) or $K_x$ (discrete models).

The **EPV is just $E[Z]$**. The **variance of the loss** is $\text{Var}(Z)$. If you can write down $Z$ correctly, every quantity in the chapter follows mechanically. Candidates who memorize $A$-formulas without understanding $Z$ get stuck the moment a problem is phrased differently.

### 2. The three timing conventions

A death benefit of 1 paid on a life $(x)$:

| Convention | Symbol | Benefit paid at... | $Z$ |
|---|---|---|---|
| Continuous | $\bar{A}_x$ | the **moment** of death, $T_x$ | $v^{T_x} = e^{-\delta T_x}$ |
| Discrete (annual) | $A_x$ | the **end of the year** of death, $K_x + 1$ | $v^{K_x+1}$ |
| $1/m$-thly | $A_x^{(m)}$ | the **end of the $1/m$-year** of death | $v^{(\text{next } 1/m\text{-point})}$ |

Continuous is the "purest" but life tables are integer-age, so in practice we compute $A_x$ from the table and convert. The benefit is discounted from a **later** point as we move continuous → $1/m$-thly → annual, so:
$$\bar{A}_x \;\ge\; A_x^{(m)} \;\ge\; A_x \quad (\text{larger } m \Rightarrow \text{closer to } \bar{A}_x).$$

### 3. The five building blocks

- **Whole life** $A_x$: benefit of 1 whenever death occurs, no matter how far in the future.
- **$n$-year term** $A^{1}_{x:\overline{n}|}$: benefit of 1 **only if death occurs within $n$ years**. The "1" sits over the $x$, marking that the *death* benefit is the one contingent on dying first.
- **$n$-year pure endowment** $A^{\;\;1}_{x:\overline{n}|}$ (= $\;_{n}E_x$): benefit of 1 paid at time $n$ **only if the life survives** to $n$. The "1" sits over the $n$, marking that *survival* is what triggers payment.
- **$n$-year endowment insurance** $A_{x:\overline{n}|}$: pays 1 at death if death is within $n$ years, **or** 1 at time $n$ if the life survives. It is the **sum** of the term and the pure endowment.
- **$u$-year deferred** $\,_{u|}A_x$ (deferred whole life), or $\,_{u|}A^1_{x:\overline{n}|}$ (deferred term): coverage doesn't start until time $u$.

The single most useful structural identity:
$$\boxed{A_{x:\overline{n}|} = A^{1}_{x:\overline{n}|} + A^{\;\;1}_{x:\overline{n}|} = A^{1}_{x:\overline{n}|} + \,_{n}E_x.}$$

### 4. Variance via "double force of interest"

Because $Z$ is a power of $v$, the **square** of $Z$ is the same power of $v^2 = e^{-2\delta}$. So:
$$E[Z^2] = E[(v^{T})^2] = E[(e^{-2\delta T})] = (\text{the same EPV but at force } 2\delta).$$

We write $^2A_x$ for "the whole-life EPV computed at force of interest $2\delta$" (equivalently rate $j = 2i + i^2$, since $1+j = (1+i)^2$). Then:
$$\text{Var}(Z) = {}^{2}A_x - (A_x)^2.$$
The pre-superscript "2" **always** means "recompute at double force." This is the workhorse of the whole chapter.

### 5. Effect of interest

Higher $i$ ⇒ stronger discounting ⇒ **lower EPV** for death benefits. As $i \to 0$, $v \to 1$ and $A_x \to 1$ (a benefit of 1 is certain to be paid eventually for whole life, and a present value of 1 has no discount). As $i \to \infty$, $A_x \to 0$. The EPV is a **decreasing function of $i$**.

---

## Formulas

**Symbols:** $\,_tp_x$ = probability $(x)$ survives $t$ years; $\,_tq_x$ = probability $(x)$ dies within $t$ years; $\mu_{x+t}$ = force of mortality at age $x+t$; $f_{T_x}(t) = \,_tp_x\,\mu_{x+t}$ = density of $T_x$; $d_{x+k}/l_x = \,_{k|}q_x = \,_kp_x\cdot q_{x+k}$ = probability of dying in year $k+1$.

### Continuous insurances (benefit at moment of death)

Whole life:
$$\bar{A}_x = E[v^{T_x}] = \int_0^{\infty} e^{-\delta t}\, {}_tp_x\,\mu_{x+t}\,dt.$$

$n$-year term:
$$\bar{A}^{1}_{x:\overline{n}|} = \int_0^{n} e^{-\delta t}\, {}_tp_x\,\mu_{x+t}\,dt.$$

$n$-year pure endowment (no continuous/discrete distinction — payment is at a fixed time $n$):
$$_{n}E_x = A^{\;\;1}_{x:\overline{n}|} = e^{-\delta n}\, {}_np_x = v^{n}\, {}_np_x.$$

$n$-year endowment insurance:
$$\bar{A}_{x:\overline{n}|} = \bar{A}^{1}_{x:\overline{n}|} + {}_{n}E_x.$$

$u$-year deferred whole life:
$$_{u|}\bar{A}_x = \int_u^{\infty} e^{-\delta t}\, {}_tp_x\,\mu_{x+t}\,dt = {}_uE_x \cdot \bar{A}_{x+u} = \bar{A}_x - \bar{A}^{1}_{x:\overline{u}|}.$$

### Discrete insurances (benefit at end of year of death)

Whole life:
$$A_x = E[v^{K_x+1}] = \sum_{k=0}^{\infty} v^{k+1}\, {}_kp_x\,q_{x+k} = \sum_{k=0}^{\infty} v^{k+1}\, {}_{k|}q_x.$$

$n$-year term:
$$A^{1}_{x:\overline{n}|} = \sum_{k=0}^{n-1} v^{k+1}\, {}_kp_x\,q_{x+k}.$$

$n$-year endowment insurance:
$$A_{x:\overline{n}|} = A^{1}_{x:\overline{n}|} + {}_{n}E_x = \sum_{k=0}^{n-1} v^{k+1}\, {}_{k|}q_x \;+\; v^{n}\,{}_np_x.$$

$u$-year deferred whole life:
$$_{u|}A_x = {}_uE_x\cdot A_{x+u} = A_x - A^{1}_{x:\overline{u}|}.$$

### Variances (square the benefit ⇒ double the force, $1+j=(1+i)^2$)

$$\text{Var}(v^{T_x}) = {}^{2}\bar{A}_x - \left(\bar{A}_x\right)^2, \qquad \text{Var}(v^{K_x+1}) = {}^{2}A_x - \left(A_x\right)^2.$$

For endowment insurance (the most-tested variance):
$$\text{Var}\!\left(Z_{x:\overline{n}|}\right) = {}^{2}A_{x:\overline{n}|} - \left(A_{x:\overline{n}|}\right)^2,$$
where ${}^{2}A_{x:\overline{n}|} = {}^{2}A^{1}_{x:\overline{n}|} + {}^{2}\!\left({}_nE_x\right)$ and ${}^{2}\!\left({}_nE_x\right) = v^{2n}\,{}_np_x$.

### Recursions (move one age at a time)

Whole life (the backward recursion — memorize this one):
$$\boxed{A_x = v\,q_x + v\,p_x\,A_{x+1}.}$$
Read it as: "in the next year you either die (prob $q_x$, pay 1 discounted one year) or survive (prob $p_x$, and you now hold the contract $A_{x+1}$, discounted one year)."

Term insurance:
$$A^{1}_{x:\overline{n}|} = v\,q_x + v\,p_x\,A^{1}_{x+1:\overline{n-1}|}.$$

Endowment insurance:
$$A_{x:\overline{n}|} = v\,q_x + v\,p_x\,A_{x+1:\overline{n-1}|}, \qquad A_{x:\overline{1}|} = v.$$

### Relating $1/m$-thly and continuous to discrete

**Under UDD** (deaths uniform over each year of age), the death-benefit pieces scale by a constant factor:
$$\bar{A}_x = \frac{i}{\delta}\,A_x, \qquad A_x^{(m)} = \frac{i}{i^{(m)}}\,A_x,$$
and likewise for **term** insurance: $\bar{A}^1_{x:\overline{n}|} = \frac{i}{\delta}A^1_{x:\overline{n}|}$, $\;A^{1(m)}_{x:\overline{n}|} = \frac{i}{i^{(m)}}A^1_{x:\overline{n}|}$.

**Endowment insurance** — convert only the **term** (death) part; the **pure endowment** is already paid at a fixed time and is unchanged:
$$\bar{A}_{x:\overline{n}|} = \frac{i}{\delta}\,A^{1}_{x:\overline{n}|} + {}_{n}E_x, \qquad A^{(m)}_{x:\overline{n}|} = \frac{i}{i^{(m)}}\,A^{1}_{x:\overline{n}|} + {}_{n}E_x.$$

Here $i^{(m)} = m\left[(1+i)^{1/m} - 1\right]$ is the nominal rate compounded $m$ times per year, and $\delta = \ln(1+i)$. Note $\frac{i}{\delta} > \frac{i}{i^{(m)}} > 1$, consistent with $\bar{A}_x \ge A_x^{(m)} \ge A_x$.

### Link to annuities (cross-chapter, very common)

$$A_{x:\overline{n}|} = 1 - d\,\ddot{a}_{x:\overline{n}|}, \qquad A_x = 1 - d\,\ddot{a}_x, \qquad \bar{A}_x = 1 - \delta\,\bar{a}_x,$$
where $d = iv = 1 - v$ is the annual discount rate.

---

## Worked Examples

### Example 1 — Whole life EPV and variance (constant force)

A life aged $x$ has **constant force of mortality** $\mu = 0.02$ for all ages. The force of interest is $\delta = 0.05$. Benefit 1 payable at the moment of death.
Find $\bar{A}_x$, $\text{Var}(v^{T_x})$, and the standard deviation.

**Solution.** With constant force, $\,_tp_x = e^{-\mu t}$ and the density is $\mu e^{-\mu t}$:
$$\bar{A}_x = \int_0^\infty e^{-\delta t}\,\mu e^{-\mu t}\,dt = \frac{\mu}{\mu + \delta} = \frac{0.02}{0.02 + 0.05} = \frac{0.02}{0.07} = 0.285714.$$

For the second moment, replace $\delta$ by $2\delta = 0.10$:
$$^{2}\bar{A}_x = \frac{\mu}{\mu + 2\delta} = \frac{0.02}{0.02 + 0.10} = \frac{0.02}{0.12} = 0.166667.$$

$$\text{Var}(v^{T_x}) = {}^{2}\bar{A}_x - \left(\bar{A}_x\right)^2 = 0.166667 - (0.285714)^2 = 0.166667 - 0.081633 = 0.085034.$$

Standard deviation $= \sqrt{0.085034} = 0.291606$.

**Answer:** $\bar{A}_x = 0.28571$, $\;\text{Var} = 0.08503$, $\;\text{SD} = 0.29161$.

---

### Example 2 — Endowment insurance via its two pieces, and UDD conversion

You are given, for a life aged 50: $A^{1}_{50:\overline{10}|} = 0.04$ (10-year term), $\,_{10}p_{50} = 0.92$, $i = 0.05$. Deaths follow **UDD** within each year.
(a) Find the discrete 10-year endowment insurance $A_{50:\overline{10}|}$.
(b) Find the **continuous** endowment insurance $\bar{A}_{50:\overline{10}|}$.

**Solution.**
First the pure endowment: $v^{10} = 1.05^{-10} = 0.613913$, so
$$_{10}E_{50} = v^{10}\,{}_{10}p_{50} = 0.613913 \times 0.92 = 0.564800.$$

**(a)** Discrete endowment = term + pure endowment:
$$A_{50:\overline{10}|} = 0.04 + 0.564800 = 0.604800.$$

**(b)** Convert **only the term part** with the UDD factor $\frac{i}{\delta}$, where $\delta = \ln 1.05 = 0.0487902$:
$$\frac{i}{\delta} = \frac{0.05}{0.0487902} = 1.024797.$$
$$\bar{A}^{1}_{50:\overline{10}|} = 1.024797 \times 0.04 = 0.040992.$$
$$\bar{A}_{50:\overline{10}|} = 0.040992 + 0.564800 = 0.605792.$$

**Answer:** (a) $A_{50:\overline{10}|} = 0.60480$. (b) $\bar{A}_{50:\overline{10}|} = 0.60579$.

---

### Example 3 — Discrete whole life from a mini life table, plus a recursion check

A life table gives, for ages 90–93 (terminal age 93, so $q_{92}=1$):

| $x$ | $l_x$ |
|---|---|
| 90 | 1000 |
| 91 | 700 |
| 92 | 400 |
| 93 | 0 |

Interest $i = 0.06$, so $v = 1/1.06 = 0.943396$. Find $A_{90}$ (benefit at end of year of death), then verify with the recursion $A_{90} = v q_{90} + v p_{90} A_{91}$.

**Solution.** Deaths: $d_{90}=300$, $d_{91}=300$, $d_{92}=400$. Death-year probabilities from age 90:
$$_{0|}q_{90} = 300/1000 = 0.30,\quad {}_{1|}q_{90} = 300/1000 = 0.30,\quad {}_{2|}q_{90} = 400/1000 = 0.40.$$

Direct sum (benefit paid at end of years 1, 2, 3):
$$A_{90} = v^{1}(0.30) + v^{2}(0.30) + v^{3}(0.40).$$
$v^1 = 0.943396,\; v^2 = 0.889996,\; v^3 = 0.839619.$
$$A_{90} = 0.943396(0.30) + 0.889996(0.30) + 0.839619(0.40)$$
$$= 0.283019 + 0.266999 + 0.335848 = 0.885865.$$

**Recursion check.** Need $A_{91}$ first. From age 91: $\,_{0|}q_{91} = 300/700$, $\,_{1|}q_{91} = 400/700$.
$$A_{91} = v(300/700) + v^2(400/700) = 0.943396(0.428571) + 0.889996(0.571429)$$
$$= 0.404312 + 0.508569 = 0.912881.$$
Now $q_{90} = 300/1000 = 0.30$, $p_{90} = 0.70$:
$$A_{90} = v\,q_{90} + v\,p_{90}\,A_{91} = 0.943396(0.30) + 0.943396(0.70)(0.912881)$$
$$= 0.283019 + 0.602846 = 0.885865. \;\checkmark$$

**Answer:** $A_{90} = 0.88587$ (both methods agree).

---

## Common Exam Traps

- **Converting the wrong part of an endowment insurance.** Under UDD you multiply **only the term/death piece** by $i/\delta$ (or $i/i^{(m)}$). The **pure endowment** $_nE_x$ is paid at a fixed time and is **never** rescaled. Applying $i/\delta$ to the whole $A_{x:\overline{n}|}$ is the #1 error.
- **Off-by-one in the discrete benefit.** $A_x = \sum v^{k+1}\,{}_{k|}q_x$ — the exponent is $k+1$ (end of year of death), not $k$. The first term is $v^1 q_x$, not $v^0 q_x$.
- **Forgetting "double force" means $1+j=(1+i)^2$, not $2i$.** For variances use $\delta\to 2\delta$ or rate $j = (1+i)^2 - 1 = 2i + i^2$. For pure endowment, $^2(_nE_x) = v^{2n}\,{}_np_x$ — the survival probability is **not** squared, only the discount.
- **Squaring the EPV before subtracting.** $\text{Var} = {}^2A - A^2$. People compute $^2A$ correctly but forget to subtract $(A)^2$, or subtract $^2A^2$.
- **Misplacing the "1" in the symbol.** $A^1_{x:\overline{n}|}$ (1 over $x$) = **term** (death) benefit; $A^{\;1}_{x:\overline{n}|}$ (1 over $n$) = **pure endowment** (survival) benefit. Swapping them swaps the whole problem.
- **Using $\frac{i}{\delta}$ for the variance of a continuous insurance.** The UDD relation $\bar{A}_x = \frac{i}{\delta}A_x$ holds for first moments. For the **second** moment you need $^2\bar{A}_x = \frac{i}{2\delta}\,{}^2A_x$ — i.e. the factor is computed at **double force** in both numerator and denominator. (Numerator stays $i$ only because $i$ at single force; use $\frac{(1+i)^2 - 1}{2\delta}\cdot{}^2A_x$ if you derive it carefully, but the clean memorizable form is $^2\bar{A}_x = \frac{2i+i^2}{2\delta}\,{}^2A_x$.)
- **Deferred vs. term sign error.** $_{u|}A_x = A_x - A^1_{x:\overline{u}|}$ (subtract the term you skipped), and $_{u|}A_x = {}_uE_x \cdot A_{x+u}$. Don't add when you should subtract.
- **Treating $A_x$ as a probability.** It is an expected present value (it lies in $(0,1)$ only because $v<1$), not a probability. As $i\to 0$, $A_x\to 1$ regardless of mortality.

---

## Self-Check Questions

1. Write the present-value random variable $Z$ for an $n$-year **endowment insurance** of 1 on $(x)$, in terms of $K_x$.
2. You have $A_x = 0.30$ at $i=0.05$ under UDD. What is $\bar{A}_x$? (Give the formula and the number.)
3. Given $^2A_{40} = 0.085$ and $A_{40} = 0.20$, find $\text{Var}(v^{K_{40}+1})$.
4. For a 5-year pure endowment with $\,_5p_{60}=0.95$ and $i = 0.04$, compute $_5E_{60}$.
5. True/False: To convert a discrete **endowment insurance** to continuous under UDD, multiply the entire $A_{x:\overline{n}|}$ by $i/\delta$. Explain.

### Answers

1. $Z = v^{K_x+1}$ if $K_x < n$ (death in first $n$ years), and $Z = v^{n}$ if $K_x \ge n$ (survival to $n$). Compactly, $Z = v^{\min(K_x+1,\,n)}$.

2. $\bar{A}_x = \frac{i}{\delta}A_x$ with $\delta = \ln 1.05 = 0.0487902$, so $\frac{i}{\delta} = 1.024797$ and $\bar{A}_x = 1.024797 \times 0.30 = 0.307439 \approx 0.30744$.

3. $\text{Var} = {}^2A_{40} - (A_{40})^2 = 0.085 - 0.20^2 = 0.085 - 0.040 = 0.045$.

4. $_5E_{60} = v^5\,{}_5p_{60} = 1.04^{-5}\times 0.95 = 0.821927 \times 0.95 = 0.780831 \approx 0.78083$.

5. **False.** Only the **term (death-benefit) component** $A^1_{x:\overline{n}|}$ gets the $i/\delta$ factor. The pure endowment $_nE_x$ is paid at the fixed time $n$ and is unchanged: $\bar{A}_{x:\overline{n}|} = \frac{i}{\delta}A^1_{x:\overline{n}|} + {}_nE_x$.
