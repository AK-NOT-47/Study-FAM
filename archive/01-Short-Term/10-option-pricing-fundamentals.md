# Option Pricing Fundamentals

> **Exam FAM — Study Note**
> Notation follows the financial-economics conventions used on FAM. Where it overlaps with *Loss Models* and *Actuarial Mathematics for Life Contingent Risks (AMLCR)*, the connection to insurance is flagged explicitly in the final section.

---

## Learning Objectives

After mastering this topic you should be able to:

1. **Identify and describe** the four basic option positions — long call, short call, long put, short put — and state who has the right and who has the obligation.
2. **Draw and interpret payoff and profit diagrams** for calls, puts, and simple combinations, including the breakeven point and the role of accumulated premium.
3. **Apply put–call parity** to price one option given the other, to back out a forward/strike relationship, and to detect arbitrage.
4. **Price a European option with the one-period binomial model** using both the *replicating portfolio* method and the *risk-neutral* method, and show the two give the same price.
5. **Extend the binomial model to multiple periods**, including pricing European and American options on a recombining tree, and recognize when early exercise matters.
6. **Compute the replicating portfolio** $(\Delta, B)$ and interpret $\Delta$ (the delta / hedge ratio).
7. **Use the Black–Scholes formula** to price European calls and puts on a non-dividend and dividend-paying stock, computing $d_1$, $d_2$, and $N(\cdot)$.
8. **Explain the connection** between option pricing and embedded options in insurance products (e.g., guarantees on variable annuities / equity-indexed annuities).

---

## Key Concepts

### 1. What is an option?

An **option** is a contract giving its *owner the right, but not the obligation,* to buy or sell an underlying asset at a fixed price.

- **Call option** — the right to **buy** the asset for the **strike price** $K$.
- **Put option** — the right to **sell** the asset for the strike price $K$.
- **European** — exercisable only at expiry (time $T$). **American** — exercisable any time up to $T$. FAM focuses mostly on European options for pricing formulas; American options appear in the binomial tree (early-exercise) context.

The buyer pays a **premium** up front. The buyer is **long**; the seller (**writer**) is **short** and receives the premium but takes on the obligation.

**Intuition:** an option is asymmetric. The long side caps its loss at the premium but keeps unlimited (call) or large (put) upside. The short side keeps a fixed premium but bears the open-ended risk — exactly the risk-transfer logic of insurance, which is why this material lives on FAM.

### 2. Payoff vs. Profit

- **Payoff** = value of the option *at expiry*, ignoring what you paid for it. Always $\ge 0$ for the long holder.
- **Profit** = payoff minus the **accumulated cost** of the position (premium grown at the risk-free rate to time $T$).

| Position | Payoff at $T$ | Profit at $T$ |
|---|---|---|
| Long call | $\max(S_T-K,\,0)$ | $\max(S_T-K,0) - C e^{rT}$ |
| Short call | $-\max(S_T-K,\,0)$ | $C e^{rT} - \max(S_T-K,0)$ |
| Long put | $\max(K-S_T,\,0)$ | $\max(K-S_T,0) - P e^{rT}$ |
| Short put | $-\max(K-S_T,\,0)$ | $P e^{rT} - \max(K-S_T,0)$ |

Here $C, P$ are the time-0 premiums and $S_T$ is the asset price at expiry.

**Diagram shapes (commit these to memory):**
- *Long call:* flat at the loss line for $S_T<K$, then rises at 45° (slope $+1$) past $K$. Breakeven at $S_T = K + Ce^{rT}$.
- *Long put:* falls at 45° (slope $-1$) up to $K$, then flat. Breakeven at $S_T = K - Pe^{rT}$.
- *Short positions* are the **mirror image across the horizontal axis** of the corresponding long position.

### 3. Put–Call Parity (the single most testable formula)

For **European** options on the same underlying, same strike $K$, same expiry $T$:

$$ C - P = S_0 - K e^{-rT} \quad(\text{non-dividend stock}) $$

The intuition: a portfolio of *long call + short put* has payoff $S_T - K$ at expiry — identical to a **forward** to buy the stock at $K$. By no-arbitrage its cost today must equal the cost of synthesizing that forward, $S_0 - Ke^{-rT}$. Adjust $S_0$ downward for dividends.

### 4. The Binomial Model — Risk-Neutral Pricing

Over one period the stock either goes **up** to $S_0 u$ or **down** to $S_0 d$. Two equivalent ways to price an option:

**(a) Replicating portfolio.** Buy $\Delta$ shares and lend (or borrow) $B$ in cash so the portfolio exactly reproduces the option's two possible payoffs. The option must cost the same as the replicating portfolio (no arbitrage), so price $= \Delta S_0 + B$.

