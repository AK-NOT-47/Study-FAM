# Pricing / Ratemaking for Short-Term Insurance

> **Reference framework:** Werner & Modlin / Friedland, *Fundamentals of General Insurance Ratemaking* and *Estimating Unpaid Claims Using Basic Techniques* (the SOA FAM short-term ratemaking syllabus). Severity/frequency modeling notation follows Klugman/Panjer/Willmot, *Loss Models: From Data to Decisions*.

---

## Learning Objectives

After studying this note, for the FAM exam you should be able to:

- State and apply the **fundamental insurance equation** and explain what it means for a rate to be *adequate, not excessive, and not unfairly discriminatory*.
- Distinguish **exposure**, **written premium**, **earned premium**, **unearned premium**, and **in-force premium**, and compute each from policy data.
- Compute an **indicated rate** (or indicated **rate change**) using both the **pure premium method** and the **loss ratio method**, and know when each is usable.
- Adjust historical losses for **loss development** (link ratios / chain ladder) and **trend** (loss trend and premium trend).
- Bring historical premium to **current rate level** using the **parallelogram method** (on-leveling).
- Build a rate from **expense provisions**: separate **fixed** vs **variable** expenses, compute the **variable expense ratio**, the **permissible loss ratio (PLR)**, and incorporate a **profit and contingency loading**.
- Apply **credibility** ($Z$) to blend an experience-based indication with a **complement of credibility**.
- Convert an indicated *average rate* into a *rate change* and reconcile the two methods.

---

## Key Concepts

### 1. What ratemaking is

Ratemaking is **prospective**: we set a rate today that must be adequate to pay for losses and expenses on policies that will be *written in a future period* and earned over the policy term after that. Because we are predicting the future, we must take **historical data** and adjust it forward in time. Three big adjustments recur:

1. **Develop** losses to ultimate (immature accident periods are still growing).
2. **Trend** losses and exposures/premium to the future cost level (inflation, frequency drift).
3. **On-level** premium to current rate level (old premiums reflect old, superseded rates).

### 2. The fundamental insurance equation

The premium must cover everything plus a target profit:

$$\text{Premium} = \text{Losses} + \text{LAE} + \text{Underwriting Expenses} + \text{Underwriting Profit}.$$

- **LAE** = loss adjustment expenses (cost of settling claims). ALAE is allocated to a specific claim; ULAE is overhead. LAE is usually grouped with losses as **"losses and LAE."**
- When the equation **balances** at the proposed rate, the rate is *just adequate*. If projected premium falls short, rates must rise; if it exceeds, rates can fall.

### 3. Exposure — the basic unit of risk

