# FAM-S (Short-Term) — One-Stop Formula Sheet

*Symbols:* $X$ = severity (loss size), $N$ = frequency (claim count), $S$ = aggregate loss, $E[\cdot]$ expectation, $\mathrm{Var}$ variance, $F$ cdf, $f$ pdf/pf, $S(x)=1-F(x)$ survival, $h(x)=f(x)/S(x)$ hazard.

---

## 1. Severity Distributions & Moments

### Raw & central moments
$$E[X]=\int_0^\infty x f(x)\,dx,\qquad E[X^k]=\int_0^\infty x^k f(x)\,dx$$
$$\mathrm{Var}(X)=E[X^2]-(E[X])^2,\quad \mathrm{CV}=\frac{\sigma_X}{E[X]},\quad \text{skew}=\frac{E[(X-\mu)^3]}{\sigma^3}$$

Survival form (nonneg $X$): $\;E[X]=\int_0^\infty S(x)\,dx,\quad E[X^k]=\int_0^\infty k x^{k-1}S(x)\,dx.$

### Common parametric severities (mean / variance)
| Dist | $E[X]$ | $\mathrm{Var}(X)$ |
|---|---|---|
| Exponential($\theta$) | $\theta$ | $\theta^2$ |
| Gamma($\alpha,\theta$) | $\alpha\theta$ | $\alpha\theta^2$ |
| Pareto($\alpha,\theta$) | $\dfrac{\theta}{\alpha-1}$ | $\dfrac{\alpha\theta^2}{(\alpha-1)^2(\alpha-2)}$ |
| Lognormal($\mu,\sigma$) | $e^{\mu+\sigma^2/2}$ | $(e^{\sigma^2}-1)e^{2\mu+\sigma^2}$ |
| Uniform$(a,b)$ | $\frac{a+b}{2}$ | $\frac{(b-a)^2}{12}$ |
| Weibull($\tau,\theta$) | $\theta\,\Gamma(1+1/\tau)$ | $\theta^2[\Gamma(1+2/\tau)-\Gamma(1+1/\tau)^2]$ |
| Single-param Pareto($\alpha,\theta$), $x>\theta$ | $\dfrac{\alpha\theta}{\alpha-1}$ | $\dfrac{\alpha\theta^2}{(\alpha-1)^2(\alpha-2)}$ |

Pareto moments: $E[X^k]=\dfrac{\theta^k k!}{(\alpha-1)\cdots(\alpha-k)}$ (for $\alpha>k$).
Lognormal: $E[X^k]=\exp\!\big(k\mu+\tfrac12 k^2\sigma^2\big)$.

### Distribution transforms
- **Multiplication / inflation** $Y=cX$: scale param $\theta\to c\theta$; $E[Y^k]=c^k E[X^k]$.
- **Lognormal:** $\ln X\sim N(\mu,\sigma^2)$; $F(x)=\Phi\!\big(\tfrac{\ln x-\mu}{\sigma}\big)$.

---

## 2. Frequency Distributions — (a,b,0) and (a,b,1)

### $(a,b,0)$ recursion
$$\frac{p_k}{p_{k-1}}=a+\frac{b}{k},\qquad k=1,2,\dots$$

| Dist | $p_0$ | $a$ | $b$ | $E[N]$ | $\mathrm{Var}(N)$ |
|---|---|---|---|---|---|
| Poisson($\lambda$) | $e^{-\lambda}$ | $0$ | $\lambda$ | $\lambda$ | $\lambda$ |
| Binomial($m,q$) | $(1-q)^m$ | $\dfrac{-q}{1-q}$ | $\dfrac{(m+1)q}{1-q}$ | $mq$ | $mq(1-q)$ |
| Neg. Bin.($r,\beta$) | $(1+\beta)^{-r}$ | $\dfrac{\beta}{1+\beta}$ | $\dfrac{(r-1)\beta}{1+\beta}$ | $r\beta$ | $r\beta(1+\beta)$ |
| Geometric($\beta$) | $\dfrac{1}{1+\beta}$ | $\dfrac{\beta}{1+\beta}$ | $0$ | $\beta$ | $\beta(1+\beta)$ |

Variance test: Poisson $\sigma^2=\mu$; Binomial $\sigma^2<\mu$; Neg.Bin/Geom $\sigma^2>\mu$.

