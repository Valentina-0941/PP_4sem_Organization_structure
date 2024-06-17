package ft.root.repository;

import ft.root.entity.*;
import ft.root.entity.Record;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecordRepository extends CrudRepository<Record, String> {
    List<Record> findByEmployeeNull();

    List<Record> findByLocation(Location location);

    List<Record> findByEntity(Entity entity);

    Record findByEmployee(Employee employee);

    long deleteByEmployee(Employee employee);

    List<Record> findByPosition(Position position);

    List<Record> findByDepartmentGroup(DepartmentGroup departmentGroup);

    List<Record> findByDivision(Division division);
}