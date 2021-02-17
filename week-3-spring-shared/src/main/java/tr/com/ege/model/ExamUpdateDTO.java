package tr.com.ege.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class ExamUpdateDTO {
    @NotBlank
    @Size(max = 255, min = 3, message = "Lütfen geçerli bir sınav ismi giriniz")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
