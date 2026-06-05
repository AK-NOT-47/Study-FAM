# Multiple State and Multiple Decrement Models

## Learning Objectives

By the end of this topic, the SOA expects you to be able to:

- Describe a **multiple state model** in terms of its **states** and **transition intensities** (forces of transition), and draw/interpret the standard state diagrams (alive–dead, permanent disability, disability with recovery, joint life).
- Define and compute **transition probabilities** ${}_{t}p_x^{ij}$ and **occupancy probabilities** ${}_{t}p_x^{\overline{ii}}$.
- State the **Kolmogorov forward equations** (conceptually) and explain the relationship between transition intensities and transition probabilities.
- Compute **expected present values (EPVs)** of cashflows (annuities and insurances) in a multi-state framework, including premiums and benefits paid on transition.
- Set up a **multiple decrement model**: total force of decrement, dependent (multiple-decrement) probabilities $\,{}_{t}p_x^{(\tau)}$, ${}_{t}q_x^{(j)}$, and the force $\mu_x^{(j)}$.
- Convert between **dependent (multiple-decrement)** and **independent (associated single-decrement)** probabilities $\,{}_{t}p_x^{\prime(j)}$, ${}_{t}q_x^{\prime(j)}$.
- Apply standard assumptions (constant force, uniform distribution of decrements in the multiple-decrement table) to perform these conversions.
- Apply these tools to **disability, withdrawal/lapse, and basic joint-life** problems.

---

## Key Concepts

### 1. What is a multiple state model?

A multiple state (Markov) model tracks an individual who, at any time, occupies exactly one of a finite number of **states**, labeled $0, 1, 2, \dots, n$. Over time the person can **transition** between states. The classic single-life survival model is the simplest case: two states, **0 = Alive** and **1 = Dead**, with one possible transition $0 \to 1$.

The power of the framework is that you can add states. Examples:

- **Permanent disability model** (3 states): 0 = Healthy, 1 = Disabled, 2 = Dead. Transitions $0\to1$, $0\to2$, $1\to2$. No recovery (no $1\to0$).
- **Disability-with-recovery (sickness) model**: same states but add $1\to0$ (recovery).
- **Joint life model** (4 states): 0 = both alive, 1 = only (x) alive, 2 = only (y) alive, 3 = both dead.

**Markov property:** the probability of moving to a new state depends only on the *current* state (and current age), not on how you got there. This is the key simplifying assumption at FAM level.

### 2. Transition intensities (forces of transition)

For states $i \ne j$, the **transition intensity** $\mu_x^{ij}$ is the instantaneous rate of transitioning from state $i$ to state $j$ at age $x$. It is the direct generalization of the force of mortality $\mu_x$. Formally,

$$
\mu_x^{ij} = \lim_{h\to 0^+} \frac{{}_{h}p_x^{ij}}{h}, \qquad i \ne j.
$$

There is **no** $\mu_x^{ii}$ defined as a positive intensity; instead the rate of *leaving* state $i$ is the sum $\sum_{j\ne i}\mu_x^{ij}$.

### 3. Transition vs occupancy probabilities — the bar matters

Two probabilities look similar but mean different things:

