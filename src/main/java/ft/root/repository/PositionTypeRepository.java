package ft.root.repository;

import ft.root.entity.PositionType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PositionTypeRepository extends CrudRepository<PositionType, Long> {
    PositionType findByName(String name);
}