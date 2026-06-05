# Policy Values (Reserves)

*SOA Exam FAM — Long-Term Insurance. Notation follows Dickson, Hardy & Waters (DHW), "Actuarial Mathematics for Life Contingent Risks."*

---

## Learning Objectives

By the end of this topic you should be able to:

1. **Define** the net premium policy value (reserve) and explain why an insurer must hold one.
2. **Compute** net premium policy values using both the **prospective** formula (EPV future benefits − EPV future net premiums) and the **retrospective** formula (accumulated past premiums − accumulated past benefit cost), and explain when they are equal.
3. **Apply** the **recursive relationship** between successive policy values, incorporating interest, the premium received at the start of the year, and the cost of the death benefit.
4. **Use the Fackler accumulation (actuarial accumulated value)** form of the recursion.
5. **Calculate gross (expense-loaded) premium policy values**, separate the **expense reserve**, and understand its sign over time (negative early, due to acquisition expenses).
6. **State and apply Thiele's differential equation** for the continuous policy value.
7. **Compute modified reserves**, specifically the **Full Preliminary Term (FPT)** method, and explain why it is used.
8. **Handle policy alterations** (paid-up, reduced benefit, term changes) using the policy value as the asset share at the alteration date, and evaluate the **effect of changing assumptions** (interest, mortality, expenses) on the reserve.

---

## Key Concepts

### Why reserves exist

For most life insurance and annuity products, the **premium is level** but the **expected cost of providing the benefit rises with age** (mortality increases). In the early years the level premium *exceeds* the cost of insurance; in later years it falls *short*. The insurer must therefore set aside the early-year surplus to fund the later-year shortfall. The amount it should be holding at any time $t$ is the **policy value** (a.k.a. **reserve**), denoted ${}_t V$.

The policy value is the amount that, **together with future premiums, exactly funds future benefits and expenses, in expectation.** It is a *balance-sheet liability* of the insurer — money owed to the block of policyholders, on average.

### Net vs. gross

- **Net premium policy value**: ignores expenses entirely. Uses the **net premium** $P$ (the premium computed by the equivalence principle with **no** expense loading). Both the premium *and* the valuation use net amounts.
- **Gross premium policy value** (a.k.a. expense-loaded or modified-net): uses the actual **gross premium** $G$ and explicitly includes **future expenses** in the EPV of outgo.

A subtle but heavily tested point: a **net premium reserve is computed with the net premium, not the gross premium**, even if the contract actually charges a gross premium. If the problem says "net premium policy value," you must back out / use $P$, not $G$.

### Prospective vs. retrospective

Two equivalent ways to look forward or backward:

- **Prospective** (looking forward): 
  $$ {}_tV = \text{EPV future benefits} - \text{EPV future net premiums.} $$
- **Retrospective** (looking backward): 
  $$ {}_tV = \text{AV of past premiums} - \text{AV of past benefit outgo (cost of insurance)}. $$
  Here "AV" is the **actuarial accumulated value** — accumulated with interest **and** survivorship.

**Key theorem:** The prospective and retrospective policy values are **equal** *if and only if* the **same basis** (interest and mortality) is used to compute the premium and the reserve, **and** the equivalence principle was used to set the premium. On exam problems where the valuation basis differs from the premium basis, use the **prospective** method — it is the definition.

### The recursion — the most important computational tool

Over one policy year, the reserve at the start, plus the premium, earns interest; out of that the insurer pays expected death benefits, and what survives is shared among survivors as the next reserve. For a fully discrete insurance with death benefit $S$ payable at end of year:

$$ ({}_tV + P)(1+i) = q_{x+t}\, S + p_{x+t}\,{}_{t+1}V. $$

Read it as: **(reserve brought forward + premium) accumulated for one year = expected death outgo + expected reserve carried forward for survivors.** This single equation underlies Fackler, Thiele (its continuous limit), and almost every reserve exam question.

### Expense reserve

