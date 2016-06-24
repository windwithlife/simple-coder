//
//  NSString+CTExtensions.m
//  CTUtility
//
//  Created by jimzhao on 13-12-11.
//  Copyright (c) 2013年 jimzhao. All rights reserved.
//  类文件说明

#import "NSString+CTExtensions.h"
#import "NSData+CTExtensions.h"
#import "NSData+CTExtensions.h"
//#import "CTLogUtil.h"
#import <CommonCrypto/CommonDigest.h>

#pragma mark - String Utils

@implementation NSString(Utils)

/**
 *  @brief 判断当前字符串中是否包含子串
 *
 *  @param string 需要检查的子串
 *
 *  @return 如果当前字符串中包含子串，返回true，否则false
 */
- (BOOL)containsString:(NSString *)string {
    if (string.length == 0) {
        return NO;
    }
    
	return !NSEqualRanges([self rangeOfString:string], NSMakeRange(NSNotFound, 0));
}

- (BOOL)containsStringIgnoreCase:(NSString *)string {
    return [[self uppercaseString] containsString:[string uppercaseString]];
}

- (BOOL)match:(NSString *)regexp {
    if (regexp.length == 0) {
        return NO;
    }
    
    NSPredicate *regExPredicate = [NSPredicate predicateWithFormat:@"SELF matches %@", regexp];
    BOOL isMatch = [regExPredicate evaluateWithObject:self];
    return isMatch;
}


/**
 *  生成UUID
 *
 *  @return 生成的UUID字符串
 */
+ (NSString *)UUIDString {
	CFUUIDRef uuid = CFUUIDCreate(NULL);
	CFStringRef string = CFUUIDCreateString(NULL, uuid);
	CFRelease(uuid);
	return (__bridge_transfer NSString *)string;
}

/**
 *  删除字符串前面的空白
 *
 *  @return 删除前面空白的字符串
 */
- (NSString *)trimPrefixBlank {
    NSString *result = nil;
    
    NSInteger i = 0;
    NSInteger length = [self length];
    
    while (i < length) {
        char ch = [self characterAtIndex:i];
        if (ch == ' ' || ch == '\r' || ch == '\n' || ch == '\t') {
            ++i;
        }
        else {
            break;
        }
    }
    
    if (i < length) {
        result = [self substringFromIndex:i];
    }
    
    return result;
}



/**
 *  删除字符串后面的空白
 *
 *  @return 被删末尾空格的字符串
 */
- (NSString *)trimSufixBlank {
    NSString *result = NULL;
    
    NSInteger i = [self length];
    
    while (i >= 0) {
        char ch = [self characterAtIndex:i-1];
        if (ch == ' ' || ch == '\r' || ch == '\n' || ch == '\t') {
            --i;
        }
        else {
            break;
        }
    }

    i = MAX(0, i);
    
    result = [self substringToIndex:i];
    
    return result;
}


- (NSString *)trimBlank {
   return [self stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];
}

+ (BOOL)isEmpty:(NSString *)str {
    return str == nil || [str isEqual:[NSNull null]] || str.length == 0;
}

- (BOOL)isNumber {
    int dotCount = 0;
    BOOL isLeagalNum = YES;
    
    for (NSUInteger i = 0; i < self.length; i++) {
        unichar cha = [self characterAtIndex:i];
        if (cha == '.') {
            dotCount++;
            if (dotCount >= 2) {
                isLeagalNum = NO;
                break;
            }
        }
        else if (cha >= '0' && cha <= '9') {
            ;
        }
        else {
            isLeagalNum = NO;
            break;
        }
        
    }
    
    return isLeagalNum;
}


/**
 *  判断字符串中是否全部是ASCII码
 *
 *  @return 全部ASCII，返回YES，否则返回NO
 */
- (BOOL)isASCII {
    
    const char *utf8Str = [self UTF8String];
    for (int i = 0; i < strlen(utf8Str); i++) {
        char ch = utf8Str[i];
        bool flag = isascii(ch);
        if (!flag) {
            return NO;
        }
    }
    return YES;
}

/**
 *  判断是否是合法的Email地址
 *
 *  @return email合法返回YES，否则返回NO
 */
