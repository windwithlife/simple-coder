//
//  CTArray.m
//  CTRIP_WIRELESS
//
//  Created by NickJackson on 13-1-10.
//  Copyright (c) 2013年 携程. All rights reserved.
//

#import "CTArray.h"
//#import "CTLogUtil.h"

@implementation NSArray (CtripForException)

+ (id)arrayWithObjectForCtrip:(id)anObject
{
    if (nil != anObject) {
        return [self arrayWithObject:anObject];
    }
    else
    {
        //FLog(@"anObject:%@", anObject);
        return nil;
    }
}

- (id)objectAtIndexForCtrip:(NSUInteger)index
{
    if (index < self.count)
    {
        return [self objectAtIndex:index];
    }
    else
    {
        //FLog(@"count:%lu index:%lu", (unsigned long)self.count, (unsigned long)index);
        return nil;
    }
}


- (NSArray *)subarrayWithRangeForCtrip:(NSRange)range
{
    if (range.location+range.length <= self.count)
    {
        return [self subarrayWithRange:range];
    }
    else
    {
        //FLog(@"count:%lu MakeRage(%lu,%lu)", (unsigned long)self.count, (unsigned long)range.location, (unsigned //long)range.length);
        return nil;
    }
}

- (NSArray *)objectsAtIndexesForCtrip:(NSIndexSet *)indexes
{
    if (indexes.firstIndex < self.count && indexes.lastIndex < self.count)
    {
        return [self objectsAtIndexes:indexes];
    }
    else
    {
        //FLog(@"count:%lu indexes(%lu-%lu)", (unsigned long)self.count, (unsigned long)indexes.firstIndex, (unsigned //long)indexes.lastIndex);
        return nil;
    }
}


@end


