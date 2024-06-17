package ft.root.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ExtendedCardInfo {
    private String number;
    private String entity;
    private String location;
    private String division;
    private String department;
    private String group;
    private String type;
    private String position;
    private String fullName;
}