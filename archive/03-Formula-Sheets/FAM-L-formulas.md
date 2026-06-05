# FAM-L (Long-Term) — Master Formula Sheet

> **Notation:** $(x)$ = a life aged $x$. $T_x$ = future lifetime random variable (continuous). $K_x = \lfloor T_x \rfloor$ = curtate future lifetime (integer years completed). $\omega$ = limiting age. EPV = Expected Present Value. $v = 1/(1+i)$, $\delta = \ln(1+i)$ = force of interest.

---

## 1. Survival Models

**Survival function (from age 0):**
$$S_0(x) = \Pr[T_0 > x], \qquad S_0(0)=1,\quad S_0(\infty)=0,\quad \text{non-increasing.}$$

**Survival from age $x$:**
$$\;_t p_x = \Pr[T_x > t] = \frac{S_0(x+t)}{S_0(x)} = \frac{S_x(t)}{1}$$

**Deferred / general relations:**
$$\;_t q_x = 1 - \;_t p_x = \Pr[T_x \le t], \qquad p_x = \;_1 p_x,\quad q_x = \;_1 q_x$$
$$\;_{t}p_x = \;_{s}p_x \cdot \;_{t-s}p_{x+s} \quad\text{(consistency / multiplicative)}$$
$$\;_{u|t}q_x = \Pr[u < T_x \le u+t] = \;_u p_x - \;_{u+t}p_x = \;_u p_x \cdot \;_t q_{x+u}$$

**Force of mortality (hazard rate):**
$$\mu_x = -\frac{1}{S_0(x)}\frac{d}{dx}S_0(x) = -\frac{d}{dx}\ln S_0(x) = \frac{f_0(x)}{S_0(x)}$$
$$\mu_{x+t} = -\frac{1}{\;_t p_x}\frac{d}{dt}\;_t p_x \;\Longrightarrow\; \frac{d}{dt}\;_t p_x = -\;_t p_x\,\mu_{x+t}$$

**Survival from force:**
$$\;_t p_x = \exp\!\left(-\int_0^t \mu_{x+s}\,ds\right), \qquad S_0(x)=\exp\!\left(-\int_0^x \mu_s\,ds\right)$$

**Density of $T_x$:**
$$f_{T_x}(t) = \;_t p_x\,\mu_{x+t}, \qquad \;_t q_x = \int_0^t \;_s p_x\,\mu_{x+s}\,ds$$

---

## 2. Expectation of Life

**Complete expectation (continuous):**
$$\mathring{e}_x = E[T_x] = \int_0^\infty \;_t p_x\,dt, \qquad E[T_x^2] = \int_0^\infty 2t\,\;_t p_x\,dt = 2\int_0^\infty t\,\;_t p_x\,dt$$
$$\mathrm{Var}(T_x) = E[T_x^2] - (\mathring{e}_x)^2$$

**Term (limited) complete expectation:**
$$\mathring{e}_{x:\overline{n|}} = \int_0^n \;_t p_x\,dt$$

**Curtate expectation (discrete):**
$$e_x = E[K_x] = \sum_{k=1}^\infty \;_k p_x, \qquad E[K_x^2] = \sum_{k=1}^\infty (2k-1)\,\;_k p_x$$
$$\mathrm{Var}(K_x) = E[K_x^2] - e_x^2 \qquad e_x = \sum_{k=1}^\infty\;_kp_x,\quad e_{x:\overline{n|}}=\sum_{k=1}^n \;_kp_x$$

**Recursions:**
$$e_x = p_x(1 + e_{x+1}), \qquad \mathring{e}_x \approx e_x + \tfrac{1}{2} \;\text{(under UDD)}$$
$$\mathring{e}_x = \mathring{e}_{x:\overline{n|}} + \;_n p_x\,\mathring{e}_{x+n}$$

---

## 3. Analytic Laws of Mortality

**Constant force:** $\mu_{x}=\mu$ (all ages)
$$\;_t p_x = e^{-\mu t}, \quad \mathring{e}_x = \frac{1}{\mu}, \quad \mathrm{Var}(T_x)=\frac{1}{\mu^2}, \quad A_x = \frac{\mu}{\mu+\delta}, \quad \bar a_x = \frac{1}{\mu+\delta}$$

