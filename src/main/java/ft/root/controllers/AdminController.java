package ft.root.controllers;

import ft.root.entity.Record;
import ft.root.entity.*;
import ft.root.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/api/admin/delete")
    public ResponseEntity<?> delete(@RequestParam("table") String table, @RequestParam("id") String id) {
        switch (table) {
            case "Divisions" -> {
                Division d = divisionRepo.findById(Long.parseLong(id)).orElse(null);
                if (d == null) return ResponseEntity.notFound().build();
                divisionRepo.delete(d);
                for (Department department : departmentRepo.findByDivision(d)) {
                    departmentRepo.delete(department);
                    for (DepartmentGroup dg : departmentGroupRepo.findByDepartment(department)) {
                        departmentGroupRepo.delete(dg);
                        del(recordRepo.findByDepartmentGroup(dg));
                    }
                }
            }
            case "Departments" -> {
                Department d = departmentRepo.findById(Long.parseLong(id)).orElse(null);
                if (d == null) return ResponseEntity.notFound().build();
                departmentRepo.delete(d);
                for (DepartmentGroup dg : departmentGroupRepo.findByDepartment(d)) {
                    departmentGroupRepo.delete(dg);
                    del(recordRepo.findByDepartmentGroup(dg));
                }
            }
            case "Groups" -> {
                Group g = groupRepo.findById(Long.parseLong(id)).orElse(null);
                if (g == null) return ResponseEntity.notFound().build();
                groupRepo.delete(g);
                for (DepartmentGroup dg : departmentGroupRepo.findByGroup(g)) {
                    departmentGroupRepo.delete(dg);
                    del(recordRepo.findByDepartmentGroup(dg));
                }
            }
            case "DepartmentsGroups" -> {
                DepartmentGroup dg = departmentGroupRepo.findById(Long.parseLong(id)).orElse(null);
                if (dg == null) return ResponseEntity.notFound().build();
                departmentGroupRepo.delete(dg);
                del(recordRepo.findByDepartmentGroup(dg));
            }
            case "Locations" -> {
                Location location = locationRepo.findById(Long.parseLong(id)).orElse(null);
                if (location == null) return ResponseEntity.notFound().build();
                locationRepo.delete(location);
                del(recordRepo.findByLocation(location));
            }
            case "PositionTypes" -> {
                PositionType type = positionTypeRepo.findById(Long.parseLong(id)).orElse(null);
                if (type == null) return ResponseEntity.notFound().build();
                positionTypeRepo.delete(type);
                for (Position p : positionRepo.findByType(type)) {
                    positionRepo.delete(p);
                    del(recordRepo.findByPosition(p));
                }
            }
            case "Positions" -> {
                Position p = positionRepo.findById(Long.parseLong(id)).orElse(null);
                if (p == null) return ResponseEntity.notFound().build();
                del(recordRepo.findByPosition(p));
            }
            case "Employees" -> {
                Employee employee = employeeRepo.findById(Long.parseLong(id)).orElse(null);
                if (employee == null) return ResponseEntity.notFound().build();
                Record record = recordRepo.findByEmployee(employee);
                record.setEmployee(null);
                recordRepo.save(record);
            }
            case "Entities" -> {
                Entity entity = entityRepo.findById(Long.parseLong(id)).orElse(null);
                if (entity == null) return ResponseEntity.notFound().build();
                entityRepo.delete(entity);
                del(recordRepo.findByEntity(entity));
            }
            case "Records" -> recordRepo.findById(id).ifPresent(x -> recordRepo.delete(x));
        }

        return ResponseEntity.ok().build();
    }

    private void del(Iterable<Record> records) {
        for (Record r : records) {
            employeeRepo.delete(r.getEmployee());
            recordRepo.delete(r);
        }
    }
}