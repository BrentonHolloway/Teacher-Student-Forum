use tsf;

CREATE TABLE IF NOT EXISTS messages
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    forum_id int NOT NULL,
    message varchar(256) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (forum_id) REFERENCES forums(id)
        ON DELETE CASCADE
);