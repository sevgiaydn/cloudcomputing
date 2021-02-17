package tr.com.ege.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.List;

@Entity
@Table(name = "QUESTION")
public class Question extends EntityBase {
    //change data types
    @Column(name = "TEXT", length = 255, unique = false)
    private String questionText;

    @Column(name = "POINT", unique = false)
    private String point;

    @OneToMany(cascade=CascadeType.ALL)
    private List<Answer> possibleAnswers;

    @Column(name = "PENALTY_POINT", unique = false)
    private String penaltyPoint;

    @ManyToOne
    @JsonBackReference
    private Exam exam;

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public List<Answer> getPossibleAnswers() {
        return possibleAnswers;
    }

    public void setPossibleAnswers(List<Answer> possibleAnswers) {
        this.possibleAnswers = possibleAnswers;
    }

    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }

    public String getPoint() {
        return point;
    }

    public void setPoint(String point) {
        this.point = point;
    }

    public String getPenaltyPoint() {
        return penaltyPoint;
    }

    public void setPenaltyPoint(String penaltyPoint) {
        this.penaltyPoint = penaltyPoint;
    }
}
