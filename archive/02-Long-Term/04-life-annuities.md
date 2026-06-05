# Life Annuities

## Learning Objectives

By the end of this topic, the SOA expects you to be able to:

- Define and compute the **expected present value (EPV)** of life annuities under various forms: whole life, temporary (*n*-year), deferred, and certain-and-life (guaranteed).
- Distinguish between **annuity-due** ($\ddot{a}_x$, payments at the *start* of each period), **annuity-immediate** ($a_x$, payments at the *end*), and **continuous** ($\bar{a}_x$, paid continuously) annuities.
- Compute **$m$-thly** life annuities (payments $m$ times per year).
- Apply the fundamental **annuity-insurance relationship** $\ddot{a}_x = \dfrac{1 - A_x}{d}$ and its continuous analog $\bar{a}_x = \dfrac{1 - \bar{A}_x}{\delta}$.
- Use **recursion** formulas to step values forward/backward by age.
- Compute the **variance** of the present value random variable of a life annuity.
- Apply the **Woolhouse approximation** for $m$-thly and continuous annuities.
- Compute **accumulated values** of life annuities.

---

## Key Concepts

### What is a life annuity?

A **life annuity** is a series of payments made *contingent on survival*. The annuitant receives each payment only if alive at the payment date. Because future payments depend on survival, the present value of the payment stream is a **random variable** (it depends on the random future lifetime $T_x$ or curtate lifetime $K_x$), and we are usually interested in its expected value — the **EPV**.

Contrast with **insurance** (Topic on Life Insurance): insurance pays a benefit *on death*; an annuity pays *while alive*. They are two sides of the same coin, which is exactly why the relationship $\ddot{a}_x = (1 - A_x)/d$ exists.

### Building intuition: a life annuity is a bundle of pure endowments

Think of a whole life annuity-due paying \$1 per year. The payment at time $k$ (for $k = 0, 1, 2, \dots$) happens only if $(x)$ survives to age $x+k$. The EPV of that single payment is a **pure endowment**: $v^k \, {}_k p_x$. Summing over all $k$ gives the annuity EPV:

$$\ddot{a}_x = \sum_{k=0}^{\infty} v^k \, {}_k p_x.$$

This "sum of pure endowments" view is the most reliable way to build any annuity formula from scratch — if you forget a formula, write down which payments occur, when, and with what survival probability.

### Due vs. immediate

- **Annuity-due** $\ddot{a}_x$: payments at times $0, 1, 2, \dots$ (start of year). The first payment is certain (made at time 0).
- **Annuity-immediate** $a_x$: payments at times $1, 2, 3, \dots$ (end of year). No payment at time 0.

The only difference is the time-0 payment, so:
$$\ddot{a}_x = 1 + a_x.$$
For an *n*-year temporary annuity the difference is the time-0 payment **and** the timing of the last payment, giving $\ddot{a}_{x:\overline{n}|} = 1 + a_{x:\overline{n-1}|}$ (be careful with subscripts — see Traps).

### Continuous annuity

A **continuous** life annuity $\bar{a}_x$ pays at a *rate* of \$1 per year, continuously, while $(x)$ is alive:
$$\bar{a}_x = \int_0^\infty v^t \, {}_t p_x \, dt = \int_0^\infty e^{-\delta t}\,{}_t p_x\, dt.$$

### Temporary and deferred

- **Temporary** ($n$-year): payments only for at most $n$ years (while alive *and* within the term).
- **Deferred** ($u$-year deferred): no payments for the first $u$ years; payments begin at age $x+u$ if alive. Notation: ${}_{u|}\ddot{a}_x$.

A clean decomposition: a whole life annuity = (temporary $n$-year) + ($n$-year deferred):
$$\ddot{a}_x = \ddot{a}_{x:\overline{n}|} + {}_{n|}\ddot{a}_x.$$

### Guaranteed (certain-and-life) annuities

