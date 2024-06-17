package ft.root.repository;

import ft.root.entity.Department;
import ft.root.entity.DepartmentGroup;
import ft.root.entity.Group;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentGroupRepository extends CrudRepository<DepartmentGroup, Long> {
    DepartmentGroup findByDepartmentAndGroup(Department department, Group group);

    List<DepartmentGroup> findByGroup(Group group);

    List<DepartmentGroup> findByDepartment(Department department);
}