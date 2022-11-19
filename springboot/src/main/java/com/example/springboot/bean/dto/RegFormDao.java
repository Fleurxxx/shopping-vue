package com.example.springboot.bean.dto;

import com.example.springboot.bean.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegFormDao extends BaseEntity {
    private Long uid;
    private String email;
    private String username;
    private String password;
    private String salt;
    private String code;
    private Integer types;
    private boolean ifExist = false; //默认用户不存在
    private boolean ifIllegal = true; //默认合法

}
