package tr.com.ege.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "RESULT")
public class Result extends EntityBase {

    @Column(name = "GRADE")
    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
    private double grade;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonManagedReference
    private Exam exam;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonManagedReference
    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
    private User student;

    public double getGrade() {
        return grade;
    }

    public void setGrade(double grade) {
        this.grade = grade;
    }

    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

}