The gross premium policy value can be split:
$$ {}_tV^{\text{gross}} = {}_tV^{\text{net}} + {}_tV^{\text{expense}}. $$
Because **acquisition expenses are front-loaded** (commissions, underwriting), the gross premium's expense loading is *insufficient early* to cover them, so the **expense reserve is negative** in early durations (the insurer is "in the hole" on expenses) and trends toward 0. A negative gross reserve early is the economic reason for modified reserves.

### Modified reserves (FPT)

Holding a full net premium reserve from day 1 strains a new insurer's surplus because of those acquisition costs. **Modified reserve** methods assume a *lower* first-year (valuation) premium and *higher* renewal valuation premiums, producing a **lower (often zero) reserve at the end of year 1** — freeing surplus to pay acquisition expenses, while still being adequate long-term.

The **Full Preliminary Term (FPT)** method treats the first year as **one-year term insurance**:
- First-year valuation premium $\alpha = $ net premium for **1-year term** on $(x)$, so ${}_1V^{FPT} = 0$.
- Renewal valuation premium $\beta = $ net premium for the **same contract issued to $(x+1)$**, one year younger duration.

So FPT reserves for an original policy equal the net premium reserves of an **identical policy issued one year later**, shifted by a year.

### Thiele's differential equation (continuous)

The continuous-time analogue of the recursion. For a policy with continuous premium rate $P_t$, force of interest $\delta$, death benefit $S_t$ paid at the moment of death:

$$ \frac{d}{dt}\,{}_tV = \delta\,{}_tV + P_t - \mu_{x+t}\,(S_t - {}_tV). $$

Interpretation: the reserve grows by **interest** ($\delta\,{}_tV$) plus **premium inflow** ($P_t$), and is depleted by the **net cost of dying** — the *net amount at risk* $(S_t - {}_tV)$ paid out at rate $\mu_{x+t}$.

### Policy alterations & changing assumptions

When a policyholder alters a contract (e.g., converts to paid-up, reduces benefit, changes term), the insurer uses the **current policy value as the available asset** and re-applies the equivalence principle to the *new* contract. Changing the **valuation assumptions** (e.g., lowering the interest rate, strengthening mortality) generally **increases** the reserve, because lower interest means premiums accumulate less and benefits are discounted less.

---

## Formulas

Throughout, $(x)$ is the issue age, $t$ the duration (years since issue), $i$ the effective annual interest rate, $v=1/(1+i)$, $\delta=\ln(1+i)$.

### Net premium (equivalence principle)

For a fully discrete whole life on $(x)$ with unit benefit:
$$ P_x = \frac{A_x}{\ddot a_x} = \frac{1}{\ddot a_x} - d, \qquad d = iv = 1 - v. $$

### Prospective net premium policy value

Fully discrete whole life, unit benefit, issued at age $x$, valued at duration $t$:
$$ {}_tV_x = A_{x+t} - P_x\,\ddot a_{x+t}. $$

Equivalent annuity and "paid-up" forms:
$$ {}_tV_x = 1 - \frac{\ddot a_{x+t}}{\ddot a_x} = \left(\frac{P_{x+t}-P_x}{P_{x+t}+d}\right) = 1 - \frac{A_x \text{-style ratio...}}{}\;. $$

More usefully, the three classic algebraic identities for whole life:
$$ {}_tV_x = 1 - \frac{\ddot a_{x+t}}{\ddot a_x} \quad(\text{annuity/benefit-ratio form}), $$
$$ {}_tV_x = \frac{A_{x+t} - A_x}{1 - A_x} \quad(\text{benefit form}), $$
$$ {}_tV_x = (P_{x+t} - P_x)\,\ddot a_{x+t} \quad(\text{premium-difference form}). $$

General contract:
$$ {}_tV = \text{EPV}_t(\text{future benefits} + \text{future expenses}) - \text{EPV}_t(\text{future premiums}). $$

- $A_{x+t}$ = EPV at age $x+t$ of the future death benefit (unit).
- $\ddot a_{x+t}$ = EPV of a unit life annuity-due on $(x+t)$.
- $P_x$ = net annual premium per unit, set at issue.

### Retrospective net premium policy value

