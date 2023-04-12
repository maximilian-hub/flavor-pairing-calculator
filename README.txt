To run locally, navigate to root 
directory and run:
  cd server
  node server.js
  cd ../client
  npm start
Connect through a browser at http://localhost:3000/







Note for deployment:
  Before deploying,
  Navigate to /client/.env.production
  and update the base URL to whatever the
  actual production domain will be.

  If you want to run the production build
  locally, change it back to localhost:5000.