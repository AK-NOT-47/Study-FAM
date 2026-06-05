# Premium Calculation

## Learning Objectives

After mastering this topic, you should be able to:

- State and apply the **equivalence principle** to compute **net (benefit) premiums** for whole life, term, and endowment insurances.
- Compute net premiums funded by **annual**, **m-thly**, and **fully continuous** premium streams.
- Compute **gross (expense-loaded) premiums** that incorporate **per-policy**, **per-premium (percentage)**, and **per-1000-of-face** expenses, allowing different first-year and renewal expense structures.
- Define and work with the **loss-at-issue random variable** $L_0$ (and the gross-premium version $L_0^g$): write it in terms of present-value random variables, and compute its **expectation** and **variance**.
- Compute **percentile premiums** for a single policy, and apply the **portfolio percentile premium principle** to a block of independent policies using a Normal approximation.

These map to the SOA FAM-L learning outcomes on premium calculation and the loss random variable, following *Actuarial Mathematics for Life Contingent Risks* (Dickson, Hardy & Waters, "DHW"), Chapter 6.

## Key Concepts

### 1. Why premiums exist — the loss random variable

When an insurer issues a policy, it promises a benefit (paid at death or maturity) in exchange for premiums. Both sides are random because the timing of death is random. The fundamental object is the **present-value-of-future-loss at issue**:

$$L_0 = (\text{PV of benefits and expenses paid out}) - (\text{PV of premiums received}).$$

$L_0 > 0$ means the policy lost money (in PV terms); $L_0 < 0$ means it made money. The insurer wants this to be **zero on average** (the equivalence principle) or, more conservatively, to be positive only with small probability (percentile premiums).

### 2. The equivalence principle

The **equivalence principle** sets the premium so that the **expected** present value of loss is zero:

$$E[L_0] = 0 \quad\Longleftrightarrow\quad \text{EPV(benefits + expenses)} = \text{EPV(premiums)}.$$

For a **net** premium we ignore expenses; for a **gross** premium we include them. This is the workhorse of the whole topic. Build the equation of value, solve for the premium.

### 3. Net premiums for the three standard contracts

Think "benefit EPV on top, annuity EPV on the bottom." The premium is benefit cost spread over the expected discounted number of premium payments. The annuity in the denominator must be **due** (payments at the start of each period) for discrete premiums, because premiums are paid in advance.

- **Whole life** (benefit 1 at death, premiums for life): $P = A_x / \ddot a_x$.
- **n-year term** (benefit 1 if death within n, premiums for at most n years): $P = A^{\,1}_{x:\overline{n}|} / \ddot a_{x:\overline{n}|}$.
- **n-year endowment** (benefit 1 on death within n OR survival to n, premiums for at most n years): $P = A_{x:\overline{n}|} / \ddot a_{x:\overline{n}|}$.

Note the **premium-paying period** and the **benefit period** need not coincide. A whole life policy with premiums limited to $h$ years has $P = A_x / \ddot a_{x:\overline{h}|}$. Always match the denominator annuity to the actual premium-paying pattern.

### 4. Continuous and m-thly premiums

- **Fully continuous** (continuous benefit $\bar A$, continuous premium): $\bar P(\bar A_x) = \bar A_x / \bar a_x$.
- **m-thly** premiums (paid $m$ times per year, $1/m$ each time): denominator becomes $\ddot a_x^{(m)}$. So $P^{(m)} = A_x / \ddot a_x^{(m)}$ where $P^{(m)}$ is the **total annual** premium and each installment is $P^{(m)}/m$.

A common exam shortcut uses the **UDD / Woolhouse** relationships to get $\ddot a_x^{(m)}$ and $\bar a_x$ from $\ddot a_x$ (see Formulas).

### 5. Gross premiums and expenses

Real premiums must cover **expenses**. Three flavors, and they may differ between the **first year** (acquisition costs are heavy: commissions, underwriting) and **renewal years**:

- **Per-policy** expenses: a flat dollar amount each year (e.g., \$50 first year, \$10 renewal).
- **Per-premium** expenses: a percentage of the gross premium (e.g., 40% of first premium, 5% thereafter) — these scale with $G$.
- **Per-1000** expenses: a dollar amount per \$1000 of face amount (e.g., \$2.50 per 1000 at issue).

The gross-premium equation of value is:

$$\text{EPV(benefits)} + \text{EPV(expenses)} = \text{EPV(gross premiums)} = G\,\ddot a.$$

