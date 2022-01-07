package com.mytest.test.controller;

import com.mytest.test.mq.TopicsUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/mq")
public class MQController {

    @Autowired
    private KafkaTemplate kafkaTemplate;

    @Autowired
    private TopicsUtil topicsUtil;

    @GetMapping(path = "/config")
    public @ResponseBody String configTopics() {
        try {
            topicsUtil.createTopic("topic1",10,(short) 1);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "配置成功";
    }

    @GetMapping(path = "/send/{message}")
    public @ResponseBody String sendMessage(@PathVariable(name = "message") String message) {
        kafkaTemplate.send("topic1", message);
        return "发送成功";
    }

}
