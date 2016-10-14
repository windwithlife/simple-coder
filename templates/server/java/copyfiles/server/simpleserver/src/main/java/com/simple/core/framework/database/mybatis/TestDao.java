package com.simple.core.framework.database.mybatis;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.simple.core.base.user.entity.User;

import java.util.List;

import org.apache.ibatis.annotations.*;



@Mapper
public interface TestDao {

    @Select("SELECT * FROM USER WHERE NAME = #{name}")
    List<User> findByName(@Param("name") String name);

    //@Insert("INSERT INTO USER(NAME, AGE) VALUES(#{name}, #{age})")
    //int insert(@Param("name") String name, @Param("age") Integer age);

}