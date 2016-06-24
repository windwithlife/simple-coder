//
//  NSArray+CTExtensions.m
//  CTFoundation
//
//  Created by jimzhao on 14-1-27.
//  Copyright (c) 2014年 Ctrip. All rights reserved.
//

#import "NSArray+CTExtensions.h"
#import <UIKit/UIKit.h>

@implementation NSArray(CTExtensions)

- (id)safeObjectAtIndex:(NSUInteger)index {
    if (index < self.count) {
        return [self objectAtIndex:index];
    }
    return NULL;
}


@end

@implementation NSMutableArray(Safe)

- (void)safeAddObject:(id)obj {
    if (obj != NULL) {
        [self addObject:obj];
    }
}

@end