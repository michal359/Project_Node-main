CREATE DATABASE IF NOT EXISTS postDB;
USE postDB;

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS passwords;
DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS users;


create table users ( 
  id INT auto_increment PRIMARY KEY,
  name varchar(255),
  username varchar(255),
  email varchar(255),
  phone varchar(255)
);

create table addresses ( 
  id INT NOT NULL PRIMARY KEY,
  street varchar(255),
  city varchar(255),
  FOREIGN KEY (id) REFERENCES users (id)
);

create table passwords ( 
  id INT NOT NULL PRIMARY KEY,
  password varchar(8),
  FOREIGN KEY (id) REFERENCES users (id)
);

create table posts (
  user_id INT NOT NULL,
  id INT auto_increment PRIMARY KEY,
  title varchar(255),
  body varchar(255),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

create table todos (
  user_id INT NOT NULL,
  id INT auto_increment PRIMARY KEY,
  title varchar(255),
  completed bool,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

create table comments (
  post_id INT NOT NULL,
  id INT auto_increment PRIMARY KEY,
  name varchar(255),
  email varchar(255),
  body varchar(255),
  FOREIGN KEY (post_id) REFERENCES posts (id)
);

create table albums (
  user_id INT NOT NULL,
  id INT auto_increment PRIMARY KEY,
  title varchar(255),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

create table photos (
  album_id INT NOT NULL,
  id INT auto_increment PRIMARY KEY,
  title varchar(255),
  url varchar(255),
  thumbnailUrl varchar(255),
  FOREIGN KEY (album_id) REFERENCES albums (id)
);

INSERT INTO users (name, username, email, phone) VALUES
('Emily Cohen', 'emilyc', 'emily@example.com', '555-2468'),
('James Rodriguez', 'jamesr', 'james@example.com', '555-1357'),
('Sara Tompson', 'saraht', 'sarah@example.com', '555-8024'),
('Daniel Garcia', 'danield', 'daniel@example.com', '555-6743'),
('Lily Martinez', 'lilym', 'lily@example.com','555-9432'),
('Emily Davis', 'emilyd', 'emily@example.com',  '555-2345'),
('Daniel Martinez', 'danm', 'daniel@example.com', '555-6789'),
('Olivia Wilson', 'oliviaw', 'olivia@example.com', '555-0123'),
('William Taylor', 'willt', 'william@example.com', '555-4567'),
('Sophia Anderson', 'sophiaa', 'sophia@example.com', '555-8901');

INSERT INTO addresses (id, street, city) VALUES
(1, '234 Oak St', 'Seattle'),
(2, '234 Oak St', 'Seattle'),
(3, '234 Oak St', 'Seattle'),
(4, '234 Oak St', 'Seattle'),
(5, '234 Oak St', 'Seattle'),
(6, '234 Oak St', 'Seattle'),
(7, '234 Oak St', 'Seattle'),
(8, '234 Oak St', 'Seattle'),
(9, '234 Oak St', 'Seattle'),
(10, '234 Oak St', 'Seattle');

INSERT INTO posts (user_id, title, body) VALUES
(1, 'First Post', 'This is the first post.'),
(2, 'Second Post', 'This is the second post.'),
(3, 'Third Post', 'This is the third post.'),
(4, 'Fourth Post', 'This is the fourth post.'),
(5, 'Fifth Post', 'This is the fifth post.'),
(6, 'Sixth Post', 'This is the sixth post.'),
(7, 'Seventh Post', 'This is the seventh post.'),
(8, 'Eighth Post', 'This is the eighth post.'),
(9, 'Ninth Post', 'This is the ninth post.'),
(10, 'Tenth Post', 'This is the tenth post.');

INSERT INTO todos (user_id, title, completed) VALUES
(1, "Walk the dog", false),
(1, "homework", false),
(1, "project", true),
(2, "Call mom", false),
(3, "Water the plants", false),
(4, "Pick up medication", false),
(5, "Write a thank-you note", false),
(6, 'Walk the dog', true),
(7, 'Water the plants', false),
(8, 'Call mom', false),
(9, 'Finish report', true),
(10, 'Exercise', true);

INSERT INTO albums (user_id, title) VALUES
(1, 'Vacation 2023'),
(2, 'Family Reunion'),
(3, 'Graduation Party'),
(4, 'Birthday Celebration'),
(5, 'Road Trip'),
(6, 'Beach Day'),
(7, 'Hiking Adventure'),
(8, 'Cityscape Views'),
(9, 'Foodie Delights'),
(10, 'Fitness Journey');

INSERT INTO photos (album_id, title, url, thumbnailUrl) VALUES
(1, 'Beach Sunset', 'https://example.com/photo1.jpg', 'https://example.com/thumb1.jpg'),
(1, 'Mountain View', 'https://example.com/photo2.jpg', 'https://example.com/thumb2.jpg'),
(2, 'Family Portrait', 'https://example.com/photo3.jpg', 'https://example.com/thumb3.jpg'),
(2, 'Kids Playing', 'https://example.com/photo4.jpg', 'https://example.com/thumb4.jpg'),
(3, 'Graduation Ceremony', 'https://example.com/photo5.jpg', 'https://example.com/thumb5.jpg'),
(4, 'Birthday Cake', 'https://example.com/photo6.jpg', 'https://example.com/thumb6.jpg'),
(5, 'Scenic Route', 'https://example.com/photo7.jpg', 'https://example.com/thumb7.jpg'),
(6, 'Dog on the Beach', 'https://example.com/photo8.jpg', 'https://example.com/thumb8.jpg'),
(7, 'Mountain Summit', 'https://example.com/photo9.jpg', 'https://example.com/thumb9.jpg'),
(8, 'City Skyline', 'https://example.com/photo10.jpg', 'https://example.com/thumb10.jpg');

INSERT INTO comments (post_id, name, email, body) VALUES
(1, 'Alice', 'alice@example.com', 'Great post!'),
(1, 'Bob', 'bob@example.com', 'I agree with Alice.'),
(2, 'Charlie', 'charlie@example.com', 'Interesting perspective.'),
(2, 'David', 'david@example.com', 'Looking forward to more posts.'),
(3, 'Eve', 'eve@example.com', 'This post inspired me.'),
(4, 'Frank', 'frank@example.com', 'Nice one!'),
(4, 'Gina', 'gina@example.com', 'I enjoyed reading this.'),
(5, 'Henry', 'henry@example.com', 'Well said!'),
(5, 'Ivy', 'ivy@example.com', 'I resonate with this.'),
(6, 'Jack', 'jack@example.com', 'Keep it up!');

INSERT INTO passwords (id, password) VALUES
(1, 'password'),
(2, 'qwerty'),
(3, 'abc123'),
(4, 'letmein'),
(5, 'password'),
(6, 'securepa'),
(7, 'mypasswo'),
(8, 'password'),
(9, 'p@ssw0rd'),
(10, 'password');