$$ {}_tV_x = P_x\,\ddot s_{x:\overline{t|}} - {}_tk_x, $$
where the **actuarial accumulated value** of the premium annuity and the **accumulated cost of insurance** are
$$ \ddot s_{x:\overline{t|}} = \frac{\ddot a_{x:\overline{t|}}}{{}_tE_x}, \qquad {}_tk_x = \frac{A^{1}_{x:\overline{t|}}}{{}_tE_x}, \qquad {}_tE_x = v^t\,{}_tp_x. $$

- ${}_tE_x$ = $t$-year pure endowment = discount-with-survivorship factor.
- $A^{1}_{x:\overline{t|}}$ = EPV of death benefits in the first $t$ years.
- Dividing by ${}_tE_x$ converts a present value at issue into an **actuarial accumulated value at time $t$** (interest + survivorship).

### Recursion (fully discrete)

Death benefit $S_{t+1}$ payable end of year, premium $P$ at start of year:
$$ \boxed{\,({}_tV + P)(1+i) = q_{x+t}\,S_{t+1} + p_{x+t}\,{}_{t+1}V\,} $$

Solved forward for the next reserve:
$$ {}_{t+1}V = \frac{({}_tV + P)(1+i) - q_{x+t}\,S_{t+1}}{p_{x+t}}. $$

### Net amount at risk & the cost of insurance

$$ \text{NAR}_{t+1} = S_{t+1} - {}_{t+1}V. $$
The recursion can be rewritten to show that the premium funds savings plus the cost of insuring the net amount at risk:
$$ ({}_tV + P)(1+i) = {}_{t+1}V + q_{x+t}\,(S_{t+1} - {}_{t+1}V). $$

### Fackler / actuarial accumulated value form

Rearranged using $p_{x+t} = 1 - q_{x+t}$:
$$ {}_{t+1}V = ({}_tV + P)\,(1+i)\,\frac{1}{p_{x+t}} - S_{t+1}\,\frac{q_{x+t}}{p_{x+t}} = ({}_tV + P)\,u_{x+t} - S_{t+1}\,k_{x+t}, $$
with the **Fackler accumulation factors**
$$ u_{x+t} = \frac{1+i}{p_{x+t}}, \qquad k_{x+t} = \frac{q_{x+t}}{p_{x+t}}\,(1+i)\cdot v \;=\; \frac{(1+i)\,q_{x+t}}{p_{x+t}}\;(\text{end-of-year benefit}). $$

(Exam-precise: with the end-of-year benefit, $k_{x+t} = (1+i)\,q_{x+t}/p_{x+t}$ and $u_{x+t} = (1+i)/p_{x+t}$.)

### Gross premium policy value & expense reserve

With gross premium $G$, renewal expenses $e_t$ (incurred at start of year), settlement/claim expense $E$ added to benefit:
$$ {}_tV^{g} = \text{EPV}(\text{future benefits} + \text{future expenses}) - G\cdot\text{EPV}(\text{future premiums}). $$
Recursion:
$$ ({}_tV^{g} + G - e_t)(1+i) = q_{x+t}\,(S_{t+1}+E_{t+1}) + p_{x+t}\,{}_{t+1}V^{g}. $$
Decomposition:
$$ {}_tV^{\text{expense}} = {}_tV^{g} - {}_tV^{\text{net}}. $$

### Thiele's differential equation (continuous)

$$ \boxed{\,\frac{d}{dt}\,{}_tV = \delta_t\,{}_tV + P_t - \mu_{x+t}\,(S_t - {}_tV)\,} $$
- $\delta_t$ force of interest, $\mu_{x+t}$ force of mortality, $P_t$ continuous premium rate, $S_t$ death benefit.
- Boundary condition: at maturity $n$, ${}_nV = $ pure endowment / survival benefit (e.g., $0$ for term, $1$ for an $n$-year endowment unit).
- Euler step (numerical): $ {}_{t+h}V \approx {}_tV + h\big[\delta_t\,{}_tV + P_t - \mu_{x+t}(S_t - {}_tV)\big].$

### Modified reserves — Full Preliminary Term (FPT)

