CREATE DATABASE ng_games_db;

USE ng_games_db;

CREATE TABLE game(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200),
    description VARCHAR(300),
    image VARCHAR(900),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE game;