The **exposure base** measures the amount of risk. It should be (a) proportional to expected loss, (b) practical/objective, and (c) historically standard. Examples: car-years (auto), payroll (workers' comp), house-years (homeowners). **One car insured for one year = 1 car-year.**

### 4. Written vs Earned premium (and the analog for exposures)

- **Written premium (WP):** the full premium booked when a policy is *issued*.
- **Earned premium (EP):** the portion of premium for coverage that has *already elapsed*. A 1-year policy earns premium *pro rata* over the year.
- **Unearned premium (UEP):** the not-yet-earned remainder (a liability — must be refunded on cancellation).
- **In-force premium:** the annualized premium on policies active at a point in time.

> Intuition: WP is a "cash register" concept (recorded at sale); EP is an "accrual" concept (recognized as coverage is provided). Losses are matched to **earned** premium.

The same earned/written logic applies to **exposures** (written exposures vs earned exposures).

### 5. Loss development

Reported (or paid) losses for a recent accident year are **immature** — more claims will be reported and known claims will change. We use **age-to-age (link) ratios** and the **chain-ladder** method to project losses to **ultimate**.

### 6. Trend

Even at ultimate, *past* losses reflect *past* cost levels. **Loss trend** (severity × frequency drift) projects average cost forward to the midpoint of the future policy period. **Premium/exposure trend** adjusts for drift in the average premium per exposure (e.g., increasing amounts of insurance).

The trend period runs from the **average date of loss of the experience period** to the **average date of loss of the future (forecast) period**.

### 7. On-leveling premium (current rate level)

Historical premium was charged at **old rates**. To use it for the loss-ratio method we must restate it as if **today's rates** had always applied — the **current rate level (CRL)** premium. The **parallelogram method** estimates the *on-level factor* by computing the average rate level that applied during each calendar year, assuming policies are written **uniformly** through the year.

### 8. Expenses, PLR, and profit

Expenses split into:

- **Variable expenses** — scale with premium (commissions, premium taxes): expressed as a % of premium $V$.
- **Fixed expenses** — roughly constant per exposure/policy (general overhead, some underwriting): expressed as a dollar amount per exposure $F$, or as a ratio to premium.

The **permissible (or expected) loss ratio (PLR)** is the fraction of premium available to pay **losses + LAE** after variable expenses and profit:

$$\text{PLR} = 1 - V - Q_T,$$

where $Q_T$ = variable-expense-and-profit provision (variable expense % plus profit %). When fixed expenses are loaded as a ratio, they too are subtracted.

### 9. Pure premium vs loss ratio method

- **Pure premium method** builds the rate **from the ground up** (dollars per exposure). Requires well-defined **exposures**. Produces an **indicated rate** (a level), so it is used when there is **no existing rate** or for new programs.
- **Loss ratio method** produces an **indicated rate *change*** (a multiplier on the current rate). It needs **premium at current rate level** but **not** exposures. It is the more common method.

The two methods are **algebraically identical** when consistent data are used.

### 10. Credibility

Experience for a small segment is volatile. We blend:

$$\text{Final} = Z \times (\text{Experience indication}) + (1-Z)\times(\text{Complement of credibility}).$$

$Z\in[0,1]$ rises with volume of data. A common **classical (square-root) rule**:
$$Z=\min\!\left(\sqrt{\tfrac{n}{n_{\text{full}}}},\,1\right),$$
where $n$ = observed exposures/claims and $n_{\text{full}}$ = the **full-credibility standard**. The **complement** is often last year's rate, a trended overall indication, or a competitor/industry rate.

---

## Formulas

### Fundamental equation (rate form, per exposure)

$$\text{Rate} = \frac{\text{Pure Premium} + \text{Fixed Expense per Exposure}}{1 - V - Q_T}$$

- **Pure Premium** $= \dfrac{\text{Losses} + \text{LAE}}{\text{Exposures}}$ = expected loss & LAE cost per exposure.
- $F$ = fixed expense per exposure (dollars).
- $V$ = variable expense provision (fraction of premium).
- $Q_T$ = profit & contingency provision (fraction of premium).
- Denominator $= \text{VPLR} = 1-V-Q_T$ = **variable permissible loss ratio**.

### Pure premium method — indicated rate (level)

$$R_{\text{ind}} = \frac{\big(\frac{L+\text{LAE}}{X}\big) + F}{1 - V - Q_T}$$

where $X$ = exposures, $L$ = developed & trended losses.

### Loss ratio method — indicated rate *change*

$$\text{Indicated Change Factor} = \frac{\text{Experience Loss \& LAE Ratio} + \text{Fixed Expense Ratio}}{\,1 - V - Q_T\,}$$

$$\text{Indicated Rate Change \%} = \text{Indicated Change Factor} - 1$$

- **Experience Loss & LAE Ratio** $= \dfrac{\text{developed, trended losses \& LAE}}{\text{premium at current rate level (on-level EP)}}$.
- **Fixed Expense Ratio** = fixed expenses ÷ premium (often premium at current level).
- Denominator $= 1-V-Q_T = \text{PLR}$.

> If fixed expenses are instead handled in the numerator as a *dollar* loading, do **not** also put them in the denominator — pick one treatment.

### Loss development (chain ladder)

$$\text{Age-to-age factor } f_{j\to j+1}=\frac{\sum \text{losses at age }(j{+}1)}{\sum \text{losses at age } j}\quad(\text{matched accident years}).$$

$$\text{CDF to ultimate at age } j = f_{j} \cdot f_{j+1}\cdots f_{\text{tail}} \qquad \text{(product of remaining age-to-age factors)}$$

$$\text{Ultimate losses} = (\text{losses at age } j)\times(\text{CDF}).$$

### Trend

$$\text{Trended losses} = \text{losses}\times(1+t)^{\,n},$$

- $t$ = annual trend rate, $n$ = trend period in years = (avg date of loss, future period) − (avg date of loss, experience period).
- For an annual policy with rates effective for one year, the **future average loss date** ≈ effective date + (policy term)/2 + (rate-in-effect period)/2.

### Parallelogram method (on-level factor)

For each historical calendar year, compute the **portion of earned premium** at each rate level (areas of parallelogram slices for uniformly written annual policies), then the **average rate level index** $\bar{R}_y$. The **on-level factor** brings that year to current:

$$\text{On-Level Factor}_y = \frac{\text{Current cumulative rate level index}}{\bar{R}_y}.$$

$$\text{On-Level EP}_y = \text{EP}_y \times \text{On-Level Factor}_y.$$

For a single rate change of $+c$ effective mid-year, the area of a CY earned at the **new** level (annual policies, uniform writing) is the geometric fraction of the unit square; the rest is at the old level.

### Permissible loss ratio & expense ratios

$$\text{PLR} = 1 - V - Q_T \quad(\text{variable-only version: VPLR}).$$
$$\text{Variable Expense Ratio } V = \frac{\text{Variable Expenses}}{\text{Written Premium}}, \qquad \text{Fixed Expense Ratio} = \frac{\text{Fixed Expenses}}{\text{Earned Premium (CRL)}}.$$

### Credibility

$$Z=\min\!\left(\sqrt{\frac{n}{n_{\text{full}}}},\,1\right),\qquad
\text{Final indication}=Z\,A + (1-Z)\,C,$$

with $A$ = experience indication, $C$ = complement of credibility.

---

## Worked Examples

### Example 1 — Pure premium method (indicated rate from scratch)

A new auto program has, for the experience period:

- Developed & trended losses + LAE = $\$3{,}600{,}000$
- Earned exposures = $9{,}000$ car-years
- Fixed expense = $\$60$ per exposure
- Variable expense provision $V = 17.5\%$
- Profit & contingency $Q_T = 5\%$

**Find the indicated rate per car-year.**

**Step 1 — Pure premium (loss cost):**
$$\frac{3{,}600{,}000}{9{,}000} = \$400 \text{ per exposure.}$$

**Step 2 — Add fixed expense (numerator):** $400 + 60 = \$460$.

**Step 3 — Variable permissible loss ratio:** $1 - 0.175 - 0.05 = 0.775$.

**Step 4 — Indicated rate:**
$$R_{\text{ind}}=\frac{460}{0.775}=593.548\ldots$$

**Answer: indicated rate ≈ \$593.55 per car-year.**

---

### Example 2 — Loss ratio method (indicated rate change) with development, trend, and on-leveling

For accident year 2024:

- Reported losses & LAE at 12 months = $\$2{,}000{,}000$; CDF to ultimate = $1.25$.
- Annual loss trend $t = 4\%$; trend period $n = 2.5$ years.
- Earned premium (as booked) = $\$5{,}000{,}000$; on-level factor = $1.08$.
- Fixed expense ratio = $6\%$ of on-level premium.
- Variable expense $V = 15\%$; profit $Q_T = 4\%$.

**Find the indicated rate change.**

**Step 1 — Develop losses to ultimate:**
$$2{,}000{,}000 \times 1.25 = 2{,}500{,}000.$$

**Step 2 — Trend losses:**
$$2{,}500{,}000\times(1.04)^{2.5}=2{,}500{,}000\times 1.103363 = 2{,}758{,}408.$$
(Compute $(1.04)^{2.5}$: $\ln 1.04 = 0.0392207$, $\times 2.5 = 0.0980517$, $e^{0.0980517}=1.103015$. Use $1.103015$.)
$$2{,}500{,}000\times1.103015 = 2{,}757{,}538.$$

**Step 3 — On-level the premium:**
$$5{,}000{,}000\times1.08 = 5{,}400{,}000.$$

**Step 4 — Experience loss & LAE ratio:**
$$\frac{2{,}757{,}538}{5{,}400{,}000}=0.510655.$$

**Step 5 — Permissible loss ratio:**
$$\text{PLR}=1-V-Q_T=1-0.15-0.04=0.81.$$

**Step 6 — Indicated change factor (with fixed expense ratio in numerator):**
$$\frac{0.510655 + 0.06}{0.81}=\frac{0.570655}{0.81}=0.704512.$$

**Step 7 — Indicated rate change:**
$$0.704512 - 1 = -0.295488.$$

**Answer: indicated rate change ≈ −29.5% (a decrease of about 29.5%).**

---

### Example 3 — Parallelogram on-level factor + credibility blend

A line had these rate changes (annual policies, written uniformly):

- Base rate level index = $1.000$ before any change.
- $+10\%$ effective **July 1, 2023** → index $1.100$.
- $+5\%$ effective **October 1, 2024** → index $1.155$.

**(a) Find the on-level factor for calendar year 2024 earned premium.**

For CY2024 earned premium under uniform annual writing, we find the portion earned at each rate level using parallelogram geometry.

- The $+10\%$ change took effect 2023-07-01. Policies written before then carry the old level. By CY2024, the area still at the **pre-1.10** level is the small triangle in the lower-left corner: a policy written on, say, 2023-06-30 earns into early 2024. The fraction of CY2024 earned at the **old (1.000)** level is the triangle with legs of length 0.5 (half a year), area $=\tfrac12(0.5)(0.5)=0.125$.
- The $+5\%$ change took effect 2024-10-01. The area earned in CY2024 at the **new (1.155)** level is the triangle in the upper-right corner: legs of length $0.25$ (quarter-year), area $=\tfrac12(0.25)(0.25)=0.03125$.
- The remaining area is at the $1.100$ level: $1 - 0.125 - 0.03125 = 0.84375$.

**Average rate level index for CY2024:**
$$\bar R_{2024}=0.125(1.000)+0.84375(1.100)+0.03125(1.155).$$
$$=0.125 + 0.928125 + 0.0360938 = 1.0892188.$$

**Current rate level index = 1.155.** On-level factor:
$$\frac{1.155}{1.0892188}=1.06039.$$

**(b)** The on-leveled, developed, trended experience for this small segment indicates an average rate of $\$820$. The experience has credibility $Z=0.6$. The complement of credibility (trended current rate) is $\$760$.

$$\text{Final}=0.6(820)+0.4(760)=492+304=796.$$

**Answer: (a) on-level factor ≈ 1.0604; (b) credibility-weighted indicated rate = \$796.**

---

## Common Exam Traps

1. **Matching losses to the wrong premium.** Developed/trended losses must be compared to **on-level earned premium**, not written premium and not as-booked premium. Forgetting either the on-level factor or the develop/trend step is the classic error.

2. **Double-counting fixed expenses.** Put fixed expenses **either** in the numerator (as a dollar/ratio loading) **or** inside the denominator — never both. The denominator $1-V-Q_T$ should contain **only variable** expense and profit when fixed expenses are loaded separately.

3. **Using variable expenses where fixed belong (and vice versa).** Commissions/premium taxes scale with premium → **variable** (% of premium, go in denominator). General overhead per policy → **fixed** (dollars per exposure, go in numerator). Misclassifying distorts the rate, especially across policy sizes.

4. **Wrong trend period.** Trend runs from the **average loss date of the experience period** to the **average loss date of the future policy period** — *not* from the experience-period midpoint to "today." For annual policies, the future average date includes **half the policy term plus half the rate-effective period**.

5. **Confusing indicated rate vs indicated rate change.** Pure premium method → a **rate (level)**. Loss ratio method → a **change factor** (subtract 1 to get %). Reporting "−29.5%" when the question asks for the change *factor* (0.7045), or vice versa, loses points.

6. **Parallelogram geometry errors.** Areas use the **fraction of a year**, not months. A change effective with $m$ months remaining/elapsed gives leg length $m/12$, and the corner area is $\tfrac12(\text{leg})^2$ for the triangular corner of a *unit square* representing one calendar year of uniformly-written **annual** policies. Different policy terms change the geometry.

7. **Applying on-level factors to losses.** On-leveling is a **premium** adjustment (restating old premium at today's rates). Losses are adjusted by **development and trend**, not on-leveling.

8. **PLR sign/components.** $\text{PLR}=1-V-Q_T$. Do not subtract the **loss** ratio or add profit. Contingency is a *loading* (added cost), so it **reduces** the permissible loss ratio.

9. **Credibility complement.** $Z$ weights the **experience**; $(1-Z)$ weights the **complement**. Swapping them is common when $Z$ is small.

---

## Self-Check Questions

1. State the fundamental insurance equation and name the four right-hand-side components.

2. A 1-year policy is written 2025-10-01 for \$1,200. As of 2025-12-31, how much is **earned** and how much is **unearned**?

3. Pure premium = \$250/exposure, fixed expense = \$40/exposure, $V=20\%$, $Q_T=5\%$. Find the indicated rate.

4. Developed & trended losses & LAE = \$880,000; on-level earned premium = \$1,600,000; fixed expense ratio = 5%; $V=12\%$, $Q_T=3\%$. Find the indicated rate **change**.

5. Experience indication is a \$1,050 rate with $Z=0.3$; complement of credibility is \$900. What is the credibility-weighted rate?

### Answers

1. $\text{Premium} = \text{Losses} + \text{LAE} + \text{Underwriting Expenses} + \text{Underwriting Profit}$. (Losses, loss adjustment expense, underwriting/operating expenses, and target underwriting profit.)

2. Three months (Oct–Dec) of a 12-month term have elapsed → earned $= 1200 \times \tfrac{3}{12} = \$300$; unearned $= \$900$.

3. $\dfrac{250+40}{1-0.20-0.05}=\dfrac{290}{0.75}=\$386.67$.

4. Loss & LAE ratio $=\frac{880{,}000}{1{,}600{,}000}=0.55$. PLR $=1-0.12-0.03=0.85$. Change factor $=\frac{0.55+0.05}{0.85}=\frac{0.60}{0.85}=0.70588$. **Indicated change ≈ −29.4%.**

5. $0.3(1050)+0.7(900)=315+630=\$945$.
