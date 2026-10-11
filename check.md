# Cross-Check and Automated Static Analysis — Working Draft

**Activity:** LP02 — Static Testing  
**Status:** Pending; not a completed submission.

This file contains the required review sections and reflection prompts. It does not claim that the final cross-check or automated analysis has been completed. Each member must add their own name and actual final review results.

## Group Members' Final Review Notes

### José Antonio Horta Herrera — Scribe

- **Review status:** Pending.
- **Required check:** Compare each entry in `issue_log.md` with `fixBankOfTheNorth.ts`, update the status according to the actual result, and identify any unresolved entries.
- **Final review note:** Pending — add after the corrected code has been reviewed.

### Ingrid Arenas - Reviewer

- **Review status:** Pending.
- **Required check:** const USER was assigned but never used, two options remove it or use it somewhere in a console message
- **Final review note:** Pending — reviewer to complete after their final review.

### Nha Pham - Author

- **Name:** Nha Pham
- **Review status:** Ongoing.
- **Required check:** Reviewed the issue log and corrected code for unresolved defects, while dicussing with group members.
- **Final review note:** Pending — author to complete after their final review.

## Evidence

The manual review must precede the automated-analysis comparison. Do not treat expected tool findings as observed results.

### ESLint installation

- **Command:** `npx eslint --version`
- **Installed ESLint version:** `v10.12.0`
- **Screenshot:** `screenshots/01-eslint-installed-jose.png`
- **Evidence status:** The screenshot shows the command and the installed ESLint version.

![ESLint installation](screenshots/01-eslint-installed-jose.png)

### Original source analysis

- **Command:** `npx eslint fixBankOfTheNorth.ts`
- **Screenshot:** screenshots\eslint-original.png
- **Observed results:** bankOfTheNorth has multiple issed where a variable is assigned but never used

### Corrected source analysis

- **Command:** `npx eslint fixBankOfTheNorth.ts`
- **Screenshot:** screenshots\eslint-fixed.png
- **Observed results:** Only one error with a variable being unused

## Reflection: Manual Review Compared with ESLint

### What did ESLint identify?

Original source - bankOfTheNorth.ts:  
ESLint reported multiple warnigns from the `@typescript-eslint/no-unused-vars` rule. Several variables were declared and assigned values but never used, triggering repeated violations. One of these warnings involved the USER variable:
`error  'USER' is assigned a value but never used`

Corrected source - fixBankOfTheNorth.ts:  

After applying fixes, ESLint reported no remaining errors or warnings. All unused variables were either removed or properly referenced.
The USER warning was resolved by adding a message that referenced the variable:  `Dear ${USER}, ${amount} was successfully transferred to ${reciver}`

### What did the group identify that ESLint did not?

During manual review, the group identified several non‑linting issues that ESLint cannot detect. These issues came directly from the original code:

- Logical inconsistencies in how data was handled: 
    example line 14: 
    Why ESLint didn’t catch it:

    - BALANCE is an array, not a number
    - Adding an array to a number results in string concatenation
    - The balance is never actually updated

    ESLint cannot detect incorrect business logic or misuse of data structures.

- Redundant or unclear control flow:
    example: lines 35-36
    Why ESLint didn’t catch it:

    - The console.log is unreachable code
    - The function returns before performing its intended action

    ESLint does not flag unreachable code

- Missing validation or edge‑case handling
    example: line 24
    Why ESLint didn’t catch it:

    - No check that amount is positive
    - No check that amount is less than or equal to the balance
    - No prevention of negative balances (a requirement)
    - No error handling

    These are semantic requirements, not linting violations.

- Naming conventions or structural improvements that ESLint does not enforce
    example: line 23
    Why ESLint didn’t catch it:

    - The function name is misspelled (withdrawl instead of withdrawal)
    - The parameter amount is never used
    - The variable balance is referenced but not declared in this scope

    ESLint does not enforce naming conventions or detect conceptual mismatches.

### Did ESLint identify anything the group missed?

Yes, there was one issue the group overlooked, which ESLint correctly flagged:
A remaining no-unused-vars warning that had not been addressed during manual review. Once this final unused variable was fixed, ESLint reported zero issues.
## Completion Check

Before submission, confirm that all members have added their names and final review notes; the issue-log statuses match the corrected code; all three screenshot requirements are satisfied; the reflection is based on actual outputs; and the required files are present in the public repository. Every group member must submit the same repository URL on Canvas.
