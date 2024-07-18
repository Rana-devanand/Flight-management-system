### Project Setup

#

## Sequelize Package Setup -> [ORM] `object relational mapping`

### Step 1

- Sequelize is a promise-based Node.js ORM tool
- `npm sequelize init`

```
-> this command creates the 4 folders and initializes the sequelize package.

        1. Models
        2. migrations
        3. seeders
        4. config
```

```
- Inside the config/config.js file ->
        - "Username" -> put down the database username.
        - "password" -> put down the database password.
        - "database" -> put down the database name.

        {
          "development": {
          "username": "root",
          "password": "root",
          "database": "flight-service",
          "host": "127.0.0.1",
          "dialect": "mysql"
          },

        }

```

#

### step 2 :

- Create the database
- `npx sequelize db:create`

```
This command creates the database with the given name.

```

### Step 3 :

- Create the model :
- `npx sequelize model:generate --name city --attributes name:String`

```
 1. This command creates the model with the given attributes.
        - models / city.js

 2. This command also creates the migration folder where we can put the constraints.
        - migration / 20240718111227-create-city.js

```
