package ft.root.repository;

import ft.root.entity.Position;
import ft.root.entity.PositionType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PositionRepository extends CrudRepository<Position, Long> {
    Position findByName(String name);

    Position findByNameAndType(String name, PositionType type);

    List<Position> findByType(PositionType type);
}