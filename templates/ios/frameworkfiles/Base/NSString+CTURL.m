//
//  NSString+CTURL.m
//  CTFoundation
//
//  Created by derick on 8/25/15.
//  Copyright (c) 2015 Ctrip. All rights reserved.
//

#import "NSString+CTURL.h"
#import "NSDictionary+CTExtensions.h"
#import "NSArray+CTExtensions.h"

@interface NSString (CTURLPrivate)

@property (readonly, copy) NSString *resourceSpecifier;
@property (readonly, strong) NSDictionary *components;

@property (readonly, copy) NSNumber *port;
@property (readonly, copy) NSString *fragment;
@property (readonly, copy) NSString *parameterString;
@property (readonly, strong) NSArray *queryArray;//为了保证 query item 的顺序，所以用 array。

- (NSString *)utf8EncodeForRFC1808URL;
- (NSString *)utf8EncodeForLocalPath;
@end

@implementation NSString (CTURL)
- (NSString *)utf8EncodeForURL
{
    NSString *string = [self copy];

    if ([self hasPrefix:@"http://"] || [self hasPrefix:@"https://"] || [self hasPrefix:@"ctrip://"]) {
        string = [string utf8EncodeForRFC1808URL];
    } else if ([self hasPrefix:@"/"] || [self hasPrefix:@"file:///"]) {
        string = [string utf8EncodeForLocalPath];
    }
    if (!string) {
        string = [self copy];
    }
    
    return string;
}

- (NSString *)encodeURLComponent
{
    NSString *string = (__bridge_transfer NSString *)CFURLCreateStringByAddingPercentEscapes(kCFAllocatorDefault, (CFStringRef)self, NULL, CFSTR("!*'();:@&=+$,/?%#[]"), kCFStringEncodingUTF8);
    if (!string) {
        string = self;
    }
    return string;
}

- (NSString *)decodeURLComponent
{
    NSString *string = (__bridge_transfer NSString *)CFURLCreateStringByReplacingPercentEscapes(kCFAllocatorDefault, (CFStringRef)self, CFSTR("!*'();:@&=+$,/?%#[]"));
    if (!string) {
        string = self;
    }
    return string;
}

