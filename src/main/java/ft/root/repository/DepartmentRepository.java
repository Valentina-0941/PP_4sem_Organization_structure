package ft.root.repository;

import ft.root.entity.Department;
import ft.root.entity.Division;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentRepository extends CrudRepository<Department, Long> {
    Department findByNameAndDivision(String name, Division division);

    List<Department> findByDivision(Division division);
}