**(b) Risk-neutral valuation.** Invent a probability $p^*$ under which the stock earns the risk-free rate *on average*. Price the option as the **expected payoff discounted at the risk-free rate** using $p^*$. This gives the same answer and is faster.

$p^*$ is **not** a real-world probability — it is a pricing device. The actual probability of an up-move never enters the option price (a result that surprises everyone the first time).

**Delta** $\Delta$ is the number of shares in the replicating portfolio. It is the option's price sensitivity to the stock and is the foundation of **delta-hedging**: a writer who holds $\Delta$ shares per option written is (instantaneously) immune to small stock moves.

### 5. Black–Scholes

As the number of binomial periods $\to\infty$ with appropriately chosen $u,d$, the binomial price converges to the **Black–Scholes** price. BS prices a European option in closed form assuming the stock follows geometric Brownian motion with constant volatility $\sigma$ and constant risk-free rate $r$. The terms $N(d_1)$ and $N(d_2)$ are the risk-neutral probabilities/deltas; $N(d_2)$ is (under the risk-neutral measure) the probability the call finishes in the money.

### 6. Why insurers care

Insurance products often contain **embedded options**: a variable-annuity guaranteed minimum maturity benefit (GMMB) is a **put** on the policyholder's fund (the insurer guarantees a floor); an equity-indexed annuity's participation feature is effectively a **call**. Pricing and reserving for these guarantees uses exactly the option-pricing machinery above.

---

## Formulas

### Payoffs and profit

$$ \text{Call payoff} = \max(S_T - K,\,0), \qquad \text{Put payoff} = \max(K - S_T,\,0) $$

$$ \text{Long-option profit} = \text{payoff} - (\text{premium})\,e^{rT} $$

- $S_T$ — underlying price at expiry; $K$ — strike; $r$ — continuously-compounded risk-free rate; $T$ — time to expiry (years).

### Put–call parity

Non-dividend stock:
$$ C(K,T) - P(K,T) = S_0 - K e^{-rT} $$

Continuous dividend yield $\delta$:
$$ C - P = S_0 e^{-\delta T} - K e^{-rT} $$

Discrete dividends with present value $\mathrm{PV}_{0,T}(\text{Div})$:
$$ C - P = \big(S_0 - \mathrm{PV}_{0,T}(\text{Div})\big) - K e^{-rT} $$

- $C, P$ — current call/put premiums; $\delta$ — continuous dividend yield; $S_0$ — current stock price.

### One-period binomial — replicating portfolio

$$ \Delta = e^{-\delta h}\,\frac{C_u - C_d}{S_0(u - d)}, \qquad B = e^{-rh}\,\frac{u\,C_d - d\,C_u}{u - d} $$

$$ \boxed{\;\text{Option price} = \Delta S_0 + B\;}$$

- $h$ — length of the period (years); $u, d$ — up/down **multiplicative factors** ($S_u=S_0u,\ S_d=S_0d$); $C_u, C_d$ — option payoffs in the up/down state; $\delta$ — dividend yield ($\delta = 0$ if none).

### One-period binomial — risk-neutral probability

$$ p^{*} = \frac{e^{(r-\delta)h} - d}{u - d} $$

$$ \boxed{\;\text{Option price} = e^{-rh}\big[\,p^{*} C_u + (1-p^{*}) C_d\,\big]\;}$$

For arbitrage-free pricing we need $d < e^{(r-\delta)h} < u$, which guarantees $0 < p^* < 1$.

### Multi-period binomial

Build a **recombining tree**: after $n$ periods the stock can be $S_0 u^{j} d^{\,n-j}$ for $j = 0,\dots,n$. Work **backwards** from expiry, applying the one-period risk-neutral formula at each node:

$$ V_{\text{node}} = e^{-rh}\big[\,p^{*}V_{\text{up}} + (1-p^{*})V_{\text{down}}\,\big] $$

For an **American** option, at each node take the larger of the continuation value (above) and the **immediate-exercise value**:
$$ V_{\text{node}} = \max\big(\text{exercise value},\; e^{-rh}[p^{*}V_{\text{up}} + (1-p^{*})V_{\text{down}}]\big) $$

**Forward (Cox-Ross-Rubinstein style) tree factors** often given on the exam:
$$ u = e^{(r-\delta)h + \sigma\sqrt{h}}, \qquad d = e^{(r-\delta)h - \sigma\sqrt{h}} $$
with this choice, $p^{*} = \dfrac{1}{1+e^{\sigma\sqrt{h}}}$.

### Black–Scholes (European options)

Stock with continuous dividend yield $\delta$:

$$ C = S_0 e^{-\delta T} N(d_1) - K e^{-rT} N(d_2) $$
$$ P = K e^{-rT} N(-d_2) - S_0 e^{-\delta T} N(-d_1) $$

