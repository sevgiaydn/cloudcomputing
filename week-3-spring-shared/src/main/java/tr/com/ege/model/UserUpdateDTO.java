package tr.com.ege.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UserUpdateDTO {
    @NotBlank
    @Size(max = 255, min = 3, message = "Lütfen geçerli bir şifre giriniz")
    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
