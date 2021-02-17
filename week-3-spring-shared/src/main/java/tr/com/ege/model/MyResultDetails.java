package tr.com.ege.model;

import tr.com.ege.entity.Result;
import tr.com.ege.entity.User;

public class MyResultDetails implements ResultDetails {
    private Result result;
    private User student;

    public MyResultDetails(Result result) {
        this.result = result;
    }

    public MyResultDetails(User student) {
        this.student = student;
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
