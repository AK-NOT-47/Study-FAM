# Severity Models

*FAM Short-Term — based on Klugman, Panjer & Willmot,* Loss Models: From Data to Decisions.

Severity models describe the **size of an individual loss** (the claim amount), as opposed to frequency models, which describe the *number* of losses. On Exam FAM you are expected to know a small zoo of continuous, positive-valued parametric distributions, to compute their moments, to compare their **tail weight**, and — crucially — to *create new distributions* from old ones (scaling for inflation, raising to a power, exponentiating, mixing, and splicing).

---

## Learning Objectives

By the end of this topic you should be able to:

1. **Recognize and use** the standard parametric severity distributions: exponential, gamma, Pareto, lognormal, Weibull, inverse Gaussian, generalized Pareto, Burr, and their relatives — using the parameterizations in the *Loss Models* appendix / FAM tables.
2. **Compute moments** ($E[X]$, $\text{Var}(X)$, $E[X^k]$) and **raw/central moments** from a distribution's density, survival function, or from the tables.
3. **Compute and interpret** the **hazard rate (failure rate)** $h(x)$ and the **mean excess / mean residual life** function $e(d)$, and use their behavior to classify tail weight.
4. **Compare tail weight** of two distributions using: existence of moments, limiting density/survival-function ratios, hazard rate behavior, and mean excess behavior.
5. **Create new distributions** by:
   - **Multiplication by a constant** (scaling — the basis of *uniform inflation*),
   - **Raising to a power** (transformed / inverse / inverse-transformed families),
   - **Exponentiation** (e.g., normal → lognormal),
   - **Mixing** (continuous and discrete mixtures; frailty/variance components),
   - **Splicing** (piecing different densities on disjoint intervals).
6. Identify which distributions are **scale families** and use the **scale parameter** $\theta$ correctly under inflation.

---

## Key Concepts

### 1. What a severity distribution is

A severity random variable $X$ is the dollar amount of a single loss. It is continuous, non-negative, and almost always **right-skewed** with a long right tail — a few enormous claims dominate. The whole game is choosing a distribution whose tail behaves the way the data's tail behaves.

### 2. Four equivalent descriptions

For a positive continuous $X$ you can describe it by any of:

- **pdf** $f(x)$,
- **cdf** $F(x) = P(X \le x)$,
- **survival function** $S(x) = 1 - F(x) = P(X > x)$,
- **hazard rate** $h(x) = f(x)/S(x)$.

They're interchangeable. The survival function is the natural object for tails; the hazard rate is the natural object for "given you've survived to $x$, the instantaneous rate of failure."

### 3. Scale families and the scale parameter $\theta$

A distribution is a **scale family** if multiplying $X$ by a positive constant $c$ keeps it in the same family, only changing the scale parameter. In *Loss Models* parameterizations the scale parameter is denoted $\theta$, and:

$$ Y = cX \implies \theta_Y = c\,\theta_X, \quad \text{other (shape) parameters unchanged.}$$

This is the single most useful structural fact in the topic, because **uniform inflation** of all losses by factor $(1+r)$ is exactly multiplication by a constant. Exponential, gamma, Pareto, Weibull, Burr, inverse Gaussian, and lognormal (where $\theta = e^\mu$ acts as the scale) are all scale families. **Lognormal's $\mu$ is a log-scale parameter**: inflating by $c$ adds $\ln c$ to $\mu$ and leaves $\sigma$ alone.

### 4. Tail weight — the central organizing idea

A **heavier tail** means more probability far out — bigger, more frequent extreme claims, and a greater chance the mean or variance is *infinite*. From lightest to heaviest, a rough ordering of the common severity models:

$$ \text{Weibull}(\tau>1) \prec \text{gamma}(\alpha>1) \prec \text{exponential} \prec \text{Weibull}(\tau<1),\ \text{lognormal} \prec \text{Pareto},\ \text{Burr}.$$

Four practical tools for *comparing* tail weight (memorize all four):