Because per-premium expenses live on the same side as $G\,\ddot a$, you typically **move them across** and solve. See the formula section for the clean layout.

### 6. The variance of $L_0$ and the "annuity-trick"

For **fully continuous whole life** with annual rate of premium $P$, write $L_0$ in terms of the single PV random variable $Z = v^{T_x}$ (the PV of the death benefit). Using $\bar a_{\overline{T}|} = (1 - v^{T})/\delta$:

$$L_0 = v^{T} - P\,\bar a_{\overline{T}|} = v^{T}\Big(1 + \frac{P}{\delta}\Big) - \frac{P}{\delta}.$$

So $L_0$ is a **linear function of $Z = v^T$**, which means

$$\mathrm{Var}(L_0) = \Big(1 + \frac{P}{\delta}\Big)^2 \mathrm{Var}(Z) = \Big(1 + \frac{P}{\delta}\Big)^2\big({}^2\bar A_x - (\bar A_x)^2\big).$$

The analogous discrete result uses $i/d$-type factors; see Formulas. This "express $L_0$ as $a + b\cdot Z$" technique is the key to every variance problem on this topic. The same idea works for endowment insurance because endowment PV is also a function of a single $Z$.

### 7. Percentile premiums and the portfolio principle

The equivalence principle gives a 50%-ish chance of loss. A more prudent rule:

- **Percentile premium (single policy):** choose premium $P$ so that $\Pr(L_0 > 0) = \alpha$ for some small $\alpha$ (e.g., 0.05). Because $L_0$ is monotonic in $T_x$ (or in $Z$), you find the relevant percentile of $T_x$ and set $L_0 = 0$ at that future lifetime.
- **Portfolio percentile premium principle:** for $N$ **independent identical** policies, choose $P$ so that the **aggregate** loss $S = \sum L_{0,i}$ satisfies $\Pr(S > 0) = \alpha$. Apply the **Central Limit Theorem**: $S \approx \text{Normal}(N\,E[L_0],\; N\,\mathrm{Var}[L_0])$, and set $\Pr(S>0) = \alpha$. As $N \to \infty$ the required loading per policy shrinks toward the equivalence-principle premium.

## Formulas

Notation reminder: $v = 1/(1+i)$, $d = iv = 1 - v$, $\delta = \ln(1+i)$. $T_x$ is the future lifetime of $(x)$; $K_x = \lfloor T_x\rfloor$ is the curtate future lifetime. $A$'s are insurance EPVs, $\ddot a$'s are annuity-due EPVs, $\bar a$ continuous annuity EPVs. A leading superscript "2" (e.g. ${}^2A_x$) means the EPV computed at **double the force of interest**, i.e. using $i^* = 2i + i^2$ (equivalently $v^2$, $\delta^* = 2\delta$).

### Net premiums (equivalence principle)

Discrete (annual) premiums, benefit 1:

$$P_x = \frac{A_x}{\ddot a_x}, \qquad P^{\,1}_{x:\overline{n}|} = \frac{A^{\,1}_{x:\overline{n}|}}{\ddot a_{x:\overline{n}|}}, \qquad P_{x:\overline{n}|} = \frac{A_{x:\overline{n}|}}{\ddot a_{x:\overline{n}|}}.$$

- $A_x$: EPV of whole life insurance of 1 on $(x)$, paid end of year of death.
- $A^{\,1}_{x:\overline{n}|}$: EPV of $n$-year term insurance (death benefit only).
- $A_{x:\overline{n}|} = A^{\,1}_{x:\overline{n}|} + {}_nE_x$: EPV of $n$-year endowment insurance; ${}_nE_x = v^n\,{}_np_x$ is the pure endowment.
- $\ddot a_{x:\overline{n}|}$: EPV of an $n$-year temporary annuity-due of 1 per year.

Limited payment whole life (premiums for $h$ years): $\;{}_hP_x = A_x / \ddot a_{x:\overline{h}|}$.

Useful identity (whole life): $A_x = 1 - d\,\ddot a_x$, hence

$$P_x = \frac{A_x}{\ddot a_x} = \frac{1}{\ddot a_x} - d.$$

Endowment identity: $A_{x:\overline{n}|} = 1 - d\,\ddot a_{x:\overline{n}|}$, hence $P_{x:\overline{n}|} = \dfrac{1}{\ddot a_{x:\overline{n}|}} - d.$

### Continuous and m-thly

