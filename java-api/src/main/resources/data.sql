INSERT INTO users (email, password) VALUES
('example@yahoo.com', '$2a$10$ySz.fvRKOvjAl/WNFvDpy.WtrPg5U7CwSwtgIJznJ/yP8Uv.KXejK'), -- 12345
('john.smith@db.com', '$2a$10$qAufa7oRGFR898B9l1oZTug1STObKD.6GwohQsir0M/vs0.RUOek2'), -- john1988
('george.michael@db.com', '$2a$10$p205timRgjgZ90Fc3vsZZO4mI8YYzrTr14XnowIcdLT7y/TyOlEXW'), -- george1972
('alice.smith@db.com', '$2a$10$sy/iB2ew.KsnIXe.H3WBK.B5GTsgja00VCqoumCN7tZUl9xUBazoi'), -- alice1978
('astrid.south@db.com', '$2a$10$bqm/LvEUi3rZS2QtDKO1bOQ11s1Sg5vIVsNDwuAEyYEP/OKoO8PN.'); -- astrid2000

INSERT INTO books (id, book_name) VALUES
(1, 'trading_book_1'),
(2, 'trading_book_2'),
(3, 'trading_book_3'),
(4, 'trading_book_4'),
(5, 'Trading_book_6');

INSERT INTO users_books (user_email, book_id) VALUES
('example@yahoo.com', 1),
('example@yahoo.com', 2),
('example@yahoo.com', 3),
('john.smith@db.com', 1),
('george.michael@db.com', 5),
('alice.smith@db.com', 2),
('astrid.south@db.com', 4),
('john.smith@db.com', 2),
('john.smith@db.com', 4),
('george.michael@db.com', 1);


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

INSERT INTO bonds (isin, type, issuer_id, bond_maturity_date, face_value, bond_currency, coupon_percent, status, cusip) VALUES
('XS1988387210', 'CORP', 1, '2021-08-05', 1000, 'USD', 4.37, 'active', NULL),
('USN0280EAR64', 'CORP', 2, '2021-07-30', 900, 'USD', 3.15, 'active', '123456780'),
('A12356111', 'CORP', 3, '2021-09-30', 900, 'USD', 2, 'active', '123456bh0'),
('USU02320AG12', 'CORP', 4, '2021-08-03', 900, 'USD', 3.15, 'active', 'AMZN 3.15 08/22/27 REGS'),
('GB00B6460505', 'GOVN', 5, '2021-08-09', 900, 'GBP', 0.75, 'active', 'BDCHBW8'),
('GB00B6460506', 'GOVN', 5, '2021-08-09', 900, 'GBP', 0.75, 'active', 'BDCHBW8'),
('GB00B6460507', 'GOVN', 5, '2021-08-09', 900, 'GBP', 0.75, 'active', 'BDCHBW8'),
('GB00B6460508', 'GOVN', 5, '2021-08-09', 900, 'GBP', 0.75, 'active', 'BDCHBW8'),
('GB00B6460509', 'GOVN', 5, '2021-08-09', 900, 'GBP', 0.75, 'active', 'BDCHBW8'),
('GB00B6460510', 'GOVN', 5, '2021-08-09', 900, 'GBP', 0.75, 'active', 'BDCHBW8'),
('GB00B6460511', 'GOVN', 5, '2021-08-09', 900, 'GBP', 0.75, 'active', 'BDCHBW8'),
('GB00B6460512', 'GOVN', 5, '2021-08-09', 900, 'GBP', 0.75, 'active', 'BDCHBW8'),
('GB00B6460513', 'GOVN', 5, '2021-08-09', 900, 'GBP', 0.75, 'active', 'BDCHBW8'),
('GB00B6460514', 'GOVN', 5, '2021-08-09', 900, 'GBP', 0.75, 'active', 'BDCHBW8'),
('GB00B6460515', 'GOVN', 5, '2021-08-09', 900, 'GBP', 0.75, 'active', 'BDCHBW8'),
('US87973RAA86', 'SOVN', 6, '2021-08-06', 690, 'USD', 2.02, 'active', '87973RAA8'),
('IE00B29LNP31', 'SOVN', 7, '2030-12-22', 340, 'USD', 1.123, 'active', '87973RAA8');



