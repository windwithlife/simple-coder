package com.simple.core.framework.file.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.support.RequestContext;

import com.simple.core.framework.file.service.FileUploadService;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.ProgressListener;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FileUtils;

@RequestMapping("/files")
@Controller
public class FileController {
    
	//private String fileBasePath = "e:/upload/images/";
	@Value("${upload.path}") 
	private String fileBasePath;
	
	
	@Autowired
	FileUploadService fileservice;
	
	

	@RequestMapping(value = "/uploadpage", method = RequestMethod.POST)
	public String uploadfile() {
		return "upload";
	}

	@RequestMapping(value = "/getFilePath", method = RequestMethod.GET)
	@ResponseBody
	public String getFileFullPath(@RequestParam("id") Long fId) {
		return fileservice.getFilePathById(fId);
	}
	@RequestMapping(value = "/upload",  method = RequestMethod.POST)
	@ResponseBody
	public String handleFileUpload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
	   //RequestContextHolder.getRequestAttributes();
                      
		//ServletContext sc = request.getSession().getServletContext();
		//String fileBasePath = sc.getRealPath("/upload") + "/";
		
		String filePath = fileBasePath + file.getOriginalFilename();
		String urlPath = "/images/" + file.getOriginalFilename();
		if (!file.isEmpty()) {
			try {
				file.transferTo(new File(filePath));
				//BufferedOutputStream out = new BufferedOutputStream(
				//		new FileOutputStream(new File(filePath)));
				//out.write(file.getBytes());
				//out.flush();
				//out.close();
			} catch (FileNotFoundException e) {
				e.printStackTrace();
				return "上传失败," + e.getMessage();
			} catch (IOException e) {
				e.printStackTrace();
				return "上传失败," + e.getMessage();
			}
			String filename = file.getOriginalFilename();
			Long id = fileservice.save(filename, urlPath, 0);
			
			System.out.println(filePath);
			String msg =  "file:" + urlPath + "[ID:" +  id + "] 上传成功";
			return "<script>window.parent.uploadSucced('" + msg + "','" + id + "','" +urlPath + "');</script>";
		} else {
			 return "<script>window.parent.uploadFailed('" + "文件空文件" + "');</script>";
		}
	}

	@SuppressWarnings("finally")
	@RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
	@ResponseBody
	public String FileUpload(@RequestParam("file") MultipartFile file) {
		String filePath = fileBasePath + file.getOriginalFilename();
		if (!file.isEmpty()) {
			try {
				
				FileUtils.writeByteArrayToFile(new File(filePath),
						file.getBytes());

			} catch (IOException e) {
				e.printStackTrace();
				return "上传失败," + e.getMessage();
			} finally {
				final String filename = file.getOriginalFilename();
				fileservice.save(filename, filePath, 0);
				System.out.println(filePath);
				return "file:" + filePath + "上传成功";
			}

		} else {
			return "上传失败，因为文件是空的.";
		}
	}

	@RequestMapping(value = "/uploadFiles", method = RequestMethod.POST)
	@ResponseBody
	public String FilesUpload(HttpServletRequest request) {
		int failedNumber = 0;
		List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("file");
		for (int i = 0; i < files.size(); ++i) {
			
			MultipartFile file = files.get(i);
			String filePath = fileBasePath + file.getOriginalFilename();
			if (!file.isEmpty()) {
				try {
					
					FileUtils.writeByteArrayToFile(new File(filePath),
							file.getBytes());

				} catch (IOException e) {
					
					System.out.println("Failed to upload file:" + file.getOriginalFilename());
					failedNumber++;
					e.printStackTrace();
				} finally {
					String filename = file.getOriginalFilename();
					fileservice.save(filename, filePath, 0);
					System.out.println("success to upload file:" + filePath);
									
				}

			} else {
				failedNumber++;
				System.out.println("Failed to upload file:" + file.getOriginalFilename());
			}
		}
		
		return "success for upload files";
	}//end fo filesupload
	
	@RequestMapping(value = "/uploadfile2", method = RequestMethod.POST)  
    public ModelAndView upload(HttpServletRequest request,  
            HttpServletResponse response) throws Exception {  
        final HttpSession hs = request.getSession();  
        ModelAndView mv = new ModelAndView();
        boolean isMultipart = ServletFileUpload.isMultipartContent(request);  
        if(!isMultipart){  
            return mv;  
        }  
        // Create a factory for disk-based file items  
        FileItemFactory factory = new DiskFileItemFactory();  
   
        // Create a new file upload handler  
        ServletFileUpload upload = new ServletFileUpload(factory);  
        upload.setProgressListener(new ProgressListener(){  
               public void update(long pBytesRead, long pContentLength, int pItems) {  
                   ProcessInfo pri = new ProcessInfo();  
                   pri.itemNum = pItems;  
                   pri.readSize = pBytesRead;  
                   pri.totalSize = pContentLength;  
                   pri.show = pBytesRead+"/"+pContentLength+" byte";  
                   pri.rate = Math.round(new Float(pBytesRead) / new Float(pContentLength)*100);  
                   hs.setAttribute("proInfo", pri);  
               }  
            });  
        List<FileItem> items = upload.parseRequest(request);
        String path = request.getSession().getServletContext().getRealPath("upload");
        System.out.println(path);
        for(FileItem item : items){
            if(item.isFormField()){
                 
            }else{
                System.out.println(path +"/"+  item.getFieldName());
                File targetFile = new File(path +"/"+ item.getName());
                if(!targetFile.exists()){
                    targetFile.createNewFile();
                }
                item.write(targetFile);
            }
        }
        System.out.println("上传文件的个数为：" + items.size());
        return mv;
    }  
	/** 
     * process 获取进度 
     * @param request 
     * @param response 
     * @return 
     * @throws Exception 
     */ 
    @RequestMapping(value = "/process", method = RequestMethod.GET)  
    @ResponseBody 
    public Object process(HttpServletRequest request,  
            HttpServletResponse response) throws Exception {  
        return ( ProcessInfo)request.getSession().getAttribute("proInfo");  
    }  
	class ProcessInfo{  
        public long totalSize = 1;  
        public long readSize = 0;  
        public String show = "";  
        public int itemNum = 0;  
        public int rate = 0;  
    }  
}