A **guaranteed annuity** $\ddot{a}_{\overline{x:n}|}$ pays for $n$ years *no matter what* (the "certain" part, paid even if the annuitant dies), and then continues for life if the annuitant survives beyond $n$. It splits into an annuity-certain plus a deferred life annuity:
$$\ddot{a}_{\overline{x:\overline{n}|}} = \ddot{a}_{\overline{n}|} + {}_{n|}\ddot{a}_x,$$
where $\ddot{a}_{\overline{n}|}$ is the ordinary (non-life) annuity-certain from Exam FM.

### The insurance–annuity relationship (the most important identity)

Because $\ddot{a}_x = \sum v^k\,{}_kp_x$ and $A_x = \sum v^{k+1}\,{}_kp_x\,q_{x+k}$ measure the same lifetime distribution, they are linked:
$$\ddot{a}_x = \frac{1 - A_x}{d}, \qquad A_x = 1 - d\,\ddot{a}_x.$$
Intuition: every dollar invested either funds the annuity payments while alive or the death benefit — accounting for interest, the two must reconcile. The continuous version uses force of interest $\delta$ instead of $d$.

---

## Formulas

**Symbols used throughout:**
- $x$ = current age of the annuitant.
- $T_x$ = future lifetime random variable (continuous); $K_x = \lfloor T_x \rfloor$ = curtate future lifetime (number of complete years lived).
- ${}_kp_x$ = probability $(x)$ survives $k$ years; ${}_kq_x = 1 - {}_kp_x$.
- $v = 1/(1+i)$ = annual discount factor; $i$ = effective annual interest rate.
- $d = iv = 1 - v$ = annual effective rate of discount.
- $\delta = \ln(1+i)$ = force of interest; $v^t = e^{-\delta t}$.
- $A_x$, $\bar{A}_x$ = EPV of whole life insurance (discrete / continuous).
- $d^{(m)}$, $i^{(m)}$ = nominal rate of discount / interest convertible $m$ times per year.

### Whole life annuities

Annuity-due (payments at $0,1,2,\dots$):
$$\ddot{a}_x = \sum_{k=0}^{\infty} v^k\,{}_kp_x = \frac{1 - A_x}{d}.$$

Annuity-immediate (payments at $1,2,3,\dots$):
$$a_x = \sum_{k=1}^{\infty} v^k\,{}_kp_x = \ddot{a}_x - 1 = \frac{1 - (1+i)A_x}{d} = \frac{1-A_x}{d} - 1.$$

Continuous (rate \$1/year continuously):
$$\bar{a}_x = \int_0^\infty v^t\,{}_tp_x\,dt = \frac{1 - \bar{A}_x}{\delta}.$$

### Temporary ($n$-year) annuities

$$\ddot{a}_{x:\overline{n}|} = \sum_{k=0}^{n-1} v^k\,{}_kp_x = \frac{1 - A_{x:\overline{n}|}}{d},$$
where $A_{x:\overline{n}|}$ is the EPV of an **endowment insurance** (death benefit within $n$ years + pure endowment at $n$).

$$a_{x:\overline{n}|} = \sum_{k=1}^{n} v^k\,{}_kp_x = \ddot{a}_{x:\overline{n}|} - 1 + v^n\,{}_np_x.$$

$$\bar{a}_{x:\overline{n}|} = \int_0^n v^t\,{}_tp_x\,dt = \frac{1 - \bar{A}_{x:\overline{n}|}}{\delta}.$$

### Deferred annuities ($u$-year deferred)

$$ {}_{u|}\ddot{a}_x = \sum_{k=u}^{\infty} v^k\,{}_kp_x = v^u\,{}_up_x\,\ddot{a}_{x+u} = \ddot{a}_x - \ddot{a}_{x:\overline{u}|}.$$

The factor $v^u\,{}_up_x = {}_uE_x$ is the **$u$-year pure endowment** discount-and-survive factor. The continuous form:
$$ {}_{u|}\bar{a}_x = v^u\,{}_up_x\,\bar{a}_{x+u} = \bar{a}_x - \bar{a}_{x:\overline{u}|}.$$

### Guaranteed (certain-and-life)

$$\ddot{a}_{\overline{x:\overline{n}|}} = \ddot{a}_{\overline{n}|} + {}_{n|}\ddot{a}_x = \ddot{a}_{\overline{n}|} + v^n\,{}_np_x\,\ddot{a}_{x+n}.$$

