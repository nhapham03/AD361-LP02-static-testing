# Issue Log — Working Draft

**Activity:** LP02 — Static Testing  
**Scribe:** José Antonio Horta Herrera  
**Status:** Completed.

## Sources and scope

Entries LP02-01 through LP02-11 organize the review annotations already present in `bankOfTheNorth.ts` on the `highlighting_erros` branch. They are not presented as a new, independently completed group review. LP02-12 is a separate requirement cross-check proposed for the reviewer's confirmation.

- Original source: [`bankOfTheNorth.ts` at main snapshot `5b78ab8`](https://github.com/nhapham03/AD361-LP02-static-testing/blob/5b78ab8390fd77a445732c42dcc4d7f4791e0686/bankOfTheNorth.ts).
- Existing annotations: [`bankOfTheNorth.ts` at review snapshot `a81274c`](https://github.com/nhapham03/AD361-LP02-static-testing/blob/a81274c913a6535053b25224f01e637a19f05fa2/bankOfTheNorth.ts).
- All locations below refer to the original file at the main snapshot, not to the annotated branch, where added comments shift line numbers.

No corrected file was present in either inspected branch. No entry is marked `Fixed`. Explanations describe source-code observations and potential consequences, not observed application failures. No application execution or ESLint output is recorded in this draft.

Allowed statuses: `Ongoing`, `Accepted`, `Rejected`, `Fixed`, and `Needs discussion`.

## Entries based on existing review annotations

### LP02-01 — Account balance representation and mutability

- **Location:** `bankOfTheNorth.ts`, line 8.
- **Issue:** `BALANCE` is an array rather than a single numeric account balance, and its binding is declared with `const`.
- **Explanation:** The transaction functions attempt arithmetic on the account balance. Their intended repaired implementation needs a numeric value and, if transactions reassign that value, a mutable binding. The source does not establish which numeric opening balance `[15, 983]` was intended to represent.
- **Suggested Fix:** Confirm the opening balance with the group, replace the array with that numeric value, and use a mutable binding such as `let` if transactions will reassign it. Do not assume that the intended amount is `15983` without agreement.
  (Author entry): Group have accepted the amount to be `15983`.
- **Status:** Fixed.

### LP02-02 — Deposit does not update stored account state

- **Location:** `bankOfTheNorth.ts`, lines 12–16, especially line 14.
- **Issue:** The assignment targets the local `balance` parameter instead of the stored account balance.
- **Explanation:** Even after the balance representation is repaired, assigning a result to the parameter does not update `BALANCE`; the function returns the stored value rather than an updated account balance.
- **Suggested Fix:** After successful PIN and amount validation, add the deposit amount to the stored numeric account balance and return the updated value.
- **Status:** Fixed.

### LP02-03 — Deposit amount validation is missing

- **Location:** `bankOfTheNorth.ts`, lines 12–16.
- **Issue:** The deposit operation does not reject a negative deposit amount.
- **Explanation:** Once arithmetic and state updates are repaired, accepting a negative deposit could reduce the balance instead of adding funds and could violate the requirement that the balance never becomes negative.
- **Suggested Fix:** Validate the deposit amount before changing account state. The existing annotations propose positive amounts; confirm whether zero should also be rejected, because the listed program requirements do not specify that policy.
- **Status:** Fixed.

### LP02-04 — Deposit parameter name is unclear

- **Location:** `bankOfTheNorth.ts`, lines 12 and 14.
- **Issue:** The name `balance` is used for the value apparently intended to be deposited.
- **Explanation:** The existing reviewer annotation recommends `amount` to distinguish the transaction amount from the stored account balance. This is a naming/readability suggestion, not a separate demonstrated functional defect.
- **Suggested Fix:** If the group accepts the suggestion, rename the parameter to `amount` and update references consistently.
- **Status:** Fixed.

### LP02-05 — Withdrawal uses an undefined variable and incorrect arithmetic

- **Location:** `bankOfTheNorth.ts`, lines 23–27, especially line 25.
- **Issue:** `balance = BALANCE + balance` refers to `balance`, which is not declared in the withdrawal function, uses addition instead of subtraction, and does not update the stored account balance.
- **Explanation:** The function receives `amount`, but the transaction expression does not use it. The expression cannot implement a withdrawal as written.
- **Suggested Fix:** After validation, subtract `amount` from the stored numeric account balance, update that stored balance, and return the updated value. Remove the references to the undefined `balance` variable.
- **Status:** Fixed.

### LP02-06 — Withdrawal amount and funds checks are missing

- **Location:** `bankOfTheNorth.ts`, lines 23–27.
- **Issue:** The withdrawal operation does not reject negative amounts or amounts greater than the available balance.
- **Explanation:** After the arithmetic is repaired, an oversized withdrawal could make the balance negative. Subtracting a negative amount could instead increase the balance.
  (Author Entry): The code is now updated,
  condition checks that the amount is finite, greater than zero, and no greater than BALANCE before subtracting it.
- **Suggested Fix:** Reject invalid withdrawal amounts and insufficient-funds requests before changing the balance. Confirm the group's zero-amount policy. Leave the stored balance unchanged when validation fails.
  (Author Entry): Fixed the condition to display the correct error message to user, condition checks for finite number, amount and balance validations.
- **Status:** Fixed.

### LP02-07 — Withdrawal function name is misspelled

- **Location:** `bankOfTheNorth.ts`, lines 23 and 41.
- **Issue:** The function is named `withdrawl`; the existing annotation suggests `withdrawal`.
- **Explanation:** This is a naming suggestion. The spelling alone does not break matching function references, but a partial rename would make callers inconsistent.
- **Suggested Fix:** Agree on the function name, then update the declaration and all callers together if the group accepts the rename.
- **Status:** Fixed.

### LP02-08 — Balance message is unreachable

- **Location:** `bankOfTheNorth.ts`, lines 34–36.
- **Issue:** A `console.log` statement appears after an unconditional `return`.
- **Explanation:** The function returns before it can reach the message.
- **Suggested Fix:** Move the message before the return if it is needed, or remove it if returning the balance is sufficient for the agreed behavior.
- **Status:** Fixed.

### LP02-09 — Transfer does not forward the PIN correctly

- **Location:** `bankOfTheNorth.ts`, lines 40–41; compare with the withdrawal signature at line 23.
- **Issue:** `withdrawl(amount)` supplies only one argument to a function declared with `pin` and `amount` parameters.
- **Explanation:** The transaction amount is passed in the PIN position, the withdrawal amount argument is missing, and the PIN received by `transfer` is not forwarded.
- **Suggested Fix:** Pass the supplied PIN and transaction amount in the correct order, using `withdrawl(pin, amount)` or the consistently renamed equivalent. Ensure the validated withdrawal path is used.
- **Status:** Fixed.

### LP02-10 — Transfer lacks an effective validated transaction path

- **Location:** `bankOfTheNorth.ts`, lines 40–42.
- **Issue:** The existing annotations flag missing amount and available-funds checks in `transfer`.
- **Explanation:** Transfer currently relies on an incorrect call to a withdrawal function that also lacks those checks. It therefore has no effective path that enforces the proposed positive-amount policy and prevents an overdraw.
- **Suggested Fix:** Coordinate with LP02-06 and LP02-09. Either validate directly or delegate to the repaired withdrawal operation, and do not report a successful transfer unless the withdrawal actually succeeds. Document the agreed handling of rejected transactions.
- **Status:** Fixed.

### LP02-11 — Transfer returns a function reference

- **Location:** `bankOfTheNorth.ts`, line 43.
- **Issue:** `return balanceCheck` returns the function itself rather than obtaining a balance value.
- **Explanation:** The existing reviewer annotation proposes calling `balanceCheck()` instead. That proposal addresses the missing invocation, but the final call must also match the group's decision about PIN protection in LP02-12.
- **Suggested Fix:** Return the intended balance value rather than the function reference. If the author obtains it by calling `balanceCheck`, use the final agreed signature and authentication behavior.
  (Author Entry): I decided to return `BALANCE` instead of calling `balanceCheck()`.
- **Status:** Fixed.

## Additional requirement cross-check — reviewer confirmation needed

### LP02-12 — Balance check does not require a PIN

- **Location:** `bankOfTheNorth.ts`, requirement at line 5 and implementation at lines 34–35.
- **Issue:** `balanceCheck()` has no PIN parameter or PIN validation.
- **Explanation:** The listed requirements say that a PIN must be provided during every action. This source-code comparison was not explicitly documented in the existing branch annotations and should be confirmed with the reviewer rather than attributed to that reviewer.
- **Suggested Fix:** Ask the reviewer and author to confirm that balance checking is covered by the every-action PIN requirement, then require and validate the PIN consistently and update callers as needed.
- **Status:** Fixed.

### LP02-13 — Unused transfer variable

- **Location:** `bankOfTheNorth.ts`, line 41.
- **Issue:** const `transferAmount` is stored but never used, incorrect use to call the function.
- **Explanation:** Unused variable/constant causes confusions and is unnecessary to our fucnction. It calls `withdrawl` inccorectly, missing arguments.
- **Suggested Fix:** Completely remove the const `transferAmount`, directly calls the correct `withdrawal` function with its 2 arguments that is PIN and amount as required.
- **Status:** Fixed (added by Author; group granted approval).

### LP02-14 — Failure messages do not identify the cause (improvement)

- **Location:** `bankOfTheNorth.ts`, lines 12 - 20 (deposit) and 23 - 31 (transfer).
- **Issue:** Only displays message to user when PIN in incorrect.
- **Explanation:** Added extra improvement to message the user when which action goes wrong, once the PIN is validated but the amount is invalid, then displays the correct message and not automatically displays "Incorrect PIN".
- **Suggested Fix:** Added extra `else if` statement to display each action and message.
- **Status:** Fixed (added by Author; group granted approval).

### LP02-15 — Amount validation does not reject non-finite values

- **Location:** `bankOfTheNorth.ts`, lines 24 (deposit) and 41 (transfer); related to LP02-03 and LP02-10.
- **Issue:** The check only looks at whether the amount is bigger than 0, so `Infinity` in TypeScript still gets through.
- **Explanation:** If a person can deposits `Infinity` they would have infinite amount of money and would not be good for the bank. This is a dangerous and risky mistake.
- **Suggested Fix:** Added a condition to check is the amount number is Finite.
- **Status:** Fixed (added by Author; group granted approval).

### LP02-16 — USER const never used.

(Author Entry)

- **Location:** `bankOfTheNorth.ts`, line 7 and line 42.
- **Issue:** ESLint rule to display error when a `const` was never used.
- **Explanation:** To pass the ESLint check, Reviewer found this error.
- **Suggested Fix:** Display User name inside the console log message when the user successfully transfer money to a receiver.
- **Status:** Fixed.

## Scribe follow-through

Confirm these entries with the reviewer and author. Record the group's decisions, including any rejected naming suggestions and the intended opening balance. When `fixBankOfTheNorth.ts` becomes available, compare each accepted entry against the corrected source before changing its status to `Fixed`. Add remaining findings supplied by the reviewer; this draft does not claim exhaustive coverage.
