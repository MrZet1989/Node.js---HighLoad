CREATE TABLE IF NOT EXISTS users
(
    id SERIAL PRIMARY KEY,
    balance INT NOT NULL
);

INSERT INTO users (balance) VALUES (10000);
