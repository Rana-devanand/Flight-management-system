### Table 1 

# flight_schedules 
- In this `flight_schedules` table we will stored the flights scheduled time period.
- for example -
     - If any flight is scheduled for `[Start date] - [End date]` like start_date = `1-jan-2025` to end_date = `3-mar-2025`


```sql
Columns:
id int AI PK  
schedule_id int 
flight_id int 
start_date datetime 
end_date datetime 
recurrence_pattern varchar(255) 
departure_time time 
arrival_time time 
available_seats json 
flight_status enum('Schedule','Available','UnAvailable') 
createdAt datetime 
updatedAt datetime

```

```sql
1	
1
1
2024-09-25  time 20:14:49	
2024-10-25  time 20:14:49	
Alternative	
12:30:00	
04:00:00	
"[economy : 50 , Bussiness : 10]"	
Schedule	
2024-09-25 20:17:59	
2024-09-25 20:17:59

```




# Table - schedule_lists
- This table handle all schedules flights list data.
- for example -
     - if any flight is scheduled from `1-jan-2025`  to `1-mar-2025`. If the flight is traveling in alternative days then all the dates will be stored in the `schedule_lists` table.

```sql

Table: schedule_lists
Columns:
id int AI PK 
flight_id int 
Date datetime 
Departure time 
Arrival time 
Total_seats json 
createdAt datetime 
updatedAt datetime

```

```sql
1	2	2024-09-25 00:00:00	12:30:00	04:00:00	"[economy : 50 , Bussiness : 10]"	2024-09-25 21:02:22	2024-09-25 21:02:22
2	3	2024-09-25 00:00:00	12:30:00	04:00:00	"[economy : 50 , Bussiness : 10]"	2024-09-25 21:03:05	2024-09-25 21:03:05
3	3	2024-09-25 00:00:00	12:30:00	04:00:00	"[economy : 50 , Bussiness : 10]"	2024-09-25 21:03:26	2024-09-25 21:03:26
4	3	2024-09-28 00:00:00	12:30:00	04:00:00	"[economy : 50 , Bussiness : 10]"	2024-09-25 21:03:26	2024-09-25 21:03:26
5	3	2024-10-01 00:00:00	12:30:00	04:00:00	"[economy : 50 , Bussiness : 10]"	2024-09-25 21:03:26	2024-09-25 21:03:26
6	3	2024-10-04 00:00:00	12:30:00	04:00:00	"[economy : 50 , Bussiness : 10]"	2024-09-25 21:03:26	2024-09-25 21:03:26
```


- Functions
- user Controlled statement 
- Star Pattern 
- conditional statement , loop function , 
- validation on server and client
- string functions [predefined functions]
- Basic of oops
- Array crud operations [associative , indexed];
- Sorting Algorithms [1]
- how to read and write files [upload , read and write]
