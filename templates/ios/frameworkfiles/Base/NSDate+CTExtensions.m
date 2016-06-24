//
//  NSDate+CTExtensions.m
//  CTFoundation
//
//  Created by Haoran Chen on 2/8/14.
//  Copyright (c) 2014 Ctrip. All rights reserved.
//

#import "NSDate+CTExtensions.h"

@implementation NSDate (CTExtensions)

- (long)dayNumber
{
    return (long)floor(([self timeIntervalSinceReferenceDate] + [[NSTimeZone localTimeZone] secondsFromGMTForDate:self]) / (double)(60 * 60 * 24));
}

- (NSDate *)boundaryForCalendarUnit:(NSCalendarUnit)calendarUnit
{
	NSDate *boundary;
	[[NSCalendar currentCalendar] rangeOfUnit:calendarUnit startDate:&boundary interval:NULL forDate:self];
	return boundary;
}

- (NSDate *)dayBoundary
{
	return [self boundaryForCalendarUnit:NSDayCalendarUnit];
}

- (NSDate *)minuteBoundary
{
	return [self boundaryForCalendarUnit:NSMinuteCalendarUnit];
}

- (BOOL)isToday
{
    return [self isSameDayAsDate:[NSDate date]];
}

- (BOOL)isSameDayAsDate:(NSDate *)other
{
    BOOL retValue = YES;
	
    if (self != other)
    {
        retValue = ([self dayNumber] == [other dayNumber]);
    }
	
    return retValue;
}

- (BOOL)isBeforeDate:(NSDate *)date
{
	return ([self compare:date] == NSOrderedAscending);
}

- (BOOL)isAfterDate:(NSDate *)date
{
	return ([self compare:date] == NSOrderedDescending);
}

- (BOOL)isBeforeOrEqualToDate:(NSDate *)date
{
	return ! [self isAfterDate:date];
}

- (BOOL)isAfterOrEqualToDate:(NSDate *)date
{
	return ! [self isBeforeDate:date];
}

- (BOOL)isBetweenDate:(NSDate *)earlyDate andDate:(NSDate *)lateDate
{
	return ([self isAfterOrEqualToDate:earlyDate] && [self isBeforeOrEqualToDate:lateDate]);
}

- (NSInteger)dayIntervalSinceDate:(NSDate *)date
{
    NSDateComponents *dc = [[NSCalendar currentCalendar] components:NSDayCalendarUnit fromDate:[date dayBoundary] toDate:[self dayBoundary] options:0];
	
	return [dc day];
}

- (NSTimeInterval)timeIntervalUntilNow
{
	return -[self timeIntervalSinceNow];
}

@end
