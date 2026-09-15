You are helping me optimize the backend of my Node.js/Express + MySQL app.

SCOPE: [fix routes folder]

Check and fix, in this order:
1. Security — SQL injection (must use parameterized queries), missing input 
   validation, missing auth/role checks on routes, hardcoded secrets, missing 
   rate limiting, missing CORS config.
2. Bugs — unhandled errors, missing try/catch, broken edge cases.
3. Organization — enforce routes → controllers → services → data access 
   separation; move duplicated logic into shared utilities.
4. Performance — N+1 queries, missing indexes, missing connection pooling, 
   unpaginated large result sets.

Rules:
- Don't change working logic just for style.
- Flag any breaking change before making it.
- Show me each fix with a short explanation and how to verify it, before 
  moving to the next.