package com.example.springboot.mapper;

import com.example.springboot.bean.po.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

/**
 * 1.@RunWith表示启动这个单元测试类,否则这个单元测试类是不能运行的,需要传递
 * 一个参数,该参数必须是SpringRunner.class即SpringRunner的实例类型
 * 2.敲完@RunWith(SpringRunner.class)后鼠标分别放在SpringRunner和@RunWith上按alt+enter分别导入包
 * 3.单元测试类中出现的方法必须是单元测试方法
 * 4.单元测试方法的特点:必须被@Test注解修饰;返回值类型必须是void;方法的参数列表不指定任何类型;方法的访问修饰符必须是public
 */

@SpringBootTest
@RunWith(SpringRunner.class)
public class UserMapperTests {
    //idea有检测功能,接口不能够直接创建Bean的(动态代理技术来解决)
    @Autowired
    private UserMapper userMapper;

    @Test
    public void addUser() {
        User user = new User();
        user.setUsername("张三");
        user.setPassword("123456");
        Integer rows = userMapper.addUser(user);
        System.out.println(rows);
    }

    @Test
    public void findByUsername() {
        User user = userMapper.findByUsername("张三");
        System.out.println(user);
    }

    @Test
    public void findByEmail(){
        User user = userMapper.findByEmail("rr66rr");
        System.out.println(user);
    }

    @Test
    public void findByUid(){
        User user = userMapper.findByUid(1);
        System.out.println(user);
    }

    @Test
    public void updatePasswordByUid(){
        Integer num = userMapper.updatePasswordByUid(1,"123123","111",new Date());
        System.out.println(num);
    }

    @Test
    public void updateInfoByUid(){
        User user = new User();
        user.setUsername("王五");
        user.setUid((long) 16);
        Integer num = userMapper.updateInfoByUid(user);
        System.out.println(num);
    }

    @Test
    public void updateImgByUid(){
        Integer num = userMapper.updateImgByUid(1, "abc", "mxy", new Date());
        System.out.println(num);
    }


}
