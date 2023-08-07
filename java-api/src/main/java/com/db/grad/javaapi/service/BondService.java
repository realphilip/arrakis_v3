package com.db.grad.javaapi.service;

import com.db.grad.javaapi.model.Bond;
import com.db.grad.javaapi.service.model.MaturingBondType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface BondService {
    List<Bond> getAllBonds();

    Map<String, Map<String, Integer>> getAllBondsForBusinessDaysBeforeAndAfter(String date, int daysBefore, int daysAfter) throws ParseException;

    List<Bond> getAllMatureBondsByBondTypeAndDate(String bondType, String date) throws ParseException;

    Map<String, Map<String, Integer>> getAllBondsForBusinessDaysBeforeAndAfterOfEmail(String date, int daysBefore, int daysAfter, String email) throws ParseException;

    List<Bond> getAllMatureBondsByBondTypeAndDateOfEmail(String bondType, String date, String email) throws ParseException;

    ResponseEntity<String> triggerBondRedemption(String isin);

    List<String> getIsinsOfUrgentUnredeemedBonds(String date,int daysBefore, int daysAfter) throws ParseException;

    Bond getBondByIsin(String isin);



//    Bond getBondByDate(Date date);
//
//
//
//    boolean removeBond(String isin);
//
//    Bond getBondById(String isin);
//
//
//    Bond updateBond(Bond bond);
//
//    Bond addBond(Bond bond);
//
//    int getNoOfBonds();
    //TODO: Implement new methods here




}
