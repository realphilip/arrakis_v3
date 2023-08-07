package com.db.grad.javaapi.model;
import com.db.grad.javaapi.repository.BondsRepository;
import com.db.grad.javaapi.repository.TradesRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
public class TradeTest {
    private final TradesRepository tradesRepository;

    @Autowired
    TradeTest(TradesRepository tradesRepository) {
        this.tradesRepository = tradesRepository;
    }


    @Autowired
    private TestEntityManager entityManager;

    @BeforeEach
    public void clearDatabase() {
        tradesRepository.deleteAll();
        entityManager.clear();
        System.out.println(tradesRepository.count()); // h2 config auto initializes some values
    }

    @Test
    public void addTradeAndReturnNumberOfTradesInRepo() {
        long currCount = tradesRepository.count();
        Trade trade = new Trade();
        trade.setId(5);
        trade.setIsin("XS1988387210");
        trade.setBookId(1);
        trade.setBondHolderID(1);
        trade.setStatus("open");
        trade.setUnitPrice(90);
        trade.setTradeCurrency("USD");
        trade.setTradeType("buy");
        Date date = new Date(2023, 01, 01);
        trade.setTradeDate(date);
        trade.setTradeSettlementDate(date);
        trade.setQuantity(50);
        tradesRepository.save(trade);

        long expectedResult = 28;
        assertEquals(expectedResult, tradesRepository.count());
    }

    @Test
    public void addSeveralTradesAndReturnNumberOfBondsInRepo() {
        long currCount = tradesRepository.count();
        Trade trade = new Trade();
        trade.setId(5);
        trade.setIsin("XS1988387210");
        trade.setBookId(1);
        trade.setBondHolderID(1);
        trade.setStatus("open");
        trade.setUnitPrice(90);
        trade.setTradeCurrency("USD");
        trade.setTradeType("buy");
        Date date = new Date(2023,01,01);
        trade.setTradeDate(date);
        trade.setTradeSettlementDate(date);
        trade.setQuantity(50);
        tradesRepository.save(trade);

        Trade trade1 = new Trade();
        trade1.setId(4);
        trade1.setIsin("XS1988387210");
        trade1.setBookId(1);
        trade1.setBondHolderID(1);
        trade1.setStatus("open");
        trade1.setUnitPrice(100);
        trade1.setTradeCurrency("USD");
        trade1.setTradeType("buy");
        trade1.setTradeDate(date);
        trade1.setTradeSettlementDate(date);
        trade1.setQuantity(50);
        tradesRepository.save(trade1);

        Trade trade2 = new Trade();
        trade2.setId(3);
        trade2.setIsin("XS1988387210");
        trade2.setBookId(1);
        trade2.setBondHolderID(1);
        trade2.setStatus("open");
        trade2.setUnitPrice(100);
        trade2.setTradeCurrency("USD");
        trade2.setTradeType("buy");
        trade2.setTradeDate(date);
        trade2.setTradeSettlementDate(date);
        trade2.setQuantity(50);
        tradesRepository.save(trade2);

        long expectedResult = 28;
        assertEquals(expectedResult, tradesRepository.count());
    }

    @Test
    public void findTradeByValidId(){
        Date date = new Date(2023, 01, 01);
        Trade trade1 = new Trade();
        trade1.setId(1);
        trade1.setIsin("XS1988387210");
        trade1.setBookId(1);
        trade1.setBondHolderID(4);
        trade1.setStatus("open");
        trade1.setUnitPrice(100);
        trade1.setTradeCurrency("USD");
        trade1.setTradeType("buy");
        trade1.setTradeDate(date);
        trade1.setTradeSettlementDate(date);
        trade1.setQuantity(533);
        tradesRepository.save(trade1);

        assertEquals(trade1.getQuantity(), tradesRepository.getReferenceById(1).getQuantity());
    }
}
