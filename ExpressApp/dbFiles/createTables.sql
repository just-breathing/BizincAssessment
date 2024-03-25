CREATE DATABASE "userinfo";
\c "userinfo";


CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE ,
    email VARCHAR(100) NOT NULL UNIQUE,
    age NUMERIC(3)
);

-- Insert dummy data into the users table
-- Insert dummy data into the users table
INSERT INTO users (username, email, age)
VALUES
    ('user1', 'user1@example.com', 25),
    ('user2', 'user2@example.com', 30),
    ('user3', 'user3@example.com', 28),
    ('user4', 'user4@example.com', 35),
    ('user5', 'user5@example.com', 27),
    ('user6', 'user6@example.com', 32),
    ('user7', 'user7@example.com', 29),
    ('user8', 'user8@example.com', 31),
    ('user9', 'user9@example.com', 26),
    ('user10', 'user10@example.com', 33);

\c "postgres";

CREATE DATABASE  "BlogDb";
\c "BlogDb";


CREATE TABLE IF NOT EXISTS Users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    bio TEXT
);

CREATE TABLE IF NOT EXISTS Posts (
    post_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(user_id) ,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Comments (
    comment_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(user_id) ,
    post_id INTEGER REFERENCES Posts(post_id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Insert dummy data into the Users table with hashed passwords
INSERT INTO Users (email, password, full_name, bio)
VALUES 
    ('user1@example.com', '$2a$10$F6OIyS5M.m34RhrJigLmD.bGAsNGThyVPSu2K8ELu5zsnbJWoC9bi', 'User 1', 'Bio for User 1'),
    ('user2@example.com', '$2a$10$ByrravOzmrSpDBkbCrHGOOPlBVbDah7kIh1EeNjI.6KP2iEOT6eHG', 'User 2', 'Bio for User 2'),
    ('user3@example.com', '$2a$10$YLbXY33iv8Wy.fYaBayqiOiRCqVrp48UrK6Mf3KwVOMvflICMLztm', 'User 3', 'Bio for User 3'),
    ('user4@example.com', '$2a$10$V9IGBos3Pjlw9Uu8BphrX.cA3Ik.zPKFlbEPm/pLCn6Zl7AK7pH5C', 'User 4', 'Bio for User 4'),
    ('user5@example.com', '$2a$10$t4RGHyGlXN8YEHfVn.7KW.jIOwwK1Mdz9keLHS7wRbwpik9thEnLq', 'User 5', 'Bio for User 5'),
    ('user6@example.com', '$2a$10$IWBLobEAc8vDq5eB2.jNje7vhYSaZz5NnS2p4HN/FWQ2v/p2kQfly', 'User 6', 'Bio for User 6'),
    ('user7@example.com', '$2a$10$nyVGaN1yJxvMd7bkQ5NNTOE4oEVlbtsRcfJxHec5euArOqfg09VL.', 'User 7', 'Bio for User 7'),
    ('user8@example.com', '$2a$10$lGVGxGmoZ1pGndIZNOxJ5uXfk4kRWRNfYwUsYhGCCZNjTNcGDZNVO', 'User 8', 'Bio for User 8'),
    ('user9@example.com', '$2a$10$79wJvc4ct47rV/8MnG51HuG/DLQv7bo8e0mvdpTmvg1.E2xLYY3Ja', 'User 9', 'Bio for User 9'),
    ('user10@example.com', '$2a$10$v8UlbdnsfCZxnGkByQDc.OpHogr84Z7uld8IqOj1GfTY.EMop2O2K', 'User 10', 'Bio for User 10');

-- Insert dummy data into the Posts table
INSERT INTO Posts (user_id, title, content)
VALUES
    (1, 'Title 1', 'Content for post 1 by User 1'),
    (2, 'Title 2', 'Content for post 2 by User 2'),
    (3, 'Title 3', 'Content for post 3 by User 1'),
    (1, 'Title 4', 'Content for post 4 by User 1'),
    (4, 'Title 5', 'Content for post 5 by User 4'),
    (5, 'Title 6', 'Content for post 6 by User 5'),
    (6, 'Title 7', 'Content for post 7 by User 6'),
    (7, 'Title 8', 'Content for post 8 by User 7'),
    (8, 'Title 9', 'Content for post 9 by User 8'),
    (9, 'Title 10', 'Content for post 10 by User 9'),
    (2, 'Title 11', 'Content for post 11 by User 2'),
    (3, 'Title 12', 'Content for post 12 by User 3'),
    (4, 'Title 13', 'Content for post 13 by User 4'),
    (5, 'Title 14', 'Content for post 14 by User 5'),
    (6, 'Title 15', 'Content for post 15 by User 6');

-- Insert dummy data into the Comments table
INSERT INTO Comments (user_id, post_id, content)
VALUES
    (1, 1, 'Comment on post 1 by User 1'),
    (2, 1, 'Comment on post 1 by User 2'),
    (3, 2, 'Comment on post 2 by User 3'),
    (2, 2, 'Comment on post 2 by User 2'),
    (4, 3, 'Comment on post 3 by User 4'),
    (1, 3, 'Comment on post 3 by User 1'),
    (6, 4, 'Comment on post 4 by User 6'),
    (1, 4, 'Comment on post 4 by User 1'),
    (8, 5, 'Comment on post 5 by User 8'),
    (1, 5, 'Comment on post 5 by User 1'),
    (2, 3, 'Comment on post 3 by User 2'),
    (3, 4, 'Comment on post 4 by User 3'),
    (4, 5, 'Comment on post 5 by User 4'),
    (5, 6, 'Comment on post 6 by User 5'),
    (6, 1, 'Comment on post 1 by User 6');