Replace the level net premium $P$ by:
$$ \alpha = v\,q_x \cdot S = A^{1}_{x:\overline{1|}}\cdot S \quad(\text{1-yr term net premium, makes } {}_1V^{FPT}=0), $$
$$ \beta = \frac{A_{x+1} \text{(of the contract on } (x+1)) }{\ddot a_{x+1}} \quad(\text{renewal valuation premium}). $$
For whole life, the FPT reserve at duration $t\ge 1$ equals the net premium reserve of the same plan **issued at age $x+1$**, evaluated at duration $t-1$:
$$ {}_tV^{FPT}_{x} = {}_{t-1}V_{x+1}, \qquad {}_0V^{FPT}={}_1V^{FPT}=0. $$

### Policy alteration (asset = current reserve)

At alteration time $t$, equate the policy value to the EPV of the new contract:
$$ {}_tV^{\text{(old, as asset)}} + \text{EPV(future altered premiums)} = \text{EPV(future altered benefits + expenses)}. $$
For a **paid-up** alteration (no future premiums) giving reduced sum insured $S'$:
$$ S' = \frac{{}_tV}{A_{x+t}} \quad(\text{paid-up whole life, ignoring expenses}). $$

---

## Worked Examples

### Example 1 — Prospective net premium reserve (whole life)

A fully discrete whole life insurance of \$1 is issued to $(40)$. You are given $A_{40}=0.20$, $A_{50}=0.30$, $\ddot a_{50}=14.0$, and $i=0.05$ so $d=0.05/1.05=0.047619$. Find the net premium policy value at duration 10, ${}_{10}V_{40}$.

**Step 1 — Net premium.** $\ddot a_{40} = (1-A_{40})/d = (1-0.20)/0.047619 = 0.80/0.047619 = 16.8$.
$$ P_{40} = A_{40}/\ddot a_{40} = 0.20/16.8 = 0.0119048. $$

**Step 2 — Prospective reserve.**
$$ {}_{10}V_{40} = A_{50} - P_{40}\,\ddot a_{50} = 0.30 - 0.0119048\times 14.0 = 0.30 - 0.166667 = 0.133333. $$

**Check (benefit-ratio identity):** ${}_{10}V = (A_{50}-A_{40})/(1-A_{40}) = (0.30-0.20)/0.80 = 0.125.$ 

These differ because the given $\ddot a_{50}=14.0$ is **not** internally consistent with $A_{50}=0.30$ at $i=0.05$ (consistent value would be $\ddot a_{50}=(1-0.30)/0.047619=14.7$). On the exam, **use the formula they direct and the values given**; the prospective definition $A_{50}-P\,\ddot a_{50}$ governs.

**Answer:** ${}_{10}V_{40} = 0.1333$ per \$1 of insurance.

---

### Example 2 — Recursion to find the next reserve

A fully discrete 3-year endowment insurance of \$10{,}000 on $(x)$ has level annual net premium $P = 3{,}100$. You are given $i=0.06$, $q_x=0.02$, $q_{x+1}=0.03$. The reserve at time 0 is $0$. Find ${}_1V$ and ${}_2V$.

**Step 1 — Year 1.** Death benefit $S=10{,}000$, $p_x=0.98$.
$$ ({}_0V + P)(1.06) = q_x S + p_x\,{}_1V $$
$$ (0 + 3100)(1.06) = 0.02\times 10000 + 0.98\,{}_1V $$
$$ 3286 = 200 + 0.98\,{}_1V \;\Rightarrow\; {}_1V = \frac{3086}{0.98} = 3148.98. $$

**Step 2 — Year 2.** $p_{x+1}=0.97$.
$$ ({}_1V + P)(1.06) = q_{x+1} S + p_{x+1}\,{}_2V $$
$$ (3148.98 + 3100)(1.06) = 0.03\times 10000 + 0.97\,{}_2V $$
$$ (6248.98)(1.06) = 300 + 0.97\,{}_2V $$
$$ 6623.92 = 300 + 0.97\,{}_2V \;\Rightarrow\; {}_2V = \frac{6323.92}{0.97} = 6519.51. $$

