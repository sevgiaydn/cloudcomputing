package tr.com.ege.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import tr.com.ege.entity.Role;
import tr.com.ege.repo.RoleRepository;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    private RoleRepository roleRepository;


    @Override
    public void run(ApplicationArguments args) throws Exception {

        boolean studentRoleExists = roleRepository.existsByName("ROLE_STUDENT");
        if (!studentRoleExists) {
            Role userRole = new Role();
            userRole.setName("ROLE_STUDENT");
            roleRepository.save(userRole);
        }

        boolean instructorRoleExists = roleRepository.existsByName("ROLE_INSTRUCTOR");
        if (!instructorRoleExists) {
            Role adminRole = new Role();
            adminRole.setName("ROLE_INSTRUCTOR");
            roleRepository.save(adminRole);
        }
    }
}
