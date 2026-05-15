Review all changed files on the current branch compared to main. For each changed file, check:

- **Correctness** — does the logic do what it claims?
- **Security** — any injection, auth bypass, or data exposure risks?
- **Edge cases** — unhandled nulls, empty arrays, race conditions?
- **Performance** — N+1 queries, unnecessary re-renders, large allocations?
- **Tests** — are new code paths covered?
- **Types** — TypeScript errors or unsafe casts?
- **Dead code** — unused variables, imports, or functions left in?
- **Debug artifacts** — `console.log`, `console.error`, `debugger`, commented-out code, or TODO leftovers that shouldn't be merged?

Output your findings in this format:

## PR Review

### Critical
- `<file>:<line>` — <issue>

### Warnings
- `<file>:<line>` — <issue>

### Suggestions
- `<file>:<line>` — <suggestion>

### Summary
<1-2 sentence overall assessment>

If there are no issues in a category, omit that section.
