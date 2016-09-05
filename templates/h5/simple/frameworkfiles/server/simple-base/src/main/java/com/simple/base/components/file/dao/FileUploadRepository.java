package com.simple.base.components.file.dao;

import org.springframework.data.jpa.repository.JpaRepository;



public interface FileUploadRepository extends JpaRepository<FileUploadInfo, Long> {
	FileUploadInfo findById(Long id);
}