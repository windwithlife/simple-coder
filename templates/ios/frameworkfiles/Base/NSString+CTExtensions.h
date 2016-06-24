//
//  NSString+CTExtensions.h
//  CTUtility
//
//  Created by jimzhao on 13-12-11.
//  Copyright (c) 2013年 jimzhao. All rights reserved.
//  NSString 扩展

#import <Foundation/Foundation.h>
#import "CTJSONModel.h"

/** NSString_CTExtensions类说明 */

#pragma mark - String Utils

@interface NSString(Utils)

/**
 *  @brief 判断当前字符串中是否包含子串
 *
 *  @param string 需要检查的子串
 *
 *  @return 如果当前字符串中包含子串，返回true，否则false
 */
- (BOOL)containsString:(NSString *)string;

/**
 *  判断当前字符串中是否包含子串,不区分大小写
 *
 *  @param string  需要检查的子串
 *
 *  @return 如果当前字符串中包含子串，返回true，否则false
 */
- (BOOL)containsStringIgnoreCase:(NSString *)string;

/**
 *  正则表达式匹配
 *
 *  @param regexp  需要匹配的正则表达式
 *
 *  @return 匹配成功，返回true，否则false
 */
- (BOOL)match:(NSString *)regexp;


/**
 *  生成UUID
 *
 *  @return 生成的UUID字符串
 */
+ (NSString *)UUIDString;

/**
 *  删除字符串前面的空白
 *
 *  @return 删除前面空白的字符串
 */
- (NSString *)trimPrefixBlank;

/**
 *  删除字符串后面的空白
 *
 *  @return 被删末尾空格的字符串
 */
- (NSString *)trimSufixBlank;

/**
 *  删除首尾的空白字符串
 *
 *  @return 首尾字符串被删除的字符串
 */
- (NSString *)trimBlank;


+ (BOOL)isEmpty:(NSString *)str;

- (BOOL)isNumber;

/**
 *  判断字符串中是否全部是ASCII码
 *
 *  @return 全部ASCII，返回YES，否则返回NO
 */
- (BOOL)isASCII;

/**
 *  判断是否是合法的Email地址
 *
 *  @return email合法返回YES，否则返回NO
 */
- (BOOL)isLegalEmail;

/**
 *  判断是否是合法手机号码，格式：13，14，15，18开头，且为11位数字
 *
 *  @return 手机号码合法返回YES，否则返回NO
 */
- (BOOL)isLegalMobilePhone;

/**
 *  包装SDK的substringFromIndex:
 *
 *  @param from
 *
 *  @return 返回sub的字符串
 */
- (NSString *)subStringFromIndex:(NSUInteger)from;

/**
 *  包装SDK的substringToIndex:
 *
 *  @param to
 *
 *  @return 返回sub的字符串
 */
- (NSString *)subStringToIndex:(NSUInteger)to;

/**
 *  包装SDK的substringWithRange:
 *
 *  @param range
 *
 *  @return 返回sub的字符串
 */
- (NSString *)subStringWithRange:(NSRange)range;

/**
 *  字符串转换成UTF8编码的Data
 *
 *  @return UTF8编码之后的Data
 */
- (NSData *)UTF8Data;

/**
 *  判断字符串是否相等，不区分大小写
 *
 *  @param cmpString 需要比较的字符串
 *
 *  @return 相等返回true，否则返回false
 */
- (BOOL)equalIgnoreCase:(NSString *)cmpString;

@end

#pragma mark - String URL相关

@interface NSString(URL)

/**
 *  字符串转换成URL对象，#会在内部处理
 *
 *  @return 转换成的URL对象
 */
- (NSURL *)toURL;

/**
 *  对URL做UTF8编码
 *
 *  @return UTF8编码之后的URL字符串
 */
- (NSString *)URLEncode;
/**
 *  对NSString做URLEncode编码
 *
 *  @return NSString的URLEncode字符串
 */
- (NSString *)stringURLEncoded;

/**
 *  对NSString做URLDecoded编码
 *
 *  @return NSString的URLDecoded字符串
 */
-(NSString *)stringURLDecode;

/**
 *  对NSString做URIEncoded编码
 *
 *  @return NSString的URIEncoded字符串
 */
-(NSString*)encodeAsURIComponent;

/**
 *  对URL做UTF8解码
 *
 *  @return UTF8解码之后的URL字符串
 */
- (NSString *)URLDecode;

@end

#pragma mark - String Hash相关

@interface NSString(Hash)


/**
 * @brief 计算NSString的MD5哈希函数
 *
 * @return 返回NSString的MD5哈希值，长度32，大写
 */
- (NSString *)MD5;

/**
 * @brief 计算NSString的SHA1哈希函数
 *
 * @return 返回NSString的SHA1哈希值，长度40，大写
 */
- (NSString *)SHA1;

/**
 * @brief 计算NSString的SHA256哈希函数
 *
 * @return 返回NSString的SHA256哈希值，长度64，大写
 */
- (NSString *)SHA256;

@end

#pragma mark - String Base64 Encode/Decode

@interface NSString(Base64)

/**
 *  将字符串进行base64 编码
 *
 *  @return base64编码之后的字符串
 */
- (NSString *)Base64EncodeToString;

/**
 *  字符串base64解码成字符串
 *
 *  @param base64String 需要解码的base64字符串
 *
 *  @return 解码之后的base64字符串
 */
- (NSString *)Base64DecodeToString;

/**
 *  将base64字符串解码成Data
 *
 *  @return base64字符串解码之后的Data
 */
- (NSData *)Base64DecodeToData;

@end

@interface NSString(File_UTF8)

- (BOOL)appendToFile:(NSString *)path;

- (BOOL)writeToFile:(NSString *)path;

@end

@interface NSString(Serialize)

/**
 *  字符串转换成对象，不做嵌套对象/容器内对象的转换
 *  参考NSObject扩展，- (NSString *)toSimpleString;
 *  @param cls 转换成的对象类型
 *
 *  @return 字符串对应的对象
 */
- (id)toSimpleObject:(Class)classz;

@end

@interface NSString(OLD)

/**
 *  URL Encode字符串 (非stringByAddingPercentEscapesUsingEncoding方式)
 *
 *  @return URL encode后的字符串
 */
- (NSString *)stringByCFURLEncoding;

/**
 *  URL Dncode字符串 (非stringByReplacingPercentEscapesUsingEncoding方式)
 *
 *  @return URL encode后的字符串
 */
- (NSString *)stringByCFURLDecoding;

/**
 *  生成字符串对应的MD5值
 *
 *  @return 字符串对应的MD5
 */
- (NSString *)md5HexDigest;

/**
 *  生成字符串对应的SHA1值
 *
 *  @return 字符串对应的SHA1值
 */
- (NSString *)sha1HexDigest;

/**
 *  消除字符串中的空格和换行
 *
 *  @return 消除了的空格和换行的字符串
 */
- (NSString *)trimmedString;

-(BOOL)isEmpty;

/**
 *  @brief 计算string中两个字符串之间的范围:
 *
 *  @param string：处理的字符串
 *  @param prefixString:第一个字符串
 *  @param suffixString:第二个字符串
 *
 *  @return 返回两个字符串包含的范围（包含自身）
 */
- (NSRange)rangeOfString:(NSString *)string withPrefix:(NSString *)prefixString andSuffix:(NSString *)suffixString;

/**
 *  jsonString to NSDictionary
 */
-(NSDictionary *)dictionaryValue;

@end