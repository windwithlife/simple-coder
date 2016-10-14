package com.simple.core.framework.file.dao;

import org.springframework.data.jpa.repository.JpaRepository;



public interface FileUploadRepository extends JpaRepository<FileUploadInfo, Long> {
	FileUploadInfo findById(Long id);
}