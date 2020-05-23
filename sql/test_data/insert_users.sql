use tsf;

INSERT INTO users (first_name, last_name, role, email, password)
VALUES ('John', 'Smith', 1, 'admin@test.com', 'admin');

INSERT INTO users (first_name, last_name, role, email, password)
VALUES ('Jane', 'Doe', 2, 'teacher@test.com', 'teacher');

INSERT INTO users (first_name, last_name, role, email, password)
VALUES ('Sammy', 'Smith', 3, 'student@test.com', 'student');

SELECT * FROM users;