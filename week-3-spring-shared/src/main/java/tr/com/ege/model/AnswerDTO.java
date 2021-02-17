package tr.com.ege.model;

import javax.validation.constraints.NotBlank;

public class AnswerDTO {
    @NotBlank
    private long questionId;
    
    private long answerId;

    public long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(long questionId) {
        this.questionId = questionId;
    }

    public long getAnswerId() {
        return answerId;
    }

    public void setAnswerId(long answerId) {
        this.answerId = answerId;
    }

    
}
