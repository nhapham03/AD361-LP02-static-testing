# Cross-Check and Automated Static Analysis — Working Draft

**Activity:** LP02 — Static Testing  
**Status:** Pending; not a completed submission.

This file contains the required review sections and reflection prompts. It does not claim that the final cross-check or automated analysis has been completed. Each member must add their own name and actual final review results.

## Group Members' Final Review Notes

### José Antonio Horta Herrera — Scribe

- **Review status:** Pending.
- **Required check:** Compare each entry in `issue_log.md` with `fixBankOfTheNorth.ts`, update the status according to the actual result, and identify any unresolved entries.
- **Final review note:** Pending — add after the corrected code has been reviewed.

### Reviewer

- **Name:** Pending — reviewer to complete.
- **Review status:** Pending.
- **Required check:** Review `issue_log.md` and confirm whether the identified defects have been addressed.
- **Final review note:** Pending — reviewer to complete after their final review.

### Author

- **Name:** Pending — author to complete.
- **Review status:** Pending.
- **Required check:** Review the issue log and corrected code for unresolved defects.
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

- **Command:** `npx eslint bankOfTheNorth.ts`
- **Screenshot:** Pending — save the actual terminal output in `screenshots` and record the filename here.
- **Observed results:** Pending — record actual diagnostics only.

### Corrected source analysis

- **Command:** `npx eslint fixBankOfTheNorth.ts`
- **Screenshot:** Pending — save the actual terminal output in `screenshots` and record the filename here.
- **Observed results:** Pending — record actual diagnostics, or that no diagnostics were printed if that is the actual result.

## Reflection: Manual Review Compared with ESLint

### What did ESLint identify?

Pending — summarize actual messages from the original and corrected source runs. Identify which problems remained, disappeared, or were newly reported.

### What did the group identify that ESLint did not?

Pending — compare the confirmed manual-review findings with the actual diagnostics. Do not assume that a manual finding was missed by ESLint before checking the output.

### Did ESLint identify anything the group missed?

Pending — report any additional findings from the actual runs. If there were none, state that only after completing the comparison.

## Completion Check

Before submission, confirm that all members have added their names and final review notes; the issue-log statuses match the corrected code; all three screenshot requirements are satisfied; the reflection is based on actual outputs; and the required files are present in the public repository. Every group member must submit the same repository URL on Canvas.
