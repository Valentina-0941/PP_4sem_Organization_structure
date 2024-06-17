package ft.root.controllers;

import ft.root.dto.CardPreviewInfo;
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
        for (Record r : recordRepo.findAll())
            infos.add(new CardPreviewInfo(r.getId(), r.getEmployee(), r.getPosition()));
        return infos;
    }
}