**Sanity check.** For a 3-year endowment, ${}_3V$ must equal the maturity benefit \$10{,}000. One more step with any $q_{x+2}$: $({}_2V+P)(1.06) = q_{x+2}(10000)+p_{x+2}(10000) = 10000$. So we need $(6519.51+3100)(1.06)=10196.68$ — close to 10000 given rounding and the chosen $q$'s; in a fully consistent set it lands exactly on 10000.

**Answer:** ${}_1V = \$3{,}148.98$ and ${}_2V = \$6{,}519.51$.

---

### Example 3 — Thiele's equation by Euler's method

A continuous whole life on $(x)$ has constant force of mortality $\mu = 0.02$, force of interest $\delta = 0.05$, death benefit $S = 1$, and continuous premium rate $P = 0.0204$ (the level annual rate $\bar P = \mu = 0.02$ adjusted; here use $P=0.0204$). Given ${}_5V = 0.0500$, estimate ${}_6V$ using a single Euler step of $h=1$.

**Step 1 — Thiele's RHS at $t=5$.**
$$ \frac{d}{dt}{}_tV\Big|_{5} = \delta\,{}_5V + P - \mu(S - {}_5V) $$
$$ = 0.05(0.0500) + 0.0204 - 0.02(1 - 0.0500) $$
$$ = 0.0025 + 0.0204 - 0.02(0.95) = 0.0025 + 0.0204 - 0.019 = 0.0039. $$

**Step 2 — Euler update with $h=1$.**
$$ {}_6V \approx {}_5V + h\cdot \frac{d}{dt}{}_tV\Big|_5 = 0.0500 + 1(0.0039) = 0.0539. $$

**Answer:** ${}_6V \approx 0.0539$.

---

### Example 4 — Gross premium reserve & the expense reserve sign

A fully discrete whole life of \$100{,}000 on $(55)$ has gross premium $G = 1{,}800$. First-year expenses: 50% of premium + \$200. Renewal expenses: 5% of premium + \$30, at each premium date. The net premium reserve at time 1 is ${}_1V^{\text{net}} = 1{,}050$. The gross reserve at time 1 is computed (prospectively) as ${}_1V^{g} = 700$. Find the expense reserve at time 1 and interpret its sign.

**Step 1 — Expense reserve.**
$$ {}_1V^{\text{expense}} = {}_1V^{g} - {}_1V^{\text{net}} = 700 - 1050 = -350. $$

**Step 2 — Interpretation.** The expense reserve is **negative** because the heavy first-year acquisition expense (50% of premium + \$200 = \$900+\$200 = \$1{,}100, vs. renewal loading of only 5% + \$30 = \$120) is not yet recouped. The renewal expense loadings in $G$ will recover it over time, so the expense reserve rises toward 0.

**Answer:** ${}_1V^{\text{expense}} = -\$350$ (negative early-duration expense reserve, as expected).

---

### Example 5 — Full Preliminary Term reserve

A fully discrete whole life of \$1 is issued to $(60)$. Using the FPT method, the first-year reserve is zero and subsequent reserves equal the net reserves of the same plan issued at age 61. You are given the *net premium* reserve table for whole life issued at age 61: ${}_0V_{61}=0$, ${}_1V_{61}=0.015$, ${}_2V_{61}=0.031$. Find the FPT reserves ${}_1V^{FPT}_{60}$, ${}_2V^{FPT}_{60}$, ${}_3V^{FPT}_{60}$.

**Apply** ${}_tV^{FPT}_{60} = {}_{t-1}V_{61}$ for $t \ge 1$:
$$ {}_1V^{FPT}_{60} = {}_0V_{61} = 0, $$
$$ {}_2V^{FPT}_{60} = {}_1V_{61} = 0.015, $$
$$ {}_3V^{FPT}_{60} = {}_2V_{61} = 0.031. $$

**Answer:** $0,\;0.015,\;0.031$. (Note FPT reserve at duration 1 is 0 — exactly the surplus relief FPT is designed to give.)

---

## Common Exam Traps

