package com.example.springboot.mapper;

import com.example.springboot.bean.po.User;

import java.util.Date;


public interface UserMapper {

    /** 插入用户的输入 */
    Integer addUser(User user);
    /** 根据用户名查询用户数据 */
    User findByUsername(String username);
    /** 根据用户名查询用户数据 */
    User findByEmail(String email);
    /** 根据用户的uid查询用户的数据 */
    User findByUid(Integer uid);
    /** 根据用户的uid来修改用户密码 */
    Integer updatePasswordByUid(Integer uid, String password, String modifiedUser, Date modifiedTime);
    /** 根据用户的uid更新用户的信息 */
    Integer updateInfoByUid(User user);
    /** 根据用户uid修改用户的头像 */
    Integer updateImgByUid(Integer uid, String image, String modifiedUser, Date modifiedTime);
    /** */
    /** */
    /** */
    /** */
    /** */
    /** */


}
