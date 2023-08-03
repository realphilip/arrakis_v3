INSERT INTO users(email, password)
VALUES('example@yahoo.com', '12345');

INSERT INTO books(id, book_name)
VALUES(1, 'trading_book_1');

INSERT INTO users_books(user_email, book_id)
VALUES('example@yahoo.com', 1);

INSERT INTO trades_counter_parties (id, bond_holder_name)
VALUES(1, 'AZ Holdings Inc');

INSERT INTO bonds_counter_parties (id, issuer_name)
VALUES(1, 'BNPParibasIssu 4,37% Microsoft Corp (USD)'),
(2, 'Airbus 3.15%  USD'),
(3, 'UBS Facebook (USD)'),
(4, 'Amazon'),
(5, 'HM Treasury United Kingdon'),
(6, 'TEMASEK FINL I LTD GLOBAL MEDIUM TERM NTS BOOK ENTRY REG S'),
(7, 'First Norway Alpha Kl.IV');

INSERT INTO BONDS (isin, type, issuer_id, bond_maturity_date, face_value, bond_currency, coupon_percent, status, cusip) VALUES
('XS1988387210', 'CORP', '1', '2021-08-05', '1000', 'USD', '4.37', 'active', NULL),
('USN0280EAR64', 'CORP', '2', '2021-07-30', '900', 'USD', '3.15', 'active', '123456780'),
('A12356111', 'CORP', '3', '2021-09-30', '900', 'USD', '2', 'active', '123456bh0'),
('USU02320AG12', 'CORP', '4', '2021-08-03', '900', 'USD', '3.15', 'active', 'AMZN 3.15 08/22/27 REGS'),
('GB00B6460505', 'GOVN', '5', '2021-08-09', '900', 'GBP', '0.75', 'active', 'BDCHBW8'),
('US87973RAA86', 'SOVN', '6', '2021-08-06', '690', 'USD', '2.02', 'active', '87973RAA8'),
('IE00B29LNP31', 'SOVN', '7', '2030-12-22', '340', 'USD', '1.123', 'active', '87973RAA8');


INSERT INTO trades (isin, book_name, bond_holder_id, trade_status, unit_price, trade_currency,
trade_type, trade_date, trade_settlement_date, quantity
) VALUES('XS1988387210', 'trading_book_1', 1, 'open', 90, 'USD', 'buy', '2021-05-13', '2021-04-08', 50);





