package com.example.springboot.service;

import com.example.springboot.bean.dto.LoginFormDTO;
import com.example.springboot.bean.dto.RegFormDao;
import com.example.springboot.bean.po.User;
import org.apache.ibatis.annotations.Param;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

/**
 * 用户模块业务层接口
 */
public interface IUserService {

    /** 注册 */
    void reg(RegFormDao user, HttpServletRequest request);

    /** 登录 */
    LoginFormDTO login(String username, String password);

    /** 发送验证码 */
    String sendCode(String to);

    /** 根据用户的uid查询用户的数据 */
    User findByUid(Integer uid);

    /** 根据用户的uid来修改用户密码 */
    Integer updatePasswordByUid(Integer uid, String password, String modifiedUser, Date modifiedTime);

    /** 根据用户的uid更新用户的信息 */
    Integer updateInfoByUid(User user);

    /** 上传头像 */
    void uploadImg(Integer uid, String avatar, String username);

    /** 根据用户uid修改用户的头像 */
    Integer updateImgByUid(@Param("uid") Integer id, String img, String modifiedUser, Date modifiedTime);


    /** 退出登录 */
    void logout(HttpServletRequest request);

}
