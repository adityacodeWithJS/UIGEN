# PR Review Skill

Review pull request changes for code quality, correctness, and potential issues.

## What this skill does

When invoked, this skill:
1. Reads all changed files on the current branch vs main
2. Reviews each change for bugs, security issues, style problems, and logic errors
3. Summarizes findings with severity levels (critical / warning / suggestion)

## Usage

```
/pr-review
```

Or with a PR number:

```
/pr-review 42
```

## Review checklist

- **Correctness** — does the logic do what it claims?
- **Security** — any injection, auth bypass, or data exposure risks?
- **Edge cases** — unhandled nulls, empty arrays, race conditions?
- **Performance** — N+1 queries, unnecessary re-renders, large allocations?
- **Tests** — are new code paths covered?
- **Types** — TypeScript errors or unsafe casts?
- **Dead code** — unused variables, imports, or functions left in?
- **Debug artifacts** — `console.log`, `console.error`, `debugger`, commented-out code, or TODO leftovers that shouldn't be merged?

## Output format

```
## PR Review

### Critical
- <file>:<line> — <issue>

### Warnings
- <file>:<line> — <issue>

### Suggestions
- <file>:<line> — <suggestion>

### Summary
<1-2 sentence overall assessment>
```
