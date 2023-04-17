To install locally:
  Clone the repo:
    git clone --recurse submodules git@github.com:maximilian-hub/flavor-pairing-calculator.git
  Install packages:
    cd client
    npm i
    cd ../server
    npm i

To run locally, navigate to root directory and run:
  cd server
  node server.js
  cd ../client
  npm start
Connect through a browser at http://localhost:3000/

Local builds will be unable to send emails through the contact form.






Note for deployment:
  Before deploying,
  Navigate to /client/.env.production
  and update the base URL to whatever the
  actual production domain will be.

  If you want to run the production build
  locally, change it back to localhost:5000.