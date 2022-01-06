package com.mytest.test.repository;

import com.mytest.test.model.Device;
import org.springframework.data.repository.CrudRepository;

public interface DeviceRepository extends CrudRepository<Device, String> {

}