**Uniform / De Moivre** (mortality uniform to age $\omega$), $0\le x < \omega$:
$$S_0(x)=1-\frac{x}{\omega},\quad \mu_x=\frac{1}{\omega-x},\quad \;_tp_x=\frac{\omega-x-t}{\omega-x},\quad \;_tq_x=\frac{t}{\omega-x}$$
$$T_x \sim \text{Uniform}(0,\omega-x),\quad \mathring{e}_x=\frac{\omega-x}{2},\quad \mathrm{Var}(T_x)=\frac{(\omega-x)^2}{12}$$

**Generalized De Moivre:** $S_0(x)=\left(1-\frac{x}{\omega}\right)^\alpha,\quad \mu_x=\frac{\alpha}{\omega-x},\quad \mathring{e}_x=\frac{\omega-x}{\alpha+1}$

**Gompertz:** $\mu_x = B c^x$ ($B>0,\,c>1$)
$$\;_t p_x = \exp\!\left(-\frac{B c^x (c^t -1)}{\ln c}\right)$$

**Makeham:** $\mu_x = A + B c^x$ (adds age-independent accident term $A\ge -B$)
$$\;_t p_x = \exp\!\left(-A t - \frac{B c^x (c^t -1)}{\ln c}\right)$$

---

## 4. Life Table Functions

With radix $\ell_0$:
$$\ell_x = \ell_0 \cdot S_0(x) = \ell_0\,\;_x p_0, \qquad \;_t p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad \;_t q_x = \frac{\ell_x - \ell_{x+t}}{\ell_x}$$
$$\;_t d_x = \ell_x - \ell_{x+t}, \qquad d_x = \ell_x - \ell_{x+1}, \qquad \;_{u|t}d_x = \ell_{x+u}-\ell_{x+u+t}$$
$$\mu_x = -\frac{1}{\ell_x}\frac{d\ell_x}{dx}, \qquad \ell_{x+t}=\ell_x\exp\!\left(-\int_0^t\mu_{x+s}ds\right)$$

**Central / integrated quantities:**
$$L_x = \int_0^1 \ell_{x+t}\,dt, \qquad T_x = \int_0^\infty \ell_{x+t}\,dt = \sum_{k=0}^\infty L_{x+k}, \qquad \mathring{e}_x = \frac{T_x}{\ell_x},\quad e_x=\frac{\sum_{k=1}^\infty \ell_{x+k}}{\ell_x}$$
$$m_x = \frac{d_x}{L_x}\;\text{(central death rate)}, \qquad a(x)=\frac{\int_0^1 t\,\ell_{x+t}dt}{L_x - \ell_{x+1}}\;\text{(avg age at death in year)}$$

---

## 5. Fractional-Age Assumptions

Let $0 \le s < 1$, integer $x$. Two standard interpolations between integer-age table values.

### UDD (Uniform Distribution of Deaths)
$$\;_s q_x = s\,q_x, \qquad \;_s p_x = 1 - s\,q_x, \qquad \ell_{x+s} = \ell_x - s\,d_x$$
$$\mu_{x+s} = \frac{q_x}{1 - s\,q_x}, \qquad \;_s p_x\,\mu_{x+s} = q_x \;\text{(density is constant in }s)$$
$$\;_{s}q_{x+t}\text{-type, and } \;_{u|s}q_x = s\,q_{x+u}\;\text{within a year},\qquad \mathring{e}_x = e_x + \tfrac12$$

### Constant Force of Mortality (over each year of age)
$$\mu_{x+s} = \mu = -\ln p_x \;\text{(constant in }s), \qquad \;_s p_x = (p_x)^s, \qquad \;_s q_x = 1-(p_x)^s$$
$$\;_{s}p_{x+t}=(p_{x+t})^s \quad(\text{within integer year } x+t)$$

**Comparison note:** UDD ⇒ $\mu$ increases over the year; constant force ⇒ $\;_sq_x$ slightly below the UDD line. Both agree at integer ages.

---

## 6. Select & Ultimate Tables