- ${}_{t}p_x^{ij}$ = probability that a life **in state $i$ at age $x$ is in state $j$ at age $x+t$**. The path in between is unrestricted — the life may have wandered through other states and come back. (Requires the Markov chain to allow return; for "in state $j$" we don't care about the journey.)
- ${}_{t}p_x^{\overline{ii}}$ = probability that a life in state $i$ at age $x$ **stays in state $i$ continuously** for the whole interval $[x, x+t]$. The bar means "no exits at all."

For a state you can never return to once you leave (e.g., "Dead", or "Healthy" in a permanent-disability model), these coincide: ${}_{t}p_x^{00} = {}_{t}p_x^{\overline{00}}$ in the permanent disability model, because you can't come back to Healthy.

The occupancy probability satisfies a clean formula (analogous to ${}_{t}p_x = \exp(-\int \mu)$):

$$
{}_{t}p_x^{\overline{ii}} = \exp\!\left(-\int_0^t \sum_{j\ne i}\mu_{x+s}^{ij}\, ds\right).
$$

### 4. Kolmogorov forward equations (conceptual)

These are the differential equations that link the intensities to the transition probabilities. For each target state $j$:

$$
\frac{\partial}{\partial t}\,{}_{t}p_x^{ij} = \sum_{k\ne j}\Big({}_{t}p_x^{ik}\,\mu_{x+t}^{kj} - {}_{t}p_x^{ij}\,\mu_{x+t}^{jk}\Big).
$$

**Read it in plain English:** the rate of change of the probability of being in state $j$ = (flow *into* $j$ from every other state $k$) − (flow *out of* $j$ to every other state $k$). The "in" term is "probability of being in $k$ now" × "intensity from $k$ to $j$"; the "out" term is "probability of being in $j$ now" × "intensity from $j$ to $k$." At FAM you are rarely asked to solve these analytically — you must **recognize them, interpret them, and apply Euler's method** numerically.

**Euler's method** (step $h$): treat the derivative as a difference quotient:

$$
{}_{t+h}p_x^{ij} \approx {}_{t}p_x^{ij} + h\sum_{k\ne j}\Big({}_{t}p_x^{ik}\,\mu_{x+t}^{kj} - {}_{t}p_x^{ij}\,\mu_{x+t}^{jk}\Big).
$$

### 5. EPVs of cashflows in multi-state models

Two building blocks, both discounted at force of interest $\delta$ (so $v^t = e^{-\delta t}$):

- **Annuity benefit paid continuously at rate 1 while in state $j$** (starting in state $i$):
$$
\bar a_x^{ij} = \int_0^\infty e^{-\delta t}\,{}_{t}p_x^{ij}\,dt.
$$
- **Lump sum paid on transition $k\to j$** (benefit of 1, starting in state $i$):
$$
\bar A_x^{ij\text{-transition}} = \int_0^\infty e^{-\delta t}\,{}_{t}p_x^{ik}\,\mu_{x+t}^{kj}\,dt.
$$

The term ${}_{t}p_x^{ik}\,\mu_{x+t}^{kj}\,dt$ is the probability of being in $k$ at $t$ and jumping to $j$ in the next instant — the "death-benefit" pattern generalized.

### 6. Multiple decrement models

A multiple decrement model is the special case where there is **one starting "active" state 0** and several **absorbing exit states** $1, 2, \dots, m$ (the decrements), with no transitions among the exit states and no return. Example: a pension where active employees can exit by **(1) death, (2) withdrawal/lapse, (3) retirement, (4) disability**.

Key quantities (notation from *AMLCR*, Ch. 8):

- $\mu_x^{(j)}$ = force of decrement $j$ (the transition intensity $0\to j$).
- $\mu_x^{(\tau)} = \sum_{j} \mu_x^{(j)}$ = **total** force of decrement.
- ${}_{t}p_x^{(\tau)}$ = probability of **remaining active** (no decrement) for $t$ years $= \exp(-\int_0^t \mu_{x+s}^{(\tau)}ds)$.
- ${}_{t}q_x^{(j)}$ = probability that a life active at $x$ **exits by cause $j$** within $t$ years $= \int_0^t {}_{s}p_x^{(\tau)}\,\mu_{x+s}^{(j)}\,ds$.
- ${}_{t}q_x^{(\tau)} = \sum_j {}_{t}q_x^{(j)} = 1 - {}_{t}p_x^{(\tau)}$.

These are **dependent** probabilities: each cause's probability depends on the presence of the other causes (because to exit by cause $j$ you must first *survive* all causes up to that instant).

### 7. Associated single decrement tables (independent probabilities)

For each cause $j$, imagine a world where cause $j$ is the **only** decrement operating, with the same force $\mu_x^{(j)}$. This gives the **associated single decrement table (ASDT)**, with independent (prime) probabilities:

$$
{}_{t}p_x^{\prime(j)} = \exp\!\left(-\int_0^t \mu_{x+s}^{(j)}\,ds\right), \qquad {}_{t}q_x^{\prime(j)} = 1 - {}_{t}p_x^{\prime(j)}.
$$

**Fundamental link:** because the total survival is the product of cause-by-cause survivals,

$$
{}_{t}p_x^{(\tau)} = \prod_{j} {}_{t}p_x^{\prime(j)}.
$$

This is the single most important identity in the multiple decrement section. **Dependent survival = product of independent survivals.** Note the inequality direction: ${}_{t}q_x^{(j)} \le {}_{t}q_x^{\prime(j)}$ (a cause kills *fewer* people in the dependent table because other causes "get there first").

### 8. Converting between dependent and independent — the two standard assumptions

You need a fractional-age assumption to convert. The two FAM-examinable ones:

**(a) Constant forces over each year of age.** If forces are constant over $(x, x+1)$, then over the year
$$
p_x^{\prime(j)} = \left(p_x^{(\tau)}\right)^{\mu^{(j)}/\mu^{(\tau)}} = \left(p_x^{(\tau)}\right)^{q_x^{(j)}/q_x^{(\tau)}}.
$$
(The exponent is the proportion of the total force — equivalently the proportion of total decrements — attributable to cause $j$.)

**(b) UDD in the multiple-decrement table** (each ${}_{t}q_x^{(j)} = t\cdot q_x^{(j)}$ linear in $t$). Then
$$
p_x^{\prime(j)} = \left(p_x^{(\tau)}\right)^{q_x^{(j)}/q_x^{(\tau)}},
$$
which gives the *same* one-year relationship as (a) for the prime survival probability. (The two assumptions differ in how they distribute decrements within the year, but the standard exam conversion formula above is shared.) The reverse direction uses
$$
q_x^{(j)} = \int_0^1 {}_{t}p_x^{(\tau)}\,\mu_{x+t}^{(j)}\,dt,
$$
and under UDD-in-the-single-decrement-tables you get the classic approximations (see Formulas).

---

## Formulas

**Transition intensity:** $\displaystyle \mu_x^{ij} = \lim_{h\to0^+}\frac{{}_{h}p_x^{ij}}{h}$ — instantaneous rate of moving $i\to j$.

**Occupancy (stay-put) probability:**
$$
{}_{t}p_x^{\overline{ii}} = \exp\!\left(-\int_0^t \sum_{j\ne i}\mu_{x+s}^{ij}\,ds\right).
$$
Symbols: $\mu_{x+s}^{ij}$ = intensity from state $i$ to $j$ at age $x+s$; the sum is the total rate of leaving $i$.

**Kolmogorov forward equation:**
$$
\frac{d}{dt}\,{}_{t}p_x^{ij} = \sum_{k\ne j}\Big({}_{t}p_x^{ik}\,\mu_{x+t}^{kj} - {}_{t}p_x^{ij}\,\mu_{x+t}^{jk}\Big).
$$

**Euler update (step $h$):**
$$
{}_{t+h}p_x^{ij} \approx {}_{t}p_x^{ij} + h\sum_{k\ne j}\Big({}_{t}p_x^{ik}\,\mu_{x+t}^{kj} - {}_{t}p_x^{ij}\,\mu_{x+t}^{jk}\Big).
$$

**EPV of a continuous annuity of 1 paid while in state $j$ (start in $i$):**
$$
\bar a_x^{ij} = \int_0^\infty e^{-\delta t}\,{}_{t}p_x^{ij}\,dt,
$$
where $\delta$ = force of interest, $v^t = e^{-\delta t}$.

**EPV of a unit benefit on transition $k\to j$:**
$$
\overline A_x^{(kj)} = \int_0^\infty e^{-\delta t}\,{}_{t}p_x^{ik}\,\mu_{x+t}^{kj}\,dt.
$$

**Multiple decrement core relations:**
$$
\mu_x^{(\tau)} = \sum_j \mu_x^{(j)}, \qquad
{}_{t}p_x^{(\tau)} = \exp\!\left(-\int_0^t\mu_{x+s}^{(\tau)}ds\right), \qquad
{}_{t}q_x^{(j)} = \int_0^t {}_{s}p_x^{(\tau)}\,\mu_{x+s}^{(j)}\,ds.
$$
$$
{}_{t}q_x^{(\tau)} = 1 - {}_{t}p_x^{(\tau)} = \sum_j {}_{t}q_x^{(j)}.
$$

**Life-table form** (radix $\ell_x^{(\tau)}$): $d_x^{(j)} = $ number exiting by cause $j$ in year, $d_x^{(\tau)} = \sum_j d_x^{(j)}$,
$$
q_x^{(j)} = \frac{d_x^{(j)}}{\ell_x^{(\tau)}}, \qquad p_x^{(\tau)} = \frac{\ell_{x+1}^{(\tau)}}{\ell_x^{(\tau)}} = 1 - \frac{d_x^{(\tau)}}{\ell_x^{(\tau)}}.
$$

**Associated single decrement (independent) probabilities:**
$$
{}_{t}p_x^{\prime(j)} = \exp\!\left(-\int_0^t\mu_{x+s}^{(j)}ds\right), \qquad {}_{t}q_x^{\prime(j)} = 1 - {}_{t}p_x^{\prime(j)}.
$$

**Master product identity:**
$$
{}_{t}p_x^{(\tau)} = \prod_j {}_{t}p_x^{\prime(j)}.
$$

**Dependent → independent (constant force or UDD-in-MDT), one year:**
$$
p_x^{\prime(j)} = \left(p_x^{(\tau)}\right)^{\,q_x^{(j)}/q_x^{(\tau)}} = \left(p_x^{(\tau)}\right)^{\,\mu_x^{(j)}/\mu_x^{(\tau)}}.
$$

**Independent → dependent under UDD in each single-decrement table** (two-decrement case, classic approximation):
$$
q_x^{(1)} = q_x^{\prime(1)}\left(1 - \tfrac12 q_x^{\prime(2)}\right), \qquad
q_x^{(2)} = q_x^{\prime(2)}\left(1 - \tfrac12 q_x^{\prime(1)}\right).
$$
For three decrements:
$$
q_x^{(1)} = q_x^{\prime(1)}\left(1 - \tfrac12\big(q_x^{\prime(2)}+q_x^{\prime(3)}\big) + \tfrac13\,q_x^{\prime(2)}q_x^{\prime(3)}\right).
$$
Symbols: $q_x^{\prime(j)}$ = independent one-year exit prob by cause $j$; $q_x^{(j)}$ = dependent one-year exit prob.

---

## Worked Examples

### Example 1 — Building a multiple decrement table and an ASDT (constant force / proportional split)

A multiple decrement model for active employees has two causes: (1) death and (2) withdrawal. For age 40 you are given:
$$
q_{40}^{(1)} = 0.02, \qquad q_{40}^{(2)} = 0.13.
$$
Assuming **constant forces of decrement** over the year, find the independent withdrawal probability $q_{40}^{\prime(2)}$.

**Solution.**

Total dependent exit: $q_{40}^{(\tau)} = 0.02 + 0.13 = 0.15$, so $p_{40}^{(\tau)} = 0.85$.

Proportion of decrements due to withdrawal: $q_{40}^{(2)}/q_{40}^{(\tau)} = 0.13/0.15 = 0.86667$.

Apply the conversion:
$$
p_{40}^{\prime(2)} = \left(p_{40}^{(\tau)}\right)^{q_{40}^{(2)}/q_{40}^{(\tau)}} = 0.85^{\,0.86667} = e^{0.86667\ln 0.85} = e^{0.86667(-0.162519)} = e^{-0.140850} = 0.86862.
$$
Therefore $q_{40}^{\prime(2)} = 1 - 0.86862 = 0.13138$.

**Answer:** $q_{40}^{\prime(2)} \approx 0.1314$ (slightly larger than the dependent $0.13$, as expected).

---

### Example 2 — Independent → dependent under UDD in the single-decrement tables

A pension plan has two decrements with independent annual rates at age 60:
$$
q_{60}^{\prime(d)} = 0.010 \ \text{(death)}, \qquad q_{60}^{\prime(w)} = 0.150 \ \text{(withdrawal)}.
$$
Assuming a **uniform distribution of decrements in each associated single-decrement table**, compute the dependent probabilities $q_{60}^{(d)}$ and $q_{60}^{(w)}$, and the active-survival probability $p_{60}^{(\tau)}$.

**Solution.**

First, $p_{60}^{(\tau)} = p_{60}^{\prime(d)}\,p_{60}^{\prime(w)} = (0.990)(0.850) = 0.8415$, so $q_{60}^{(\tau)} = 0.1585$.

Use the two-decrement UDD approximations:
$$
q_{60}^{(d)} = q_{60}^{\prime(d)}\left(1 - \tfrac12 q_{60}^{\prime(w)}\right) = 0.010\left(1 - \tfrac12(0.150)\right) = 0.010(0.925) = 0.00925.
$$
$$
q_{60}^{(w)} = q_{60}^{\prime(w)}\left(1 - \tfrac12 q_{60}^{\prime(d)}\right) = 0.150\left(1 - \tfrac12(0.010)\right) = 0.150(0.995) = 0.14925.
$$

Check: $q_{60}^{(d)} + q_{60}^{(w)} = 0.00925 + 0.14925 = 0.1585 = q_{60}^{(\tau)}.$ ✓ (Matches $1 - p_{60}^{(\tau)}$.)

**Answer:** $q_{60}^{(d)} = 0.00925$, $q_{60}^{(w)} = 0.14925$, $p_{60}^{(\tau)} = 0.8415$.

---

### Example 3 — EPV in a permanent-disability multi-state model (constant intensities)

Consider the permanent disability model: state 0 = Healthy, 1 = Disabled, 2 = Dead. Intensities are **constant for all ages**:
$$
\mu^{01} = 0.03 \ (\text{become disabled}), \quad \mu^{02} = 0.01 \ (\text{healthy death}), \quad \mu^{12} = 0.06 \ (\text{disabled death}).
$$
Force of interest $\delta = 0.05$. A healthy life age $x$ buys a benefit paying a continuous annuity of \$10,000 per year **while disabled**. Find its EPV.

**Solution.**

Total force of leaving Healthy: $\mu^{0\bullet} = \mu^{01} + \mu^{02} = 0.04$, so ${}_{t}p_x^{\overline{00}} = e^{-0.04t}$ (and since Healthy is non-returnable, ${}_{t}p_x^{00} = e^{-0.04t}$).

We need ${}_{t}p_x^{01}$ = probability of being disabled at time $t$ (entered disability at some $s\le t$ and survived disabled to $t$):
$$
{}_{t}p_x^{01} = \int_0^t \underbrace{{}_{s}p_x^{00}\,\mu^{01}}_{\text{healthy then disable at }s}\;\underbrace{{}_{t-s}p_{x+s}^{\overline{11}}}_{\text{stay disabled to }t}\,ds
= \int_0^t e^{-0.04 s}(0.03)\,e^{-0.06(t-s)}\,ds.
$$
$$
= 0.03\,e^{-0.06t}\int_0^t e^{-0.04s + 0.06s}\,ds = 0.03\,e^{-0.06t}\int_0^t e^{0.02 s}\,ds
= 0.03\,e^{-0.06t}\cdot\frac{e^{0.02t}-1}{0.02}.
$$
$$
{}_{t}p_x^{01} = 1.5\left(e^{-0.04t} - e^{-0.06t}\right).
$$

Now the annuity factor:
$$
\bar a_x^{01} = \int_0^\infty e^{-\delta t}\,{}_{t}p_x^{01}\,dt = \int_0^\infty e^{-0.05t}\cdot 1.5\left(e^{-0.04t}-e^{-0.06t}\right)dt.
$$
$$
= 1.5\left[\int_0^\infty e^{-0.09 t}dt - \int_0^\infty e^{-0.11 t}dt\right] = 1.5\left[\frac{1}{0.09} - \frac{1}{0.11}\right].
$$
$$
= 1.5\left[11.1111 - 9.0909\right] = 1.5\,(2.02020) = 3.03030.
$$

EPV $= 10{,}000 \times \bar a_x^{01} = 10{,}000 \times 3.03030 = 30{,}303$.

**Answer:** EPV $\approx \$30{,}303$.

---

### Example 4 — One Euler step for a transition probability

Use the disability model intensities from Example 3 (constant), with step $h = 0.5$. Starting healthy, estimate ${}_{0.5}p_x^{01}$ via one Euler step from $t=0$, and compare to the exact value.

**Solution.**

At $t=0$: ${}_{0}p_x^{00}=1$, ${}_{0}p_x^{01}=0$, ${}_{0}p_x^{02}=0$.

Forward equation for $j=1$: inflow from state 0 (via $\mu^{01}$), outflow to state 2 (via $\mu^{12}$):
$$
\frac{d}{dt}\,{}_{t}p_x^{01} = {}_{t}p_x^{00}\,\mu^{01} - {}_{t}p_x^{01}\,\mu^{12}.
$$
At $t=0$: derivative $= (1)(0.03) - (0)(0.06) = 0.03$.

Euler: ${}_{0.5}p_x^{01} \approx 0 + 0.5(0.03) = 0.015$.

Exact (from Example 3): $1.5(e^{-0.04(0.5)} - e^{-0.06(0.5)}) = 1.5(e^{-0.02} - e^{-0.03}) = 1.5(0.980199 - 0.970446) = 1.5(0.009753) = 0.014629$.

**Answer:** Euler estimate $= 0.0150$ vs exact $= 0.01463$. (A smaller step $h$ would tighten the gap.)

---

## Common Exam Traps

1. **Confusing ${}_{t}p_x^{ij}$ with ${}_{t}p_x^{\overline{ii}}$.** The bar means "stay continuously." Only use $\exp(-\int \mu)$ for the *barred* occupancy probability. For an un-barred $ij$ where return is possible, you generally need the integral/Kolmogorov approach.

2. **Forgetting that dependent $q^{(j)} \le$ independent $q^{\prime(j)}$.** If your converted independent rate is *smaller* than the dependent rate, you made an error. Removing competing decrements always *raises* a cause's probability.

3. **Wrong exponent in the conversion.** $p_x^{\prime(j)} = (p_x^{(\tau)})^{q_x^{(j)}/q_x^{(\tau)}}$. The exponent is cause-$j$ decrements **over total** decrements (or $\mu^{(j)}/\mu^{(\tau)}$) — not $q^{(j)}/q^{(\tau)}$ inverted, and not raised to $p$.

4. **Multiplying $q$'s instead of $p$'s.** The product identity is on **survival**: ${}_{t}p_x^{(\tau)} = \prod_j {}_{t}p_x^{\prime(j)}$. You cannot add or multiply the $q$'s to get $q^{(\tau)}$ in general; you sum the *dependent* $q^{(j)}$, but you multiply the *independent* $p^{\prime(j)}$.

5. **Mixing up which UDD assumption is in force.** "UDD in the multiple decrement table" (each ${}_{t}q^{(j)} = t q^{(j)}$) gives different intra-year behavior than "UDD in each single-decrement table" (each ${}_{t}q^{\prime(j)} = t q^{\prime(j)}$). The $q^{(d)} = q^{\prime(d)}(1 - \tfrac12 q^{\prime(w)})$ formulas come from **UDD in the single-decrement tables**. Read the problem statement carefully.

6. **Sign / direction in Kolmogorov.** Inflow terms are $+\,{}_{t}p_x^{ik}\mu^{kj}$ (probability in another state times intensity *into* $j$); outflow terms are $-\,{}_{t}p_x^{ij}\mu^{jk}$. A common slip is using $\mu^{kj}$ where $\mu^{jk}$ belongs.

7. **Death benefit on transition uses the *originating* state's probability.** The EPV of a benefit on $k\to j$ integrates ${}_{t}p_x^{ik}\,\mu^{kj}$ — you must be in $k$ just before jumping, so it's ${}_{t}p_x^{ik}$ (not ${}_{t}p_x^{ij}$).

8. **Joint-life: "first death" vs "last survivor."** The $0\to1,0\to2$ transitions are *first* death events; reaching state 3 is *last* survivor death. Don't conflate the annuity "while both alive" (state 0 only) with "while at least one alive" (states 0, 1, 2).

---

## Self-Check Questions

1. In a permanent disability model (Healthy/Disabled/Dead), why does ${}_{t}p_x^{00} = {}_{t}p_x^{\overline{00}}$, and would this still hold in a model with recovery?

2. You are given $q_x^{(\tau)} = 0.20$ with two equal-force decrements. Find $q_x^{(1)}$ and the exponent used to get $p_x^{\prime(1)}$ under constant forces.

3. Write the integral expression for the EPV of a lump sum of \$1 paid at the moment a healthy life becomes disabled (intensity $\mu_{x+t}^{01}$), force of interest $\delta$.

4. Given independent rates $q^{\prime(1)} = 0.05$, $q^{\prime(2)} = 0.10$, compute $p_x^{(\tau)}$.

5. State the Kolmogorov forward equation for ${}_{t}p_x^{02}$ (death) in the permanent disability model with intensities $\mu^{02}, \mu^{12}$.

### Answers

1. Because Healthy is **non-returnable** in the permanent model — once you leave state 0 you can never come back, so "being in state 0 at time $t$" is identical to "never having left state 0." In a model **with recovery** ($1\to0$), they would differ: ${}_{t}p_x^{00}$ would include paths that left to Disabled and recovered, while ${}_{t}p_x^{\overline{00}}$ would not.

2. Equal forces ⇒ each cause is half the total: $q_x^{(1)} = 0.10$. Exponent $= q_x^{(1)}/q_x^{(\tau)} = 0.10/0.20 = 0.5$, so $p_x^{\prime(1)} = (0.80)^{0.5} = 0.8944$ and $q_x^{\prime(1)} = 0.1056$.

3. $\displaystyle \overline A^{(01)} = \int_0^\infty e^{-\delta t}\,{}_{t}p_x^{\overline{00}}\,\mu_{x+t}^{01}\,dt$ (here ${}_{t}p_x^{00} = {}_{t}p_x^{\overline{00}}$ since you must still be healthy at the instant of disablement).

4. ${}_{t}p_x^{(\tau)} = p^{\prime(1)} p^{\prime(2)} = (0.95)(0.90) = 0.855$.

5. $\displaystyle \frac{d}{dt}\,{}_{t}p_x^{02} = {}_{t}p_x^{00}\,\mu_{x+t}^{02} + {}_{t}p_x^{01}\,\mu_{x+t}^{12}$ — inflow to Dead from Healthy and from Disabled; no outflow since state 2 is absorbing.
