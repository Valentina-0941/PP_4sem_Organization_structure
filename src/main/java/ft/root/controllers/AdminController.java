package ft.root.controllers;

import ft.root.entity.*;
import ft.root.entity.Record;
import ft.root.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class AdminController {
    private LocationRepository locationRepo;
    private EntityRepository entityRepo;
    private PositionRepository positionRepo;
    private PositionTypeRepository positionTypeRepo;
    private GroupRepository groupRepo;
    private RecordRepository recordRepo;
    private EmployeeRepository employeeRepo;
    private DepartmentRepository departmentRepo;
    private DivisionRepository divisionRepo;
    private DepartmentGroupRepository departmentGroupRepo;


    @GetMapping("/api/admin/getAllLocations")
    public List<Location> getLocations() {
        return (List<Location>) locationRepo.findAll();
    }

    @GetMapping("/api/admin/getAllEntities")
    public List<Entity> getEntities() {
        return (List<Entity>) entityRepo.findAll();
    }

    @GetMapping("/api/admin/getAllPositions")
    public List<Position> getPositions() {
        return (List<Position>) positionRepo.findAll();
    }

    @GetMapping("/api/admin/getAllPositionTypes")
    public List<PositionType> getPositionTypes() {
        return (List<PositionType>) positionTypeRepo.findAll();
    }

    @GetMapping("/api/admin/getAllGroups")
    public List<Group> getGroups() {
        return (List<Group>) groupRepo.findAll();
    }

    @GetMapping("/api/admin/getAllRecords")
    public List<ft.root.entity.Record> getRecords() {
        return (List<Record>) recordRepo.findAll();
    }

    @GetMapping("/api/admin/getAllEmployees")
    public List<Employee> getEmployees() {
        return (List<Employee>) employeeRepo.findAll();
    }

    @GetMapping("/api/admin/getAllDepartments")
    public List<Department> getDepartments() {
        return (List<Department>) departmentRepo.findAll();
    }

    @GetMapping("/api/admin/getAllDivisions")
    public List<Division> getDivisions() {
        return (List<Division>) divisionRepo.findAll();
    }

    @GetMapping("/api/admin/getAllDepartmentsGroups")
    public List<DepartmentGroup> getDepartmentsGroups() {
        return (List<DepartmentGroup>) departmentGroupRepo.findAll();
    }
}