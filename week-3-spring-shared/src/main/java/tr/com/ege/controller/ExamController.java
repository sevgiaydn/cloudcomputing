package tr.com.ege.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tr.com.ege.entity.User;
import tr.com.ege.model.AnswerDTO;
import tr.com.ege.model.ExamDTO;
import tr.com.ege.model.ExamUpdateDTO;
import tr.com.ege.service.ExamService;
import tr.com.ege.service.UserService;
import tr.com.ege.entity.Exam;
import tr.com.ege.model.ResultDTO;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/exams")
public class ExamController {
    private ExamService examService;
    private UserService userService;

    @Autowired
    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(ExamController.class);

    @GetMapping("")
    @ResponseBody
    public ResponseEntity<?> get(@RequestParam(name = "pageSize", defaultValue = "100") int pageSize,
            @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber) {
        return ResponseEntity.ok(examService.getCurrentExams(pageSize, pageNumber));
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> get(@PathVariable long id) {
        Optional<Exam> examOptional = examService.findById(id);
        if (examOptional.isPresent()) {
            return ResponseEntity.ok(examOptional.get());
        }
        throw new IllegalArgumentException("Sınav bulunamadı.");
    }

    @GetMapping("/search")
    @ResponseBody
    public ResponseEntity<?> get(@RequestParam(name = "username", defaultValue = "") String username) {
        List<User> userList = userService.findByUsername(username);
        return ResponseEntity.ok(userList);
    }

    /*
     * @GetMapping("/has-role-user")
     * 
     * @ResponseBody public ResponseEntity<?> findByRoles() { List<User> userList =
     * userService.findByRoles(Arrays.asList("ROLE_STUDENT")); return
     * ResponseEntity.ok(userList); }
     */

    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> update(@PathVariable long id, @Valid @RequestBody ExamUpdateDTO examDTO) {
        Exam exam = examService.update(id, examDTO);
        return ResponseEntity.ok(exam);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> delete(@PathVariable long id) {
        Exam exam = examService.delete(id);
        return ResponseEntity.ok(exam);
    }

    @PostMapping(value = "")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_INSTRUCTOR')")
    public ResponseEntity<?> post(@Valid @RequestBody ExamDTO examDTO) {

        Exam exam = examService.save(examDTO);

        return ResponseEntity.ok(exam);
    }

    @GetMapping("/startExam/{url}")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_STUDENT')")
    public ResponseEntity<?> getExam(@PathVariable String url) {

        Optional<Exam> exam = examService.findByUrl(url);

        if (exam.isPresent()) {
            Exam anExam = exam.get();
            return ResponseEntity.ok(anExam);
        }
        throw new IllegalArgumentException("Sınav bulunamadı.");
    }

    @PostMapping("/endExam")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_STUDENT')")
    public ResponseEntity<?> postExam(@Valid @RequestBody List<AnswerDTO> answers) {
        ResultDTO result = examService.submitExam(answers);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/startExam/findurl/{name}")
    @ResponseBody
    public ResponseEntity<?> getUrl(@PathVariable String name) {
        Optional<Exam> exam = examService.findByName(name);
        if (exam.isPresent()) {
            return ResponseEntity.ok(exam.get().getUrl());
        }
        throw new IllegalArgumentException("Sınav bulunamadı");
    }

    @GetMapping("/ownersexams")
    @ResponseBody
    public ResponseEntity<?> getOwnersExams(@RequestParam(name = "pageSize", defaultValue = "100") int pageSize,
            @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber) {
        return ResponseEntity.ok(examService.getOwnersExams(pageSize, pageNumber));
    }

}
