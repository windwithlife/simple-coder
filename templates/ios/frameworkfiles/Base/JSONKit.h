//
//  JSONKit.h
//  CTFoundation
//
//  Created by jimzhao on 14-2-8.
//  Copyright (c) 2014年 Ctrip. All rights reserved.
//

#import <Foundation/Foundation.h>

#pragma mark ----- NSData(CTJSON)
////////////////////////////////////////////////////////////////////////////////

@interface NSData(CTJSON)

/**
 *  Data(UTF8编码)转换成Dictionary
 *
 *  @return Data(UTF8编码)对应的Dictionary
 */
- (NSDictionary *)objectFromJSONData;

@end

#pragma mark ----- NSString(CTJSON)
////////////////////////////////////////////////////////////////////////////////

@interface NSString(CTJSON)

/**
 *  JSON格式的字符串转换成Dictionary
 *
 *  @return JSON字符串对应的Dictionary
 */
- (NSDictionary *)objectFromJSONString;

/**
 *  NSString转换为JSON格式的NSData
 *
 *  @return 返回String对应的JSON NSData
 */
- (NSData *)JSONData;

@end


#pragma mark ----- NSDictionary(CTJSON)
////////////////////////////////////////////////////////////////////////////////

@interface NSDictionary(CTJSON)

/**
 *  Dictionary转换为JSON字符串
 *
 *  @return 返回Dict对应的JSON字符串
 */
- (NSString *)JSONString;

/**
 *  NSDictionary转换为JSON格式的NSData
 *
 *  @return 返回Dict对应的JSON NSData
 */
- (NSData *)JSONData;

@end


#pragma mark ----- NSArray(CTJSON)
////////////////////////////////////////////////////////////////////////////////

@interface NSArray(CTJSON)

/**
 *  Dictionary转换为JSON字符串
 *
 *  @return 返回Dict对应的JSON字符串
 */
- (NSString *)JSONString;

/**
 *  NSArray转换为JSON格式的NSData
 *
 *  @return 返回Array对应的JSON NSData
 */
- (NSData *)JSONData;

@end