1. **Existence of moments.** The more positive moments a distribution has, the lighter the tail. Pareto only has moments $E[X^k]$ for $k < \alpha$ — so a Pareto with small $\alpha$ has an *infinite* mean. Any distribution with all positive moments (gamma, Weibull, lognormal) is lighter-tailed than one missing some.
2. **Limiting ratio of survival functions (or densities).** If $\displaystyle \lim_{x\to\infty} \frac{S_1(x)}{S_2(x)} = \infty$, then distribution 1 has the heavier tail. By L'Hôpital this equals $\lim f_1(x)/f_2(x)$.
3. **Hazard rate.** A **decreasing** hazard rate $\Rightarrow$ heavy tail; an **increasing** hazard rate $\Rightarrow$ light tail. (Exponential is the boundary: constant hazard = memoryless.)
4. **Mean excess function.** An **increasing** mean excess function $e(d)$ $\Rightarrow$ heavy tail; **decreasing** $\Rightarrow$ light tail. (Again exponential is the flat boundary: $e(d) = \theta$, constant.)

These four agree: heavy tail $\Leftrightarrow$ fewer moments $\Leftrightarrow$ $S$-ratio blows up $\Leftrightarrow$ decreasing hazard $\Leftrightarrow$ increasing mean excess.

### 5. Hazard rate (failure rate)

$$ h(x) = \frac{f(x)}{S(x)} = -\frac{d}{dx}\ln S(x).$$

Intuition: among policyholders whose loss exceeds $x$, $h(x)\,dx$ is the chance the loss lands in $(x, x+dx)$. For the **exponential** it's a constant $1/\theta$ (memoryless). Distributions with $h$ falling toward 0 keep "surviving" into ever-larger losses — heavy tail.

### 6. Mean excess / mean residual life $e(d)$

$$ e(d) = E[X - d \mid X > d] = \frac{\int_d^\infty S(x)\,dx}{S(d)}.$$

In insurance, $e(d)$ is the **expected payment per loss that exceeds an ordinary deductible $d$, on the losses that do exceed it** (i.e., the average amount above the deductible among claims big enough to pay). In reliability it is the **mean residual life**: given a component has lasted to age $d$, how much longer on average. For the exponential, memorylessness gives $e(d)=\theta$ for all $d$. Whether $e(d)$ rises or falls in $d$ is a clean tail-weight diagnostic.

### 7. Creating new distributions — five mechanisms

These are the operations the exam loves. Each takes a known distribution and manufactures another.

- **(a) Multiplication by a constant** $Y = cX$ ($c>0$): scaling. Within a scale family just multiply $\theta$ by $c$. Density transforms as $f_Y(y) = \tfrac{1}{c} f_X(y/c)$. Used for **inflation**.
- **(b) Raising to a power** $Y = X^{1/\tau}$: generates **transformed** ($\tau>0$), **inverse** ($\tau=-1$), and **inverse transformed** ($\tau<0$) families. Example: $X$ exponential, $Y = X^{1/\tau}$ → Weibull; the *inverse* exponential, *inverse* Weibull, etc., are built this way.
- **(c) Exponentiation** $Y = e^{X}$: e.g., $X \sim \text{Normal}(\mu,\sigma^2) \Rightarrow Y = e^X \sim \text{Lognormal}(\mu,\sigma)$. The lognormal's $k$-th moment uses the normal MGF: $E[Y^k] = e^{k\mu + k^2\sigma^2/2}$.
- **(d) Mixing.** Let a parameter be random. If $X \mid \Lambda$ has cdf $F(x\mid\lambda)$ and $\Lambda$ has density $u(\lambda)$, the **mixture** is $F_X(x) = \int F(x\mid\lambda)\,u(\lambda)\,d\lambda$. Mixing **always produces a heavier (or equal) tail** than the components and increases variance. Key fact: an **exponential with a gamma-distributed rate (or mean) yields a Pareto**; a discrete mixture is a weighted average of cdfs.
- **(e) Splicing.** Glue distinct densities on disjoint intervals: $f(x) = a_1 f_1(x)$ on $(c_0,c_1)$, $a_2 f_2(x)$ on $(c_1,c_2)$, etc., with each $f_j$ a legitimate density on its piece and weights $a_j \ge 0$ summing to 1. Used to model a body and a tail with different distributions.

### 8. Variance / conditional formulas for mixtures

For a mixture (condition on the mixing variable $\Lambda$):

$$ E[X] = E\big[\,E[X\mid\Lambda]\,\big], \qquad \text{Var}(X) = E\big[\text{Var}(X\mid\Lambda)\big] + \text{Var}\big(E[X\mid\Lambda]\big).$$

The second (law of total variance) is the workhorse for mixture problems.

---

## Formulas

Throughout, $\theta>0$ is the scale parameter; $\alpha,\tau>0$ are shape parameters. $\Gamma(\cdot)$ is the gamma function.

### Exponential$(\theta)$

