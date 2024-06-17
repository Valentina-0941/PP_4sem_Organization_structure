package ft.root.entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

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
}
