package tr.com.ege.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import tr.com.ege.entity.Exam;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {

    @Query(value = "select * from Exam e where e.id = :id", nativeQuery = true)
    Optional<Exam> getByIdNative(long id);

    Optional<Exam> findByUrl(String url);

    Optional<Exam> findByNameStartingWithAndOperationTypeIsNotNullAndActiveTrueOrderByIdDesc(String name);

    @Query("Select t from Exam t where t.startDate <= CURRENT_DATE and t.endDate >= CURRENT_DATE")
    Page<Exam> findByStartBeforeAndEndAfter(Pageable page);

    @Query("Select t.url from Exam t where t.startDate <= CURRENT_DATE and t.endDate >= CURRENT_DATE")
    Page<String> findUrlByStartBeforeAndEndAfter(Pageable page);

    @Query(value = "select * from Exam e where e.owner_Id = :id", nativeQuery = true)
    List<Exam> getByOwnerId(long id);


}
