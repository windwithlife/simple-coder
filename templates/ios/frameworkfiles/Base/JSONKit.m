//
//  JSONKit.m
//  CTFoundation
//
//  Created by jimzhao on 14-2-8.
//  Copyright (c) 2014年 Ctrip. All rights reserved.
//

#import "JSONKit.h"

#pragma mark ----- NSData(CTJSON)

@implementation NSData(CTJSON)

- (NSDictionary *)objectFromJSONData {
    NSError *error = nil;
    NSDictionary *resultJSON = [NSJSONSerialization JSONObjectWithData:self options:kNilOptions error:&error];
    if (error == nil) {
        return resultJSON;
    }
    
    return nil;
}

@end

#pragma mark ----- NSString(CTJSON)

@implementation NSString(CTJSON)

- (NSDictionary *)objectFromJSONString {
    if ([self length] == 0 || [self isEqualToString:@" "]) {
        return nil;
    }
    
    NSData *data = [self dataUsingEncoding:NSUTF8StringEncoding];
    return [data objectFromJSONData];
}

- (NSData *)JSONData {
    if ([self length] == 0 || [self isEqualToString:@" "]) {
        return nil;
    }
    
    NSData *data = [self dataUsingEncoding:NSUTF8StringEncoding];
    return data;
}

@end

#pragma mark ----- NSDictionary(CTJSON)
@implementation NSDictionary(CTJSON)

- (NSString *)JSONString {
    if ([NSJSONSerialization isValidJSONObject:self]) {
        NSError *error = nil;
        
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:self options:NSJSONWritingPrettyPrinted error:&error];
        if (error == nil) {
            return [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        }
    }
    
    return nil;
}

- (NSData *)JSONData {
    if ([NSJSONSerialization isValidJSONObject:self]) {
        NSError *error = nil;
        
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:self options:NSJSONWritingPrettyPrinted error:&error];
        if (error == nil) {
            return jsonData;
        }
    }
    
    return nil;
}

@end

#pragma mark ----- NSArray(CTJSON)
@implementation NSArray(CTJSON)

- (NSString *)JSONString {
    if ([NSJSONSerialization isValidJSONObject:self]) {
        NSError *error = nil;
        
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:self options:NSJSONWritingPrettyPrinted error:&error];
        if (error == nil) {
            return [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        }
    }
    
    return nil;
}

- (NSData *)JSONData {
    if ([NSJSONSerialization isValidJSONObject:self]) {
        NSError *error = nil;
        
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:self options:NSJSONWritingPrettyPrinted error:&error];
        if (error == nil) {
            return jsonData;
        }
    }
    
    return nil;
}

@end




