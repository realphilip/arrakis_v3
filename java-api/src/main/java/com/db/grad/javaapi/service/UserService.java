package com.db.grad.javaapi.service;

import com.google.api.client.json.webtoken.JsonWebToken;

import javax.naming.AuthenticationException;

public interface UserService {
    String signIn(String email, String password) throws AuthenticationException;
    boolean validateToken(String token);

    String getEmailFromToken(String token);
}
