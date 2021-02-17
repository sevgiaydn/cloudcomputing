package tr.com.ege.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import tr.com.ege.model.ExamDetails;

public interface ExamDetailsService {
    ExamDetails loadExamByOwner(String name) throws UsernameNotFoundException;
}