$$ f(x) = \frac{1}{\theta}e^{-x/\theta}, \quad S(x) = e^{-x/\theta}, \quad h(x) = \frac{1}{\theta}, \quad e(d) = \theta.$$
$$ E[X] = \theta, \quad \text{Var}(X) = \theta^2, \quad E[X^k] = \theta^k\,k! \ (k \text{ integer}).$$

- $\theta$: mean loss. Memoryless: $S(x+d\mid X>d)=S(x)$.

### Gamma$(\alpha,\theta)$

$$ f(x) = \frac{(x/\theta)^\alpha e^{-x/\theta}}{x\,\Gamma(\alpha)}, \quad E[X]=\alpha\theta, \quad \text{Var}(X)=\alpha\theta^2, \quad E[X^k]=\frac{\theta^k\,\Gamma(\alpha+k)}{\Gamma(\alpha)}.$$

- $\alpha$: shape. $\alpha>1$ → increasing hazard (lighter than exponential tail); $\alpha<1$ → decreasing hazard (heavier); $\alpha=1$ → exponential. Sum of $\alpha$ independent Exponential$(\theta)$ when $\alpha$ integer (Erlang).

### Pareto$(\alpha,\theta)$ (two-parameter, *Loss Models*)

$$ f(x)=\frac{\alpha\theta^\alpha}{(x+\theta)^{\alpha+1}}, \quad S(x)=\left(\frac{\theta}{x+\theta}\right)^{\alpha}, \quad h(x)=\frac{\alpha}{x+\theta}\ (\text{decreasing}), \quad e(d)=\frac{d+\theta}{\alpha-1}\ (\alpha>1).$$
$$ E[X]=\frac{\theta}{\alpha-1}\ (\alpha>1), \quad E[X^k]=\frac{\theta^k\,k!}{(\alpha-1)(\alpha-2)\cdots(\alpha-k)}\ (k<\alpha,\ k \text{ integer}).$$
$$ \text{Var}(X)=\frac{\alpha\theta^2}{(\alpha-1)^2(\alpha-2)}\ (\alpha>2).$$

- Only moments of order $k<\alpha$ exist → heavy tail. $e(d)$ **increases linearly** in $d$ → heavy tail. Mean exists only if $\alpha>1$; variance only if $\alpha>2$.

### Lognormal$(\mu,\sigma)$

$$ f(x)=\frac{1}{x\sigma\sqrt{2\pi}}\exp\!\left[-\frac{(\ln x-\mu)^2}{2\sigma^2}\right], \quad F(x)=\Phi\!\left(\frac{\ln x-\mu}{\sigma}\right).$$
$$ E[X^k]=\exp\!\left(k\mu+\tfrac{1}{2}k^2\sigma^2\right), \quad E[X]=e^{\mu+\sigma^2/2}, \quad \text{Var}(X)=e^{2\mu+\sigma^2}\!\left(e^{\sigma^2}-1\right).$$

- $\mu,\sigma$ are the mean and sd of $\ln X$. $e^\mu$ is the scale (median). Probabilities via the standard normal $\Phi$. Heavier than exponential but lighter than Pareto.

### Weibull$(\theta,\tau)$

$$ F(x)=1-e^{-(x/\theta)^\tau}, \quad S(x)=e^{-(x/\theta)^\tau}, \quad f(x)=\frac{\tau (x/\theta)^\tau}{x}e^{-(x/\theta)^\tau}.$$
$$ h(x)=\frac{\tau}{\theta}\left(\frac{x}{\theta}\right)^{\tau-1}, \qquad E[X^k]=\theta^k\,\Gamma\!\left(1+\frac{k}{\tau}\right).$$

- $\tau$: shape. $\tau=1$ → exponential. $\tau>1$ → increasing hazard (light tail). $\tau<1$ → decreasing hazard (heavy tail). $X=\theta\,(\text{Exp}(1))^{1/\tau}$, i.e., a power transform of an exponential.

### Hazard rate and mean excess — general

$$ h(x)=\frac{f(x)}{S(x)}=-\frac{d}{dx}\ln S(x), \qquad S(x)=\exp\!\left(-\int_0^x h(t)\,dt\right).$$
$$ e(d)=\frac{\int_d^\infty S(x)\,dx}{S(d)}=\frac{E[X]-E[X\wedge d]}{S(d)},$$

where $E[X\wedge d]=\int_0^d S(x)\,dx$ is the **limited expected value** (mean of $X$ capped at $d$).

### Tail-weight comparison criteria

