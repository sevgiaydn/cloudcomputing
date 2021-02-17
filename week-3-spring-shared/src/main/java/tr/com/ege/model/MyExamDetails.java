package tr.com.ege.model;

import tr.com.ege.entity.User;
import tr.com.ege.entity.Exam;

public class MyExamDetails implements ExamDetails {

    private Exam exam;
    private User owner;

    public MyExamDetails(Exam exam) {
        this.exam = exam;
    }

    public MyExamDetails(User owner) {
        this.owner = owner;
    }

 /*   @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return exam != null ?
                exam.getOwner().stream().map(t ->
                        new SimpleGrantedAuthority(t.getName()))
                        .collect(Collectors.toList()) :
                Collections.emptyList();
    }*/

}
