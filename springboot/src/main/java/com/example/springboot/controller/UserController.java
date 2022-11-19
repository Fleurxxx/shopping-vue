package com.example.springboot.controller;

import com.example.springboot.bean.dto.LoginFormDTO;
import com.example.springboot.bean.dto.RegFormDao;
import com.example.springboot.bean.po.User;
import com.example.springboot.service.IUserService;
import com.example.springboot.service.ex.CodeNotMatchException;
import com.example.springboot.service.ex.CodeNotSendException;
import com.example.springboot.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.tags.EditorAwareTag;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController //等同于@Controller+@RequestBody
@RequestMapping("/users")
@CrossOrigin
public class UserController extends BaseController{

    @Autowired
    private IUserService userService;

    @GetMapping("/sendCode/{email}")
    public JsonResult<Void> sendCode(@PathVariable String email, HttpSession session) {
        String randomCode = userService.sendCode(email);
        session.setAttribute("code",randomCode);
        return new JsonResult<>(OK);
    }


    @RequestMapping("/reg")  // @RequestBody 表示此方法的响应结果以json格式进行数据的响应给到前端
    public JsonResult<Void> reg(@RequestBody RegFormDao user, HttpServletRequest request) {
        System.out.println(user);
        userService.reg(user,request);
        return new JsonResult<>(OK);

    }
//    public JsonResult<Void> reg(@RequestBody Map<String,Object> map) {
//        System.out.println(map.get("email"));
//        userService.reg(map);
//        return new JsonResult<>(OK);
//    }

    @RequestMapping("/login")
    public JsonResult<LoginFormDTO> login(@RequestBody LoginFormDTO user) {
        LoginFormDTO data = userService.login(user.getEmail(), user.getPassword());
        return new JsonResult<LoginFormDTO>(OK,data);
    }



    @GetMapping("/logout")
    public JsonResult<Void> logout(HttpServletRequest request){
        userService.logout(request);
        return new JsonResult<>(OK);
    }


}
