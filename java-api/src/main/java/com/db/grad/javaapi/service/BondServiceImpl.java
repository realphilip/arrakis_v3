package com.db.grad.javaapi.service;

import com.db.grad.javaapi.model.Bond;
import com.db.grad.javaapi.model.Trade;
import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.repository.BondsRepository;
import com.db.grad.javaapi.repository.BooksRepository;
import com.db.grad.javaapi.repository.TradesRepository;
import com.db.grad.javaapi.repository.UsersRepository;
import com.db.grad.javaapi.service.model.MaturingBondType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class BondServiceImpl implements BondService {
    private final BondsRepository bondsRepository;
    private final TradesRepository tradesRepository;
    private final BooksRepository booksRepository;
    private final UsersRepository usersRepository;
    private final TradeService tradeService;

    @Autowired
    public BondServiceImpl(BondsRepository bondsRepository, TradesRepository tradesRepository, BooksRepository booksRepository, UsersRepository usersRepository, TradeService tradeService) {
        this.bondsRepository = bondsRepository;
        this.tradesRepository = tradesRepository;
        this.booksRepository = booksRepository;
        this.usersRepository = usersRepository;
        this.tradeService = tradeService;
    }


    @Override
    public List<Bond> getAllBonds() {
        return bondsRepository.findAll();
    }

    @Override
    public ResponseEntity<String> triggerBondRedemption(String isin){
        Bond bond = bondsRepository.findById(isin).orElse(null);
        if (bond == null) {
            return ResponseEntity.notFound().build();
        }
        bond.setStatus("redeemed");
        bondsRepository.save(bond);
        return ResponseEntity.ok("Bond redemption triggered.");
    }

    @Override
    public Map<String, Map<String, Integer>> getAllBondsForBusinessDaysBeforeAndAfterOfEmail(String date, int daysBefore, int daysAfter, String email) throws ParseException {
        List<Bond> bonds5BusinessDaysBeforeAndAfter = new ArrayList<>();
        // convert date from String to Date
        Date actualDate = convertStringToDate(date);

        Date startDate = addBusinessDays(actualDate, (-1) * daysBefore);//-5
        Date endDate = addBusinessDays(actualDate, daysAfter);//5
        List<String> emailsAssignedToBond = new ArrayList<>();
        for (Bond bond : bondsRepository.findAll()) {
            for (Trade trade : tradeService.getAllTradesByISIN(bond.getIsin())){
                for(User user : booksRepository.getReferenceById(trade.getBookId()).getUsers()){
                    emailsAssignedToBond.add(user.getEmail());
                }
            }
            if(emailsAssignedToBond.contains(email)) {
                if (bond.getBondMaturityDate().after(startDate) && bond.getBondMaturityDate().before(endDate)) {
                    bonds5BusinessDaysBeforeAndAfter.add(bond);
                }
            }
        }
        Map<String, Map<String, Integer>> maturityDateMap = new HashMap<>();
        for (Bond bond : bonds5BusinessDaysBeforeAndAfter){
            String stringDate = convertDateToString(bond.getBondMaturityDate());
            String type = bond.getType();
            maturityDateMap.putIfAbsent(stringDate, new HashMap<>());
            Map<String, Integer> typeCountMap = maturityDateMap.get(stringDate);
            typeCountMap.put(type, typeCountMap.getOrDefault(type, 0) + 1);
        }
        return maturityDateMap;
    }

    @Override
    public List<Bond> getAllMatureBondsByBondTypeAndDateOfEmail(String bondType, String stringDate, String email) throws ParseException {
        List<Bond> maturingBondsByBondTypeAndDate = new ArrayList<>();
        Date date = convertStringToDate(stringDate);
        List<String> emailsAssignedToBond = new ArrayList<>();

        for (Bond bond : getAllBonds()) {
            for (Trade trade : tradeService.getAllTradesByISIN(bond.getIsin())){
                for(User user : booksRepository.getReferenceById(trade.getBookId()).getUsers()){
                    emailsAssignedToBond.add(user.getEmail());
                }
            }
            if(emailsAssignedToBond.contains(email)) {
                if (bond.getType().equals(bondType) && convertDateToString(bond.getBondMaturityDate()).equals(stringDate)) {
                    maturingBondsByBondTypeAndDate.add(bond);
                }
            }
        }
        return maturingBondsByBondTypeAndDate;
    }



    @Override
    public List<Bond> getAllMatureBondsByBondTypeAndDate(String bondType, String stringDate) throws ParseException {
        List<Bond> maturingBondsByBondTypeAndDate = new ArrayList<>();
        Date date = convertStringToDate(stringDate);

        for (Bond bond : getAllBonds()) {
            if (bond.getType().equals(bondType) && convertDateToString(bond.getBondMaturityDate()).equals(stringDate)) {
                maturingBondsByBondTypeAndDate.add(bond);
            }
        }

        return maturingBondsByBondTypeAndDate;
    }

    @Override
    public Map<String, Map<String, Integer>> getAllBondsForBusinessDaysBeforeAndAfter(String date, int daysBefore, int daysAfter) throws ParseException {
        List<Bond> bonds5BusinessDaysBeforeAndAfter = new ArrayList<>();
        // convert date from String to Date
        Date actualDate = convertStringToDate(date);

        Date startDate = addBusinessDays(actualDate, (-1) * daysBefore);//-5
        Date endDate = addBusinessDays(actualDate, daysAfter);//5

        for (Bond bond : bondsRepository.findAll()) {
            if (bond.getBondMaturityDate().after(startDate) && bond.getBondMaturityDate().before(endDate)) {
                bonds5BusinessDaysBeforeAndAfter.add(bond);
            }
        }
        Map<String, Map<String, Integer>> maturityDateMap = new HashMap<>();
        for (Bond bond : bonds5BusinessDaysBeforeAndAfter){
            String stringDate = convertDateToString(bond.getBondMaturityDate());
            String type = bond.getType();
            maturityDateMap.putIfAbsent(stringDate, new HashMap<>());
            Map<String, Integer> typeCountMap = maturityDateMap.get(stringDate);
            typeCountMap.put(type, typeCountMap.getOrDefault(type, 0) + 1);
        }
        return maturityDateMap;
    }

    private Date convertStringToDate(String date) throws ParseException {//utility class
        String format = "dd-MM-yyyy";
        SimpleDateFormat dateFormat = new SimpleDateFormat(format);
        return dateFormat.parse(date);
    }

    private String convertDateToString(Date date) throws ParseException {//utility class
        String format = "dd-MM-yyyy";
        SimpleDateFormat dateFormat = new SimpleDateFormat(format);
        return dateFormat.format(date);
    }

    private Date addBusinessDays(Date date, int days) {//utility class
        Calendar calendar = Calendar.getInstance(Locale.getDefault());
        calendar.setTime(date);
        int direction = days > 0 ? 1 : -1;

        for (int i = 0; i < Math.abs(days); ) {
            calendar.add(Calendar.DAY_OF_MONTH, direction);
            if (calendar.get(Calendar.DAY_OF_WEEK) != Calendar.SATURDAY && calendar.get(Calendar.DAY_OF_WEEK) != Calendar.SUNDAY) {
                i++;
            }
        }

        return calendar.getTime();
    }
}
