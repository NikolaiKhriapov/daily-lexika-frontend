package my.project.applicationuser;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication(scanBasePackages = {"my.project.applicationuser", "my.project.amqp"})
@EnableFeignClients(basePackages = "my.project.clients")
public class ApplicationUserApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApplicationUserApplication.class, args);
    }
}
