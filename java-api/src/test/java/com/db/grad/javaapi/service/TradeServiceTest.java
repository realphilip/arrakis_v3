package com.db.grad.javaapi.service;

import com.db.grad.javaapi.model.Trade;
import com.db.grad.javaapi.repository.TradesRepository;
import com.db.grad.javaapi.utils.Triple;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class TradeServiceTest {

    @InjectMocks
    private TradeServiceImpl tradeService;

    @Mock
    private TradesCounterPartyServiceImpl tradesCounterPartyService;

    @Mock
    private TradesRepository tradesRepository;

    @Test
    public void testGetAllTradesByISIN() {
        String isinToFind = "ISIN2";

        List<Trade> testTrades = new ArrayList<>();

        Trade trade1 = new Trade();
        trade1.setIsin("ISIN1");
        testTrades.add(trade1);

        Trade trade2 = new Trade();
        trade2.setIsin("ISIN2"); // Trade with the ISIN to find
        testTrades.add(trade2);

        Trade trade3 = new Trade();
        trade3.setIsin("ISIN3");
        testTrades.add(trade3);

        Mockito.when(tradesRepository.findAll()).thenReturn(testTrades);

        List<Trade> resultTrades = tradeService.getAllTradesByISIN(isinToFind);

        assertEquals(1, resultTrades.size());
        assertEquals(trade2, resultTrades.get(0));
    }

    @Test
    public void getStatsFromTrades() {


        Date date = new GregorianCalendar(2023, Calendar.AUGUST, 11).getTime();

        Trade trade1 = new Trade();
        trade1.setId(3);
        trade1.setIsin("ABCD");
        trade1.setBookId(1);
        trade1.setBondHolderID(1);
        trade1.setStatus("open");
        trade1.setUnitPrice(100);
        trade1.setTradeCurrency("USD");
        trade1.setTradeType("buy");
        trade1.setTradeDate(date);
        trade1.setTradeSettlementDate(date);
        trade1.setQuantity(45);
        Mockito.when(tradesRepository.save(trade1)).thenReturn(trade1);
        tradesRepository.save(trade1);

        Trade trade2 = new Trade();
        trade2.setId(4);
        trade2.setIsin("ABCD");
        trade2.setBookId(1);
        trade2.setBondHolderID(1);
        trade2.setStatus("open");
        trade2.setUnitPrice(150);
        trade2.setTradeCurrency("GBP");
        trade2.setTradeType("sell");
        trade2.setTradeDate(date);
        trade2.setTradeSettlementDate(date);
        trade2.setQuantity(60);
        Mockito.when(tradesRepository.save(trade2)).thenReturn(trade2);
        tradesRepository.save(trade2);

        Trade trade3 = new Trade();
        trade3.setId(5);
        trade3.setIsin("MNOP");
        trade3.setBookId(2);
        trade3.setBondHolderID(2);
        trade3.setStatus("open");
        trade3.setUnitPrice(110);
        trade3.setTradeCurrency("GBP");
        trade3.setTradeType("sell");
        trade3.setTradeDate(date);
        trade3.setTradeSettlementDate(date);
        trade3.setQuantity(20);
        Mockito.when(tradesRepository.save(trade3)).thenReturn(trade3);
        tradesRepository.save(trade3);

        Trade trade4 = new Trade();
        trade3.setId(6);
        trade3.setIsin("PQRT");
        trade3.setBookId(2);
        trade3.setBondHolderID(1);
        trade3.setStatus("open");
        trade3.setUnitPrice(50);
        trade3.setTradeCurrency("USD");
        trade3.setTradeType("sell");
        trade3.setTradeDate(date);
        trade3.setTradeSettlementDate(date);
        trade3.setQuantity(10);
        Mockito.when(tradesRepository.save(trade4)).thenReturn(trade4);
        tradesRepository.save(trade4);

        Mockito.when(tradesRepository.findAll()).thenReturn(Arrays.asList(trade1, trade2, trade3, trade4));
        Triple<String, Integer, Double> expectedTradesStats = new Triple<>("AZ Holdings Inc", 2, 17330.0);

        Mockito.when(tradesCounterPartyService.getBondHolderNameByID(1)).thenReturn("AZ Holdings Inc");

        Triple<String, Integer, Double> actualTradesStats = tradeService.getStatsByBondHolderID(1);

        assertEquals(expectedTradesStats.getBondHolderName(), actualTradesStats.getBondHolderName());
        assertEquals(expectedTradesStats.getBondHolderNumberOfBonds(), actualTradesStats.getBondHolderNumberOfBonds());
        assertEquals(expectedTradesStats.getBondHolderCurrentPosition(), actualTradesStats.getBondHolderCurrentPosition());
    }
}
