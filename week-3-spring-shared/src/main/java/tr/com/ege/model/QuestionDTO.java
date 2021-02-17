package tr.com.ege.model;

import tr.com.ege.entity.Answer;

import java.util.List;

public class QuestionDTO {
    private String questionText;

    private String point;

    private List<Answer> possibleAnswers;

    private String penaltyPoint;

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getPoint() {
        return point;
    }

    public void setPoint(String point) {
        this.point = point;
    }

    public List<Answer> getPossibleAnswers() {
        return possibleAnswers;
    }

    public void setPossibleAnswers(List<Answer> possibleAnswers) {
        this.possibleAnswers = possibleAnswers;
    }

    public String getPenaltyPoint() {
        return penaltyPoint;
    }

    public void setPenaltyPoint(String penaltyPoint) {
        this.penaltyPoint = penaltyPoint;
    }

}
