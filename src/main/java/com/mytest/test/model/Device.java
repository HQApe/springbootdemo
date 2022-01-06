package com.mytest.test.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Device {
    // 设备所属用户
    private String userId;
    // 设备推送标识
    @Id
    private String deviceId;
    // 应用环境iOS：App Store/sandbox
    private String channel;

    public Device(String userId, String deviceId, String channel) {
        this.userId = userId;
        this.deviceId = deviceId;
        this.channel = channel;
    }

    public Device() {

    }


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }
}
