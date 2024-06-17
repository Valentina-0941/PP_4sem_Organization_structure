package ft.root.controllers;

import ft.root.entity.*;
import ft.root.entity.Record;
import ft.root.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @PostMapping("/api/admin/editLocation")
    public ResponseEntity<Location> AddLocation(@RequestBody Location in) {
        return new ResponseEntity<>(locationRepo.save(in), HttpStatus.OK);
    }

    @PostMapping("/api/admin/editEntity")
    public ResponseEntity<Entity> AddEntity(@RequestBody Entity in) {
        return new ResponseEntity<>(entityRepo.save(in), HttpStatus.OK);
    }

    @PostMapping("/api/admin/editPosition")
    public ResponseEntity<Position> AddPosition(@RequestBody Position in) {
        return new ResponseEntity<>(positionRepo.save(in), HttpStatus.OK);
    }

    @PostMapping("/api/admin/editPositionType")
    public ResponseEntity<PositionType> AddPositionType(@RequestBody PositionType in) {
        return new ResponseEntity<>(positionTypeRepo.save(in), HttpStatus.OK);
    }

    @PostMapping("/api/admin/editGroup")
    public ResponseEntity<Group> AddGroup(@RequestBody Group in) {
        return new ResponseEntity<>(groupRepo.save(in), HttpStatus.OK);
    }

    @PostMapping("/api/admin/editRecord")
    public ResponseEntity<Record> AddRecord(@RequestBody Record in) {
        return new ResponseEntity<>(recordRepo.save(in), HttpStatus.OK);
    }

    @PostMapping("/api/admin/editEmployee")
    public ResponseEntity<Employee> AddEmployee(@RequestBody Employee in) {
        return new ResponseEntity<>(employeeRepo.save(in), HttpStatus.OK);
    }

    @PostMapping("/api/admin/editDepartment")
    public ResponseEntity<Department> AddDepartment(@RequestBody Department in) {
        return new ResponseEntity<>(departmentRepo.save(in), HttpStatus.OK);
    }

    @PostMapping("/api/admin/editDivision")
    public ResponseEntity<Division> AddDivision(@RequestBody Division in) {
        return new ResponseEntity<>(divisionRepo.save(in), HttpStatus.OK);
    }

    @PostMapping("/api/admin/editDepartmentGroup")
    public ResponseEntity<DepartmentGroup> AddDepartmentGroup(@RequestBody DepartmentGroup in) {
        return new ResponseEntity<>(departmentGroupRepo.save(in), HttpStatus.OK);
    }
}