- (NSString *)encodeURL
{
    NSString *string = [self stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    if (!string) {
        string = self;
    }
    return string;
}

- (NSString *)decodeURL
{
    NSString *string = [self stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    if (!string) {
        string = self;
    }
    return string;
}

- (NSString *)host
{
    NSString *host = nil;
    NSString *resourceSpecifier = self.resourceSpecifier;
    if (resourceSpecifier && [resourceSpecifier hasPrefix:@"//"]) {
        host = [resourceSpecifier substringFromIndex:2];
        NSArray *array = [host componentsSeparatedByString:@"/"];
        host = array.firstObject;
        
        //if specific the port.
        array = [host componentsSeparatedByString:@":"];
        host = array.firstObject;
    }
    
    return host;
}

- (NSString *)path
{
    NSString *path = nil;
    NSString *resourceSpecifier = self.resourceSpecifier;
    if (resourceSpecifier && [resourceSpecifier hasPrefix:@"//"]) {
        NSString *tempString = [resourceSpecifier substringFromIndex:2];
        // 根据 rfc1808 标准 url 结构，下面三行代码顺序不能调整。
        // <scheme>://<net_loc>/<path>;<params>?<query>#<fragment>
        tempString = [[tempString componentsSeparatedByString:@"#"] firstObject];
        tempString = [[tempString componentsSeparatedByString:@"?"] firstObject];
        tempString = [[tempString componentsSeparatedByString:@";"] firstObject];
        NSRange range = [tempString rangeOfString:@"/"];
        if (range.location != NSNotFound && range.length > 0) {
            tempString = [tempString substringFromIndex:range.location];
            path = [tempString decodeURL];
        }
    }
    
    return path;
}

- (NSDictionary *)query
{
    NSMutableDictionary *query = nil;
    NSArray *array = self.queryArray;
    for (NSDictionary *item in array) {
        if (!query) {
            query = [NSMutableDictionary dictionary];
        }
        [query setSafeObject:[item.allValues safeObjectAtIndex:0] forKey:[item.allKeys safeObjectAtIndex:0]];
    }
    
    return query;
}

#pragma mark - ---- 进入H5指定页面使用

#define kHostNameKey @"kHostNameKey"

- (NSDictionary *)getDictFromURLString
{
    if (self.length == 0) {
        return nil;
    }
    NSString *urlString = [self copy];
    NSMutableDictionary *resultDictionary = [NSMutableDictionary dictionary];
    
    NSRange range = [urlString rangeOfString:@"?"];
    if (range.length > 0) {
        NSString *hostString = [urlString substringToIndex:range.location];
        [resultDictionary setValue:hostString forKey:kHostNameKey];
        
        NSString *firstLevelInfo = [urlString substringFromIndex:range.location+1];
        if (firstLevelInfo.length > 0) {
            NSArray *secondLevelArray = [firstLevelInfo componentsSeparatedByString:@"&"];
            for (int j = 0; j < secondLevelArray.count; j++) {
                NSString *secondLevelInfo = [secondLevelArray objectAtIndexForCtrip:j];
                NSRange secondRange = [secondLevelInfo rangeOfString:@"="];
                if (secondRange.location != NSNotFound) {
                    NSString *key = [secondLevelInfo substringToIndex:secondRange.location];
                    key = [key stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
                    key = [key stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];
                    NSString *value = [secondLevelInfo substringFromIndex:secondRange.location + 1];
                    value = [value stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
                    [resultDictionary setValue:value forKey:key];
                }
            }
        }
    }
    else {
        [resultDictionary setValue:urlString forKey:kHostNameKey];
    }
    
    return resultDictionary;
}
@end

#pragma mark - CTURLPrivate
@implementation NSString (CTURLPrivate)
- (NSDictionary *)components
{
    NSMutableDictionary *components = [NSMutableDictionary dictionary];
    [components setSafeObject:self.scheme forKey:@"scheme"];
    [components setSafeObject:self.host forKey:@"host"];
    [components setSafeObject:self.port forKey:@"port"];
    [components setSafeObject:self.path forKey:@"path"];
    [components setSafeObject:self.parameterString forKey:@"parameterString"];
    [components setSafeObject:self.query forKey:@"query"];
    [components setSafeObject:self.fragment forKey:@"fragment"];
    [components setSafeObject:self.queryArray forKey:@"queryArray"];
    
    return [NSDictionary dictionaryWithDictionary:components];
}

- (NSString *)scheme
{
    NSString *scheme = nil;
    if ([self containsString:@"://"]) {
        NSArray *array = [self componentsSeparatedByString:@"://"];
        scheme = array.firstObject;
    }
    
    return scheme;
}

- (NSNumber *)port
{
    NSNumber *port = nil;
    NSString *resourceSpecifier = self.resourceSpecifier;
    if (resourceSpecifier && [resourceSpecifier hasPrefix:@"//"]) {
        NSString *tempString = [resourceSpecifier substringFromIndex:2];
        NSArray *array = [tempString componentsSeparatedByString:@"/"];
        tempString = array.firstObject;
        
        //if specific the port.
        array = [tempString componentsSeparatedByString:@":"];
        if (array.count > 1) {
            port = [NSNumber numberWithInteger:((NSString *)array.lastObject).integerValue];
        }
    }
    
    return port;
}

- (NSString *)fragment
{
    NSString *fragment = nil;
    
    NSArray *array = [self componentsSeparatedByString:@"#"];
    if (array.count > 1) {
        fragment = [[array lastObject] decodeURL];
    }
    
    return fragment;
}

- (NSString *)parameterString
{
    NSString *parameterString = nil;
    NSString *resourceSpecifier = self.resourceSpecifier;
    NSString *tempString = [resourceSpecifier substringFromIndex:2];
    tempString = [[tempString componentsSeparatedByString:@"#"] firstObject];
    tempString = [[tempString componentsSeparatedByString:@"?"] firstObject];
    NSArray *array = [tempString componentsSeparatedByString:@";"];
    if (array.count > 1) {
        parameterString = [[array subarrayWithRangeForCtrip:NSMakeRange(1, array.count - 1)] componentsJoinedByString:@";"];
    }
    
    return parameterString;
}

- (NSArray *)queryArray
{
    NSMutableArray *queryArray = nil;
    NSString *queryString = self.queryString;
    NSArray *array = [queryString componentsSeparatedByString:@"&"];
    for (NSString *item in array) {
        NSRange range = [item rangeOfString:@"="];// 这里不用数组处理是因为 value 中如可能带有'=',比如 base64 编码的字符串。
        if (range.location != NSNotFound && range.length > 0) {
            NSString *key = [item substringToIndex:range.location];
            NSString *value = [item substringFromIndex:range.location + range.length];
            key = [key decodeURL];
            value = [value decodeURL];
            if (key && value) {
                if (!queryArray) {
                    queryArray = [NSMutableArray array];
                }
                [queryArray safeAddObject:@{[key decodeURL] : [value decodeURL] }];
            }
        }
    }
    
    return [NSArray arrayWithArray:queryArray];
}

- (NSString *)queryString
{
    NSString *queryString = nil;
    NSString *resourceSpecifier = self.resourceSpecifier;
    NSString *tempString = [resourceSpecifier substringFromIndex:2];
    tempString = [[tempString componentsSeparatedByString:@"#"] firstObject];
    NSArray *array = [tempString componentsSeparatedByString:@"?"];
    if (array.count > 1) {
        tempString = array.lastObject;
        queryString = tempString;
    }
    
    return queryString;
}

- (NSString *)resourceSpecifier
{
    NSString *resourceSpecifier = nil;
    NSString *scheme = self.scheme;
    if (scheme && [self containsString:scheme]) {
        resourceSpecifier = [self substringFromIndex:scheme.length + 1];
    } else if ([self hasPrefix:@"/"] || [self hasPrefix:@"file:///"]) {
        resourceSpecifier = nil;
    }
    
    return resourceSpecifier;
}

// <scheme>://<net_loc>/<path>;<params>?<query>#<fragment>
- (NSString *)utf8EncodeForRFC1808URL
{
    NSDictionary *components = [self components];
    NSString *urlString = @"";
    NSString *scheme = components[@"scheme"];
    if (scheme) {
        urlString = [urlString stringByAppendingString:scheme];//scheme 不做 encode。
        urlString = [urlString stringByAppendingString:@"://"];
    }
    NSString *host = components[@"host"];
    if (host) {
        urlString = [urlString stringByAppendingString:host];//host 不做 encode。
    }
    NSNumber *port = components[@"port"];
    if (port) {
        urlString = [urlString stringByAppendingString:@":"];
        urlString = [urlString stringByAppendingString:[port stringValue]];// port 不做 encode。
    }
    NSString *path = components[@"path"];
    if (path && path.length > 0) {
        NSArray *pathArray = [path componentsSeparatedByString:@"/"];
        if (pathArray.count > 0) {
            path = @"";
        } else {
            path = nil;
        }
        
        for (NSUInteger i = 0; i < pathArray.count; i++) {
            NSString *item = pathArray[i];
            if (i == 0 && item.length == 0) {
                continue;
            }
            path = [path stringByAppendingString:@"/"];
            path = [path stringByAppendingString:[item  encodeURLComponent]];//path 按'/'分拆后分别 encodeURLComponent。
        }

        if (path) {
            urlString = [urlString stringByAppendingString:path];
        }
    }
    NSString *parameterString = [components[@"parameterString"] encodeURL];
    if (parameterString) {
        urlString = [urlString stringByAppendingString:@";"];
        urlString = [urlString stringByAppendingString:parameterString];
    }
    
    NSArray *queryArray = components[@"queryArray"];
    if (queryArray.count > 0) {
        urlString = [urlString stringByAppendingString:@"?"];
    }
    __block NSString *tempString = [urlString copy];
    for (NSDictionary *queryItem in queryArray) {
        NSString *key = [queryItem.allKeys lastObject];
        NSString *obj = [queryItem.allValues lastObject];
        NSString *encodedKey = [[key decodeURL] encodeURL];
        NSString *encodedValue = [[obj decodeURL] encodeURLComponent];
        //因为 query 中 url 值 base64 编码会带有特殊字符，所以不能做 encode。
        if ([key isEqualToString:@"url"] && [self hasPrefix:@"ctrip://wireless/h5"] && [self rangeOfString:@"url="].location != NSNotFound) {
            encodedValue = [obj copy];
        }
        if ([tempString hasSuffix:@"?"]) {
            tempString = [tempString stringByAppendingString:[NSString stringWithFormat:@"%@=%@",encodedKey, encodedValue]];
        } else {
            tempString = [tempString stringByAppendingString:[NSString stringWithFormat:@"&%@=%@", encodedKey, encodedValue]];
        }
    }
    
    urlString = [tempString copy];
    NSString *fragment = components[@"fragment"];
    fragment = [fragment encodeURL];
    if (fragment) {
        urlString = [urlString stringByAppendingString:@"#"];
        urlString = [urlString stringByAppendingString:fragment];
    }
    
    return urlString;
}

// '/','file:///'
- (NSString *)utf8EncodeForLocalPath
{
    NSRange range = [self rangeOfString:@"#"];
    NSString *string = nil;
    if (range.location != NSNotFound && range.length > 0) {
        string = [self substringToIndex:range.location];
        string = [[string decodeURL] encodeURL];
        if (!string) {
            string = [self substringToIndex:range.location];
        }
        NSString *fragment = [self substringFromIndex:range.location + range.length];
        fragment = [[fragment decodeURL] encodeURL];
        if (!fragment) {
            fragment = [self substringFromIndex:range.location + range.length];
        }
        string = [string stringByAppendingString:@"#"];
        string = [string stringByAppendingString:fragment];
    } else {
        string = [[self decodeURL] encodeURL];
    }
    
    if (!string) {
        string = [self copy];
    }
    
    return string;
}
@end
