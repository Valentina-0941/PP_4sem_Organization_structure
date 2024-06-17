package ft.root;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@ComponentScan(basePackages = {"ft.root", "ft.db.service", "ft.db.repo", "ft.db.entity", "ft.db.dto"})
public class Launcher {
    public static void main(String[] args) {

        SpringApplication.run(Launcher.class, args);
    }
}