package com.simple.core.framework.mongo.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import com.simple.core.framework.mongo.entity.Person;



@RepositoryRestResource(path="people")
public interface PersonRepository extends MongoRepository<Person, String> {
	@RestResource(path="findByName", rel="findByName")
	 Person findByName(String name);
	
	 @Query("{'age': ?0}")
	 List<Person> withQueryFindByAge(Integer age);

}