$$\bar P(\bar A_x) = \frac{\bar A_x}{\bar a_x}, \qquad \bar A_x = 1 - \delta\,\bar a_x, \qquad \bar P(\bar A_x) = \frac{1}{\bar a_x} - \delta.$$

$$P^{(m)}_x = \frac{A_x}{\ddot a_x^{(m)}} \quad(\text{total annual premium}); \quad \text{each of the } m \text{ installments} = \frac{P^{(m)}_x}{m}.$$

Conversion (Woolhouse, 2-term — exam standard):

$$\ddot a_x^{(m)} \approx \ddot a_x - \frac{m-1}{2m}, \qquad \bar a_x \approx \ddot a_x - \tfrac12.$$

Conversion (UDD): $\;\ddot a_x^{(m)} = \alpha(m)\,\ddot a_x - \beta(m)$, and $\bar A_x = \dfrac{i}{\delta}A_x$, $\;A_x^{(m)} = \dfrac{i}{i^{(m)}}A_x$.

### Gross (expense-loaded) premium $G$

Let benefit face amount be $S$ (often in units, so "per 1000" expenses use $S/1000$). General equation of value:

$$\underbrace{S\cdot A}_{\text{benefits}} + \underbrace{\text{EPV expenses}}_{E} = G\,\ddot a.$$

If first-year per-premium rate is $r_1$, renewal $r$; first-year per-policy $e_1$, renewal $e$; first-year per-1000 $f_1$, renewal $f$ (per 1000 of face $S$), and premiums paid for the whole annuity period:

$$G\,\ddot a = S\cdot A \;+\; \Big[(e_1 - e) + (f_1 - f)\tfrac{S}{1000}\Big] \;+\; e\,\ddot a + f\tfrac{S}{1000}\ddot a \;+\; \big[(r_1 - r)G + rG\,\ddot a\big].$$

Solve for $G$:

$$\boxed{\;G = \frac{S\cdot A + e\,\ddot a + f\frac{S}{1000}\ddot a + (e_1 - e) + (f_1 - f)\frac{S}{1000}}{\ddot a - \big[r + (r_1 - r)\big]} = \frac{\text{EPV benefits} + \text{EPV expenses (ex per-premium)}}{\ddot a - \text{EPV of per-premium factor}}\;}$$

In practice: put **everything that is a multiple of $G$** (the per-premium expenses) on the premium side and divide.

### Loss-at-issue random variable $L_0$

Fully continuous whole life, premium rate $P$:

$$L_0 = v^{T_x} - P\,\bar a_{\overline{T_x}|} = \Big(1+\frac{P}{\delta}\Big)v^{T_x} - \frac{P}{\delta}.$$

$$E[L_0] = \bar A_x - P\,\bar a_x, \qquad \mathrm{Var}[L_0] = \Big(1+\frac{P}{\delta}\Big)^2\Big({}^2\bar A_x - (\bar A_x)^2\Big).$$

Fully discrete whole life, annual net premium $P$:

$$L_0 = v^{K_x+1} - P\,\ddot a_{\overline{K_x+1}|} = \Big(1+\frac{P}{d}\Big)v^{K_x+1} - \frac{P}{d}.$$

$$\mathrm{Var}[L_0] = \Big(1+\frac{P}{d}\Big)^2\Big({}^2A_x - (A_x)^2\Big).$$

Fully discrete $n$-year **endowment** (PV is still a single $Z = v^{\min(K_x+1,\,n)}$): same form with $A_{x:\overline{n}|}$ and ${}^2A_{x:\overline{n}|}$:

$$\mathrm{Var}[L_0] = \Big(1+\frac{P}{d}\Big)^2\Big({}^2A_{x:\overline{n}|} - (A_{x:\overline{n}|})^2\Big).$$

When $P$ is the **equivalence-principle** premium, $\Big(1+\frac{P}{d}\Big) = \dfrac{1}{1 - A} \cdot$ (useful: for whole life $1 + P/d = 1/(d\ddot a_x)\cdot d \cdots$); the cleanest memorized form is:

$$\mathrm{Var}[L_0]\Big|_{\text{equiv}} = \frac{{}^2A_x - (A_x)^2}{(1 - A_x)^2} = \frac{{}^2A_x - (A_x)^2}{(d\,\ddot a_x)^2}.$$

(Endowment: replace $A_x$ by $A_{x:\overline{n}|}$ throughout. Continuous: replace $A$ by $\bar A$, $d$ by $\delta$.)

### Percentile and portfolio premiums