### $(a,b,1)$ — zero-truncated / zero-modified
Same recursion for $k\ge2$; start from $p_1$.
$$p_k^M=\frac{1-p_0^M}{1-p_0}\,p_k\;(k\ge1),\qquad p_k^T=\frac{p_k}{1-p_0}\;(k\ge1)$$
$$E[N^M]=\frac{1-p_0^M}{1-p_0}E[N],\quad E[(N^M)^2]=\frac{1-p_0^M}{1-p_0}E[N^2]$$
(Set $p_0^M=0$ to recover the truncated case.)

### PGF
$$P_N(z)=E[z^N],\quad E[N]=P'_N(1),\quad E[N(N-1)]=P''_N(1).$$
Poisson $P(z)=e^{\lambda(z-1)}$; Neg.Bin $P(z)=[1-\beta(z-1)]^{-r}$; Binomial $P(z)=[1+q(z-1)]^m$.

---

## 3. Aggregate / Compound Models

$S=X_1+\cdots+X_N$ (i.i.d. $X_i$ independent of $N$).

### Compound moments
$$E[S]=E[N]\,E[X]$$
$$\mathrm{Var}(S)=E[N]\,\mathrm{Var}(X)+\mathrm{Var}(N)\,(E[X])^2$$
**Compound Poisson** ($N\sim$ Poisson $\lambda$): $\;E[S]=\lambda E[X],\;\mathrm{Var}(S)=\lambda E[X^2].$

PGF/MGF: $P_S(z)=P_N(P_X(z))$, $\;M_S(t)=P_N(M_X(t))$.

### Conditional (mixing) variance
$$\mathrm{Var}(S)=E[\mathrm{Var}(S\mid\Theta)]+\mathrm{Var}(E[S\mid\Theta])$$
(Total variance / "law of total variance" — also basis for Bühlmann.)

### Panjer recursion (discrete $X$ on $0,1,2,\dots$; $N$ is $(a,b,0/1)$)
$$f_S(s)=\frac{[p_1-(a+b)p_0]f_X(s)+\sum_{j=1}^{s}\big(a+\tfrac{bj}{s}\big)f_X(j)f_S(s-j)}{1-a f_X(0)}$$
$(a,b,0)$ start: $f_S(0)=P_N(f_X(0))$.

### Individual risk model
$S=\sum_{i=1}^n X_i$ (fixed $n$, indep, not identical): $E[S]=\sum E[X_i]$, $\mathrm{Var}(S)=\sum\mathrm{Var}(X_i)$.

---

## 4. Stop-Loss & Limited Expected Value

### Limited expected value (LEV) — payment under limit $d$
$$E[X\wedge d]=\int_0^d S(x)\,dx=\int_0^d x f(x)dx + d\,S(d)$$
$$E[(X\wedge d)^2]=\int_0^d 2x\,S(x)\,dx$$

### Stop-loss / excess
$$E[(X-d)_+]=\int_d^\infty S(x)\,dx=E[X]-E[X\wedge d]$$
$$E[(X-d)_+]=\int_d^\infty (x-d)f(x)\,dx$$
Net stop-loss premium for aggregate: $E[(S-d)_+]=E[S]-E[S\wedge d]$.

Recursion (discrete, step $h$): $E[(S-(d+h))_+]=E[(S-d)_+]-h\,[1-F_S(d)]$.

Mean residual life (mean excess): $\;e(d)=E[X-d\mid X>d]=\dfrac{E[(X-d)_+]}{S(d)}.$

---

## 5. Coverage Modifications

*Notation:* ordinary deductible $d$, policy limit (max payment) $u$, max covered loss $u^\*=d+u$, coinsurance $\alpha$, inflation factor $1+r$.

### Per-loss payment (cost per loss), ground-up loss $X$
Ordinary deductible: $Y^L=(X-d)_+$, so $E[Y^L]=E[X]-E[X\wedge d]$.

Full structure (coinsurance, deductible, max covered loss $u$):
$$Y^L=\alpha\big[(X\wedge u)-(X\wedge d)\big],\qquad E[Y^L]=\alpha\big(E[X\wedge u]-E[X\wedge d]\big)$$

With inflation $1+r$ applied to $X$:
$$E[Y^L]=\alpha(1+r)\Big(E\big[X\wedge \tfrac{u}{1+r}\big]-E\big[X\wedge \tfrac{d}{1+r}\big]\Big)$$

### Per-payment (cost per payment) — condition on a payment ($X>d$)
$$E[Y^P]=\frac{E[Y^L]}{S(d)}=\frac{E[X]-E[X\wedge d]}{1-F(d)}$$
General: $\;E[Y^P]=\dfrac{E[Y^L]}{1-F(d)}$ (divide the per-loss result by $S(d)$).

