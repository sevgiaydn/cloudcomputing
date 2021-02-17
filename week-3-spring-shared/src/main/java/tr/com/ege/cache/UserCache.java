package tr.com.ege.cache;

import tr.com.ege.model.UserDTO;

import java.util.Map;

public interface UserCache {
     void put(UserDTO user);
     Map<String, UserDTO> getMap();
}
