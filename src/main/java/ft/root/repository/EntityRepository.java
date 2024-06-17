package ft.root.repository;

import ft.root.entity.Entity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntityRepository extends CrudRepository<Entity, Long> {
    Entity findByName(String name);
}