INSERT INTO trades (id, isin, book_id, bond_holder_id, trade_status, unit_price, trade_currency, trade_type, trade_date, trade_settlement_date, quantity) VALUES
    (1, 'XS1988387210', 1, 1, 'open', 90, 'USD', 'buy', '2021-05-13', '2021-08-04', 50),
(2, 'XS1988387210', 1, 1, 'open', 89.56, 'GBP', 'sell', '2021-02-04', '2021-08-04', 40),
(3, 'USN0280EAR64', 2, 2, 'open', 105.775, 'USD', 'buy', '2021-05-13', '2021-08-23', 1000),
(4, 'USN0280EAR64', 2, 2, 'open', 105.775, 'GBP', 'sell', '2021-02-04', '2021-09-10', 900),
(5, 'A12356111', 3, 4, 'open', 90, 'USD', 'buy', '2021-05-13', '2021-08-23', 50),
(6, 'USN0280EAR64', 2, 3, 'open', 105.775, 'USD', 'buy', '2021-05-13', '2021-08-23', 1000),
(7, 'A12356111', 2, 4, 'open', 90, 'USD', 'sell', '2021-05-13', '2021-08-23', 50),
(8, 'USU02320AG12', 4, 5, 'open', 98.56, 'GBP', 'buy', '2021-02-04', '2021-09-27', 60),
(9, 'USU02320AG12', 4, 5, 'open', 98.56, 'USD', 'buy', '2021-08-23', '2021-08-23', 50),
(10, 'GB00B6460505', 5, 6, 'open', 110.35, 'GBP', 'buy', '2021-09-27', '2021-09-27', 1100),
(11, 'GB00B6460506', 5, 6, 'open', 110.35, 'GBP', 'sell', '2021-09-28', '2021-09-28', 900),
(12, 'GB00B6460507', 5, 7, 'open', 110.35, 'GBP', 'buy', '2021-09-29', '2021-09-29', 2000),
(13, 'GB00B6460508', 5, 7, 'open', 110.35, 'GBP', 'sell', '2021-09-30', '2021-09-30', 2000),
(14, 'GB00B6460509', 5, 8, 'open', 110.35, 'GBP', 'buy', '2021-10-01', '2021-10-01', 1000),
(15, 'GB00B6460510', 5, 8, 'open', 110.35, 'GBP', 'buy', '2019-10-02', '2019-10-02', 900),
(16, 'GB00B6460511', 5, 8, 'open', 110.35, 'GBP', 'sell', '2019-10-03', '2019-10-03', 1900),
(17, 'GB00B6460512', 5, 9, 'open', 110.35, 'GBP', 'buy', '2018-10-04', '2018-10-04', 600),
(18, 'GB00B6460513', 5, 10, 'open', 110.35, 'GBP', 'buy', '2019-10-05', '2019-10-05', 600),
(19, 'GB00B6460514', 5, 10, 'open', 110.35, 'GBP', 'buy', '2021-06-06', '2021-06-06', 700),
(20, 'GB00B6460515', 5, 10, 'open', 110.35, 'GBP', 'sell', '2011-10-07', '2021-10-07', 1300),
(21, 'US87973RAA86', 4, 11, 'open', 100.13, 'USD', 'buy', '2012-02-04', '2021-09-27', 60),
(22, 'US87973RAA86', 4, 11, 'open', 100.13, 'USD', 'buy', '2012-08-23', '2021-08-23', 50),
(23, 'US87973RAA86', 4, 11, 'open', 100.13, 'USD', 'buy', '2013-02-04', '2021-09-27', 75),
(24, 'US87973RAA86', 4, 11, 'open', 100.13, 'USD', 'buy', '2014-08-23', '2021-08-23', 50),
(25, 'IE00B29LNP31', 4, 11, 'open', 98.76, 'USD', 'buy', '2016-02-04', '2021-09-27', 300),
(26, 'IE00B29LNP31', 4, 11, 'open', 98.76, 'USD', 'buy', '2012-08-23', '2021-08-23', 300),
(27, 'IE00B29LNP31', 4, 11, 'open', 98.76, 'USD', 'buy', '2013-02-04', '2021-09-27', 300),
(28, 'IE00B29LNP31', 4, 11, 'open', 98.76, 'USD', 'sell', '2015-08-23', '2021-08-23', 300);
