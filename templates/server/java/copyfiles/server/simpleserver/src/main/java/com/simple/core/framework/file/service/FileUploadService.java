package com.simple.core.framework.file.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simple.core.framework.file.dao.FileUploadInfo;
import com.simple.core.framework.file.dao.FileUploadRepository;



@Service
public class FileUploadService {
	@Autowired
	FileUploadRepository fileDao;
	public Long save(String filename, String filePath, int type){
		Long id  = fileDao.saveAndFlush(new FileUploadInfo(filename, filePath, type)).getId();
		return id;
	}
	public String getFilePathById(Long fId){
		return fileDao.findById(fId).getFullPath();
	}
}