### Recursions

Whole life annuity-due (step from age $x$ to $x+1$):
$$\ddot{a}_x = 1 + v\,p_x\,\ddot{a}_{x+1}.$$

Temporary annuity-due:
$$\ddot{a}_{x:\overline{n}|} = 1 + v\,p_x\,\ddot{a}_{x+1:\overline{n-1}|}.$$

### Variance

Let $Y$ = present value random variable of a **whole life annuity-due**. Using $Y = \dfrac{1 - v^{K_x+1}}{d}$:
$$\operatorname{Var}(Y) = \frac{ {}^{2}A_x - (A_x)^2 }{d^2},$$
where ${}^{2}A_x$ is the whole life insurance EPV computed at **double the force of interest** (i.e., rate $j = (1+i)^2 - 1$, discount factor $v^2$).

For the **continuous** whole life annuity, $Y = \dfrac{1 - v^{T_x}}{\delta}$ and:
$$\operatorname{Var}(Y) = \frac{ {}^{2}\bar{A}_x - (\bar{A}_x)^2 }{\delta^2}.$$

For an **$n$-year temporary** annuity-due, the same structure holds using the endowment insurance:
$$\operatorname{Var}(Y) = \frac{ {}^{2}A_{x:\overline{n}|} - (A_{x:\overline{n}|})^2 }{d^2}.$$

### $m$-thly annuities

Payments of $1/m$ made $m$ times per year (so \$1 per year total), at the start of each $m$-thly period (due) or end (immediate):
$$\ddot{a}_x^{(m)} = \frac{1 - A_x^{(m)}}{d^{(m)}}, \qquad a_x^{(m)} = \ddot{a}_x^{(m)} - \frac{1}{m}.$$
Here $A_x^{(m)}$ is the insurance with death benefit paid at the end of the $m$-thly period of death, and $d^{(m)} = m\left(1 - v^{1/m}\right)$.

### Woolhouse approximation

The Woolhouse formula approximates $m$-thly and continuous annuities from the **annual** annuity-due. The **3-term** version (standard on the exam):
$$\ddot{a}_x^{(m)} \approx \ddot{a}_x - \frac{m-1}{2m} - \frac{m^2 - 1}{12 m^2}\big(\delta + \mu_x\big).$$

Continuous case (let $m \to \infty$):
$$\bar{a}_x \approx \ddot{a}_x - \frac{1}{2} - \frac{1}{12}\big(\delta + \mu_x\big).$$

For **temporary** $m$-thly annuities:
$$\ddot{a}_{x:\overline{n}|}^{(m)} \approx \ddot{a}_{x:\overline{n}|} - \frac{m-1}{2m}\big(1 - v^n\,{}_np_x\big) - \frac{m^2-1}{12 m^2}\big(\delta + \mu_x - v^n\,{}_np_x(\delta + \mu_{x+n})\big).$$

The **2-term** Woolhouse (drops the $\mu_x$ term) is less accurate but sometimes used:
$$\ddot{a}_x^{(m)} \approx \ddot{a}_x - \frac{m-1}{2m}.$$

### Accumulated values

The accumulated value at time $n$ (per survivor) of an $n$-year temporary annuity-due is the EPV divided by the $n$-year pure endowment factor:
$$\ddot{s}_{x:\overline{n}|} = \frac{\ddot{a}_{x:\overline{n}|}}{ {}_nE_x } = \frac{\ddot{a}_{x:\overline{n}|}}{v^n\,{}_np_x}.$$
This is the value *conditional on surviving* to time $n$ — it spreads the accumulated fund only over survivors.

---

## Worked Examples

### Example 1 — Whole life annuity-due from $A_x$

You are given $A_x = 0.25$ and $i = 0.05$. Find $\ddot{a}_x$, $a_x$, and the EPV of a whole life annuity-due paying \$2{,}000 per year.

**Solution.**
First $d = i/(1+i) = 0.05/1.05 = 0.047619$.
$$\ddot{a}_x = \frac{1 - A_x}{d} = \frac{1 - 0.25}{0.047619} = \frac{0.75}{0.047619} = 15.75.$$
$$a_x = \ddot{a}_x - 1 = 15.75 - 1 = 14.75.$$
EPV of \$2,000/year annuity-due $= 2000 \times 15.75 = 31{,}500$.

