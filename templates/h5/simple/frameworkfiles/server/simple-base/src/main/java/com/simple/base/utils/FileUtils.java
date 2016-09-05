package com.simple.base.utils;

import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.zip.ZipInputStream;

import javax.imageio.ImageIO;

import org.apache.commons.codec.binary.Hex;
import org.apache.commons.lang3.StringUtils;


public class FileUtils {

	public static boolean writeStreamToFolder(InputStream in, String descPath) {
		boolean flag = true;
		try {
			BufferedInputStream buf = new BufferedInputStream(in);
			File file = new File(descPath);
			if (!file.getParentFile().exists()) {
				createFloder(file.getParentFile().getAbsolutePath());
			}
			BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(descPath));
			int c = 0;
			byte[] b = new byte[1024 * 4];
			while ((c = buf.read(b)) != -1) {
				out.write(b, 0, c);
			}
			out.flush();
			out.close();
			buf.close();
		}
		catch (FileNotFoundException e) {
			flag = false;
			throw new RuntimeException("xxx" + descPath + "vvv");
		}
		catch (Exception e) {
			flag = false;
			throw new RuntimeException(e);
		}
		return flag;
	}

	public static boolean writeImageFileToDisk(String descPath, BufferedImage image, String imagePrefix) {
		boolean flag = true;
		File file = null;
		try {
			file = new File(descPath);
			File parent = file.getParentFile();
			if (!parent.exists()) {
				flag = parent.mkdirs();
			}
			ImageIO.write(image, imagePrefix, file);
		}
		catch (Exception e) {
			flag = false;
			throw new RuntimeException(e);
		}
		return flag;
	}

	public static boolean writeFileToDisk(String descPath, ZipInputStream zip, boolean isDirectory) {
		BufferedOutputStream out = null;
		boolean flag = true;
		File file = null;
		try {
			file = new File(descPath);
			if (isDirectory) {
				return file.mkdirs();
			}
			else {
				File parent = file.getParentFile();
				if (!parent.exists()) {
					flag = parent.mkdirs();
				}
			}
			out = new BufferedOutputStream(new FileOutputStream(file));
			byte[] bt = new byte[1024 * 4];
			int length = 0;
			while ((length = zip.read(bt)) > 0) {
				out.write(bt, 0, length);
			}
			out.flush();
			out.close();
		}
		catch (Exception e) {
			flag = false;
			throw new RuntimeException(e);
		}
		return flag;
	}


	public static boolean createFloder(String filePath) {
		boolean flag = true;
		if (StringUtils.isBlank(filePath)) {
			return false;
		}
		File file = new File(filePath);
		if (!file.exists()) {
			flag = file.mkdirs();
		}
		return flag;
	}

	
	public static boolean createFile(String folderPath, String fileName) {
		boolean flag = true;
		File file = null;
		try {
			if (createFloder(folderPath)) {
				file = new File(folderPath + File.separator + fileName);
				if (!file.exists()) {
					flag = file.createNewFile();
				}
			}
		}
		catch (IOException e) {
			flag = false;
			e.printStackTrace();
		}
		return flag;
	}

	public static boolean deleteFolder(File folder) {
		boolean result = false;
		try {
			String childs[] = folder.list();
			if (childs == null || childs.length <= 0) {
				if (folder.delete()) {
					result = true;
				}
			}
			else {
				for (int i = 0; i < childs.length; i++) {
					String childName = childs[i];
					String childPath = folder.getPath() + File.separator + childName;
					File filePath = new File(childPath);
					if (filePath.exists() && filePath.isFile()) {
						if (filePath.delete()) {
							result = true;
						}
						else {
							result = false;
							break;
						}
					}
					else if (filePath.exists() && filePath.isDirectory()) {
						if (deleteFolder(filePath)) {
							result = true;
						}
						else {
							result = false;
							break;
						}
					}
				}
			}
			folder.delete();
		}
		catch (Exception e) {
			e.printStackTrace();
			result = false;
		}
		return result;
	}


	public static String getMd5(File file) {
		String md5Hex = "";
		try {
			DigestInputStream dis = new DigestInputStream(new FileInputStream(file), MessageDigest.getInstance("md5"));
			
			int buf = 1024;
			
			byte[] buffer = new byte[buf];
			while ((dis.read(buffer, 0, buf)) != -1) {
				dis.read(buffer, 0, buf);
			}
			dis.close();
			MessageDigest md = dis.getMessageDigest();
			byte[] b = md.digest();
			md5Hex = Hex.encodeHexString(b);
		}
		catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		catch (Exception e1) {
			e1.printStackTrace();
		}
		return md5Hex;
	}

	public static long sizeOf(File file) {

		if (!file.exists()) {
			String message = file + " does not exist";
			throw new IllegalArgumentException(message);
		}

		if (file.isDirectory()) {
			return sizeOfDirectory(file, null);
		}
		else {
			return file.length();
		}

	}

	public static long sizeOf(File file, FilenameFilter filter) {

		if (!file.exists()) {
			String message = file + " does not exist";
			throw new IllegalArgumentException(message);
		}

		if (file.isDirectory()) {
			return sizeOfDirectory(file, filter);
		}
		else {
			return file.length();
		}

	}

	/**
	 * Counts the size of a directory recursively (sum of the length of all
	 * files).
	 * 
	 * @param directory
	 *            directory to inspect, must not be {@code null}
	 * @return size of directory in bytes, 0 if directory is security restricted
	 * @throws NullPointerException
	 *             if the directory is {@code null}
	 */
	public static long sizeOfDirectory(File directory, FilenameFilter filter) {
		if (!directory.exists()) {
			String message = directory + " does not exist";
			throw new IllegalArgumentException(message);
		}

		if (!directory.isDirectory()) {
			String message = directory + " is not a directory";
			throw new IllegalArgumentException(message);
		}

		long size = 0;

		File[] files = directory.listFiles(filter);
		if (files == null) { // null if security restricted
			return 0L;
		}
		for (File file : files) {
			size += sizeOf(file, filter);
		}

		return size;
	}

	public static void main(String[] args) {

		FilenameFilter fileFilter1 = new FilenameFilter() {
			//@Override
			public boolean accept(File paramFile, String paramString) {
				paramString = paramString.toLowerCase();
				if (paramString.endsWith(".jpg") || paramString.endsWith(".png")) {
					return true;
				}
				else if (paramString.endsWith(".mp3")) {
					return true;
				}
				else if (paramString.lastIndexOf(".") == -1) {
					return true;
				}
				return true;
			}
		};
		System.out.println(FileUtils.sizeOfDirectory(new File("/opt/hiker/files/0086/32/05"), fileFilter1));
		
		System.out.println(FileUtils.getMd5(new File("/Users/ranfi/Desktop/Downloads/01000000015-1.zip")));
	}
}
