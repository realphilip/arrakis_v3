DROP TABLE IF EXISTS trades_counter_parties;
DROP TABLE IF EXISTS bonds_counter_parties;
DROP TABLE IF EXISTS trades;
DROP TABLE IF EXISTS bonds;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users_books;

CREATE TABLE users (
    email VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL,
    PRIMARY KEY (email)
);

CREATE TABLE books (
    id INT NOT NULL,
    book_name VARCHAR(250) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users_books (
    user_email VARCHAR(250) REFERENCES users(email),
    book_id INT REFERENCES books(id),
    PRIMARY KEY (user_email, book_id)
);

CREATE TABLE trades_counter_parties (
    id INT NOT NULL,
    bond_holder_name VARCHAR(250) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE bonds_counter_parties (
    id INT NOT NULL,
    issuer_name VARCHAR(250) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE bonds (
    isin VARCHAR(250) NOT NULL,
    type VARCHAR(250) NOT NULL,
    issuer_id INT NOT NULL,
    bond_maturity_date DATE NOT NULL,
    face_value INT NOT NULL,
    bond_currency VARCHAR(10) NOT NULL,
    coupon_percent FLOAT NOT NULL,
    status VARCHAR(100) NOT NULL,
    cusip VARCHAR(100),
    PRIMARY KEY (isin),
    FOREIGN KEY (issuer_id) REFERENCES bonds_counter_parties(id)
);


CREATE TABLE trades (
    isin VARCHAR(250) NOT NULL,
    book_name VARCHAR(250) NOT NULL,
    bond_holder_id INT NOT NULL,
    trade_status VARCHAR(20) NOT NULL,
    unit_price FLOAT NOT NULL,
    trade_currency VARCHAR(10) NOT NULL,
    trade_type VARCHAR(10) NOT NULL,
    trade_date DATE NOT NULL,
    trade_settlement_date DATE NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (isin),
    FOREIGN KEY (bond_holder_id) REFERENCES trades_counter_parties(id)
);

