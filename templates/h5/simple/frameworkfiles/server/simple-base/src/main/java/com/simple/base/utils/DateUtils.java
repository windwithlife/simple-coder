package com.simple.base.utils;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.apache.commons.lang3.StringUtils;

public class DateUtils {

	private static final String DEFAULT_FORMAT = "yyyy-MM-dd HH:mm:ss";
	public static final String DATE_FORMAT = "yyyy-MM-dd";

	private DateUtils() {
	}

	public static Timestamp str2Timestamp(String time) {
		java.util.Date date = str2Date(time, DEFAULT_FORMAT);
		return new Timestamp(date.getTime());
	}

	public static String date2Str(java.util.Date date, String format) {
		if (null == date) {
			return null;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.format(date);
	}

	public static String timestamp2Str(Timestamp time) {
		if (null == time)
			return null;
		java.util.Date date = new java.util.Date(time.getTime());
		return date2Str(date, DEFAULT_FORMAT);
	}

	public static java.util.Date str2Date(String time, String format) {
		if (StringUtils.isBlank(time))
			return null;
		format = StringUtils.isNotBlank(format) ? format : DEFAULT_FORMAT;
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		java.util.Date date = null;
		try {
			date = sdf.parse(time);
			return date;
		}
		catch (ParseException e) {
			return null;
		}
	}

	public static Date queryCurrDate(Timestamp currTime) {
		return Date.valueOf(queryCurrDate2String(currTime));
	}

	public static String queryCurrDate2String(Timestamp currTime) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(currTime);
	}

	public static String queryCurrDateWith8Bit(Timestamp currTime) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		return sdf.format(currTime);
	}

	public static String queryCurrYearWith4Bit(Date currDate) {
		Calendar c = Calendar.getInstance();
		c.setTime(currDate);
		return String.valueOf(c.get(1));
	}

	public static String queryCurrYearWith2Bit(Date currDate) {
		Calendar c = Calendar.getInstance();
		c.setTime(currDate);
		String year = (new StringBuilder(String.valueOf(c.get(1)))).toString();
		return year.substring(year.length() - 2, year.length());
	}

	public static String queryCurrMonthWith2Bit(Date currDate) {
		Calendar c = Calendar.getInstance();
		c.setTime(currDate);
		int month = c.get(2) + 1;
		if (month < 10)
			return (new StringBuilder("0")).append(month).toString();
		else
			return (new StringBuilder()).append(month).toString();
	}

	public static String queryCurrDayWith2Bit(Date currDate) {
		Calendar c = Calendar.getInstance();
		c.setTime(currDate);
		int date = c.get(5);
		if (date < 10)
			return (new StringBuilder("0")).append(date).toString();
		else
			return (new StringBuilder()).append(date).toString();
	}

	public static String querySssq(Timestamp currTime) {
		Calendar c = Calendar.getInstance();
		c.setTime(queryCurrDate(currTime));
		int year = c.get(1);
		int month = c.get(2) + 1;
		if (month < 10)
			return (new StringBuilder(String.valueOf(year))).append("0").append(month).toString();
		else
			return (new StringBuilder(String.valueOf(year))).append(month).toString();
	}

	public static String querySssq(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		int year = c.get(1);
		int month = c.get(2) + 1;
		if (month < 10)
			return (new StringBuilder(String.valueOf(year))).append("0").append(month).toString();
		else
			return (new StringBuilder(String.valueOf(year))).append(month).toString();
	}

	public static String querySbSssq(Timestamp currTime) {
		Calendar c = Calendar.getInstance();
		c.setTime(queryCurrDate(currTime));
		int year = c.get(1);
		int month = c.get(2);
		if (month == 0) {
			month = 12;
			year--;
		}
		if (month < 10)
			return (new StringBuilder(String.valueOf(year))).append("0").append(month).toString();
		else
			return (new StringBuilder(String.valueOf(year))).append(month).toString();
	}

	public static String querySbSssq(java.util.Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		int year = c.get(1);
		int month = c.get(2);
		if (month == 0) {
			month = 12;
			year--;
		}
		if (month < 10)
			return (new StringBuilder(String.valueOf(year))).append("0").append(month).toString();
		else
			return (new StringBuilder(String.valueOf(year))).append(month).toString();
	}

	public static Date queryFirstDayOfCurrDate(Date currDate) {
		Calendar c = Calendar.getInstance();
		c.setTime(currDate);
		int year = c.get(1);
		int month = c.get(2);
		c.set(year, month, 1);
		return new Date(c.getTimeInMillis());
	}

	public static Date queryFirstDayOfLastDate(Date currDate) {
		Calendar c = Calendar.getInstance();
		c.setTime(currDate);
		int year = c.get(1);
		int month = c.get(2);
		if (--month == -1) {
			year--;
			month = 11;
		}
		c.set(year, month, 1);
		return new Date(c.getTimeInMillis());
	}

	public static Date queryLastDayOfCurrDate(Date currDate) {
		Calendar c = Calendar.getInstance();
		c.setTime(currDate);
		int year = c.get(1);
		int month = c.get(2);
		int date = c.getActualMaximum(5);
		c.set(year, month, date);
		return new Date(c.getTimeInMillis());
	}

	public static String queryYMDCurrDate(Date currDate) {
		String ymd = (new StringBuilder(String.valueOf(queryCurrYearWith4Bit(currDate))))
				.append(queryCurrMonthWith2Bit(currDate)).append(queryCurrDayWith2Bit(currDate)).toString();
		return ymd;
	}

	public static Timestamp addDays(Timestamp timestamp, int days) {
		Calendar c = Calendar.getInstance();
		c.setTimeInMillis(timestamp.getTime());
		int year = c.get(Calendar.YEAR);
		int month = c.get(Calendar.MONTH);
		int date = c.get(Calendar.DATE);
		c.set(year, month, date + days);
		return new Timestamp(c.getTimeInMillis());
	}
	
	public static Timestamp addDays(Timestamp timestamp, int days, int hours, int minutes) {
        Calendar c = Calendar.getInstance();
        c.setTimeInMillis(timestamp.getTime());
        int year = c.get(Calendar.YEAR);
        int month = c.get(Calendar.MONTH);
        int date = c.get(Calendar.DATE);
        int hour = c.get(Calendar.HOUR_OF_DAY);
        int minute = c.get(Calendar.MINUTE);
        c.set(year, month, date + days,hour+hours,minute+minutes);
        return new Timestamp(c.getTimeInMillis());
    }

	public static Date addDays(Date d, int days) {
		Calendar c = Calendar.getInstance();
		c.setTimeInMillis(d.getTime());
		int year = c.get(Calendar.YEAR);
		int month = c.get(Calendar.MONTH);
		int date = c.get(Calendar.DATE);
		c.set(year, month, date + days);
		return new Date(c.getTimeInMillis());
	}

	public static int compare2date(Calendar c1, Calendar c2) {
		return (c1.getTimeInMillis() - c2.getTimeInMillis()) > 0 ? 1
				: ((c1.getTimeInMillis() - c2.getTimeInMillis() == 0) ? 0 : -1);
	}

	public static void main(String[] args) {
		System.out.println(new Timestamp(System.currentTimeMillis()));
		System.out.println(queryFirstDayOfCurrDate(new Date(System.currentTimeMillis())));
	}
}
