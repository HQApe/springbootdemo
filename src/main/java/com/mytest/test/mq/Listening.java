package com.mytest.test.mq;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;

public class Listening {

    @KafkaListener(id = "myId", topics = { "topic1" })
    public void listen(String in, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) {
        System.out.println(in);
    }
}
