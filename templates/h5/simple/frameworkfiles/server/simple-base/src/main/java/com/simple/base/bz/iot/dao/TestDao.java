package com.simple.base.bz.iot.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

import org.apache.ibatis.annotations.*;

import com.simple.base.bz.iot.entity.DeviceType;

@Mapper
public interface TestDao {

    @Select("SELECT * FROM DEVICE_TYPE WHERE NAME = #{name}")
    List<DeviceType> findByName(@Param("name") String name);

    //@Insert("INSERT INTO USER(NAME, AGE) VALUES(#{name}, #{age})")
    //int insert(@Param("name") String name, @Param("age") Integer age);

}