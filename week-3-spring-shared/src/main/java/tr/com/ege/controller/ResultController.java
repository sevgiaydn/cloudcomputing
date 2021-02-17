package tr.com.ege.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.ege.service.ResultService;

@RestController
@RequestMapping("/api/results")
public class ResultController {
    private ResultService resultService;

    @Autowired
    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(ResultController.class);

   /* @GetMapping("")
    @ResponseBody
    public ResponseEntity<?> get(@RequestParam(name="pageSize", defaultValue = "10") int pageSize,
                                 @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber) {
        return ResponseEntity.ok(resultService.findAll(pageSize, pageNumber));
    }*/

    @GetMapping("")
    @ResponseBody
    public ResponseEntity<?> get(@RequestParam(name="pageSize", defaultValue = "10") int pageSize,
                                 @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber){
        return ResponseEntity.ok(resultService.findAllByOrderByGradeDesc(pageSize, pageNumber));
    }
 /*   @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> get(@PathVariable long id) {
        Optional<Result> resultOptional = resultService.findById(id);
        if (resultOptional.isPresent()) {
            return ResponseEntity.ok(resultOptional.get());
        }
        throw new IllegalArgumentException("Sonuç bulunamadı");
    }*/

 /*   @GetMapping("/search")
    @ResponseBody
    public ResponseEntity<?> get(@RequestParam(name = "username", defaultValue = "") String username) {
        List<Result> resultList = resultService.findByUsername(username);
        return ResponseEntity.ok(resultList);
    }*/

}
