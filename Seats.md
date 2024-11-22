```sql
FLights Table

CREATE TABLE Flights (
    flight_id INT AUTO_INCREMENT PRIMARY KEY,
    flight_number VARCHAR(50) NOT NULL,
    origin VARCHAR(50) NOT NULL,
    destination VARCHAR(50) NOT NULL,
    departure_time DATETIME NOT NULL,
    arrival_time DATETIME NOT NULL
);


```

```sql
CREATE TABLE SeatTypes (
    seat_type_id INT AUTO_INCREMENT PRIMARY KEY,
    seat_type_name VARCHAR(50) NOT NULL, -- e.g., Economy, Business
    seats_per_row INT NOT NULL,          -- Number of seats per row
    total_seats INT NOT NULL             -- Total seats available in this category
);

```

```sql
CREATE TABLE Seats (
    seat_id INT AUTO_INCREMENT PRIMARY KEY,
    flight_id INT NOT NULL,
    seat_type_id INT NOT NULL,
    seat_number VARCHAR(10) NOT NULL,    -- e.g., A1, A2, etc.
    is_booked BOOLEAN DEFAULT FALSE,    -- Tracks booking status
    FOREIGN KEY (flight_id) REFERENCES Flights(flight_id),
    FOREIGN KEY (seat_type_id) REFERENCES SeatTypes(seat_type_id)
);

```

## Data Insertion Workflow
 - Step 1: Add Flight Details
 - Insert flight data into the Flights table.

```sql
INSERT INTO Flights (flight_number, origin, destination, departure_time, arrival_time)
VALUES ('AI202', 'Delhi', 'Mumbai', '2024-11-18 10:00:00', '2024-11-18 12:00:00');
```



### Step 2: Define Seat Types
- Insert seat type information into the SeatTypes table.
```sql

INSERT INTO SeatTypes (seat_type_name, seats_per_row, total_seats)
VALUES ('Economy', 6, 120), ('Business', 4, 40);

```




### Step 3: Generate Seats for the Flight
 - For each flight, create rows of seats in the Seats table.

- Example: Generate Seats Programmatically Use a backend script (e.g., Python, Node.js) to insert seat rows into the Seats table:

```javascript
const generateSeats = (flightId, seatTypeId, totalSeats, seatsPerRow) => {
    let seats = [];
    let rowCount = Math.ceil(totalSeats / seatsPerRow);
    for (let row = 1; row <= rowCount; row++) {
        for (let col = 1; col <= seatsPerRow && seats.length < totalSeats; col++) {
            seats.push({
                flight_id: flightId,
                seat_type_id: seatTypeId,
                seat_number: `${String.fromCharCode(64 + row)}${col}` // e.g., A1, A2
            });
        }
    }
    return seats;
};

// Insert generated seats into the database
// Example: Using a bulk insert or individual queries

```

### Example Data Representation in Tables
```sql
- Flights Table

flight_id	flight_number	origin	destination	departure_time	arrival_time
1	AI202	Delhi	Mumbai	2024-11-18 10:00:00	2024-11-18 12:00:00


SeatTypes Table
seat_type_id	seat_type_name	seats_per_row	total_seats
1	          Economy	          6	          120
2	          Business	          4	          40


Seats Table
seat_id	flight_id	seat_type_id	seat_number	is_booked
1	     1	     1	          A1	          FALSE
2	     1	     1	          A2	          FALSE
...	...	...	...	...


```