Single-policy percentile: find premium $P$ with $\Pr(L_0 > 0) = \alpha$. Since $L_0$ decreases in $T_x$ (longer life ⇒ smaller loss), there is a lifetime $t^*$ with $\Pr(T_x \le t^*) = \alpha$; set $L_0 = 0$ at $T_x = t^*$ and solve for $P$.

Portfolio (N independent identical policies), aggregate loss $S = \sum_{i=1}^N L_{0,i}$:

$$\Pr(S > 0) = \alpha \;\Rightarrow\; \frac{0 - N\,E[L_0]}{\sqrt{N\,\mathrm{Var}[L_0]}} = z_{1-\alpha} \;\Rightarrow\; E[L_0] = -\,\frac{z_{1-\alpha}\,\sqrt{\mathrm{Var}[L_0]}}{\sqrt N},$$

where $z_{1-\alpha} = \Phi^{-1}(1-\alpha)$ (e.g. $z_{0.95}=1.645$). Substitute the expressions for $E[L_0]$ and $\mathrm{Var}[L_0]$ as functions of $P$ and solve for $P$.

## Worked Examples

### Example 1 — Net annual premium, whole life, with variance

A fully discrete whole life insurance of \$100,000 is issued to $(40)$. You are given $i = 0.05$, $A_{40} = 0.20$, ${}^2A_{40} = 0.06$. Find (a) the annual net premium and (b) the standard deviation of $L_0$.

**Solution.**
First $\ddot a_{40} = (1 - A_{40})/d$ with $d = 0.05/1.05 = 0.047619$.
$\ddot a_{40} = (1 - 0.20)/0.047619 = 0.80/0.047619 = 16.80$.

(a) $P = 100000 \cdot A_{40}/\ddot a_{40} = 100000 \cdot 0.20/16.80 = 100000 \cdot 0.011905 = 1190.48$.

(b) Use the equivalence-principle variance form, scaled by face 100000:
$\mathrm{Var}[L_0] = (100000)^2 \cdot \dfrac{{}^2A_{40} - (A_{40})^2}{(1 - A_{40})^2}$.
Numerator: $0.06 - 0.20^2 = 0.06 - 0.04 = 0.02$. Denominator: $(1-0.20)^2 = 0.64$.
Ratio $= 0.02/0.64 = 0.03125$. So $\mathrm{Var}[L_0] = 10^{10}\cdot 0.03125 = 3.125\times 10^{8}$.
$\mathrm{SD} = \sqrt{3.125\times10^{8}} = 17677$.

**Answer:** (a) $P = \$1{,}190.48$ per year. (b) $\mathrm{SD}(L_0) = \$17{,}677$ (approx).

### Example 2 — Gross premium with first-year and renewal expenses

A fully discrete whole life of \$50,000 on $(50)$. Expenses:
- First year: 40% of premium + \$100 per policy + \$3.00 per 1000 of face.
- Renewal: 5% of premium + \$25 per policy + \$1.00 per 1000 of face.

Given $A_{50} = 0.25$, $\ddot a_{50} = 15.00$, $i = 0.05$ ($d = 0.047619$). Find the gross annual premium $G$ by the equivalence principle.

**Solution.**
Face $S = 50000$, so $S/1000 = 50$.

EPV benefits $= 50000 \cdot 0.25 = 12500$.

Per-policy expenses: renewal \$25 every year plus extra \$75 in year 1.
$= 25\,\ddot a_{50} + 75 = 25(15) + 75 = 375 + 75 = 450$.

Per-1000 expenses: renewal \$1.00/1000 every year plus extra \$2.00/1000 in year 1.
$= 1.00(50)\,\ddot a_{50} + 2.00(50) = 50(15) + 100 = 750 + 100 = 850$.

Per-premium expenses (functions of $G$): renewal 5% every year plus extra 35% year 1.
EPV $= 0.05\,G\,\ddot a_{50} + 0.35\,G = 0.05G(15) + 0.35G = 0.75G + 0.35G = 1.10G$.

Equation of value: $G\,\ddot a_{50} = \text{EPV benefits} + \text{per-policy} + \text{per-1000} + \text{per-premium}$:
$$15 G = 12500 + 450 + 850 + 1.10 G.$$
$$15G - 1.10G = 13800 \;\Rightarrow\; 13.90 G = 13800 \;\Rightarrow\; G = 992.81.$$

**Answer:** $G = \$992.81$ per year.

### Example 3 — Portfolio percentile premium (Normal approximation)

