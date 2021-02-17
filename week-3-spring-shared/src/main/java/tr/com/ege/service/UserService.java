package tr.com.ege.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tr.com.ege.entity.User;
import tr.com.ege.model.MyUserDetails;
import tr.com.ege.model.UserDTO;
import tr.com.ege.model.UserUpdateDTO;
import tr.com.ege.repo.RoleRepository;
import tr.com.ege.repo.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder encoder;

    @Bean
    public PasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }

    public User save(UserDTO userDto) {
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setPassword(encoder.encode(userDto.getPassword()));
        user.setRoles(Stream.of(roleRepository.findByName("ROLE_STUDENT")).collect(Collectors.toSet()));
        User savedUser = userRepository.save(user);
        return savedUser;
    }

    public Page<User> findAll(int pageSize, int pageNumber) {
        Pageable paged = PageRequest.of(pageNumber, pageSize);
        return userRepository.findAll(paged);
    }

    public List<User> findByRoles(List<String> roles) {
        return userRepository.findByRoles_NameIn(roles);
    }

    public Optional<User> findById(long id) {
        return userRepository.getByIdNative(id);
    }

    public List<User> findByUsername(String name) {
        return userRepository.findByUsernameStartingWithAndOperationTypeIsNotNullAndActiveTrueOrderByIdDesc(name);
    }

    public User update(long id, UserUpdateDTO dto) {
        Optional<User> byId = userRepository.findById(id);
        if (byId.isPresent()) {
            User user = byId.get();
            user.setPassword(encoder.encode(dto.getPassword()));
            return userRepository.save(user);

        }
        throw new IllegalArgumentException("Kullanıcı bulunamadı");
    }

    public User delete(long id) {
        Optional<User> byId = userRepository.findById(id);
        if (byId.isPresent()) {
            User user = byId.get();
            user.setActive(!user.isActive());
            return userRepository.save(user);

        }
        throw new IllegalArgumentException("Kullanıcı bulunamadı");
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> byUsername = userRepository.findByUsername(username);
        if (byUsername.isPresent()) {
            return new MyUserDetails(byUsername.get());
        }
        throw new UsernameNotFoundException("Kullanıcı bulunamadı");
    }
}
