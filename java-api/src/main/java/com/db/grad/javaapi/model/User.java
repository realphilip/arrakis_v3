package com.db.grad.javaapi.model;

import javax.persistence.*;
import java.awt.print.Book;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="users")
public class User {

    @Id
    private String email;
    private String password;

    @ManyToMany
    @JoinTable(name="users_books", joinColumns = @JoinColumn(name="user_email"), inverseJoinColumns = @JoinColumn(name="book_id"))
    private Set<Book> books = new HashSet<>();

    @Id
    @Column(name = "email", nullable = false)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Column(name = "password", nullable = false)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
    }
}