$$ d_1 = \frac{\ln(S_0/K) + \big(r - \delta + \tfrac{1}{2}\sigma^{2}\big)T}{\sigma\sqrt{T}}, \qquad d_2 = d_1 - \sigma\sqrt{T} $$

- $N(\cdot)$ — standard normal CDF; $\sigma$ — annual volatility of the stock's continuously-compounded return; all other symbols as above.
- **Call delta** $= e^{-\delta T} N(d_1)$; **put delta** $= -e^{-\delta T} N(-d_1)$.
- Set $\delta = 0$ for a non-dividend stock. BS satisfies put–call parity automatically.

---

## Worked Examples

### Example 1 — Put–call parity

A non-dividend-paying stock trades at $S_0 = 50$. A 1-year European call with strike $K=52$ costs $C = 4.50$. The continuously-compounded risk-free rate is $r = 6\%$. Find the price of the 1-year European put with the same strike.

**Solution.**
Put–call parity: $C - P = S_0 - Ke^{-rT}$.

Compute $Ke^{-rT} = 52\,e^{-0.06(1)} = 52(0.941765) = 48.9718$.

$$ P = C - S_0 + Ke^{-rT} = 4.50 - 50 + 48.9718 = 3.4718 $$

**Answer:** $\boxed{P \approx 3.47}$

---

### Example 2 — One-period binomial (both methods)

A stock with $S_0 = 100$ pays no dividends. Over the next $h = 1$ year it moves to either $S_u = 120$ ($u=1.2$) or $S_d = 90$ ($d=0.9$). The risk-free rate is $r = 5\%$ (continuous). Price a 1-year European **call** with strike $K = 105$.

**Step 1 — Payoffs.**
$C_u = \max(120-105,0) = 15$, $\quad C_d = \max(90-105,0) = 0$.

**Step 2 — Risk-neutral probability.**
$$ p^{*} = \frac{e^{(0.05)(1)} - 0.9}{1.2 - 0.9} = \frac{1.051271 - 0.9}{0.3} = \frac{0.151271}{0.3} = 0.504237 $$

**Step 3 — Price (risk-neutral).**
$$ C = e^{-0.05}\big[0.504237(15) + 0.495763(0)\big] = 0.951229 \times 7.56356 = 7.1949 $$

**Check via replicating portfolio.**
$$ \Delta = \frac{C_u - C_d}{S_0(u-d)} = \frac{15-0}{100(0.3)} = 0.5 $$
$$ B = e^{-rh}\frac{uC_d - dC_u}{u-d} = e^{-0.05}\frac{(1.2)(0)-(0.9)(15)}{0.3} = 0.951229\times(-45) = -42.8053 $$
$$ \Delta S_0 + B = 0.5(100) - 42.8053 = 7.1947 $$

The two methods agree (rounding). The replicating portfolio is "buy 0.5 shares, borrow 42.81."

**Answer:** $\boxed{C \approx 7.19}$, with $\Delta = 0.5$.

---

### Example 3 — Two-period binomial (American put, early exercise matters)

$S_0 = 100$, $u = 1.10$, $d = 0.90$, $r = 4\%$ continuous, each period $h = 1$ year, no dividends. Price a **2-year American put** with strike $K = 105$.

**Step 1 — Risk-neutral probability.**
$$ p^{*} = \frac{e^{0.04} - 0.9}{1.10 - 0.90} = \frac{1.040811 - 0.9}{0.2} = \frac{0.140811}{0.2} = 0.704054 $$
So $1-p^{*} = 0.295946$ and discount factor $e^{-0.04} = 0.960789$.

**Step 2 — Stock tree.**
- $S_{uu} = 100(1.1)^2 = 121$
- $S_{ud} = 100(1.1)(0.9) = 99$
- $S_{dd} = 100(0.9)^2 = 81$
- Period-1: $S_u = 110$, $S_d = 90$.

**Step 3 — Terminal payoffs** $\max(105 - S,0)$:
- $P_{uu} = \max(105-121,0) = 0$
- $P_{ud} = \max(105-99,0) = 6$
- $P_{dd} = \max(105-81,0) = 24$

**Step 4 — Node $S_u = 110$.**
Continuation $= e^{-0.04}[0.704054(0) + 0.295946(6)] = 0.960789(1.775676) = 1.7061$.
Exercise $= \max(105-110,0) = 0$. Take max $\Rightarrow P_u = 1.7061$.

**Step 5 — Node $S_d = 90$.**
Continuation $= e^{-0.04}[0.704054(6) + 0.295946(24)] = 0.960789[4.224324 + 7.102704] = 0.960789(11.327028) = 10.8829$.
Exercise $= \max(105-90,0) = 15$. Since $15 > 10.8829$, **exercise early** $\Rightarrow P_d = 15$.

