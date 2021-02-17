package tr.com.ege.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "ANSWER")
public class Answer extends EntityBase {
    @Column(name = "TEXT", length = 255, unique = false)
    private String text;

    @Column(name = "IS_ANSWER")
    private boolean isAnswer;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isAnswer() {
        return isAnswer;
    }

    public void setAnswer(boolean answer) {
        isAnswer = answer;
    }
}
