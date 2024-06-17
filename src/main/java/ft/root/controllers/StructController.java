package ft.root.controllers;

import ft.root.dto.CardPreviewInfo;
import ft.root.dto.ExtendedCardInfo;
import ft.root.entity.DepartmentGroup;
import ft.root.entity.Position;
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
public class StructController {
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

    @GetMapping("/api/getAllCardData")
    public List<CardPreviewInfo> getAllCardData() {
        List<CardPreviewInfo> infos = new ArrayList<>();
        for (Record r : recordRepo.findAll())
            infos.add(new CardPreviewInfo(r.getId(), r.getEmployee(), r.getPosition()));
        return infos;
    }

    @GetMapping("/api/getAllInfo")
    public ExtendedCardInfo getExtendedInfo(@RequestParam(value = "id") String id) {
        Record record = recordRepo.findById(id).orElse(null);
        if (record == null) return null;

        ExtendedCardInfo info = new ExtendedCardInfo();
        info.setNumber(record.getId());
        if (record.getEntity() != null) info.setEntity(record.getEntity().getName());
        if (record.getLocation() != null) info.setLocation(record.getLocation().getName());
        if (record.getDivision() != null) info.setDivision(record.getDivision().getName());

        DepartmentGroup dg = record.getDepartmentGroup();
        if (dg != null) {
            info.setDepartment(dg.getDepartment().getName());
            info.setGroup(dg.getGroup().getName());
        }
        Position pos = record.getPosition();
        if (pos != null) {
            info.setType(pos.getType().getName());
            info.setPosition(pos.getName());
        }
        info.setFullName(record.getEmployee() != null ? record.getEmployee().getFullName() : "Вакансия");

        return info;
    }

    @GetMapping("/api/getAllFree")
    public List<CardPreviewInfo> getAllFree() {
        List<CardPreviewInfo> infos = new ArrayList<>();
        for (Record r : recordRepo.findByEmployeeNull())
            infos.add(new CardPreviewInfo(r.getId(), r.getEmployee(), r.getPosition()));
        return infos;
    }
}