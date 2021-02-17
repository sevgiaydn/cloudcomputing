package tr.com.ege.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import tr.com.ege.entity.Result;
import tr.com.ege.entity.User;
import tr.com.ege.model.MyResultDetails;
import tr.com.ege.model.ResultDetails;
import tr.com.ege.repo.*;

import java.util.List;
import java.util.Optional;

@Service
public class ResultService implements ResultDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private ExamRepository examRepository;
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private ResultRepository resultRepository;

    /*public Result save(ResultDTO resultDTO) {
        Result result = new Result();
        result.setStudent(resultDTO.getStudent());
        result.setGrade(resultDTO.getGrade());
        result.setExam(resultDTO.getExam());
        Result savedResult = resultRepository.save(result);
        return savedResult;
    }*/

    public Page<Result> findAll(int pageSize, int pageNumber) {
        Pageable paged = PageRequest.of(pageNumber, pageSize);
        return resultRepository.findAll(paged);
    }

    public Optional<Result> findById(long id) {
        return resultRepository.getByIdNative(id);
    }

    public Page<Result> findAllByOrderByGradeDesc(int pageSize, int pageNumber){
        Pageable paged = PageRequest.of(pageNumber, pageSize);
        return resultRepository.findAllByOrderByGradeDesc(paged);
    }

    public List<Result> findByUsername(String name) {
        return resultRepository.findByIdStartingWithAndOperationTypeIsNotNullAndActiveTrueOrderByIdDesc(name);
    }

    public Result delete(long id) {
        Optional<Result> byId = resultRepository.findById(id);
        if (byId.isPresent()) {
            Result result = byId.get();
            result.setActive(!result.isActive());
            return resultRepository.save(result);
        }
        throw new IllegalArgumentException("Sonuç bulunamadı.");
    }

    @Override
    public ResultDetails loadResultByStudent(String name) throws UsernameNotFoundException {
        Optional<User> byUsername = userRepository.findByUsername(name);
        if (byUsername.isPresent()) {
            return new MyResultDetails(byUsername.get());
        }
        throw new UsernameNotFoundException("Kullanıcı bulunamadı");
    }
}
