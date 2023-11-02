

### Workout Tracker App - Bike Tracer ###
Bike Tracer is a web application designed for users to record and track their bike rides. Whether you're a casual cyclist or a fitness enthusiast, this app provides a convenient way to log your workouts and visualize your performance.

## Technologies Used
- React
- React Router DOM
- Geolocation API
- React Maps API
- Local JSON Server
- CSS
- HTML

## Architecture and State Management
- React-based Frontend: Biker tracer is built using React for a comfortable user interface. React Router DOM is used for routing within the app.

- Local JSON Server: Mock workout data is stored as an object in a local JSON server to demostrate complete functionality of the app.

- State Management: Workout data is fetched from the local JSON server and managed as React state in the main App component. This data is passed down via outlet to child components to avoid prop drilling.



## Features
1. Home screen displays your rides from the past week.
2. All you rides can be acess via "All Rides".
3. Record your workout by navigating to "Add a Ride"
4. Click the "Start Workout" button to begin recording your bike ride in real-time. Geoloaction API captures location data (a series of coordinate points with timestamps) along with ride date, start time and total elapsed time
5. Pause and Contiue as needed during your workout.
6. When your workout is complete, click the "Save Workout" button.
7. View your recorded workouts via any workout list or search by date to view your ride on interactive map with ride metrics.



## Project Structure
- `src/`: Contains the source code for the app.
- `public/`: Static files and the HTML template.


## Getting Started (without VScode or any IDE)
1. Clone the repository to your local machine by entering the following command into your terminal.

```
git@github.com:evandalmeida/bike-tracer-ph2-project.git
```


2. Next install dependencies by entering the the following command into the same terminal.

```
cd bike-tracer-ph2-project
npm install
```


3. Start the local JSON server by entering the next command into your terminal.

```
json-server --watch db.json
```


4. Start the development server.
```
npm start
```

5. Open a web browser and enter the following url `http://localhost:3000`.



This project was created as part of a coding bootcamp to demonstrate the use of React for building web applications. Planning to develop backend with user login so riders can store their workouts.