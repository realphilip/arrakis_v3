package com.db.grad.javaapi.controller;

import com.db.grad.javaapi.exception.ResourceNotFoundException;
import com.db.grad.javaapi.model.Bond;
import com.db.grad.javaapi.service.BondService;
import com.db.grad.javaapi.service.BondServiceImpl;
import com.db.grad.javaapi.service.UserService;
import com.db.grad.javaapi.service.model.MaturingBondType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000")
public class BondsController {
    private BondService bondService;
    private UserService userService;


    @Autowired
    public BondsController(UserService userService, BondService bondService) {
        this.bondService = bondService;
        this.userService = userService;
    }

    @GetMapping("/bonds")
    public List<Bond> getAllBonds(){
        return bondService.getAllBonds();
    }

    @GetMapping(value = {"/bonds/dates/{date}/{daysBefore}/{daysAfter}"})
    public Map<String, Map<String, Integer>> getNoOfBondsForBusinessDaysBeforeAndAfterOfType(@PathVariable(value = "date") String date,
                                                                                         @PathVariable(value = "daysBefore") int daysBefore,
                                                                                         @PathVariable(value = "daysAfter") int daysAfter) throws ParseException {
        return bondService.getAllBondsForBusinessDaysBeforeAndAfter(date, daysBefore, daysAfter);
    }



    @GetMapping(value = {"/bonds/bondType/{bondType}/date/{date}"})
    public List<Bond> getMaturedBondsByBondTypeAndDate(@PathVariable(value = "bondType") String bondType, @PathVariable(value = "date") String date) throws ParseException {

        return bondService.getAllMatureBondsByBondTypeAndDate(bondType, date);
    }

    @GetMapping(value = {"/bonds/email/dates/{date}/{daysBefore}/{daysAfter}"})
    public Map<String, Map<String, Integer>> getNoOfBondsForBusinessDaysBeforeAndAfterOfTypeOfEmail(HttpServletRequest request,
                                                                                                    @PathVariable(value = "date") String date,
                                                                                                    @PathVariable(value = "daysBefore") int daysBefore,
                                                                                                    @PathVariable(value = "daysAfter") int daysAfter) throws ParseException {
        String token = request.getHeader("Authorization").substring(7);
        String email = userService.getEmailFromToken(token);
        return bondService.getAllBondsForBusinessDaysBeforeAndAfterOfEmail(date, daysBefore, daysAfter, email);
    }

    @GetMapping(value = {"/bonds/email/bondType/{bondType}/date/{date}"})
    public List<Bond> getMaturedBondsByBondTypeAndDateOfEmail(HttpServletRequest request,
                                                              @PathVariable(value = "bondType") String bondType,
                                                              @PathVariable(value = "date") String date) throws ParseException {
        String token = request.getHeader("Authorization").substring(7);
        String email = userService.getEmailFromToken(token);
        return bondService.getAllMatureBondsByBondTypeAndDateOfEmail(bondType, date, email);
    }

    @PatchMapping("/bonds/redemption/{isin}")
    public ResponseEntity<String> triggerBondRedemption(@PathVariable("isin") String isin){
        return bondService.triggerBondRedemption(isin);
    }

    @GetMapping(value = {"/bonds/urgent/dates/{date}/{daysBefore}/{daysAfter}"})
    public List<String> getIsinsOfUrgentUnredeemedBonds(@PathVariable(value = "date") String date,
                                                                                             @PathVariable(value = "daysBefore") int daysBefore,
                                                                                             @PathVariable(value = "daysAfter") int daysAfter) throws ParseException {
        return bondService.getIsinsOfUrgentUnredeemedBonds(date, daysBefore, daysAfter);
    }

    @GetMapping(value = {"/bonds/getbyisin/{isin}"})
    public Bond getBondByIsin(@PathVariable("isin") String isin){
        return bondService.getBondByIsin(isin);
    }




//    @PostMapping("/dogs")
//    public Dog createDog(@Valid @RequestBody Dog dog) {
//        return dogsService.addDog(dog);
//    }
//
//    @PutMapping("/dogs/{id}")
//    public ResponseEntity< Dog > updateDog(@PathVariable(value = "id") Long id,
//                                           @Valid @RequestBody Dog dogDetails) throws ResourceNotFoundException {
//
//        final Dog updatedDogs = dogsService.updateDogDetails(dogDetails);
//        return ResponseEntity.ok(updatedDogs);
//    }
//
//    @DeleteMapping("/dogs/{id}")
//    public Map< String, Boolean > deleteDog(@PathVariable(value = "id") Long id)
//            throws ResourceNotFoundException {
//        boolean removed = dogsService.removeDog(id);
//
//        Map < String, Boolean > response = new HashMap<>();
//        if( removed )
//            response.put("deleted", Boolean.TRUE);
//        else
//            response.put("deleted", Boolean.FALSE);
//
//        return response;
//    }

}