**Step 6 — Root node.**
Continuation $= e^{-0.04}[0.704054(1.7061) + 0.295946(15)] = 0.960789[1.201288 + 4.439190] = 0.960789(5.640478) = 5.4194$.
Exercise $= \max(105-100,0) = 5$. Since $5.4194 > 5$, hold $\Rightarrow$ price $= 5.4194$.

**Answer:** $\boxed{P_{\text{American}} \approx 5.42}$. (Early exercise at the down node adds value; the European version would be worth less.)

---

### Example 4 — Black–Scholes

Price a 6-month European **call**: $S_0 = 40$, $K = 42$, $r = 5\%$, $\sigma = 30\%$, dividend yield $\delta = 0$, $T = 0.5$.

**Step 1 — $d_1, d_2$.**
$$ d_1 = \frac{\ln(40/42) + (0.05 - 0 + 0.5(0.30)^2)(0.5)}{0.30\sqrt{0.5}} $$
$\ln(40/42) = -0.048790$. Drift term $= (0.05 + 0.045)(0.5) = 0.0475$. Numerator $= -0.001290$.
Denominator $= 0.30(0.707107) = 0.212132$.
$$ d_1 = -0.006082, \qquad d_2 = d_1 - 0.212132 = -0.218214 $$

**Step 2 — Normal CDFs.**
$N(d_1) = N(-0.0061) \approx 0.49757$, $\quad N(d_2) = N(-0.2182) \approx 0.41364$.

**Step 3 — Price.**
$$ C = 40(0.49757) - 42\,e^{-0.025}(0.41364) = 19.9028 - 42(0.975310)(0.41364) = 19.9028 - 16.9425 = 2.960 $$

**Answer:** $\boxed{C \approx 2.96}$.

---

## Common Exam Traps

1. **Confusing payoff with profit.** Payoff ignores the premium; profit subtracts the *accumulated* premium $e^{rT}\times$ premium. Read the question's word carefully.
2. **Using real-world probabilities in the binomial model.** The actual up-probability is a red herring; only $p^{*}$ matters for pricing. If the problem gives you the "true" probability, it is usually a distractor.
3. **Forgetting dividends in $p^{*}$ and in $\Delta$.** With a dividend yield $\delta$, the risk-neutral probability uses $e^{(r-\delta)h}$ and delta carries a factor $e^{-\delta h}$. Dropping these is the most common binomial error.
4. **$u$ and $d$ as factors vs. returns.** $u = 1.2$ means the stock multiplies by 1.2; do not also add the stock price. Some sources express $u$ as $e^{\sigma\sqrt h}$ — confirm which convention the problem uses.
5. **Sign / direction in put–call parity.** It is $C - P = S_0 - Ke^{-rT}$ (call *minus* put). Memorize the LHS order. For dividends, **subtract** their PV from $S_0$ (or use $S_0e^{-\delta T}$), never add.
6. **Skipping the early-exercise check on American options.** At *every* node take $\max(\text{exercise}, \text{continuation})$. American **calls on non-dividend stocks** are never exercised early (so they equal European), but American **puts** frequently are — and FAM loves to test exactly this.
7. **$d_2$ sign and the put formula.** $d_2 = d_1 - \sigma\sqrt T$ (subtract). For the put, use $N(-d_1)$ and $N(-d_2)$, or just compute the call and apply put–call parity.
8. **Discounting at the wrong rate.** Binomial and BS both discount at the **risk-free** rate $r$, never at an expected stock return.
9. **Rounding $N(\cdot)$ too early.** Carry $d_1, d_2$ to 4+ decimals before looking up the normal CDF; small errors blow up in the final price.

---

## Self-Check Questions

1. A long call and a short put on the same stock, strike, and expiry together replicate what simple position?
2. In the one-period binomial model, write the formula for the risk-neutral probability $p^{*}$ on a stock paying continuous dividend yield $\delta$.
3. True or false: a higher real-world probability of an up-move raises the price of a European call in the binomial model.
4. For a non-dividend stock, why is an American call worth the same as the otherwise-identical European call?
5. In Black–Scholes, what does $N(d_2)$ represent, and which input shifts the call price the most for an at-the-money option?

### Answers

1. A **long forward** to buy the stock at strike $K$ (payoff $S_T - K$). This is the basis of put–call parity.
2. $p^{*} = \dfrac{e^{(r-\delta)h} - d}{u - d}$.
3. **False.** Real-world probabilities never enter the option price; only the risk-neutral $p^{*}$ (a function of $u, d, r, \delta, h$) does.
4. Early exercise of a call forfeits the time value and the interest you could earn on the strike; with no dividends there is never a benefit to exercising early, so the early-exercise feature is worthless and the two prices coincide.
5. $N(d_2)$ is the **risk-neutral probability the call finishes in the money** ($S_T > K$). Near at-the-money, the call value is most sensitive to **volatility $\sigma$** (and to time $T$), since both increase the chance and magnitude of finishing in the money.
