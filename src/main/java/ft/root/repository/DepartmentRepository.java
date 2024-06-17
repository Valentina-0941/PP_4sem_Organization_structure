package ft.root.repository;

import ft.root.entity.Department;
import ft.root.entity.Division;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends CrudRepository<Department, Long> {
    Department findByDivision_Name(String name);

    Department findByNameAndDivision(String name, Division division);
}