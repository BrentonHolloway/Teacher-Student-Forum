use tsf;

CREATE TABLE IF NOT EXISTS roles
(
    id int NOT NULL AUTO_INCREMENT,
    type varchar(25) NOT NULL UNIQUE,

    PRIMARY KEY (id)
);