$[x]$ = life selected at age $x$; $[x]+t$ = that life $t$ years later. Select period $d$: after $d$ years mortality depends only on attained age (becomes ultimate).
$$\;_t p_{[x]} = \frac{\ell_{[x]+t}}{\ell_{[x]}}, \qquad \ell_{[x]+d+k} = \ell_{x+d+k}\;(\text{merges to ultimate column})$$
$$q_{[x]+t} \le q_{x+t} \quad\text{(selection lowers mortality during select period)}$$
Read along the row $[x],[x]+1,\dots,[x]+d-1$ then down the ultimate column $\ell_{x+d},\ell_{x+d+1},\dots$

---

## 7. Insurance EPVs (Present Value of Benefits)

Benefit 1 paid on death/survival. $Z$ = present-value random variable.

### Continuous (paid at moment of death)
$$\bar A_x = E[v^{T_x}] = \int_0^\infty e^{-\delta t}\,\;_t p_x\,\mu_{x+t}\,dt$$
$$^2\bar A_x = E[v^{2T_x}] = \int_0^\infty e^{-2\delta t}\,\;_t p_x\,\mu_{x+t}\,dt \quad(\text{evaluate at force } 2\delta)$$
$$\mathrm{Var}(Z) = {}^2\bar A_x - (\bar A_x)^2$$

### Discrete (paid at end of year of death)
$$A_x = E[v^{K_x+1}] = \sum_{k=0}^\infty v^{k+1}\,\;_k p_x\,q_{x+k} = \sum_{k=0}^\infty v^{k+1}\,\;_{k|}q_x$$
$$^2A_x = \sum_{k=0}^\infty v^{2(k+1)}\,\;_{k|}q_x \quad(\text{rate } i^* = 2i+i^2,\ v^2),\qquad \mathrm{Var} = {}^2A_x - (A_x)^2$$

### Term, Endowment, Pure Endowment, Deferred
$$A^1_{x:\overline{n|}} = \sum_{k=0}^{n-1} v^{k+1}\,\;_{k|}q_x \;\text{(term, death benefit only)}$$
$$A_{x:\,\overline{n|}}^{\;\;\;1} = \;_n E_x = v^n\,\;_n p_x \;\text{(pure endowment, survival only)}$$
$$A_{x:\overline{n|}} = A^1_{x:\overline{n|}} + \;_n E_x \;\text{(endowment insurance)}$$
$$\;_{u|}A_x = v^u\,\;_u p_x\,A_{x+u} = \;_u E_x\,A_{x+u}\;\text{(deferred whole life)}$$

### Recursions
$$A_x = v\,q_x + v\,p_x\,A_{x+1}, \qquad \bar A_x = \;\text{(usually via UDD below)}$$
$$A_{x:\overline{n|}} = v\,q_x + v\,p_x\,A_{x+1:\overline{n-1|}}$$

### UDD relation (continuous ↔ discrete)
$$\bar A_x = \frac{i}{\delta}\,A_x, \qquad \bar A^1_{x:\overline{n|}} = \frac{i}{\delta}\,A^1_{x:\overline{n|}}, \qquad \bar A_{x:\overline{n|}} = \frac{i}{\delta}A^1_{x:\overline{n|}} + \;_nE_x$$

### $m$-thly insurance (benefit at end of $\tfrac{1}{m}$-year of death), UDD:
$$A_x^{(m)} = \frac{i}{i^{(m)}}\,A_x$$

### Increasing / Decreasing
$$(IA)_x = \sum_{k=0}^\infty (k+1)v^{k+1}\,\;_{k|}q_x, \quad (\bar I\bar A)_x = \int_0^\infty t\,e^{-\delta t}\,\;_tp_x\,\mu_{x+t}\,dt$$
$$(IA)_x + (DA)^1_{x:\overline{n|}} \text{ patterns; } (DA)^1_{x:\overline{n|}}=\sum_{k=0}^{n-1}(n-k)v^{k+1}\;_{k|}q_x$$

---

## 8. Annuity EPVs

$Y$ = present value of annuity payments. **Life annuity-due** pays at start of each year while alive.

