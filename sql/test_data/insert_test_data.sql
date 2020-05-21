use tsf;

INSERT INTO roles (id, type) VALUES
(1, 'admin'),
(2, 'teacher'),
(3, 'student');

INSERT INTO users (first_name, last_name, role, email, password) VALUES
('John', 'Smith', 1, 'admin@test.com', 'admin'),
('Jane', 'Doe', 2, 'teacher@test.com', 'teacher'),
('Sammy', 'Smith', 3, 'student@test.com', 'student');


INSERT INTO subjects (name, teacher_id, description) VALUES
('Math 101', 2, 'Maths Class'),
('English 203', 2, 'English, 1, 2, 3');

INSERT INTO subs (user_id, subject_id) VALUES
(2, 1),
(2, 2),
(3, 1);