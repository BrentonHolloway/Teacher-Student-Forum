use tsf;

CREATE TABLE IF NOT EXISTS subjects
(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(128) NOT NULL,
    teacher_id int NOT NULL,
    description varchar(256),

    PRIMARY KEY (id),
    FOREIGN KEY (teacher_id) REFERENCES users(id)
);
