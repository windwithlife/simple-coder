//
//  NSDictionary+CTExtensions.m
//  CTUtility
//
//  Created by jimzhao on 13-12-11.
//  Copyright (c) 2013年 jimzhao. All rights reserved.
//  类文件说明

#import "NSDictionary+CTExtensions.h"
#import "NSString+CTExtensions.h"
#import "CTJSONModel.h"

@implementation NSDictionary(Object)

- (id)toObject:(Class)classz baseClass:(Class)baseClass {
    return [self toObjectWithClass:classz baseClass:baseClass];
}

- (id)toSimpleObject:(Class)classz {
    return [self simpleToObject:classz];
}

@end


@implementation NSMutableDictionary(Safe)

- (void)setSafeObject:(id)anObject forKey:(id)aKey {
    if (aKey == nil) {
        NSAssert(false, @"aKey is NULL, crashed");
    }
    else if ([aKey isKindOfClass:[NSString class]]) {
        [self setValue:anObject forKey:aKey];
    }
    else if ([aKey conformsToProtocol:@protocol(NSCopying)]) {
        if (anObject == NULL) {
            [self removeSafeObjectForKey:aKey];
        }
        else {
            [self setObject:anObject forKey:aKey];
        }
    }
}

- (void)removeSafeObjectForKey:(id)aKey
{
    if (!aKey) {
        NSAssert(false, @"aKey is NULL, crashed");
    } else if ([aKey conformsToProtocol:@protocol(NSCopying)]) {
        [self removeObjectForKey:aKey];
    }
}
@end


@implementation NSUserDefaults(xSafeCompile)

- (void)setSafeObject:(id)anObject forKey:(id)aKey {
    if ([aKey isKindOfClass:[NSString class]]) {
        [self setObject:anObject forKey:aKey];
    } else {
        NSAssert(false, @"NSUserDefaults aKey is NULL, crashed");
    }
}

@end


@implementation NSDictionary (OLD)

- (NSDictionary *)dictionaryWithLowercaseKeys {
    NSMutableDictionary *result = [NSMutableDictionary dictionaryWithCapacity:self.count];
    
    for ( NSString *key in self) {
        [result setValue:[self objectForKey:key] forKey:[key lowercaseString]];
    }
    
    return result;
}

@end
