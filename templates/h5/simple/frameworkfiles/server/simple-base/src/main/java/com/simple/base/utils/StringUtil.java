package com.simple.base.utils;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.Clob;
import java.sql.Date;
import java.text.MessageFormat;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;

public class StringUtil {

	private StringUtil() {
	}

	private static char char2Alpha(char ch) {
		if (ch >= 'a' && ch <= 'z')
			return (char) ((ch - 97) + 65);
		if (ch >= 'A' && ch <= 'Z')
			return ch;
		int gb = gbValue(ch);
		if (gb < table[0])
			return '0';
		int i;
		for (i = 0; i < 26; i++)
			if (match(i, gb))
				break;

		if (i >= 26)
			return '0';
		else
			return alphatable[i];
	}

	public static String string2Alpha(String SourceStr) {
		String Result = "";
		int StrLength = SourceStr.length();
		try {
			for (int i = 0; i < StrLength; i++)
				Result = (new StringBuilder(String.valueOf(Result))).append(char2Alpha(SourceStr.charAt(i))).toString();

		} catch (Exception e) {
			Result = "";
		}
		return Result.toLowerCase();
	}

	private static boolean match(int i, int gb) {
		if (gb < table[i])
			return false;
		int j;
		for (j = i + 1; j < 26 && table[j] == table[i]; j++)
			;
		if (j == 26)
			return gb <= table[j];
		return gb < table[j];
	}

	private static int gbValue(char ch) {
		String str;
		str = new String();
		str = (new StringBuilder(String.valueOf(str))).append(ch).toString();
		byte bytes[];
		try {
			bytes = str.getBytes("GB2312");
			if (bytes.length < 2)
				return 0;
			return (bytes[0] << 8 & 65280) + (bytes[1] & 255);
		} catch (Exception e) {
			return 0;
		}
	}

	public static String removeDots(String value) {
		if (value.indexOf(",") < 0)
			return value;
		try {
			return String.valueOf(new BigDecimal(value.replaceAll(",", "")));
		} catch (Exception exception) {
			return value;
		}
	}

	public static String formatIntToStringByBit(int curValue, int bit) {
		String curValueStr = (new StringBuilder(String.valueOf(curValue))).toString();
		int tempLen = bit - curValueStr.length();
		if (tempLen <= 0)
			return curValueStr;
		for (int i = 0; i < tempLen; i++)
			curValueStr = (new StringBuilder("0")).append(curValueStr).toString();

		return curValueStr;
	}

	public static String objectToString(Object obj, String encoding) throws Exception {
		java.io.InputStream is = null;
		if (obj instanceof Blob)
			is = ((Blob) obj).getBinaryStream();
		else
			is = ((Clob) obj).getAsciiStream();
		char buf[] = new char[1024];
		BufferedReader breader = new BufferedReader(new InputStreamReader(is, encoding));
		int len = 0;
		StringBuffer buffer = new StringBuffer();
		while ((len = breader.read(buf)) != -1)
			buffer.append(buf, 0, len);
		return buffer.toString();
	}

	public static String dateToString(Object obj) {
		if (obj == null)
			return "";
		Calendar cal = Calendar.getInstance();
		if (obj instanceof Date) {
			cal.setTime((Date) obj);
		} else {
			String s = obj.toString();
			if (s.length() > 6) {
				cal.setTime(java.sql.Date.valueOf(s));
			} else {
				String year = (new StringBuilder(String.valueOf(cal.get(1)))).toString();
				String month = (new StringBuilder(String.valueOf(cal.get(2) + 1))).toString();
				cal.setTime(java.sql.Date.valueOf((new StringBuilder(String.valueOf(s.substring(0, 4)))).append("-")
						.append(s.substring(4, 6)).append("-01").toString()));
				return (new StringBuilder(String.valueOf(year))).append("\u5E74").append(month).append("\u6708")
						.toString();
			}
		}
		String year = (new StringBuilder(String.valueOf(cal.get(1)))).toString();
		String month = (new StringBuilder(String.valueOf(cal.get(2) + 1))).toString();
		String date = (new StringBuilder(String.valueOf(cal.get(5)))).toString();
		return (new StringBuilder(String.valueOf(year))).append("\u5E74").append(month).append("\u6708").append(date)
				.append("\u65E5").toString();
	}

	public static String getUUID() {
		UUID uuid = UUID.randomUUID();
		return uuid.toString().replaceAll("\\-", "");
	}

	public static String getChineseDate() {
		Calendar c = Calendar.getInstance();
		return (new StringBuilder(String.valueOf(c.get(1)))).append("\u5E74").append(c.get(2) + 1).append("\u6708")
				.append(c.get(5)).append("\u65E5").toString();
	}

	public static String getChineseWeek() {
		Calendar c = Calendar.getInstance();
		String dayOfWeek = "\u661F\u671F";
		switch (c.get(7)) {
		case 1: // '\001'
			dayOfWeek = (new StringBuilder(String.valueOf(dayOfWeek))).append("\u5929").toString();
			break;

		case 2: // '\002'
			dayOfWeek = (new StringBuilder(String.valueOf(dayOfWeek))).append("\u4E00").toString();
			break;

		case 3: // '\003'
			dayOfWeek = (new StringBuilder(String.valueOf(dayOfWeek))).append("\u4E8C").toString();
			break;

		case 4: // '\004'
			dayOfWeek = (new StringBuilder(String.valueOf(dayOfWeek))).append("\u4E09").toString();
			break;

		case 5: // '\005'
			dayOfWeek = (new StringBuilder(String.valueOf(dayOfWeek))).append("\u56DB").toString();
			break;

		case 6: // '\006'
			dayOfWeek = (new StringBuilder(String.valueOf(dayOfWeek))).append("\u4E94").toString();
			break;

		case 7: // '\007'
			dayOfWeek = (new StringBuilder(String.valueOf(dayOfWeek))).append("\u516D").toString();
			break;
		}
		return dayOfWeek;
	}

	public static String formatPlaceholderOfString(String paramString, List<? super Object> param) {
		return MessageFormat.format(paramString, param.toArray());
	}

	public static String convertList2StrWithDelimiter(Object[] obj) {
		if (null == obj || obj.length == 0)
			return "";
		String result = "";
		if (obj instanceof String[]) {
			String strs = "";
			for (String str : (String[]) obj) {
				if (StringUtils.isNotBlank(str)) {
					strs += "'" + str + "'" + ",";
				}
			}
			result = strs.substring(0, strs.lastIndexOf(","));
		} else {
			result = StringUtils.join(obj, ",");
		}
		return result;
	}

	public static void main(String args[]) {
		System.out.println(string2Alpha("\u4FE1\u606F\u7C7B\u578B"));
		System.out.println(dateToString("200910"));
	}

	private static char chartable[] = { '\u554A', '\u82AD', '\u64E6', '\u642D', '\u86FE', '\u53D1', '\u5676', '\u54C8',
			'\u54C8', '\u51FB', '\u5580', '\u5783', '\u5988', '\u62FF', '\u54E6', '\u556A', '\u671F', '\u7136',
			'\u6492', '\u584C', '\u584C', '\u584C', '\u6316', '\u6614', '\u538B', '\u531D', '\u5EA7' };
	private static char alphatable[] = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
			'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };
	private static int table[];

	static {
		table = new int[27];
		for (int i = 0; i < 27; i++)
			table[i] = gbValue(chartable[i]);

	}
}
