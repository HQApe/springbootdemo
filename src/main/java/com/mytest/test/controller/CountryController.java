package com.mytest.test.controller;

import com.mytest.test.model.Country;
import com.mytest.test.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/country")
public class CountryController {

    @Autowired
    private CountryRepository countryRepository;

    @PostMapping(path = "/add")
    public @ResponseBody String addNewCountry(@RequestParam String code,
                                             @RequestParam String name,
                                             @RequestParam long population) {

        Country country = new Country();
        country.setCode(code);
        country.setName(name);
        country.setPopulation(population);
        countryRepository.save(country);
        return "Saved";
    }

    @PostMapping(path = "/update")
    public @ResponseBody String updateCountry(@RequestParam String code,
                                              @RequestParam String name,
                                              @RequestParam long population) {

        Country country = countryRepository.findById(code).get();
        country.setCode(code);
        country.setName(name);
        country.setPopulation(population);
        countryRepository.save(country);
        return "Updated";
    }

    @PostMapping(path = "/delete")
    public @ResponseBody String deleteCountry(@RequestParam String code) {
        countryRepository.deleteById(code);
        return "Deleted";
    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Country> getAllCountry() {
        return countryRepository.findAll();
    }

}
