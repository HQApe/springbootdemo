package com.mytest.test.repository;

import com.mytest.test.model.Country;
import org.springframework.data.repository.CrudRepository;

public interface CountryRepository extends CrudRepository<Country, String> {

}
