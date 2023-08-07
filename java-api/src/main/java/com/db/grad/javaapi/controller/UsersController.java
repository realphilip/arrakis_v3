package com.db.grad.javaapi.controller;

import com.db.grad.javaapi.service.UserService;
import com.google.api.client.json.webtoken.JsonWebToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;


@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000")
public class UsersController {

    private UserService userService;

    @Autowired
    public UsersController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/users/signin")
    public String signIn(@RequestBody Map<String, String> credentials) throws AuthenticationException {
        return userService.signIn(credentials.get("email"), credentials.get("password"));
    }

    @GetMapping("/users/getuser")
    public String getUser(HttpServletRequest request){
        String token = request.getHeader("Authorization").substring(7);
        String email = userService.getEmailFromToken(token);
        return email;
    }
}