### Franchise deductible
Pays full $X$ if $X>d$ (not $X-d$): $\;E[Y^L]=E[X]-E[X\wedge d]+d\,S(d).$
Per payment: $\;E[Y^P]=E[Y^L_{\text{ordinary}}]/S(d)+d.$

### Loss Elimination Ratio
$$\mathrm{LER}(d)=\frac{E[X\wedge d]}{E[X]}=\frac{\text{losses eliminated by deductible}}{\text{total losses}}$$

### Frequency under deductible
With deductible, expected #payments scales: $E[N^P]=v\,E[N]$ where $v=S(d)=$ Pr(loss exceeds $d$).
- Poisson($\lambda$): payments $\sim$ Poisson($\lambda v$).
- Neg.Bin($r,\beta$): payments $\sim$ Neg.Bin($r,\beta v$).
- Binomial($m,q$): payments $\sim$ Binomial($m,qv$).

---

## 6. Estimation — Empirical, MLE, K-M, Nelson-Aalen

### Empirical (complete, individual data, $n$ obs)
$$\hat F_n(x)=\frac{\#\{x_i\le x\}}{n},\qquad \hat S_n(x)=1-\hat F_n(x)$$
Empirical mean $=\bar x$; empirical variance $=\frac1n\sum(x_i-\bar x)^2$.

### Maximum Likelihood
$$L(\theta)=\prod_i (\text{contribution}_i),\qquad \ell=\ln L,\qquad \frac{\partial \ell}{\partial\theta}=0$$
Contribution by data type: complete $f(x_i)$; right-censored at $u$: $S(u)$; left-truncated at $d$: divide by $S(d)$, i.e. $f(x)/S(d)$ or $S(u)/S(d)$.

Key closed-form MLEs:
- Exponential, complete: $\hat\theta=\bar x$.
- Exponential w/ censoring/truncation: $\hat\theta=\dfrac{\sum(\text{observed losses, shifted by trunc})}{\#\text{uncensored}}=\dfrac{\sum(x_i-d_i)}{\text{# deaths}}$.
- Poisson: $\hat\lambda=\bar x$. Binomial (known $m$): $\hat q=\bar x/m$. Neg.Bin: $\hat\beta=\bar x/r$ (or method of moments for $r,\beta$).
- Lognormal: $\hat\mu=\frac1n\sum\ln x_i$, $\hat\sigma^2=\frac1n\sum(\ln x_i-\hat\mu)^2$.

**Asymptotic variance:** $\mathrm{Var}(\hat\theta)\approx \dfrac{1}{I(\theta)}$, where Fisher info $I(\theta)=-E\!\big[\tfrac{\partial^2\ell}{\partial\theta^2}\big]$ (or observed info $-\tfrac{\partial^2\ell}{\partial\theta^2}$). Delta method: $\mathrm{Var}(g(\hat\theta))\approx[g'(\theta)]^2\mathrm{Var}(\hat\theta)$.

### Kaplan-Meier (product-limit) — survival w/ censoring
At distinct death times $y_1<y_2<\cdots$, with $r_j$ at risk and $s_j$ deaths:
$$\hat S(t)=\prod_{j:\,y_j\le t}\Big(1-\frac{s_j}{r_j}\Big)$$
Risk set: $r_j = (\text{# with } d_i<y_j \le x_i)$ accounting for left-truncation $d_i$ and right-censor/death $x_i$.

### Nelson-Aalen — cumulative hazard
$$\hat H(t)=\sum_{j:\,y_j\le t}\frac{s_j}{r_j},\qquad \hat S(t)=e^{-\hat H(t)}$$

**Greenwood's formula** (var of K-M):
$$\widehat{\mathrm{Var}}[\hat S(t)]=\hat S(t)^2\sum_{j:\,y_j\le t}\frac{s_j}{r_j(r_j-s_j)}$$
N-A variance: $\;\widehat{\mathrm{Var}}[\hat H(t)]=\sum_{y_j\le t}\dfrac{s_j}{r_j^2}$ (or $\sum\frac{s_j(r_j-s_j)}{r_j^3}$).
Linear (log-transformed) CIs use these variances.

---

## 7. Credibility

### Limited-fluctuation (classical)
Full credibility standard for number of claims (for the mean within $\pm k$ with prob $p$):
$$\lambda_0=\Big(\frac{z_{(1+p)/2}}{k}\Big)^2$$
- Claim count full-cred: $n_F=\lambda_0$ (Poisson) or $\lambda_0\cdot\dfrac{\sigma_N^2}{\mu_N}$ in general.
- Aggregate/pure-premium exposures (Poisson freq): $n_F=\lambda_0\Big(1+\dfrac{\sigma_X^2}{\mu_X^2}\Big)=\lambda_0\big(1+\mathrm{CV}_X^2\big)$.
- Partial credibility: $Z=\sqrt{n/n_F}\le1$.
- Credibility premium: $P_c=Z\bar X+(1-Z)M$ ($M$ = manual/prior).

### Bühlmann
For risk parameter $\Theta$:
- Hypothetical mean $\mu(\theta)=E[X\mid\Theta=\theta]$; process variance $v(\theta)=\mathrm{Var}(X\mid\Theta=\theta)$.
$$\mu=E[\mu(\Theta)] \text{ (collective mean)}$$
$$v=E[v(\Theta)]=\text{Expected Process Variance (EPV)}$$
$$a=\mathrm{Var}[\mu(\Theta)]=\text{Variance of Hypothetical Means (VHM)}$$
$$k=\frac{v}{a},\qquad Z=\frac{n}{n+k},\qquad P_c=Z\bar X+(1-Z)\mu$$

### Bühlmann-Straub (varying exposures $m_i$, total $m=\sum m_i$)
$$Z=\frac{m}{m+k},\qquad k=\frac{v}{a},\qquad \bar X=\frac{\sum m_i \bar X_i}{m}$$

### Bayesian / structural
Unbiasedness: $E[P_c]=\mu$. Bühlmann is the best **linear** approximation to the Bayesian premium; for conjugate pairs (Poisson-Gamma, Binomial-Beta, Normal-Normal, Exp-Inv.Gamma) Bühlmann = Bayes exactly.

Empirical Bayes (nonparametric) estimators ($r$ groups, $n$ each):
$$\hat\mu=\bar X,\quad \hat v=\frac{1}{r(n-1)}\sum_i\sum_j (X_{ij}-\bar X_i)^2,$$
$$\hat a=\frac{1}{r-1}\sum_i(\bar X_i-\bar X)^2-\frac{\hat v}{n}$$

---

## 8. Ratemaking

### Loss ratio (experience) method
$$\text{Loss Ratio}=\frac{\text{Losses}+\text{LAE}}{\text{Earned Premium}}$$
$$\text{Indicated rate change}=\frac{\text{Experience LR}+\text{Fixed expense ratio}}{1-\text{Variable expense \%}-\text{Profit \%}}-1$$
Target/permissible LR $=1-V-Q$ (V = variable expense, Q = profit & contingencies).

### Pure premium method
$$\text{Pure Premium}=\frac{\text{Losses}+\text{LAE}}{\text{Exposures}}$$
$$\text{Gross (indicated) rate}=\frac{\text{Pure Premium}+\text{Fixed expense per exposure}}{1-V-Q}$$

### Loss development & trend
Ultimate losses $=$ (reported)$\times$(LDF)$\times$(trend factor). Trend: $(1+t)^{n}$ over $n$ years to projected period.

### On-leveling premium — parallelogram method
Adjust historical EP to current rate level by weighting rate-level periods by area (earned-exposure fraction). 
$$\text{On-level factor}=\frac{\text{current rate level}}{\text{avg rate level for the period}}$$
Extension-of-exposures = re-rate each policy at current rates (exact).

### Credibility in ratemaking
$$\text{Rate}=Z(\text{indicated})+(1-Z)(\text{current/complement})$$

---

## 9. Reserving (Loss Development)

Setup: cumulative claims triangle, accident years (AY) $i$, development lags $j$.

### Age-to-age (link) factors — Chain Ladder
$$f_j=\frac{\sum_i C_{i,j+1}}{\sum_i C_{i,j}}\quad(\text{volume-weighted})$$
Cumulative development factor (CDF) to ultimate: $\;\text{CDF}_j=f_j f_{j+1}\cdots f_{n-1}$.
$$\hat C_{i,\text{ult}}=C_{i,\text{latest}}\times \text{CDF},\qquad \text{Reserve}_i=\hat C_{i,\text{ult}}-C_{i,\text{latest}}$$
Percent reported at lag $j$: $\;p_j=1/\text{CDF}_j$.

### Bornhuetter-Ferguson
Uses an a-priori expected ultimate $\hat C_i^{(0)}$ (= premium $\times$ expected LR):
$$\hat C_i^{BF}=C_{i,\text{latest}}+\hat C_i^{(0)}\big(1-1/\text{CDF}_i\big)=C_{i,\text{latest}}+\hat C_i^{(0)}(1-p_i)$$
$$\text{Reserve}_i^{BF}=\hat C_i^{(0)}(1-p_i)$$
BF = credibility blend of chain-ladder (weight $p_i$) and expected-loss (weight $1-p_i$):
$$\hat C_i^{BF}=p_i\,\hat C_i^{CL}+(1-p_i)\,\hat C_i^{(0)}.$$

### Expected loss ratio (Cape Cod relatives) method
Pure expected: $\hat C_i^{(0)}=\text{Premium}_i\times \text{ELR}$; reserve $=\hat C_i^{(0)}(1-p_i)$.

---

## 10. Option Pricing

*Notation:* $S_0$ spot, $K$ strike, $r$ cont. risk-free, $\delta$ cont. dividend yield, $T$ maturity, $\sigma$ volatility, $C/P$ call/put prices.

### Put-Call Parity (European, continuous dividends)
$$C - P = S_0 e^{-\delta T} - K e^{-rT}$$
With discrete dividends (PV $D$): $\;C-P=S_0-D-Ke^{-rT}.$
Currency option ($r_f$ = foreign rate, $x_0$ = exchange rate): replace $\delta\to r_f$, $S_0\to x_0$.

Bounds: $\;\max(0,\,S_0e^{-\delta T}-Ke^{-rT})\le C\le S_0e^{-\delta T}.$

### One-period Binomial
Up/down factors with volatility (forward-tree): $u=e^{(r-\delta)h+\sigma\sqrt h}$, $d=e^{(r-\delta)h-\sigma\sqrt h}$.
Risk-neutral probability:
$$p^\*=\frac{e^{(r-\delta)h}-d}{u-d}$$
Replicating portfolio ($\Delta$ shares + $B$ bonds):
$$\Delta=e^{-\delta h}\frac{C_u-C_d}{S_0(u-d)},\qquad B=e^{-rh}\frac{uC_d-dC_u}{u-d}$$
$$C=\Delta S_0+B=e^{-rh}\big[p^\* C_u+(1-p^\*)C_d\big]$$
Multi-period: work backward node by node; American = $\max(\text{exercise},\text{hold})$ at each node.

### Black-Scholes (European)
$$C=S_0e^{-\delta T}\Phi(d_1)-Ke^{-rT}\Phi(d_2)$$
$$P=Ke^{-rT}\Phi(-d_2)-S_0e^{-\delta T}\Phi(-d_1)$$
$$d_1=\frac{\ln(S_0/K)+(r-\delta+\tfrac12\sigma^2)T}{\sigma\sqrt T},\qquad d_2=d_1-\sigma\sqrt T$$
Greeks (call): $\Delta=e^{-\delta T}\Phi(d_1)$; put $\Delta=-e^{-\delta T}\Phi(-d_1)$.
$\Gamma=\dfrac{e^{-\delta T}\phi(d_1)}{S_0\sigma\sqrt T}$ (same call & put); Vega $=S_0 e^{-\delta T}\phi(d_1)\sqrt T$.

### Forwards / prepaid forwards
$$F^P_{0,T}(S)=S_0 e^{-\delta T},\qquad F_{0,T}=S_0 e^{(r-\delta)T}$$
Prepaid forward w/ discrete divs: $F^P=S_0-\text{PV(divs)}$.

---

## Quick reference — key identities
- $E[X]=E[X\wedge d]+E[(X-d)_+]$
- $\mathrm{Var}(S)=E[N]\mathrm{Var}(X)+\mathrm{Var}(N)E[X]^2$ (compound)
- Compound Poisson: $\mathrm{Var}(S)=\lambda E[X^2]$
- $Z_{B\ddot uhlmann}=\frac{n}{n+k},\;k=v/a=\mathrm{EPV}/\mathrm{VHM}$
- $Z_{classical}=\sqrt{n/n_F}$
- BF reserve $=$ a-priori$\times(1-1/\text{CDF})$
- $C-P=S_0e^{-\delta T}-Ke^{-rT}$
- $p^\*=\dfrac{e^{(r-\delta)h}-d}{u-d}$
