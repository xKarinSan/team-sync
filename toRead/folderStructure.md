# Folder Structure



- Project
  - public (where the .svg files will be stored)
  - src
    - app (The main routing)
   
    - components
      - authentication (Authentication-related components)
      - documents (Document-related components)
      - general (Components that can be reused at ANYWHERE)
     
    - config (any configuration related to this project is here)
      - firebaseConfig.tsx (The configurations of firebase)
     
    - firebaseFunctions
      - authentication
        - emailAuthentication.tsx (users login/register via email & password entry)
        - gmailAuthentication.tsx (users login/register via gmail)
        - userLogout.tsx (trigger user logout, regardless of authentication)

    <b>The rest (Except for general) follows the following prefix:  
    1. Add: POST operations, Delete: delete operations
    2. Get: GET operations
    3. Put: PUT operations
    4. Delete: DELETE operations
    5. Refs: Database references
    </b>
       
      - documents
      - folders
      - general
      - memberships
      - teams
      - users
    
    - images (images used for the project be stored here)
      - errorpage (images used in the errorpage)
      - general (images that can be used universally)
      - homepage (images used in homepage)
      - landing (images used in landing page)
      - teampage (images for the team pages)
     
    - store
      - teamStore (stores the teamId of the current team)
      - userStore (stores the information of the current logged user)
      
    - types (the prefix of the files inside are Types)
      - Documents
      - Folders
      - HomePage
      - LandingPage
      - Membership
      - Team
      - User
        
    - routeProtectors.tsx (functions here trigger when page renders and redirect whenever necessary)
  
  - toRead (**Important to read; ends with .md**)
  - .env.local(environment variables)
  - next-config.js
  - pacakge-lock-json
  - README.md (the main md file you will first see in this repo)
  - tsconfig.json (the typescript configuations)
