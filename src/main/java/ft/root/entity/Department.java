package ft.root.entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.*;

@Entity(name = "departments")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "division_id")
    private Division division;
}