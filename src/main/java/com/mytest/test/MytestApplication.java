package com.mytest.test;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

@RestController
@SpringBootApplication
public class MytestApplication {

    @RequestMapping("/")
    public String index() {
        return "Hello, Spring Boot";
    }

    @RequestMapping("/hello")
    public String hello() {
        return "<!DOCTYPE html>\n" +
                "<html>\n" +
                "    <head>\n" +
                "        <meta charset=\"utf-8\">\n" +
                "        <!--\n" +
                "        Customize this policy to fit your own app's needs. For more guidance, see:\n" +
                "            https://github.com/apache/cordova-plugin-whitelist/blob/master/README.md#content-security-policy\n" +
                "        Some notes:\n" +
                "            * gap: is required only on iOS (when using UIWebView) and is needed for JS->native communication\n" +
                "            * https://ssl.gstatic.com is required only on Android and is needed for TalkBack to function properly\n" +
                "            * Disables use of inline scripts in order to mitigate risk of XSS vulnerabilities. To change this:\n" +
                "                * Enable inline JS: add 'unsafe-inline' to default-src\n" +
                "        -->\n" +
                "        <meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;\">\n" +
                "        <meta name=\"format-detection\" content=\"telephone=no\">\n" +
                "        <meta name=\"msapplication-tap-highlight\" content=\"no\">\n" +
                "        <meta name=\"viewport\" content=\"initial-scale=1, width=device-width, viewport-fit=cover\">\n" +
                "        <meta name=\"color-scheme\" content=\"light dark\">\n" +
                "        <title>Hello World</title>\n" +
                "    </head>\n" +
                "    <body>\n" +
                "        <div class=\"app\">\n" +
                "            <h1>Apache Cordova</h1>\n" +
                "            <div id=\"deviceready\" class=\"blink\">\n" +
                "                <p class=\"event listening\">Connecting to Device</p>\n" +
                "                <p class=\"event received\">Device is Ready</p>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "        <script src=\"cordova.js\"></script>\n" +
                "        <script src=\"index.js\"></script>" +
                "    </body>\n" +
                "</html>\n";
    }

//    @GetMapping("/{fileName}")
//    @ResponseBody
//    public ResponseEntity<Object> downloadFile(@PathVariable(name = "fileName") String fileName) throws IOException {
//
//        String filePath = "/Users/zhanghq/Desktop/mytest/"+fileName;
//        FileSystemResource resource = new FileSystemResource(filePath);
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.add ( "Content-Disposition",String.format("attachment;filename=\"%s",fileName));
//        headers.add ( "Cache-Control","no-cache,no-store,must-revalidate" );
//        headers.add ( "Pragma","no-cache" );
//        headers.add ( "Expires","0" );
//
//        ResponseEntity<Object> responseEntity = ResponseEntity.ok()
//                .headers ( headers )
//                .contentLength ( resource.contentLength())
//                .contentType(MediaType.parseMediaType ( "application/octet-stream" ))
//                .body(new InputStreamResource(resource.getInputStream()));
//
//        return responseEntity;
//    }

    public static void main(String[] args) {
        SpringApplication.run(MytestApplication.class, args);
    }

}
