package tr.com.ege.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.ege.entity.Question;


@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
}
