# Call Center Employee Directory
This is a simple app to browse through the employee and call records of a fictional call center. The intended user would be the call center director, or a QC agent, or HR person. My main focus was 

## Setup
Just run `npm install` from the root of the project, and then `npm start` should serve up the app at `localhost:3000`. If the `postinstall` script doesn't run for whatever reason, run `cd client` and `npm install` there too.

## Features
  - View and search a list of employees
  - View an employee's details, call records, and performance stats
  - View a transcript from a single call
  - Search a list of calls
  - Filter the call list by status type
  - A simple reporting page with overall call center stats
  - Route navigation with animated transitions

## Other Notes
  - Relies heavily on Material-ui react components
  - The purpose of making this was mostly to show off front-end things, so the backend code is in vanilla JS for expediency's sake.
  - I wanted to learn about GraphQL and Apollo, so I set up a mock-y backend that seeds faker.js with the ID from the request in order to generate consistent fake data. Some data is also hardcoded in a file.
  - I also tried to emphasize component reusability and transparent project structure/organization.

## Ideas for Future Modifications
  - Some things could be "DRYed" up a little more.
  - Troubleshoot the transition animations' occasional lagginess
  - More in-depth and visually interesting reports!
  - Tests
  - Put in a component library with something like Storybook
  - More intuitive loading UX when re-querying with filters/searches