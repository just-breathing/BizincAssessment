## Running this Project

  

First make sure you are in ExpressApp folder and you have [docker desktop](https://www.docker.com/products/docker-desktop/) installed in your system

> create docker volume to persist postgresql data

```bash

docker  volume  create  --name  postgresdb-volume

```

> start express server and postgres sql server containers detached from terminal

```bash

docker  compose  up  -d 

```

> to stop containers

```bash

docker  compose  down

```

> Run the below command after stopping postgressql and express container to delete docker images and volume

```bash

docker  rmi  expressapp-expressserver:latest postgres:latest && docker  volume  rm  expressapp_postgresdb-volume postgresdb-volume

```

  
---

  

#### Connecting  PostgreSQL Docker Container with local DBMS

To connect PostgreSQL Docker Container with local DBMS, use the following connection details:

```bash

Host  :  localhost

Port  :  5432

Database  :  postgres

Username:  root

Password  :  scrpwd

```

---

#### To test API's using postman


- You can find postman collection file(Bizinc Assessment Apis.postman_collection.json) in ExpressApp folder

- All apis are included in postman collection, import this file in postman to test these API's

- To test Authorized routes first run below api and use those values with authentication (Basic Auth) with keys as email and password

```bash

http://localhost:5200/createUser  #pass email and password as json in body and this creates a new user in Users table

```

  

>  #### [!Note] passwords are hashed and stored in database

  

- Initially some dummy data is stored in Users table these emails and passwords can be used for authentication.

- The plain passwords of dummy data for each user are password${id} of Users table. eg. for id : 1 passwords is "password1" by default this is used in authentication header in postman for authenticated routes.

---
  

## Task completed with this application

  

- [x] **Task 4 :** A basic Node.js server is setup using Express.js and created an API endpoint that returns a JSON response.

```bash

http://localhost:5200/  #return {msg:"hi"} as json

```

---

- [x] **Task 5 :** Implemented a middleware function that logs information about incoming

requests.

> All API logs are stored in the 'logs' folder.

> Each log file is named based on the date when the API request was made.

---

- [x] **Task 6 :** Express.js server is connected to a PostgreSQL database, created a table for storing user information, and implemented CRUD operations.

  

> Used userInfo database to store user information (username,email and age) .

> These are unauthenticated routes and can be accessed using the below urls

> ${id} in below API's corresponds to user's id in users table in userinfo database

```bash
POST -  http://localhost:5200/api/v1/users/user  # creates a new user in users table
```
```bash
GET -  http://localhost:5200/api/v1/users/user/${id}  #returns a particular user in users table using id
```

```bash

PUT -  http://localhost:5200/api/v1/users/user/${id}  #updates an user in users table using id

```

  

```bash

DELETE - http://localhost:5200/api/v1/users/user/${id}  #deletes an user in users table using id in userinfo database

```

  

```bash

GET - http://localhost:5200/api/v1/users/all  #returns all users in users table

```

---

- [x] **Task 7: Database Schema: Design a simple relational database schema for a blogging platform with tables for users, posts, and comments.**

  

### Database Tables Documentation:

#### Users Table:

-  **user_id**: Serial, Primary Key - Unique identifier for each user.

-  **email**: VARCHAR(100), Unique, Not Null - Email address of the user.

-  **password**: VARCHAR(255), Not Null - Hashed password of the user.

-  **full_name**: VARCHAR(100) - Full name of the user.

-  **bio**: TEXT - Bio or description of the user.

#### Posts Table:

-  **post_id**: Serial, Primary Key - Unique identifier for each post.

-  **user_id**: INTEGER, Foreign Key (Users) - References the user who created the post.

-  **title**: VARCHAR(255), Not Null - Title of the post.

-  **content**: TEXT, Not Null - Content or body of the post.

-  **created_at**: TIMESTAMP, Default CURRENT_TIMESTAMP - Timestamp indicating when the post was created.

-  **updated_at**: TIMESTAMP, Default CURRENT_TIMESTAMP - Timestamp indicating when the post was last updated.

#### Comments Table:

-  **comment_id**: Serial, Primary Key - Unique identifier for each comment.

-  **user_id**: INTEGER, Foreign Key (Users) - References the user who posted the comment.

-  **post_id**: INTEGER, Foreign Key (Posts) - References the post to which the comment belongs.

-  **content**: TEXT, Not Null - Content or body of the comment.

-  **created_at**: TIMESTAMP, Default CURRENT_TIMESTAMP - Timestamp indicating when the comment was created.

-  **updated_at**: TIMESTAMP, Default CURRENT_TIMESTAMP - Timestamp indicating when the comment was last updated.

### Relationships:

-  **Users - Posts (One-to-Many)**: Each user can create multiple posts, establishing a one-to-many relationship between users and posts. The `user_id` in the Posts table serves as a foreign key referencing the `user_id` in the Users table.

-  **Users - Comments (One-to-Many)**: Similarly, each user can post multiple comments, forming a one-to-many relationship between users and comments. The `user_id` in the Comments table serves as a foreign key referencing the `user_id` in the Users table.

-  **Posts - Comments (One-to-Many)**: Lastly, each post can have multiple comments associated with it, creating a one-to-many relationship between posts and comments. The `post_id` in the Comments table serves as a foreign key referencing the `post_id` in the Posts table.

  

- [x] **Task 8 :** SQL Queries: Objective: Write SQL queries to retrieve posts by a specific user, and count comments on a post. Approach: Showcase SQL proficiency in accessing and manipulating data within the designed schema.

  

> there are functions in blogController.js file to exceute the above requested queries

  

## SQL Queries

  

### getAllPostsAndCommentsCountByUsername

  

This function retrieves all posts created by a user specified by their full name, along with the count of comments on each post.

  

#### SQL Query

  

```sql

SELECT

p.post_id,

p.title,

p.content,

p.created_at,

p.updated_at,

COUNT(c.comment_id) AS comment_count

FROM

Posts p

INNER JOIN Users u ON u.user_id = p.user_id

LEFT JOIN Comments c ON c.post_id = p.post_id

WHERE

u.full_name = $1  /* full name of particular user */

GROUP BY

p.post_id;

```

  

### getAllPostsByUsername

  

This function retrieves all posts created by a user specified by their full name.

  

#### SQL Query

  

```sql

SELECT

p.post_id,

u.full_name,

p.title,

p.content,

p.created_at,

p.updated_at

FROM

Posts p

INNER JOIN Users u ON u.user_id = p.user_id

WHERE

u.full_name = $1; /* full name of particular user */

```

  

### getCommentsCountOnAPost

  

This function retrieves the count of comments on a post specified by its title.

  

#### SQL Query

  

```sql

SELECT

p.post_id,

p.title,

p.content,

p.created_at,

p.updated_at,

COUNT(c.comment_id) AS comment_count

FROM

Posts p

LEFT JOIN Comments c ON c.post_id = p.post_id

WHERE

p.title = $1  /* title of a particular post */

GROUP BY

p.post_id;

```

  

---

- [x] **Task 9 :** Implement user authentication in the Node.js application using Passport.js and ensure that only authenticated users can access specific API endpoints, demonstrating knowledge of secure authentication practices

>##### [!NOTE] using Blogdb database for all the below API's

>##### [!NOTE] Passwords are encrypted and stored in Users table

  

>  #### Route with No Authentication

```bash

POST - http://localhost:5200/user  #creates a new user in Users table

```

---

>  #### Routes with Basic Auth - email and pasword in request header
>  ${user_name} corresponds to user's fullname in Users table

```bash

GET - http://localhost:5200/api/v1/blog/users/all  #returns all users information excluding the hashed password field in Users table

```

  

```bash

GET - http://localhost:5200/api/v1/blog/comments-count/posts/user/${user_name}   #returns all posts created by a user in Users table using user's full name

```

  

```bash

GET - http://localhost:5200/api/v1/blog/comments-count/post-title/${title}  #returns no of comments and post information of a particular post using post's title from Post and comments tables

```

```bash

GET - http://localhost:5200/api/v1/blog//posts/all/${user_name}  #returns no of comments and post information of a all posts made by a user using user's full name from Users, Post and comments tables

```

---

  

