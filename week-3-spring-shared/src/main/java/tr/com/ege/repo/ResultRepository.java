package tr.com.ege.repo;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import tr.com.ege.entity.Result;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    @Query(value = "select * from Result r where r.id = :id", nativeQuery = true)
    Optional<Result> getByIdNative(long id);
    Page<Result> findAllByOrderByGradeDesc(Pageable paged);
    List<Result> findByIdStartingWithAndOperationTypeIsNotNullAndActiveTrueOrderByIdDesc(String id);
}