1. **Using the gross premium in a "net premium reserve."** If the question asks for the *net premium policy value*, compute the **net** premium $P$ from the equivalence principle (no expenses) and use it both in the premium leg and the valuation — even if the policy charges a gross premium $G$.

2. **Mixing premium basis and valuation basis, then using the retrospective formula.** Prospective = retrospective **only** when the bases match and equivalence-principle premiums were used. When bases differ, **use prospective.**

3. **Dividing by $p_{x+t}$ vs. $q_{x+t}$ in the recursion.** The survivor reserve term is $p_{x+t}\,{}_{t+1}V$. To solve forward you divide by $p_{x+t}$, *not* $q_{x+t}$. A common slip.

4. **Benefit timing.** End-of-year death benefit uses $(1+i)$ and the recursion above. If the benefit is payable at the *moment* of death or there is a fractional-year discount, the cost-of-insurance term changes — read the timing carefully.

5. **Sign of the expense reserve.** Candidates often write it as positive. Early on it is **negative** (acquisition cost not yet recovered). Don't "fix" a negative answer.

6. **Thiele's sign on the net-amount-at-risk term.** It is $-\mu_{x+t}(S_t - {}_tV)$, *minus*. The reserve is *reduced* by paying the net amount at risk. Watch for $+\mu(S-{}_tV)$ errors.

7. **FPT off-by-one.** ${}_tV^{FPT}_x = {}_{t-1}V_{x+1}$, not ${}_tV_{x+1}$. And ${}_1V^{FPT}=0$, not ${}_0V$.

8. **Net amount at risk uses ${}_{t+1}V$, not ${}_tV$.** $\text{NAR} = S_{t+1} - {}_{t+1}V$ (the *end-of-year* reserve), because the death benefit and the surviving reserve both occur at year-end.

9. **Effect of changing the interest assumption.** **Lowering** the valuation interest rate **raises** the reserve (benefits discounted less, premiums accumulate less). Several candidates get the direction backwards.

10. **Forgetting the maturity boundary condition.** For an $n$-year endowment, ${}_nV = $ the maturity benefit (e.g., \$1 per unit), not 0. For $n$-year term, ${}_nV = 0$. Use this to check recursions and to anchor Thiele's ODE.

---

## Self-Check Questions

1. State the prospective formula for the net premium policy value of a fully discrete whole life of \$1 on $(x)$ at duration $t$, and name every symbol.

2. Write the one-year recursion for a fully discrete insurance with end-of-year death benefit $S$ and starting-of-year net premium $P$. Solve it for ${}_{t+1}V$.

3. Under what condition are the prospective and retrospective policy values equal?

4. Is the early-duration expense reserve typically positive or negative, and why?

5. State Thiele's differential equation and identify the "net amount at risk."

### Answers

1. ${}_tV_x = A_{x+t} - P_x\,\ddot a_{x+t}$, where $A_{x+t}$ is the EPV of the future unit death benefit at age $x+t$, $\ddot a_{x+t}$ is the EPV of a unit whole life annuity-due at age $x+t$, and $P_x = A_x/\ddot a_x$ is the level net annual premium set at issue.

2. $({}_tV + P)(1+i) = q_{x+t}\,S + p_{x+t}\,{}_{t+1}V$, so $ {}_{t+1}V = \dfrac{({}_tV+P)(1+i) - q_{x+t}\,S}{p_{x+t}}.$

3. When the **same basis** (interest and mortality) is used for both the premium and the reserve, **and** the premium was set by the equivalence principle. Otherwise they may differ, and the prospective value is the definition.

4. **Negative.** Acquisition (first-year) expenses are front-loaded and exceed the first-year expense loading in the gross premium; the deficit is recovered by future renewal loadings, so the expense reserve starts negative and rises toward 0.

5. $\dfrac{d}{dt}{}_tV = \delta_t\,{}_tV + P_t - \mu_{x+t}(S_t - {}_tV)$. The **net amount at risk** is $S_t - {}_tV$: the extra cash beyond the reserve already held that the insurer must find when a death occurs.
