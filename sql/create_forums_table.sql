use tsf;

CREATE TABLE IF NOT EXISTS forums
(
    id int NOT NULL AUTO_INCREMENT,
    subject_id int NOT NULL,
    name varchar(128) NOT NULL,
    description varchar(256),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,


    PRIMARY KEY (id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
        ON DELETE CASCADE
);