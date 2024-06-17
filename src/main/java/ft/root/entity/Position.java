package ft.root.entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.*;

@Entity(name = "positions")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "type_id")
    private PositionType type;
}