- **Moments:** distribution with more finite positive moments is lighter-tailed.
- **Survival ratio:** $\displaystyle \lim_{x\to\infty}\frac{S_1(x)}{S_2(x)}=\infty \Rightarrow$ dist. 1 heavier; $=0\Rightarrow$ dist. 1 lighter.
- **Hazard:** $h\downarrow \Rightarrow$ heavy; $h\uparrow \Rightarrow$ light.
- **Mean excess:** $e(d)\uparrow \Rightarrow$ heavy; $e(d)\downarrow \Rightarrow$ light.

### Creating distributions

- **Scaling / inflation:** $Y=(1+r)X$. Within a scale family $\theta\to(1+r)\theta$; for lognormal $\mu\to\mu+\ln(1+r)$, $\sigma$ unchanged. Density: $f_Y(y)=\frac{1}{1+r}f_X\!\big(\tfrac{y}{1+r}\big)$.
- **Power:** $Y=X^{1/\tau}$, density $f_Y(y)=f_X(y^\tau)\,\tau y^{\tau-1}$.
- **Exponentiation:** $Y=e^X$, density $f_Y(y)=f_X(\ln y)/y$.
- **Continuous mixture:** $f_X(x)=\int f(x\mid\lambda)\,u(\lambda)\,d\lambda$; moments $E[X^k]=E_\Lambda\!\big[E[X^k\mid\Lambda]\big]$.
- **Law of total variance:** $\text{Var}(X)=E[\text{Var}(X\mid\Lambda)]+\text{Var}(E[X\mid\Lambda])$.
- **Splicing:** $f(x)=a_j f_j(x)$ on interval $j$, with $\sum_j a_j=1$ and each $f_j$ a density (integrating to 1) on its sub-interval.

---

## Worked Examples

### Example 1 — Inflation in a scale family (Pareto)

Losses follow a Pareto with $\alpha=3$ and $\theta=2000$. Next year all losses inflate by 5%. Find next year's mean loss and the probability a loss exceeds 5000 next year.

**Step 1 — Scale the parameter.** Pareto is a scale family, $\theta$ is the scale. Inflation by 5%: $\theta_{\text{new}}=1.05\times 2000=2100$; $\alpha=3$ unchanged.

**Step 2 — Mean.** $E[X]=\dfrac{\theta}{\alpha-1}=\dfrac{2100}{3-1}=1050.$

**Step 3 — Tail probability.** $S(5000)=\left(\dfrac{\theta}{x+\theta}\right)^\alpha=\left(\dfrac{2100}{5000+2100}\right)^3=\left(\dfrac{2100}{7100}\right)^3=(0.29577)^3=0.025878.$

**Answer:** Mean $=\boxed{1050}$; $P(X>5000)=\boxed{0.0259}$ (≈ 2.59%).

> *Sanity check via old parameters:* old $E[X]=2000/2=1000$; inflating the mean directly gives $1000\times1.05=1050$. ✓ (Mean inflates by the same factor — true in any scale family.)

---

### Example 2 — Mean excess and tail comparison

(a) An exponential has $\theta=500$. Find $e(1000)$.
(b) A Pareto has $\alpha=2.5,\ \theta=600$. Find $e(1000)$.
(c) Which has the heavier tail, and is the mean-excess behavior consistent?

**Part (a).** Exponential is memoryless: $e(d)=\theta=500$ for every $d$. So $e(1000)=500$.

**Part (b).** Pareto: $e(d)=\dfrac{d+\theta}{\alpha-1}=\dfrac{1000+600}{2.5-1}=\dfrac{1600}{1.5}=1066.67.$

**Part (c).** For the exponential $e(d)$ is **constant**; for the Pareto $e(d)=\dfrac{d+600}{1.5}$ **increases** without bound in $d$. An increasing mean-excess function signals a heavier tail, so the **Pareto** is heavier. Confirm with moments: the Pareto with $\alpha=2.5$ has finite mean and variance but no moments of order $\ge 2.5$, whereas the exponential has *all* moments — consistent with the Pareto being heavier-tailed.

**Answer:** $e_{\text{exp}}(1000)=\boxed{500}$; $e_{\text{Par}}(1000)=\boxed{1066.67}$; the **Pareto** has the heavier tail (increasing $e(d)$, fewer moments). ✓ consistent.

---

### Example 3 — Mixing: exponential rate gamma-mixed gives Pareto (and total variance)

