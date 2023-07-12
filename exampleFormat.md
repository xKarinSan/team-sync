# Component format example

Whenver a new page/component is created, copy and paste this template

```
"use client"
// ===================================all imports===================================

// ==========================import from react==========================

// ==========================import from next==========================

// ==========================import state management==========================

// ==========================import chakraui components==========================

// ==========================import custom components==========================

// ==========================import external functions==========================

// ==========================import external variables==========================

// ==========================import types/interfaces==========================

// ==========================etc==========================


// ===================================main component===================================
// ===============component exclusive interface(s)/type(s) if any===============

export default function ComponentName({prop1}:{prop1:propType}){
// ===============constants===============

// ===============states===============

// ===============helper functions (will not be directly triggered)===============

// ===============main functions (will be directly triggered)===============

// ===============useEffect===============

return (<>
The react content

</>)
}

// ===================================sub component(s) if any===================================
// ===============component exclusive interface(s)/type(s) if any===============
// the rest are pretty much similar like the main components



```
