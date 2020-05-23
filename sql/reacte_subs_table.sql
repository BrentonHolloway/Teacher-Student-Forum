use tsf;

CREATE TABLE IF NOT EXISTS subs
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    subject_id int NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
        ON DELETE CASCADE,
    CONSTRAINT subscription UNIQUE(user_id, subject_id)
);