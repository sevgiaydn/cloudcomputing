package tr.com.ege.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import tr.com.ege.entity.User;
import tr.com.ege.model.UserDTO;
import tr.com.ege.model.UserUpdateDTO;
import tr.com.ege.service.UserService;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @GetMapping("")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_INSTRUCTOR')")
    public ResponseEntity<?> get(@RequestParam(name="pageSize", defaultValue = "2") int pageSize,
                                 @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber) {
        return ResponseEntity.ok(userService.findAll(pageSize, pageNumber));
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> get(@PathVariable long id) {
        Optional<User> userOptional = userService.findById(id);
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        }
        throw new IllegalArgumentException("Kullanıcı bulunamadı");
    }

  /*  @GetMapping("/search")
    @ResponseBody
    public ResponseEntity<?> get(@RequestParam(name = "username", defaultValue = "") String username) {
        List<User> userList = userService.findByUsername(username);
        return ResponseEntity.ok(userList);
    }*/

    @GetMapping("/has-role-user")
    @ResponseBody
    public ResponseEntity<?> findByRoles() {
        List<User> userList = userService.findByRoles(Arrays.asList("ROLE_STUDENT"));
        return ResponseEntity.ok(userList);
    }

    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> update(@PathVariable long id, @Valid @RequestBody UserUpdateDTO userDTO) {
        User user = userService.update(id, userDTO);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> delete(@PathVariable long id) {
        User user = userService.delete(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("")
    @ResponseBody
    public ResponseEntity<?> post(@Valid @RequestBody UserDTO userDTO) {
        User user = userService.save(userDTO);

        return ResponseEntity.ok(user);
    }

}
