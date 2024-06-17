package ft.root.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@jakarta.persistence.Entity(name = "entities")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToMany(mappedBy = "entity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Record> records;
}
