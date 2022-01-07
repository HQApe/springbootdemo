package com.mytest.test.mq;

import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.DependsOn;
import org.springframework.kafka.core.KafkaAdmin;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class TopicsUtil {

    @Autowired
    KafkaAdmin kafkaAdmin;

    @Autowired
    AdminClient adminClient;

    @Bean
    public NewTopic instanceTopic() {
        return new NewTopic("myGroup", 6, (short) 1);
    }

    @DependsOn("kafkaAdmin")
    @Bean  //kafka客户端，在spring中创建这个bean之后可以注入并且创建topic
    public AdminClient adminClient() {

        return AdminClient.create(kafkaAdmin.getConfigurationProperties());
    }

    public void createTopic(String topicName, int partitions, short replicationFactor) throws InterruptedException {
        NewTopic topic = new NewTopic(topicName, partitions, replicationFactor);
        adminClient.createTopics(Arrays.asList(topic));
    }
}
