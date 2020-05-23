use tsf;

CREATE TABLE IF NOT EXISTS roles
(
    id int NOT NULL AUTO_INCREMENT,
    type varchar(25) NOT NULL UNIQUE,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users
(
    id int NOT NULL AUTO_INCREMENT,
    first_name varchar(25) NOT NULL,
    last_name varchar(25) NOT NULL,
    role int NOT NULL,
    email varchar(25) NOT NULL UNIQUE,
    password char(255) NOT NULL,
    profile varchar(128) NOT NULL DEFAULT 'default.png',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    FOREIGN KEY (role) REFERENCES roles(id)
);

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

CREATE TABLE IF NOT EXISTS subs
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    subject_id int NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

CREATE TABLE IF NOT EXISTS forums
(
    id int NOT NULL AUTO_INCREMENT,
    subject_id int NOT NULL,
    name varchar(128) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);