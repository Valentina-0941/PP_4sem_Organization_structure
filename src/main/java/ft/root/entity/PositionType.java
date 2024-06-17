package ft.root.entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.*;

import java.util.List;

@Entity(name = "position_types")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class PositionType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToMany(mappedBy = "type", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Position> positions;
}