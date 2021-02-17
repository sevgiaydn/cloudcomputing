package tr.com.ege.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tr.com.ege.entity.Answer;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {


    Optional<Answer> findById(long id);

}