**Answer:** $\ddot{a}_x = 15.75$, $a_x = 14.75$, EPV $= \$31{,}500$.

---

### Example 2 — Deferred annuity via pure endowment

A life aged 65 will receive \$10,000 per year, paid annually in advance, starting at age 70 (a 5-year deferred whole life annuity-due). You are given:
- $i = 0.06$, so $v = 1/1.06$.
- ${}_5p_{65} = 0.92$.
- $\ddot{a}_{70} = 11.20$.

Find the EPV.

**Solution.**
The deferred annuity EPV per \$1 is:
$$ {}_{5|}\ddot{a}_{65} = v^5\,{}_5p_{65}\,\ddot{a}_{70}.$$
Compute $v^5 = 1.06^{-5} = 0.747258$.
$$ {}_{5|}\ddot{a}_{65} = 0.747258 \times 0.92 \times 11.20 = 0.747258 \times 10.304 = 7.6990.$$
EPV $= 10{,}000 \times 7.6990 = 76{,}990$.

**Answer:** EPV $\approx \$76{,}990$.

---

### Example 3 — Variance of a whole life annuity-due

You are given $A_x = 0.30$, ${}^{2}A_x = 0.12$, and $i = 0.05$. Find $\operatorname{Var}(Y)$ where $Y$ is the present value of a whole life annuity-due of \$1 per year.

**Solution.**
$d = 0.05/1.05 = 0.047619$, so $d^2 = 0.00226757$.
$$\operatorname{Var}(Y) = \frac{ {}^{2}A_x - (A_x)^2 }{d^2} = \frac{0.12 - 0.30^2}{0.00226757} = \frac{0.12 - 0.09}{0.00226757} = \frac{0.03}{0.00226757} = 13.229.$$

**Answer:** $\operatorname{Var}(Y) \approx 13.23$.

---

### Example 4 — Woolhouse approximation for a monthly annuity

A life aged 60 has $\ddot{a}_{60} = 14.00$, force of interest $\delta = \ln(1.05) = 0.048790$, and force of mortality $\mu_{60} = 0.015$. Estimate the EPV of a whole life annuity of \$12,000 per year paid **monthly in advance** (\$1,000 per month) using the 3-term Woolhouse formula.

**Solution.**
Here $m = 12$. Compute the correction terms.
$$\frac{m-1}{2m} = \frac{11}{24} = 0.458333.$$
$$\frac{m^2-1}{12m^2} = \frac{143}{1728} = 0.082755.$$
$$\delta + \mu_{60} = 0.048790 + 0.015 = 0.063790.$$
$$\ddot{a}_{60}^{(12)} \approx 14.00 - 0.458333 - 0.082755 \times 0.063790 = 14.00 - 0.458333 - 0.005279 = 13.53639.$$
EPV $= 12{,}000 \times 13.53639 = 162{,}437$.

**Answer:** $\ddot{a}_{60}^{(12)} \approx 13.536$; EPV $\approx \$162{,}437$.

---

### Example 5 — Recursion

You are given $\ddot{a}_{x+1} = 12.50$, $p_x = 0.98$, and $i = 0.04$. Find $\ddot{a}_x$.

**Solution.**
$$\ddot{a}_x = 1 + v\,p_x\,\ddot{a}_{x+1} = 1 + \frac{1}{1.04}(0.98)(12.50) = 1 + (0.961538)(0.98)(12.50).$$
$$= 1 + 0.961538 \times 12.25 = 1 + 11.77885 = 12.77885.$$

**Answer:** $\ddot{a}_x \approx 12.779$.

---

## Common Exam Traps

1. **Using $d$ vs. $\delta$ vs. $d^{(m)}$ in the denominator.** The relationship denominator must match the annuity type: discrete annual uses $d$, continuous uses $\delta$, $m$-thly uses $d^{(m)}$. Mixing them is the single most common error. Remember $d < \delta$? No — actually $d < \delta < d^{(m)}$ ordering is *not* what matters; just match the symbol to the annuity frequency.