An insurer sells $N = 1000$ identical fully continuous whole life policies of \$1 each on $(x)$. You are given $\delta = 0.06$, $\bar A_x = 0.30$, ${}^2\bar A_x = 0.12$. Determine the annual premium rate $P$ (same for all policies) so that the probability the **aggregate** loss is positive equals 5%. Use $z_{0.95} = 1.645$.

**Solution.**
For one policy: $E[L_0] = \bar A_x - P\,\bar a_x$ where $\bar a_x = (1 - \bar A_x)/\delta = (1-0.30)/0.06 = 11.6667$.
So $E[L_0] = 0.30 - 11.6667\,P$.

Variance of one policy: $\mathrm{Var}[L_0] = \big(1 + P/\delta\big)^2\big({}^2\bar A_x - (\bar A_x)^2\big)$.
$\;{}^2\bar A_x - (\bar A_x)^2 = 0.12 - 0.09 = 0.03$. And $1 + P/\delta = 1 + P/0.06$.
So $\mathrm{Var}[L_0] = (1 + P/0.06)^2 (0.03)$.

Portfolio condition $\Pr(S>0)=0.05$:
$$E[L_0] = -\,z_{0.95}\,\frac{\sqrt{\mathrm{Var}[L_0]}}{\sqrt N} = -\,1.645\,\frac{\sqrt{0.03}\,(1+P/0.06)}{\sqrt{1000}}.$$
Compute the coefficient: $\sqrt{0.03} = 0.173205$, $\sqrt{1000} = 31.6228$.
$1.645 \times 0.173205 / 31.6228 = 0.284923/31.6228 = 0.0090101$.

Equation:
$$0.30 - 11.6667P = -0.0090101\,(1 + P/0.06) = -0.0090101 - 0.150168\,P.$$
Bring terms together:
$$0.30 + 0.0090101 = 11.6667P - 0.150168P$$
$$0.309010 = 11.5165P \;\Rightarrow\; P = 0.026833.$$

(Compare: the pure equivalence-principle rate is $\bar A_x/\bar a_x = 0.30/11.6667 = 0.025714$. The portfolio loading is small because $N$ is large.)

**Answer:** $P \approx 0.02683$ per year per \$1 of insurance (i.e. \$26.83 per \$1000).

### Example 4 — Single-policy percentile premium

A fully discrete whole life of 1 on $(x)$ with $i = 0.05$. Mortality is such that $\Pr(K_x = 0) = 0.02$, $\Pr(K_x = 1) = 0.03$, $\Pr(K_x = 2)=0.04$, and the 5th percentile of $K_x$ falls at $K_x = 2$ (i.e. $\Pr(K_x \le 1) = 0.05$). Find the annual premium $P$ so that $\Pr(L_0 > 0) = 0.05$.

**Solution.**
$L_0 = v^{K+1} - P\,\ddot a_{\overline{K+1}|}$ is **decreasing** in $K$: an early death (small $K$) gives a large loss. We want the smallest $K$ that we are willing to "let lose money" with cumulative probability $\le 0.05$. Here $\Pr(K_x \le 1) = 0.02 + 0.03 = 0.05$. So deaths at $K=0$ and $K=1$ (total prob 0.05) may produce a loss; we set $L_0 = 0$ at the boundary $K = 2$ (the first survival outcome that must **not** lose money), guaranteeing $\Pr(L_0>0)\le 0.05$.

Set $L_0 = 0$ at $K = 2$ (death in year 3, benefit at $t=3$, three premiums at $t=0,1,2$):
$v^{3} = P\,\ddot a_{\overline{3}|}$.
$v = 1/1.05 = 0.952381$, $v^3 = 0.863838$.
$\ddot a_{\overline 3|} = 1 + v + v^2 = 1 + 0.952381 + 0.907029 = 2.859410$.
$P = 0.863838 / 2.859410 = 0.302103$.

**Answer:** $P \approx 0.3021$ per \$1 of insurance.

## Common Exam Traps

