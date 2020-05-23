use tsf;

CREATE TABLE IF NOT EXISTS subjects
(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(128) NOT NULL,
    teacher_id int NOT NULL,
    description varchar(256),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    FOREIGN KEY (teacher_id) REFERENCES users(id)
);