### Discrete annuities
$$\ddot a_x = E\!\left[\ddot a_{\overline{K_x+1|}}\right] = \sum_{k=0}^\infty v^k\,\;_k p_x, \qquad a_x = \sum_{k=1}^\infty v^k\,\;_k p_x = \ddot a_x - 1$$
$$\ddot a_{x:\overline{n|}} = \sum_{k=0}^{n-1} v^k\,\;_k p_x, \qquad a_{x:\overline{n|}} = \sum_{k=1}^{n} v^k\,\;_k p_x$$
$$\;_{u|}\ddot a_x = v^u\,\;_u p_x\,\ddot a_{x+u} = \;_u E_x\,\ddot a_{x+u} = \ddot a_x - \ddot a_{x:\overline{u|}}$$

### The $A$–$a$ relationship (KEY)
$$\boxed{\ddot a_x = \frac{1 - A_x}{d}} \qquad d = iv = 1 - v = \frac{i}{1+i}$$
$$\ddot a_{x:\overline{n|}} = \frac{1 - A_{x:\overline{n|}}}{d}, \qquad A_x = 1 - d\,\ddot a_x, \qquad A_{x:\overline{n|}} = 1 - d\,\ddot a_{x:\overline{n|}}$$

### Continuous annuity
$$\bar a_x = \int_0^\infty e^{-\delta t}\,\;_t p_x\,dt = \frac{1 - \bar A_x}{\delta}, \qquad \bar a_{x:\overline{n|}} = \frac{1 - \bar A_{x:\overline{n|}}}{\delta}$$

### Variance of annuity (whole life, via insurance)
$$\mathrm{Var}(\ddot a_{\overline{K_x+1|}}) = \frac{{}^2A_x - (A_x)^2}{d^2}, \qquad \mathrm{Var}(\bar a_{\overline{T_x|}}) = \frac{{}^2\bar A_x - (\bar A_x)^2}{\delta^2}$$

### Recursion
$$\ddot a_x = 1 + v\,p_x\,\ddot a_{x+1}, \qquad \ddot a_{x:\overline{n|}} = 1 + v\,p_x\,\ddot a_{x+1:\overline{n-1|}}$$

### Woolhouse formula ($m$-thly, payments $\tfrac1m$ at start of each $\tfrac1m$-year)
$$\ddot a_x^{(m)} \approx \ddot a_x - \frac{m-1}{2m} - \frac{m^2-1}{12 m^2}\big(\delta + \mu_x\big)$$
$$\ddot a_{x:\overline{n|}}^{(m)} \approx \ddot a_{x:\overline{n|}} - \frac{m-1}{2m}\big(1 - \;_n E_x\big) - \frac{m^2-1}{12 m^2}\big(\delta + \mu_x - (\delta+\mu_{x+n})\;_nE_x\big)$$
**Continuous limit ($m\to\infty$):** $\bar a_x \approx \ddot a_x - \tfrac12 - \tfrac{1}{12}(\delta+\mu_x)$.

### $m$-thly via UDD (alternative)
$$\ddot a_x^{(m)} = \alpha(m)\,\ddot a_x - \beta(m), \quad \alpha(m)=\frac{i\,d}{i^{(m)}d^{(m)}},\quad \beta(m)=\frac{i - i^{(m)}}{i^{(m)}d^{(m)}}$$

---

## 9. Premiums

### Equivalence principle
$$E[L_0^n] = 0 \;\Longleftrightarrow\; \text{EPV(premiums)} = \text{EPV(benefits)}$$

**Net premiums (whole life, benefit 1, annual):**
$$P_x = \frac{A_x}{\ddot a_x} = \frac{d\,A_x}{1 - A_x} = \frac{1}{\ddot a_x} - d$$
$$P_{x:\overline{n|}} = \frac{A_{x:\overline{n|}}}{\ddot a_{x:\overline{n|}}}, \qquad P^1_{x:\overline{n|}}=\frac{A^1_{x:\overline{n|}}}{\ddot a_{x:\overline{n|}}}, \qquad \text{(fully continuous) } \bar P(\bar A_x)=\frac{\bar A_x}{\bar a_x}=\frac{\delta\bar A_x}{1-\bar A_x}$$

