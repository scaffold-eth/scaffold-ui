---
"@scaffold-ui/debug-contracts": patch
---

Mark `Contract` and `IntegerInput` as client components (`"use client"`). Both call React hooks, so importing them into a React Server Component (Next.js App Router, Vocs v2) previously threw at render. The components package already marks its interactive components this way; this brings debug-contracts in line.
