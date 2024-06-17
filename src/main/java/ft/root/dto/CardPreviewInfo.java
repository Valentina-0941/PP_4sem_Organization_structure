package ft.root.dto;

import ft.root.entity.Employee;
import ft.root.entity.Position;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CardPreviewInfo {
    private String recordId;
    private Employee employee;
    private Position position;

}