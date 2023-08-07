INSERT INTO users(email, password)
VALUES('example@yahoo.com', '$2a$10$b3XX3Of4U/Fy6Khq6CxBZ.ls2OTXh0Gj/mKqpvP/5PDYwssVdoZu.');

INSERT INTO books(id, book_name)
VALUES(1, 'trading_book_1');

INSERT INTO users_books(user_email, book_id)
VALUES('example@yahoo.com', 1);

INSERT INTO trades_counter_parties (id, bond_holder_name)
VALUES(1, 'AZ Holdings Inc'),
(2, 'Acme Co'),
(3, 'Astra Trading Ltd'),
(4, 'Sovereign Investments'),
(5, 'Muncipal Gov Of Orange County'),
(6, 'Goldman Sachs'),
(7, 'UBS'),
(8, 'Barclays'),
(9, 'British Telecom'),
(10, 'Pension Holdings'),
(11, 'Zurich Pension fund 4');

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


INSERT INTO trades (id, isin, book_id, bond_holder_id, trade_status, unit_price, trade_currency,
trade_type, trade_date, trade_settlement_date, quantity) VALUES
(1, 'XS1988387210', 1, 1, 'open', 90, 'USD', 'buy', '2021-05-13', '2021-04-08', 50),
(2, 'XS1988387210', 1,	1, 'open',	89.56,	'GBP', 'sell',	'2021-02-04', '2021-08-04',	40);