The conditional loss is $X \mid \Theta \sim \text{Exponential}(\Theta)$ (mean $\Theta$). The scale $\Theta$ itself is random with an inverse-gamma distribution such that $E[\Theta]=400$ and the mixture is Pareto with $\alpha=3,\ \theta=800$. 

(a) Verify $E[X]$ using both the mixture and the Pareto.
(b) Suppose instead $X\mid\Lambda \sim \text{Exponential}$ with mean $\Lambda$, where $\Lambda$ takes value 200 w.p. 0.6 and 700 w.p. 0.4 (a discrete mixture). Find $E[X]$ and $\text{Var}(X)$.

**Part (a).** Pareto mean: $E[X]=\dfrac{\theta}{\alpha-1}=\dfrac{800}{3-1}=400$. Via mixing, $E[X]=E_\Theta[E[X\mid\Theta]]=E[\Theta]=400$. They match.

**Part (b) — discrete mixture, use total expectation/variance.**

Conditional on $\Lambda=\lambda$: $X$ is exponential with mean $\lambda$, so $E[X\mid\Lambda]=\lambda$ and $\text{Var}(X\mid\Lambda)=\lambda^2$.

**Mean:** $E[X]=E[\Lambda]=0.6(200)+0.4(700)=120+280=400.$

**Total variance:**
- $E[\text{Var}(X\mid\Lambda)]=E[\Lambda^2]=0.6(200^2)+0.4(700^2)=0.6(40000)+0.4(490000)=24000+196000=220000.$
- $\text{Var}(E[X\mid\Lambda])=\text{Var}(\Lambda)=E[\Lambda^2]-(E[\Lambda])^2$, where $E[\Lambda^2]=0.6(40000)+0.4(490000)=220000$, so $\text{Var}(\Lambda)=220000-400^2=220000-160000=60000.$
- $\text{Var}(X)=220000+60000=280000.$

**Answer:** (a) Both give $E[X]=\boxed{400}$. (b) $E[X]=\boxed{400}$, $\text{Var}(X)=\boxed{280000}$ (sd ≈ 529.2).

> *Note the heavy-tail signature of mixing:* a single exponential with mean 400 would have variance $400^2=160000$; mixing inflated the variance to 280000.

---

### Example 4 — Lognormal probability and moments under inflation

Losses are lognormal with $\mu=7,\ \sigma=1.5$. (a) Find $P(X>3000)$. (b) Find $E[X]$. (c) After 10% inflation, give the new parameters and the new mean.

**Part (a).** $P(X>3000)=1-\Phi\!\left(\dfrac{\ln 3000-\mu}{\sigma}\right)$. $\ln 3000=8.00637$. $z=\dfrac{8.00637-7}{1.5}=\dfrac{1.00637}{1.5}=0.6709.$
$\Phi(0.6709)\approx 0.7488$, so $P(X>3000)=1-0.7488=0.2512.$

**Part (b).** $E[X]=e^{\mu+\sigma^2/2}=e^{7+1.5^2/2}=e^{7+1.125}=e^{8.125}=3380.0$ (≈ 3380).

**Part (c).** Inflation by 10%: $\mu\to\mu+\ln(1.1)=7+0.09531=7.09531$; $\sigma=1.5$ unchanged. New mean $=e^{7.09531+1.125}=e^{8.22031}=3718.0$, i.e. exactly $1.1\times3380$.

**Answer:** (a) $P(X>3000)=\boxed{0.2512}$; (b) $E[X]\approx\boxed{3380}$; (c) new $\mu=\boxed{7.0953}$, $\sigma=1.5$, new mean $\approx\boxed{3718}$.

---

## Common Exam Traps

1. **Inflating shape parameters.** Under inflation only the **scale** parameter $\theta$ changes ($\to(1+r)\theta$). Shape parameters ($\alpha$ in Pareto/gamma, $\tau$ in Weibull, $\sigma$ in lognormal) **do not move**. For lognormal, inflation hits $\mu$ ($\mu\to\mu+\ln(1+r)$), **not** $e^\mu$ literally and **never** $\sigma$.

2. **Using a moment that doesn't exist.** For Pareto, $E[X]$ requires $\alpha>1$ and $\text{Var}(X)$ requires $\alpha>2$. If $\alpha\le 1$ the mean is infinite — don't plug into $\theta/(\alpha-1)$ and report a negative number. The denominator going negative is the tell.

