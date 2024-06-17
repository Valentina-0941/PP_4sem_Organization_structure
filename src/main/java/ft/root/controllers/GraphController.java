package ft.root.controllers;

import ft.root.dto.CardPreviewInfo;
import ft.root.entity.DepartmentGroup;
import ft.root.entity.Record;
import ft.root.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public List<CardPreviewInfo> getAllCardData(@RequestParam(value = "base") String base) {
        List<CardPreviewInfo> infos = new ArrayList<>();
//        for (Record r : recordRepo.findAll())
//            infos.add(new CardPreviewInfo(r.getId(), r.getEmployee(), r.getPosition()));
        buildEntityBased();
        return infos;
    }

    /*
    Division
    Entity
    Location
    Department
    Group
    Position
    Employee
    PositionType
    PosNumber
     */

    private void buildEntityBased() {
        ArrayList<String[]> data = new ArrayList<>();
        for (Record r : recordRepo.findAll()) {
            data.add(refactorRecord(r));
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
        return new String[]{
                r.getEntity() == null ? "n/a" : r.getEntity().getName(),
                r.getLocation() == null ? "n/a" : r.getLocation().getName(),
                r.getDivision() == null ? "n/a" : r.getDivision().getName(),
                strDepartment,
                strGroup,
                r.getPosition() == null ? "n/a" : r.getPosition().getName(),
                r.getEmployee().getFullName(),
                r.getPosition().getType().getName(),
                r.getId(),
        };
    }
}
/*
            DepartmentGroup dg = record.getDepartmentGroup();
            Department department = dg.getDepartment();
            Group group = dg.getGroup();
            Position position = record.getPosition();


            HashMap<String, String> endValues = new HashMap<>() {{
                put("fio", record.getEmployee().getFullName());
                put("job_type", position.getType().getName());
                put("pos_number", record.getId());
            }};
            HNode end = new HNode(endValues, null);
 */