- (BOOL)isLegalEmail {
    if ([self containsString:@"@"] && [self containsString:@"."]) {
//        NSString *emailRegex = @"^[A-Za-z0-9d]+([-_.]*[A-Za-z0-9d]*)*@([A-Za-z0-9d]+[-_.]+[A-Za-z0-9d]*)+[A-Za-z0-9d]{2,5}$";
//        NSPredicate *emailPredicate = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", emailRegex];
//        return [emailPredicate evaluateWithObject:self];
        return YES;
    }
    
    return NO;
}

/**
 *  判断是否是合法手机号码，格式：13，14，15，18开头，且为11位数字
 *
 *  @return 手机号码合法返回YES，否则返回NO
 */
- (BOOL)isLegalMobilePhone {
    if (self.length == 0 || [self length] > 16) {
        return NO;
    }
    
    NSString *phoneRegex = @"^(1([3458][0-9]))\\d{8}$";
    NSPredicate *test = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", phoneRegex];
    BOOL matches = [test evaluateWithObject:self];
    return matches;
}


/**
 *  包装SDK的subStringFromIndex:
 *
 *  @param from
 *
 *  @return 返回sub的字符串
 */
- (NSString *)subStringFromIndex:(NSUInteger)from
{
    if (from <= self.length) {
        return [self substringFromIndex:from];
    }
    else
    {
        NSAssert(YES, @"Error:length:%lu from:%lu", (unsigned long)self.length, (unsigned long)from);
        return nil;
    }
}

/**
 *  包装SDK的substringToIndex:
 *
 *  @param to
 *
 *  @return 返回sub的字符串
 */
- (NSString *)subStringToIndex:(NSUInteger)to
{
    if (to <= self.length) {
        return [self substringToIndex:to];
    }
    else
    {
        NSAssert(YES, @"Error:length:%lu to:%ld", (unsigned long)self.length, (unsigned long)to);
        return nil;
    }
}
/**
 *  包装SDK的subStringWithRange:
 *
 *  @param range
 *
 *  @return 返回sub的字符串
 */
- (NSString *)subStringWithRange:(NSRange)range
{
    if (range.location+range.length <= self.length) {
        return [self substringWithRange:range];
    }
    else
    {
        NSAssert(YES, @"Error:length:%lu Range(%ld,%ld)", (unsigned long)self.length, (unsigned long)range.location, (unsigned long)range.length);
        return nil;
    }
}

- (NSData *)UTF8Data {
    return [self dataUsingEncoding:NSUTF8StringEncoding];
}

- (BOOL)equalIgnoreCase:(NSString *)cmpString {
    return [[self lowercaseString] isEqualToString:[cmpString lowercaseString]];
}

@end


#pragma mark - String URL相关

@implementation NSString(URL)

/**
 *  URL参数转义，空格会换成+
 *
 *  @return 转义之后的URL字符串
 */
- (NSString *)escapingForURLQuery {
	NSString *result = self;
    
	static CFStringRef leaveAlone = CFSTR(" ");
	static CFStringRef toEscape = CFSTR("\n\r:/=,!$&'()*+;[]@#?%");
    
	CFStringRef escapedStr = CFURLCreateStringByAddingPercentEscapes(kCFAllocatorDefault, (__bridge CFStringRef)self, leaveAlone,
																	 toEscape, kCFStringEncodingUTF8);
    
	if (escapedStr) {
		NSMutableString *mutable = [NSMutableString stringWithString:(__bridge NSString *)escapedStr];
		CFRelease(escapedStr);
        
		[mutable replaceOccurrencesOfString:@" " withString:@"+" options:0 range:NSMakeRange(0, [mutable length])];
		result = mutable;
	}
	return result;  
}

/**
 *  转义之后的URL参数还原，+会被还原成空格
 *
 *  @return 还原之后URL参数
 */
