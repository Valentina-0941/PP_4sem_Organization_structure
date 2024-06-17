package ft.root.entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.*;

import java.util.List;

@Entity(name = "employees")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String patronymic;

    public String getFullName() {
        String fullName = firstName;
        if (!lastName.equals("n/a")) fullName += " " + lastName;
        if (!patronymic.equals("n/a")) fullName += " " + patronymic;
        return fullName;
    }
}