### Net loss-at-issue random variable (fully discrete, whole life, benefit $S$, premium $P$)
$$L_0 = S\,v^{K_x+1} - P\,\ddot a_{\overline{K_x+1|}} = \left(S + \frac{P}{d}\right)v^{K_x+1} - \frac{P}{d}$$
$$\mathrm{Var}(L_0) = \left(S + \frac{P}{d}\right)^2\!\left[{}^2A_x - (A_x)^2\right]$$
(Fully continuous analog: replace $K_x+1\to T_x$, $d\to\delta$, $A\to\bar A$.)

### Gross (expense-loaded) premium $G$
$$\text{EPV(gross prem.)} = \text{EPV(benefits)} + \text{EPV(expenses)} + \text{EPV(settlement/claim exp.)}$$
Typical: per-premium % expense + per-year flat + per-policy initial. Solve $G$ from equivalence.

### Percentile premium
Choose premium $P$ so that $\Pr[L_0 > 0] \le \alpha$. Because $L_0$ is monotone in $K_x$ (decreasing as survival lengthens), find the survival time $k^*$ where loss flips sign; set
$$\Pr[L_0 > 0] = \Pr[K_x \le k^* - 1] = \;_{k^*}q_x \le \alpha,\quad\text{then solve } L_0(k^*)=0 \text{ for } P.$$

---

## 10. Policy Values / Reserves

$\;_tV$ = net premium policy value at time $t$ (EPV future benefits − EPV future premiums, given still in force).

### Prospective (definition)
$$\;_t V = \text{EPV}_{x+t}[\text{future benefits}] - \text{EPV}_{x+t}[\text{future premiums}]$$
Whole life, benefit 1, net premium $P_x$:
$$\;_t V = A_{x+t} - P_x\,\ddot a_{x+t} = 1 - \frac{\ddot a_{x+t}}{\ddot a_x} = \frac{A_{x+t} - A_x}{1 - A_x}$$
At issue $\;_0V = 0$ (equivalence). Endowment: $\;_tV = A_{x+t:\overline{n-t|}} - P\,\ddot a_{x+t:\overline{n-t|}}$.

### Retrospective (equals prospective under equivalence + same basis)
$$\;_t V = \frac{1}{\;_t E_x}\Big(P\,\ddot a_{x:\overline{t|}} - A^1_{x:\overline{t|}}\Big) = \text{(accumulated past prem.)} - \text{(accumulated cost of insurance)}$$

### Recursion (fully discrete, benefit $S$, premium $P_t$, expenses $e_t$, interest $i$)
$$(\;_t V + P_t - e_t)(1+i) = S\,q_{x+t} + p_{x+t}\,\;_{t+1}V$$
$$\Rightarrow \;_{t+1}V = \frac{(\;_tV + P_t - e_t)(1+i) - S\,q_{x+t}}{p_{x+t}}$$

### Death Strain at Risk / Net Amount at Risk
$$\text{DSAR}_t = S - \;_{t+1}V \quad(\text{death benefit in excess of held reserve})$$
$$(\;_tV + P_t)(1+i) = \;_{t+1}V + q_{x+t}\,(S - \;_{t+1}V)$$

### Thiele's differential equation (continuous; premium rate $P$, benefit $S$, expense rate $e_t$)
$$\frac{d}{dt}\;_t V = \delta_t\,\;_t V + P_t - e_t - \mu_{x+t}\big(S + E_t - \;_t V\big)$$
Interpretation: reserve grows by interest + premium − expense, less the cost of paying out the net amount at risk $(S - \;_tV)$ at rate $\mu_{x+t}$.

---

## 11. Multiple-State Models

States $0,1,2,\dots$; $\;_tp_x^{ij}=\Pr[\text{in state } j \text{ at } x+t \mid \text{state } i \text{ at } x]$.
Transition intensity $\mu_x^{ij}=\lim_{h\to0}\frac{\;_hp_x^{ij}}{h}$ ($i\ne j$), and total exit intensity $\mu_x^{i\bullet}=\sum_{j\ne i}\mu_x^{ij}$.

**Stay-in-state (occupancy) probability:**
$$\;_t p_x^{\overline{ii}} = \exp\!\left(-\int_0^t \sum_{j\ne i}\mu_{x+s}^{ij}\,ds\right)$$

