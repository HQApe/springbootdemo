package com.mytest.test.controller;

import com.eatthepath.pushy.apns.ApnsClient;
import com.eatthepath.pushy.apns.ApnsClientBuilder;
import com.eatthepath.pushy.apns.PushNotificationResponse;
import com.eatthepath.pushy.apns.util.ApnsPayloadBuilder;
import com.eatthepath.pushy.apns.util.SimpleApnsPayloadBuilder;
import com.eatthepath.pushy.apns.util.SimpleApnsPushNotification;
import com.eatthepath.pushy.apns.util.TokenUtil;
import com.eatthepath.pushy.apns.util.concurrent.PushNotificationFuture;
import com.mytest.test.model.Device;
import com.mytest.test.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.io.IOException;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Controller
@RequestMapping(path = "/push")
public class PushController {

    @Autowired
    private DeviceRepository deviceRepository;

    private ApnsClient apnsClient;

    public ApnsClient createApnsClient() throws IOException {
        if (this.apnsClient == null) {
            synchronized (this) {
                File iosCertFile = new File("/Users/zhanghq/WebServer/mytest/src/main/resources/chanye_push.p12");
                apnsClient = new ApnsClientBuilder()
                        .setApnsServer(ApnsClientBuilder.DEVELOPMENT_APNS_HOST)
                        .setClientCredentials(iosCertFile, "123456")
                        .build();
            }
        }
        return apnsClient;
    }

    @PostMapping(path = "/bindDevice")
    public @ResponseBody String bindDevice(@RequestParam String userId,
                                           @RequestParam String deviceId,
                                           @RequestParam String channel) {
        Optional<Device> findOne = deviceRepository.findById(deviceId);
        Device device = new Device(userId, deviceId, channel);
        if (!findOne.isEmpty()) {
            device = findOne.get();
        }
        deviceRepository.save(device);
        return "绑定成功";
    }

    @PostMapping(path = "/pushMessage")
    public @ResponseBody String pushMessage(@RequestParam String deviceId,
                                            @RequestParam String title,
                                            @RequestParam String subTitle,
                                            @RequestParam String content,
                                            @RequestParam String bundleId) {
            Optional<Device> findOne = deviceRepository.findById(deviceId);
            if (findOne.isEmpty()) {
                return "DeviceToken不存在";
            }
            final ApnsPayloadBuilder payloadBuilder = new SimpleApnsPayloadBuilder();
            payloadBuilder.setAlertTitle(title);
            if (!subTitle.isEmpty()) {
                payloadBuilder.setAlertSubtitle(subTitle);
            }
            payloadBuilder.setAlertBody(content);
            final String payload = payloadBuilder.build();
            final String token = TokenUtil.sanitizeTokenString(deviceId);
            final SimpleApnsPushNotification pushNotification = new SimpleApnsPushNotification(token, bundleId, payload);
            try {
                ApnsClient client = createApnsClient();
                final PushNotificationFuture<SimpleApnsPushNotification, PushNotificationResponse<SimpleApnsPushNotification>>
                        sendNotificationFuture = client.sendNotification(pushNotification);
                final PushNotificationResponse<SimpleApnsPushNotification> pushNotificationResponse =
                        sendNotificationFuture.get();
                if (pushNotificationResponse.isAccepted()) {
                    System.out.println("Push notification accepted by APNs gateway.");
                } else {
                    System.out.println("Notification rejected by the APNs gateway: " +
                            pushNotificationResponse.getRejectionReason());
                    pushNotificationResponse.getTokenInvalidationTimestamp().ifPresent(timestamp -> {
                        System.out.println("\t…and the token is invalid as of " + timestamp);
                    });
                }
            } catch (final ExecutionException | InterruptedException | IOException e) {
                System.err.println("Failed to send push notification.");
                e.printStackTrace();
            }
        return "信息推送成功";
    }

    @PostMapping(path = "/onTap")
    public @ResponseBody String messageOnTaped(@RequestParam String deviceId) {

        return "推送消息已点击";
    }


}
