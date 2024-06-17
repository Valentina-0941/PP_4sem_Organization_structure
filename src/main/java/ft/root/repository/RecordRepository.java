package ft.root.repository;

import ft.root.entity.*;
import ft.root.entity.Record;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordRepository extends CrudRepository<Record, Long> {
    Record findByEmployee(Employee employee);
    Record findByEntity(Entity entity);
    Record findByPosition(Position position);
    Record findByLocation(Location location);
    Record findByDepartmentGroup(DepartmentGroup departmentGroup);
    Record findByDivision (Division division);
}