- (NSString *)unEscapingFromURLQuery {
	NSString *deplussed = [self stringByReplacingOccurrencesOfString:@"+" withString:@" "];
    return [deplussed stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
}

/**
 *  字符串转换成URL对象，#会在内部处理
 *
 *  @return 转换成的URL对象
 */
- (NSURL *)toURL {
    if (self.length == 0) {
        return NULL;
    }
    
    NSString *tmpUrl = self;
    
    tmpUrl = [tmpUrl stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    NSRange sRange = [tmpUrl rangeOfString:@"#"] ;
    
    NSString *retUrlStr = tmpUrl;
    
    if (sRange.location != NSNotFound) {
        NSString *prefix = [[tmpUrl substringToIndex:sRange.location] stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
        NSURL *url  = [NSURL URLWithString:prefix];
        
        NSString *sufix = [[tmpUrl substringFromIndex:sRange.location+1] stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
        retUrlStr= [[url absoluteString] stringByAppendingFormat:@"#%@",sufix];
    }
    else {
        retUrlStr = [retUrlStr stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    }
    
    return [NSURL URLWithString:retUrlStr];

}

/**
 *  对URL做UTF8编码
 *
 *  @return UTF8编码之后的URL字符串
 */
- (NSString *)URLEncode {
    return [self stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
}

/**
 *  对URL做UTF8解码
 *
 *  @return UTF8解码之后的URL字符串
 */
- (NSString *)URLDecode {
    return [self stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
}


/**
 *  对NSString做URLEncode编码
 *
 *  @return NSString的URLEncode字符串
 */
- (NSString *)stringURLEncoded {
    NSString *result=(NSString *)CFBridgingRelease(CFURLCreateStringByAddingPercentEscapes(kCFAllocatorDefault,
                                                                                           (CFStringRef)self,
                                                                                           NULL,
                                                                                           CFSTR("!*'();:@&=+$,/?%#[]"),
                                                                                           kCFStringEncodingUTF8));
    return result;
}
/**
 *  对NSString做URLDecoded编码
 *
 *  @return NSString的URLDecoded字符串
 */
-(NSString *)stringURLDecode {
    NSString *result = (NSString *)CFBridgingRelease(CFURLCreateStringByReplacingPercentEscapesUsingEncoding(kCFAllocatorDefault,
                                                                                                             (CFStringRef)self,
                                                                                                             CFSTR(""),
                                                                                                             kCFStringEncodingUTF8));
    return result;
    
}

/**
 *  对NSString做URIEncoded编码
 *
 *  @return NSString的URIEncoded字符串
 */
-(NSString*)encodeAsURIComponent {
    const char *p=[self UTF8String];
    NSMutableString *result=[NSMutableString string];
    for (; *p!=0; p++) {
        unsigned char c=*p;
        if (('0' <= c && c <= '9') || ('a' <= c && c <= 'z') || ('A' <= c && c <= 'Z') || c == '-' || c == '_')
        {
            [result appendFormat:@"%c",c];
        }else {
            [result appendFormat:@"%%%02X",c];
        }
        
    }
    return result;
}

@end

#pragma mark - String Hash相关

@implementation NSString(Hash)

/**
 * @brief 计算NSString的MD5哈希函数
 *
 * @return 返回NSString的MD5哈希值，长度32，大写
 */
- (NSString *)MD5 {
    const char *cstr = [self cStringUsingEncoding:NSUTF8StringEncoding];
	NSData *data = [NSData dataWithBytes:cstr length:strlen(cstr)];
	return [data MD5];
}
/**
 * @brief 计算NSString的SHA1哈希函数
 *
 * @return 返回NSString的SHA1哈希值，长度40，大写
 */
- (NSString *)SHA1 {
	const char *cstr = [self cStringUsingEncoding:NSUTF8StringEncoding];
	NSData *data = [NSData dataWithBytes:cstr length:strlen(cstr)];
	return [data SHA1];
}

/**
 * @brief 计算NSString的SHA256哈希函数
 *
 * @return 返回NSString的SHA256哈希值，长度64，大写
 */
- (NSString *)SHA256 {
	const char *cstr = [self cStringUsingEncoding:NSUTF8StringEncoding];
	NSData *data = [NSData dataWithBytes:cstr length:strlen(cstr)];
	return [data SHA256];
}


@end

#pragma mark - String Base64 Encode/Decode

@implementation NSString(Base64)

/**
 *  将字符串进行base64 编码
 *
 *  @return base64编码之后的字符串
 */
- (NSString *)Base64EncodeToString  {
    if ([self length] == 0) {
        return nil;
	}
	
	return [[self dataUsingEncoding:NSUTF8StringEncoding] base64EncodeToString];
}

/**
 *  字符串base64解码成字符串
 *
 *  @param base64String 需要解码的base64字符串
 *
 *  @return 解码之后的base64字符串
 */
- (NSString *)Base64DecodeToString {
    NSData *decodeData = [NSData base64DecodeToData:self];
	return [[NSString alloc] initWithData:decodeData encoding:NSUTF8StringEncoding];
}

/**
 *  将base64字符串解码成Data
 *
 *  @return base64字符串解码之后的Data
 */
- (NSData *)Base64DecodeToData {
    return [NSData base64DecodeToData:self];
}

@end

@implementation NSString(File_UTF8)
- (BOOL)appendToFile:(NSString *)path {
    if (path.length == 0 || self.length == 0) {
        return NO;
    }
    
    FILE *fp = fopen([path UTF8String], "a");
    if (fp) {
        fwrite([self UTF8String], self.length, 1, fp);
        BOOL retFlag = (0 == ferror(fp));
        fclose(fp);
        return retFlag;
    }
    
    return NO;
}

- (BOOL)writeToFile:(NSString *)path {
    if (path.length == 0) {
        return NO;
    }
    
    NSError *error = NULL;
    
    BOOL ret = [self writeToFile:path atomically:YES encoding:NSUTF8StringEncoding error:&error];
    if (error) {
        ret = NO;
 //       printError(__FUNCTION__,error);
    }
    
    return ret;
}

@end

@implementation NSString(Serialize)

- (id)toSimpleObject:(Class)classz {
    return [self simpleToObject:classz];
}

@end


@implementation NSString (OLD)

- (NSString *)stringByCFURLEncoding
{
    return CFBridgingRelease(CFURLCreateStringByAddingPercentEscapes(NULL,
                                                                     (CFStringRef)self,
                                                                     NULL,
                                                                     (CFStringRef)@"!*'\"();:@&=+$,/?%#[]%",
                                                                     kCFStringEncodingUTF8));
}

- (NSString *)stringByCFURLDecoding
{
    return (NSString *)CFBridgingRelease(CFURLCreateStringByReplacingPercentEscapesUsingEncoding(kCFAllocatorDefault, (CFStringRef)self, CFSTR(""), kCFStringEncodingUTF8));
}

- (NSString *)md5HexDigest
{
    const char *cString = [self UTF8String];
    unsigned char result[CC_MD5_DIGEST_LENGTH];
    CC_MD5(cString, (CC_LONG)strlen(cString), result);
    NSMutableString *hash = [NSMutableString string];
    for (int i = 0; i < 16; ++i)
    {
        [hash appendFormat:@"%02X", result[i]];
    }
    
    return [hash lowercaseString];
}

- (NSString *)sha1HexDigest
{
    NSData *data = [self dataUsingEncoding:NSUTF8StringEncoding];
    uint8_t digest[CC_SHA1_DIGEST_LENGTH];
    CC_SHA1(data.bytes, (CC_LONG)data.length, digest);
    NSMutableString *hash = [NSMutableString stringWithCapacity:CC_SHA1_DIGEST_LENGTH * 2];
    for (int i = 0; i < CC_SHA1_DIGEST_LENGTH; ++i)
    {
        [hash appendFormat:@"%02x", digest[i]];
    }
    
    return hash;
}

- (NSString *)trimmedString
{
    return [self stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];
}

-(BOOL)isEmpty{
    return self == nil || self.length == 0 || [self trimmedString].length == 0;
}

/**
 *  @brief 计算string中两个字符串之间的范围:
 *
 *  @param string：处理的字符串
 *  @param prefixString:第一个字符串
 *  @param suffixString:第二个字符串
 *
 *  @return 返回两个字符串包含的范围（包含自身）
 */
- (NSRange)rangeOfString:(NSString *)string withPrefix:(NSString *)prefixString andSuffix:(NSString *)suffixString
{
    if ([string containsString:prefixString]) {
        NSRange startRange = [string rangeOfString:prefixString];
        NSInteger index = startRange.location + startRange.length + 1;
        if (index < string.length) {
            NSString *subString = [string substringFromIndex:index];
            if ([subString containsString:suffixString]) {
                NSRange endRange = [subString rangeOfString:suffixString];
                return NSMakeRange(startRange.location, startRange.length + endRange.location + endRange.length + 1);
            }
        }
    }
    return NSMakeRange(0, 0);
}

/**
 * jsonString 转换 NSDictionary
 */
-(NSDictionary *)dictionaryValue{
    NSError *errorJson;
    NSDictionary *jsonDict = [NSJSONSerialization JSONObjectWithData:[self dataUsingEncoding:NSUTF8StringEncoding] options:kNilOptions error:&errorJson];
    if (errorJson != nil) {
#ifdef DEBUG
        NSLog(@"fail to get dictioanry from JSON: %@, error: %@", self, errorJson);
#endif
    }
    return jsonDict;
}

@end
