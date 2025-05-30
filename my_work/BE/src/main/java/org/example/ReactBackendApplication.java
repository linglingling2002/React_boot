package org.example;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("org.example.mapper")  // 添加这行
public class ReactBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReactBackendApplication.class, args);
    }
}