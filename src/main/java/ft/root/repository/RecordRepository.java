package ft.root.repository;

import ft.root.entity.Record;
import ft.root.entity.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface RecordRepository extends CrudRepository<Record, String> {
    Record findByEmployee(Employee employee);

    Record findByEntity(Entity entity);

    Record findByPosition(Position position);

    Record findByLocation(Location location);

    Record findByDepartmentGroup(DepartmentGroup departmentGroup);

    Record findByDivision(Division division);

    List<Record> findByEmployeeNull();
}