package ft.root.controllers;

import ft.root.dto.CardPreviewInfo;
import ft.root.entity.DepartmentGroup;
import ft.root.entity.Record;
import ft.root.logic.Tree;
import ft.root.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
public class GraphController {
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

    @GetMapping("/api/hierarchy")
    public String getAllCardData(@RequestParam("base") String base) {
        int b = switch (base) {
            case "location" -> 1;
            case "subdivision" -> 2;
            case "department" -> 3;
            case "group" -> 4;
            case "position" -> 5;
            default -> 0;
        };
        return buildEntityBased(b);
    }

    private String buildEntityBased(int base) {
        System.out.println("L1");

        ArrayList<String[]> data = new ArrayList<>();
        for (Record r : recordRepo.findAll()) data.add(shift(refactorRecord(r), base));

        Tree root = new Tree();

        for (String[] array : data) {
            root.add(array);
        }
        try {
            return root.toJson();
        } catch (Exception e) {
            return "";
        }
    }

    private String[] refactorRecord(Record r) {
        String strDepartment = "n/a";
        String strGroup = "n/a";
        DepartmentGroup dg = r.getDepartmentGroup();
        if (dg != null) {
            strDepartment = dg.getDepartment().getName();
            strGroup = dg.getGroup().getName();
        }
        String fio = r.getEmployee() == null ? "Вакансия" : r.getEmployee().getFullName();
        return new String[]{
                r.getEntity() == null ? "n/a" : r.getEntity().getName(),
                r.getLocation() == null ? "n/a" : r.getLocation().getName(),
                r.getDivision() == null ? "n/a" : r.getDivision().getName(),
                strDepartment,
                strGroup,
                r.getPosition() == null ? "n/a" : r.getPosition().getName(),
                fio,
                r.getPosition().getType().getName(),
                r.getId(),
        };
    }

    private String[] shift(String[] array, int x) {
        String buffer;
        for (int i = x; i > 0; i--) {
            buffer = array[i];
            array[i] = array[i - 1];
            array[i - 1] = buffer;
        }
        return array;
    }
}