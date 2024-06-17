package ft.root.entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.*;

@Entity(name = "records")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
    @ManyToOne
    @JoinColumn(name = "entity_id")
    private ft.root.entity.Entity entity;
    @ManyToOne
    @JoinColumn(name = "position_id")
    private Position position;
    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;
    @ManyToOne
    @JoinColumn(name = "department_group_id")
    private DepartmentGroup departmentGroup;
    @ManyToOne
    @JoinColumn(name = "division_id")
    private Division division;
}