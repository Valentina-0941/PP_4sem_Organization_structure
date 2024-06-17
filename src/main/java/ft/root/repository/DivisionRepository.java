package ft.root.repository;

import ft.root.entity.Division;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DivisionRepository extends CrudRepository<Division, Long> {
    Division findByName(String name);
}