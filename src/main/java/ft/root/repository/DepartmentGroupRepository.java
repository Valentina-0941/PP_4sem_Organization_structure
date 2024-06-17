package ft.root.repository;

import ft.root.entity.Department;
import ft.root.entity.DepartmentGroup;
import ft.root.entity.Group;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentGroupRepository extends CrudRepository<DepartmentGroup, Long> {
    DepartmentGroup findByDepartmentAndGroup(Department department, Group group);

    DepartmentGroup findByDepartment(Department department);

    DepartmentGroup findByGroup(Group group);
}