package ft.root.controllers;

import com.opencsv.CSVReader;
import ft.root.entity.*;
import ft.root.entity.Record;
import ft.root.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileReader;
import java.io.IOException;

@RestController
@AllArgsConstructor
public class CSVInitController {
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

    @GetMapping("/csv_init")
    public String index() {
        try (CSVReader reader = new CSVReader(new FileReader("data.csv"))) {
            reader.skip(1);
            reader.forEach(this::saveOrUpdateData);
            return "redirect:/";
        } catch (IOException e) {
            e.printStackTrace();
            return "Error";
        }
    }

    private void saveOrUpdateData(String[] row) {
        boolean empty = true;
        for (int i = 0; i < row.length; i++)
            if (row[i] == null || row[i].isEmpty() || row[i].isBlank()) row[i] = "n/a";
            else empty = false;
        if (empty) return;
        Employee employee = parseEmployee(row[7]);
        Entity entity = parseEntity(row[1]);
        PositionType positionType = parsePositionType(row[8]);
        Position position = parsePosition(row[6], positionType);
        Location location = parseLocation(row[2]);
        Group group = parseGroup(row[5]);
        Division division = parseDivision(row[3]);
        Department department = parseDepartment(row[4], division);
        DepartmentGroup departmentGroup = parseDepartmentGroup(department, group);
        recordRepo.save(new Record(
                row[0],
                employee,
                entity,
                position,
                location,
                departmentGroup,
                division
        ));
    }

    private Employee parseEmployee(String s) {
        String[] parts = s.split(" ");
        if (parts.length < 3) return null;
        return employeeRepo.save(Employee.builder()
                .firstName(parts[0])
                .lastName(parts[1])
                .patronymic(parts[2])
                .build());
    }

    private Entity parseEntity(String s) {
        Entity entity = entityRepo.findByName(s);
        if (entity == null) {
            entity = Entity.builder().name(s).build();
            entityRepo.save(entity);
        }
        return entity;
    }

    private PositionType parsePositionType(String s) {
        PositionType type = positionTypeRepo.findByName(s);
        if (type == null) {
            type = PositionType.builder().name(s).build();
            positionTypeRepo.save(type);
        }
        return type;
    }

    private Position parsePosition(String s, PositionType type) {
        Position position = positionRepo.findByNameAndType(s, type);
        if (position == null) {
            position = Position.builder().name(s).type(type).build();
            positionRepo.save(position);
        }
        return position;
    }

    private Location parseLocation(String s) {
        Location location = locationRepo.findByName(s);
        if (location == null) {
            location = Location.builder().name(s).build();
            locationRepo.save(location);
        }
        return location;
    }

    private Group parseGroup(String s) {
        Group group = groupRepo.findByName(s);
        if (group == null) {
            group = Group.builder().name(s).build();
            groupRepo.save(group);
        }
        return group;
    }

    private Division parseDivision(String s) {
        Division division = divisionRepo.findByName(s);
        if (division == null) {
            division = Division.builder().name(s).build();
            divisionRepo.save(division);
        }
        return division;
    }

    private Department parseDepartment(String s, Division division) {
        Department department = departmentRepo.findByNameAndDivision(s, division);
        if (department == null) {
            department = Department.builder().name(s).division(division).build();
            departmentRepo.save(department);
        }
        return department;
    }

    private DepartmentGroup parseDepartmentGroup(Department department, Group group) {
        DepartmentGroup dg = departmentGroupRepo.findByDepartmentAndGroup(department, group);
        if (dg == null) {
            dg = DepartmentGroup.builder().department(department).group(group).build();
            departmentGroupRepo.save(dg);
        }
        return dg;
    }
}