**Kolmogorov forward equations:**
$$\frac{\partial}{\partial t}\;_t p_x^{ij} = \sum_{k\ne j}\Big(\;_t p_x^{ik}\,\mu_{x+t}^{kj} - \;_t p_x^{ij}\,\mu_{x+t}^{jk}\Big)$$

**EPV (multi-state):** annuity while in state $j$ at rate $B^{(j)}$, lump $S^{(jk)}$ on $j\to k$ transition:
$$\text{EPV} = \sum_j \int_0^\infty e^{-\delta t}\,\;_t p_x^{ij}\,B^{(j)}\,dt \;+\; \sum_{j\ne k}\int_0^\infty e^{-\delta t}\,\;_t p_x^{ij}\,\mu_{x+t}^{jk}\,S^{(jk)}\,dt$$

---

## 12. Multiple-Decrement Models

Causes of decrement $j=1,\dots,m$ from a single active state. Superscript $(\tau)$ = all causes (total).
$$\mu_{x}^{(\tau)} = \sum_{j=1}^m \mu_x^{(j)}, \qquad \;_t p_x^{(\tau)} = \exp\!\left(-\int_0^t \mu_{x+s}^{(\tau)}\,ds\right)$$
$$\;_t q_x^{(j)} = \int_0^t \;_s p_x^{(\tau)}\,\mu_{x+s}^{(j)}\,ds, \qquad \;_t q_x^{(\tau)} = \sum_{j=1}^m \;_t q_x^{(j)} = 1 - \;_t p_x^{(\tau)}$$

**Life-table form:**
$$\ell_{x+t}^{(\tau)} = \ell_x^{(\tau)}\,\;_t p_x^{(\tau)}, \qquad d_x^{(j)} = \ell_x^{(\tau)}\,q_x^{(j)}, \qquad q_x^{(\tau)} = \sum_j q_x^{(j)}$$

### Associated single-decrement (independent) rates
$$\;_t p_x^{\prime(j)} = \exp\!\left(-\int_0^t \mu_{x+s}^{(j)}\,ds\right), \qquad \;_t p_x^{(\tau)} = \prod_{j=1}^m \;_t p_x^{\prime(j)}$$
$$q_x^{\prime(j)} = 1 - p_x^{\prime(j)} \quad(\text{rate if cause } j \text{ acted alone})$$

**UDD in the multiple-decrement table** (each $\;_tq_x^{(j)}=t\,q_x^{(j)}$):
$$p_x^{\prime(j)} = \big(p_x^{(\tau)}\big)^{q_x^{(j)}/q_x^{(\tau)}}$$

**UDD in each associated single-decrement table** (two decrements example):
$$q_x^{(1)} = q_x^{\prime(1)}\left(1 - \tfrac12 q_x^{\prime(2)}\right), \qquad q_x^{(2)} = q_x^{\prime(2)}\left(1 - \tfrac12 q_x^{\prime(1)}\right)$$
(Three decrements: $q_x^{(1)}=q_x^{\prime(1)}\big[1-\tfrac12(q_x^{\prime(2)}+q_x^{\prime(3)})+\tfrac13 q_x^{\prime(2)}q_x^{\prime(3)}\big]$.)

---

## 13. Quick-Reference Interest Functions

$$v=\frac{1}{1+i},\quad d = 1-v=\frac{i}{1+i}=iv,\quad \delta=\ln(1+i),\quad i = e^\delta -1$$
$$d^{(m)}=m\big(1-(1-d)^{1/m}\big)=m\big(1-v^{1/m}\big),\quad i^{(m)}=m\big((1+i)^{1/m}-1\big)$$
$$\left(1+\frac{i^{(m)}}{m}\right)\!\left(1-\frac{d^{(m)}}{m}\right)=1,\qquad d < d^{(m)} < \delta < i^{(m)} < i$$
$$\ddot a_{\overline{n|}}=\frac{1-v^n}{d},\quad a_{\overline{n|}}=\frac{1-v^n}{i},\quad \bar a_{\overline{n|}}=\frac{1-v^n}{\delta},\quad s_{\overline{n|}}=\frac{(1+i)^n-1}{i}$$

---
*End of FAM-L formula sheet. Use alongside the standard SOA tables; verify mortality basis (select vs. ultimate) and interest rate on every problem.*
