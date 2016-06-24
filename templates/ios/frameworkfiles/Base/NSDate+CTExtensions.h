//
//  NSDate+CTExtensions.h
//  CTFoundation
//
//  Created by Haoran Chen on 2/8/14.
//  Copyright (c) 2014 Ctrip. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSDate (CTExtensions)

/**
 *  是否是今天
 *
 *  @return 是否是今天
 */
- (BOOL)isToday;

/**
 *  是否和某日期是同一天
 *
 *  @param other 其他日期
 *
 *  @return 是否和某天是同一天
 */
- (BOOL)isSameDayAsDate:(NSDate *)other;

/**
 *  是否在某个日期以前
 *
 *  @param other 其他日期
 *
 *  @return 是否在某个日期以前
 */
- (BOOL)isBeforeDate:(NSDate *)date;

/**
 *  是否在某天以前或当天
 *
 *  @param other 其他日期
 *
 *  @return 是否在某天以前或当天
 */
- (BOOL)isBeforeOrEqualToDate:(NSDate *)date;

/**
 *  是否某天以后
 *
 *  @param other 其他日期
 *
 *  @return 是否某天以后
 */
- (BOOL)isAfterDate:(NSDate *)date;

/**
 *  是否某天以后或当天
 *
 *  @param other 其他日期
 *
 *  @return 是否某天以后或当天
 */
- (BOOL)isAfterOrEqualToDate:(NSDate *)date;

/**
 *  是否在两个日期之间 (earlyDate <= currentDate <= lateDate)
 *
 *  @param earlyDate 前面的日期
 *  @param lateDate  后面的日期
 *
 *  @return 是否在两个日期之间
 */
- (BOOL)isBetweenDate:(NSDate *)earlyDate andDate:(NSDate *)lateDate;

/**
 *  距离某天的天数
 *
 *  @param fromDate 某个日期
 *
 *  @return 天数
 */
- (NSInteger)dayIntervalSinceDate:(NSDate *)fromDate;

/**
 *  距离现在的时间差
 *
 *  @return 时间差
 */
- (NSTimeInterval)timeIntervalUntilNow;

@end