- **Using an immediate annuity in the denominator.** Discrete premiums are paid in **advance**, so the denominator is an annuity-**due** $\ddot a$, never $a$. For continuous premiums use $\bar a$.
- **Mismatching the premium period and benefit period.** A limited-pay or term-funded whole life uses $\ddot a_{x:\overline{h}|}$ (the actual premium-paying annuity), not $\ddot a_x$. Read whether premiums stop early.
- **Forgetting the variance shortcut requires a single $Z$.** The clean variance formulas ($\mathrm{Var}[L_0] = (1+P/d)^2[{}^2A - A^2]$) only hold for **whole life and endowment** insurance, where the benefit PV is a function of one random variable. For **term insurance** the PV is NOT a single $Z$ (the survival-to-$n$ outcome pays nothing), so you must build $L_0$ outcome-by-outcome or use $\mathrm{Var}=E[L_0^2]-(E[L_0])^2$ directly.
- **Using $d$ where $\delta$ belongs (or vice versa).** Discrete: factor is $1 + P/d$. Continuous: $1 + P/\delta$. The "double-force" quantity ${}^2A$ is computed at $i^* = 2i + i^2$ (discrete) or $\delta^* = 2\delta$ (continuous) — do NOT just double $A$.
- **Mixing per-policy and per-1000 expenses.** Per-policy is a flat \$ amount regardless of face; per-1000 scales with face / 1000. Keep them separate and multiply per-1000 by $S/1000$.
- **Putting per-premium expenses on the wrong side.** Percentage-of-premium expenses are multiples of $G$, so they must be **subtracted from $G\ddot a$** (moved to the premium side) before dividing — not lumped with the benefit EPV.
- **First-year expense double counting.** A clean method: charge the **renewal** rate for ALL years (including year 1) via the full annuity, then add the **excess** (first-year minus renewal) once at $t=0$. Avoids errors.
- **Portfolio percentile sign error.** You need $\Pr(S>0)=\alpha$ small, which forces $E[L_0] < 0$ (expected profit). The equation is $E[L_0] = -z_{1-\alpha}\,\mathrm{SD}(L_0)/\sqrt N$ — note the **minus sign** and the $\sqrt N$ in the denominator.
- **Percentile premium: wrong percentile of $T$.** Because $L_0$ is **decreasing** in $T_x$, the loss exceeds 0 for the **shortest** lifetimes. You match $\Pr(L_0>0)=\alpha$ to the **lower** tail of $T_x$, then set $L_0=0$ at the boundary survival outcome.

## Self-Check Questions

1. Write the equivalence-principle net annual premium for an $n$-year endowment of 1 on $(x)$, and give the algebraic identity that lets you compute it from $\ddot a_{x:\overline{n}|}$ alone.
2. For fully discrete whole life with annual net premium $P$, express $L_0$ as a linear function of $Z = v^{K_x+1}$ and state $\mathrm{Var}[L_0]$.
3. An insurer's renewal per-premium expense is 6% and first-year is 50%, with $\ddot a_x = 12$. What is the EPV (as a multiple of $G$) of all per-premium expenses?
4. Why can you NOT use the formula $\mathrm{Var}[L_0]=(1+P/d)^2[{}^2A^{\,1}_{x:\overline n|}-(A^{\,1}_{x:\overline n|})^2]$ for a pure term insurance?
5. In the portfolio percentile principle, what happens to the required per-policy premium loading (above the equivalence premium) as the number of policies $N \to \infty$, and why?

### Answers

1. $P_{x:\overline{n}|} = A_{x:\overline{n}|}/\ddot a_{x:\overline{n}|}$. Using $A_{x:\overline{n}|} = 1 - d\,\ddot a_{x:\overline{n}|}$, this equals $\dfrac{1}{\ddot a_{x:\overline{n}|}} - d$.

2. $L_0 = \big(1 + \tfrac{P}{d}\big)v^{K_x+1} - \tfrac{P}{d}$, so $\mathrm{Var}[L_0] = \big(1+\tfrac{P}{d}\big)^2\big({}^2A_x - (A_x)^2\big)$.

3. Renewal 6% every year: $0.06 G \ddot a_x = 0.06G(12) = 0.72G$. First-year excess $(0.50 - 0.06) = 0.44$ once: $0.44G$. Total $= 0.72G + 0.44G = 1.16G$.

4. Because the benefit PV of a term insurance is **not** a function of a single random variable $Z$: survivors to time $n$ receive nothing (PV 0) while deaths pay $v^{K+1}$, so $L_0$ is not an affine function of one $Z$. The linear-in-$Z$ derivation (and hence the shortcut) breaks down; compute the variance directly from $E[L_0^2]-(E[L_0])^2$.

5. The loading shrinks to **zero**; the premium tends to the equivalence-principle premium. The portfolio condition gives loading $\propto z_{1-\alpha}\,\mathrm{SD}(L_0)/\sqrt N$, and the $\sqrt N$ in the denominator drives it to 0 (diversification: relative risk of the average loss vanishes as $N$ grows).