2. **Computing ${}^{2}A_x$ at the wrong interest rate.** The "2" prefix means evaluate the insurance at **double the force of interest** ($v^2$, i.e., rate $j=(1+i)^2-1$), *not* squaring $A_x$. Do not write $\,{}^{2}A_x = (A_x)^2$.

3. **Temporary annuity-immediate subscript.** $a_{x:\overline{n}|}$ has payments at times $1,\dots,n$. The conversion is $a_{x:\overline{n}|} = \ddot{a}_{x:\overline{n}|} - 1 + v^n\,{}_np_x$ — you must **add back** the pure endowment term $v^n\,{}_np_x$ because the due form does not include a time-$n$ payment but the immediate form does. Forgetting this term is extremely common.

4. **Deferred annuity uses $\ddot{a}_{x+u}$, not $\ddot{a}_x$.** After deferral, the annuity is valued from age $x+u$: $ {}_{u|}\ddot{a}_x = v^u\,{}_up_x\,\ddot{a}_{x+u}$. Using $\ddot{a}_x$ instead of $\ddot{a}_{x+u}$ is wrong.

5. **Guaranteed annuity double-counting.** In $\ddot{a}_{\overline{x:\overline{n}|}} = \ddot{a}_{\overline{n}|} + {}_{n|}\ddot{a}_x$, the first term is the **annuity-certain** (no survival probability) and the second is the **deferred life** part. Do not add a temporary *life* annuity for the first $n$ years — the certain part already covers those years unconditionally.

6. **Woolhouse sign and the $\mu_x$ term.** All correction terms are **subtracted** from $\ddot{a}_x$. The third term uses $(\delta + \mu_x)$, the *force* of interest plus *force* of mortality — not $i$ and not $q_x$.

7. **Accumulated value conditioning.** $\ddot{s}_{x:\overline{n}|} = \ddot{a}_{x:\overline{n}|}/{}_nE_x$ divides by the pure endowment factor (discount **and** survival), giving the value per *survivor*. Dividing only by $v^n$ (forgetting survival) is wrong.

8. **$\ddot{a}_x = 1 + a_x$ only for whole life.** For temporary annuities the relation is $\ddot{a}_{x:\overline{n}|} = 1 + a_{x:\overline{n-1}|}$ (note the $n-1$). Blindly applying "+1" to temporary forms misplaces the term boundary.

---

## Self-Check Questions

1. Write the EPV of a whole life annuity-due as a sum of pure endowments, and state its relationship to $A_x$.

2. Given $A_x = 0.20$ and $i = 0.06$, compute $\ddot{a}_x$.

3. Explain in one sentence why ${}^{2}A_x \neq (A_x)^2$.

4. A 3-year deferred whole life annuity-due on $(x)$ pays \$1/year. Write its EPV in terms of $\ddot{a}_{x+3}$, given $i$ and ${}_3p_x$.

5. State the 2-term Woolhouse approximation for $\bar{a}_x$ and note what it omits relative to the 3-term version.

### Answers

1. $\ddot{a}_x = \sum_{k=0}^{\infty} v^k\,{}_kp_x$, and $\ddot{a}_x = \dfrac{1 - A_x}{d}$. (Each term $v^k\,{}_kp_x$ is the EPV of a \$1 pure endowment at time $k$.)

2. $d = 0.06/1.06 = 0.056604$; $\ddot{a}_x = (1 - 0.20)/0.056604 = 0.80/0.056604 = 14.133$.

3. Because ${}^{2}A_x$ is the insurance EPV evaluated at **double the force of interest** ($v^2$), which is a genuinely different actuarial value, not the algebraic square of $A_x$.

4. $ {}_{3|}\ddot{a}_x = v^3\,{}_3p_x\,\ddot{a}_{x+3}$, where $v = 1/(1+i)$.

5. $\bar{a}_x \approx \ddot{a}_x - \tfrac{1}{2}$. It omits the third term $-\tfrac{1}{12}(\delta + \mu_x)$, which corrects for the force of interest and force of mortality and improves accuracy.
