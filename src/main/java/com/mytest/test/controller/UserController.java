package com.mytest.test.controller;

import com.mytest.test.model.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicLong;

@RestController
public class UserController {

    private static final String template = "Hello, %s";

    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/user")
    public User userInfo(@RequestParam(value = "name", defaultValue = "World") String name) {

        return new User(counter.incrementAndGet(), name, (int)(counter.incrementAndGet() + 20));
    }

}
