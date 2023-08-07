package com.db.grad.javaapi.service;

import com.db.grad.javaapi.model.Book;
import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.repository.BondsCounterPartiesRepository;
import com.db.grad.javaapi.repository.UsersRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.naming.AuthenticationException;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UsersRepository usersRepository;

    @Test
    public void userSignInValidCredentialsShouldReturnToken() throws AuthenticationException {
        String email = "example@gmail.com";
        String password = "12345";

        User user = new User();
        user.setEmail(email);
        // decrypted password : 12345
        user.setPassword("$2a$10$JII15h0E0KlZ9DbTRTieBeXj3KyOi/7qcr6eDdiE8LOPrQ4kmoBB6");
        Mockito.when(usersRepository.findById(email)).thenReturn(Optional.of(user));

        String token = userService.signIn(email, password);

        assertNotNull(token);
    }

    @Test
    public void userSignInInvalidCredentialsShouldThrowAuthenticationException() {
        String email = "example@gmail.com";
        String password = "wrong_password";

        User user = new User();
        user.setEmail(email);
        // decrypted password : 12345
        user.setPassword("$2a$10$JII15h0E0KlZ9DbTRTieBeXj3KyOi/7qcr6eDdiE8LOPrQ4kmoBB6");
        Mockito.when(usersRepository.findById(email)).thenReturn(Optional.of(user));

        assertThrows(AuthenticationException.class, () -> {
            userService.signIn(email, password);
        });
    }

    @Test
    public void userSignInUserNotFoundShouldThrowAuthenticationException() {
        String email = "example@gmail.com";
        String password = "12345";

        Mockito.when(usersRepository.findById(email)).thenReturn(Optional.empty());

        assertThrows(AuthenticationException.class, () -> {
            userService.signIn(email, password);
        });
    }
}
