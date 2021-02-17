package tr.com.ege.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import tr.com.ege.model.ResultDetails;

public interface ResultDetailsService {
    ResultDetails loadResultByStudent(String name) throws UsernameNotFoundException;
}
