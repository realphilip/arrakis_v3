package com.db.grad.javaapi.service;

import com.db.grad.javaapi.model.Bond;
import com.db.grad.javaapi.model.Book;
import com.db.grad.javaapi.model.Trade;
import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.repository.BondsRepository;
import com.db.grad.javaapi.repository.BooksRepository;
import com.db.grad.javaapi.repository.TradesRepository;
import com.db.grad.javaapi.repository.UsersRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedConstruction;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.util.ReflectionTestUtils;

import java.text.ParseException;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class BondServiceTest {

    @InjectMocks
    private BondServiceImpl bondService;

    @Mock
    private BondsRepository bondsRepository;

    @Mock
    private UsersRepository usersRepository;

    @Mock
    private TradesRepository tradesRepository;

    @Mock
    private BooksRepository booksRepository;

    @Mock
    private TradeServiceImpl tradeService;

    @Test
    public void getBondsDueForMaturityPeriodByEmail() throws ParseException {

        Bond bond = new Bond();
        bond.setIsin("ISIN1");
        bond.setType("CORP");
        bond.setIssuerID(1);
        Date date = new GregorianCalendar(2023, Calendar.AUGUST, 17).getTime();
        bond.setBondMaturityDate(date);
        bond.setFaceValue(1000);
        bond.setBondCurrency("USD");
        bond.setStatus("active");
        bond.setCusip("CUSIP1");
        Mockito.when(bondsRepository.save(bond)).thenReturn(bond);
        bondsRepository.save(bond);

        Bond bond2 = new Bond();
        bond2.setIsin("ISIN2");
        bond2.setType("GOVN");
        bond2.setIssuerID(1);
        Date date2 = new GregorianCalendar(2023, Calendar.AUGUST, 11).getTime();
        bond2.setBondMaturityDate(date2);
        bond2.setFaceValue(340);
        bond2.setBondCurrency("GBP");
        bond2.setStatus("active");
        bond2.setCusip("CUSIP2");
        Mockito.when(bondsRepository.save(bond2)).thenReturn(bond2);
        bondsRepository.save(bond2);

        Bond bond3 = new Bond();
        bond3.setIsin("ISIN3");
        bond3.setType("SOVN");
        bond3.setIssuerID(1);
        Date date3 = new GregorianCalendar(2023, Calendar.MAY, 15).getTime();
        bond3.setBondMaturityDate(date3);
        bond3.setFaceValue(690);
        bond3.setBondCurrency("USD");
        bond3.setStatus("active");
        bond3.setCusip("CUSIP3");
        Mockito.when(bondsRepository.save(bond3)).thenReturn(bond3);
        bondsRepository.save(bond3);

        Bond bond4 = new Bond();
        bond4.setIsin("ISIN3");
        bond4.setType("SOVN");
        bond4.setIssuerID(1);
        Date date4 = new GregorianCalendar(2023, Calendar.MAY, 16).getTime();
        bond4.setBondMaturityDate(date4);
        bond4.setFaceValue(690);
        bond4.setBondCurrency("USD");
        bond4.setStatus("active");
        bond4.setCusip("CUSIP3");
        Mockito.when(bondsRepository.save(bond4)).thenReturn(bond4);
        bondsRepository.save(bond4);

        Mockito.when(bondsRepository.findAll()).thenReturn(Arrays.asList(bond, bond2, bond3, bond4));

        // add users
        User user1 = new User();
        user1.setEmail("anca@gmail.com");
        user1.setPassword("12345");

        User user2 = new User();
        user2.setEmail("maria@gmail.com");
        user2.setPassword("12345");

        // create books
        Book book1 = new Book();
        book1.setId(1);
        book1.setBookName("book1");
        Set<User> listOfUsers = new HashSet<>();
        listOfUsers.add(user1);
        book1.setUsers(listOfUsers);
        Set<Book> user1Books = new HashSet<>();
        user1Books.add(book1);
        user1.setBooks(user1Books);

        Book book2 = new Book();
        book2.setId(2);
        book2.setBookName("book2");
        Set<User> listOfUsers1 = new HashSet<>();
        listOfUsers1.add(user2);
        book2.setUsers(listOfUsers1);
        Set<Book> user2Books = new HashSet<>();
        user2Books.add(book2);
        user2.setBooks(user2Books);


        // add trades

        Date date1 = new GregorianCalendar(2023, Calendar.AUGUST, 11).getTime();

        Trade trade1 = new Trade();
        trade1.setId(3);
        trade1.setIsin("ABCD");
        trade1.setBookId(1);
        trade1.setBondHolderID(1);
        trade1.setStatus("open");
        trade1.setUnitPrice(100);
        trade1.setTradeCurrency("USD");
        trade1.setTradeType("buy");
        trade1.setTradeDate(date1);
        trade1.setTradeSettlementDate(date1);
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
        trade2.setTradeDate(date1);
        trade2.setTradeSettlementDate(date1);
        trade2.setQuantity(60);
        Mockito.when(tradesRepository.save(trade2)).thenReturn(trade2);
        tradesRepository.save(trade2);

        List <Trade> abcdTrades = new ArrayList<>();
        abcdTrades.add(trade1);
        abcdTrades.add(trade2);

        Trade trade3 = new Trade();
        trade3.setId(5);
        trade3.setIsin("MNOP");
        trade3.setBookId(2);
        trade3.setBondHolderID(2);
        trade3.setStatus("open");
        trade3.setUnitPrice(110);
        trade3.setTradeCurrency("GBP");
        trade3.setTradeType("sell");
        trade3.setTradeDate(date1);
        trade3.setTradeSettlementDate(date1);
        trade3.setQuantity(20);
        Mockito.when(tradesRepository.save(trade3)).thenReturn(trade3);
        tradesRepository.save(trade3);

        List <Trade> mnopTrades = new ArrayList<>();
        mnopTrades.add(trade3);

        TradeServiceImpl tradeServiceMock = Mockito.mock(TradeServiceImpl.class);
        ReflectionTestUtils.setField(bondService, "tradeService", tradeServiceMock);

        Mockito.when(tradesRepository.findAll()).thenReturn(Arrays.asList(trade1, trade2, trade3));

        Mockito.when(tradeService.getAllTradesByISIN("MNOP")).thenReturn(Arrays.asList(trade3));
        Mockito.when(tradeService.getAllTradesByISIN("ABCD")).thenReturn(Arrays.asList(trade1, trade2));

        Mockito.when(booksRepository.getReferenceById(1)).thenReturn(book1);
        Mockito.when(booksRepository.getReferenceById(2)).thenReturn(book2);

        Map<String, Map<String, Integer>> expectedMap = new HashMap<>();
        Map<String, Integer> date3Map = new HashMap<>();
        date3Map.put("CORP", 1);
        expectedMap.put("17-08-2023", date3Map);
        Map<String, Integer> date4Map = new HashMap<>();
        date4Map.put("GOVN", 1);
        expectedMap.put("11-08-2023", date4Map);
        for(User user : booksRepository.getReferenceById(trade1.getBookId()).getUsers()){
            System.out.println(user.getEmail());
        }

        Map<String, Map<String, Integer>> maturityBonds = bondService.getAllBondsForBusinessDaysBeforeAndAfterOfEmail("17-08-2023", 5, 5, "anca@gmail.com");
        assertEquals(expectedMap, maturityBonds);
    }

}