3. **Confusing the two "Pareto" parameterizations.** *Loss Models* uses $S(x)=(\theta/(x+\theta))^\alpha$ with support $x>0$. The "single-parameter / classical" Pareto has support $x>\theta$ and survival $(\theta/x)^\alpha$. Use the one in the FAM tables. Mismatched form is a classic wrong-answer generator.

4. **Hazard vs. mean-excess direction.** Heavy tail ⇒ hazard rate **decreasing**, mean excess **increasing**. These point in *opposite directions*. Don't memorize "increasing = heavy" without attaching it to the right function.

5. **Forgetting the Jacobian in transformations.** When $Y=X^{1/\tau}$ or $Y=e^X$, the new density needs the derivative factor: $f_Y(y)=f_X(g^{-1}(y))\,|dg^{-1}/dy|$. Dropping it gives a non-density.

6. **Mixture variance ≠ average of variances.** Always use the **law of total variance**; the cross term $\text{Var}(E[X\mid\Lambda])$ is what makes mixtures heavier-tailed. Omitting it understates the variance every time.

7. **Lognormal moments via $\Phi$ — don't.** Probabilities use $\Phi$; **moments** use $E[X^k]=e^{k\mu+k^2\sigma^2/2}$. Students sometimes try to integrate the density or misuse the normal mean. Keep the two computations separate.

8. **Mean excess and limited expected value sign.** $e(d)=\dfrac{E[X]-E[X\wedge d]}{S(d)}$. The numerator is $E[X]$ *minus* the limited expected value (both positive, numerator positive). Inverting this fraction or forgetting to divide by $S(d)$ is common.

9. **Splicing weights must give a valid density.** Each piece $a_j f_j$ must integrate to $a_j$ over its sub-interval (so $f_j$ is a *bona fide* density there), and the $a_j$ must sum to 1. Just slapping pieces together without renormalizing fails.

---

## Self-Check Questions

1. Losses are exponential with $\theta=250$. What is the mean excess loss at a deductible of 800, $e(800)$? Why does the deductible not matter?

2. A Pareto distribution has $\alpha=1.5,\ \theta=1000$. Does its variance exist? Does its mean? Justify in one line.

3. State which of gamma$(\alpha=0.5)$ and gamma$(\alpha=3)$ has the heavier tail, and name the hazard-rate criterion you used.

4. $X$ is lognormal with $\mu=6,\ \sigma=2$. Compute $E[X]$ and $\text{Var}(X)$.

5. $X\mid\Lambda$ is exponential with mean $\Lambda$, where $\Lambda=100$ w.p. 0.5 and $\Lambda=500$ w.p. 0.5. Find $E[X]$ and $\text{Var}(X)$.

### Answers

1. Exponential is memoryless, so $e(d)=\theta$ for all $d$: $e(800)=\boxed{250}$. The deductible doesn't matter because the conditional distribution of the excess $X-d\mid X>d$ is again exponential$(\theta)$, independent of $d$.

2. **Mean exists** ($\alpha=1.5>1$): $E[X]=\theta/(\alpha-1)=1000/0.5=2000$. **Variance does not exist** because it requires $\alpha>2$ and here $\alpha=1.5$. (Heavy-tailed Pareto: $E[X^k]$ finite only for $k<\alpha$.)

3. **gamma$(\alpha=0.5)$** is heavier. For gamma, $\alpha<1$ gives a **decreasing hazard rate** (heavy tail) while $\alpha=3>1$ gives an **increasing hazard rate** (light tail). Decreasing hazard ⇒ heavier tail.

4. $E[X]=e^{\mu+\sigma^2/2}=e^{6+2}=e^{8}=2980.96$. $\text{Var}(X)=e^{2\mu+\sigma^2}(e^{\sigma^2}-1)=e^{12+4}(e^{4}-1)=e^{16}(e^4-1)=8{,}886{,}111\times(54.598-1)=8{,}886{,}111\times53.598\approx 4.762\times10^{8}$. (So $E[X]\approx 2981$, $\text{Var}(X)\approx 4.76\times10^{8}$.)

5. $E[X]=E[\Lambda]=0.5(100)+0.5(500)=300$. Conditional variance $=\Lambda^2$, so $E[\text{Var}(X\mid\Lambda)]=E[\Lambda^2]=0.5(100^2)+0.5(500^2)=0.5(10000)+0.5(250000)=130000$. $\text{Var}(\Lambda)=130000-300^2=130000-90000=40000$. Total: $\text{Var}(X)=130000+40000=\boxed{170000}$, $E[X]=\boxed{300}$.
