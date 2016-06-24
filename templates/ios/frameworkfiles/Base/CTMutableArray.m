//
//  CTMutableArray.m
//  CTRIP_WIRELESS
//
//  Created by NickJackson on 13-1-10.
//  Copyright (c) 2013年 携程. All rights reserved.
//

#import "CTMutableArray.h"

#import "CTLogUtil.h"

@implementation NSMutableArray (mCtripForException)

- (void)addObjectForCtrip:(id)anObject
{
    if (nil != anObject) {
        [self addObject:anObject];
    }
    else
    {
        FLog(@"anObject:%@", anObject);
    }
}

- (void)addObjectForCtrip:(id)anObject withClass:(Class)aClass{
	if (nil != anObject && [anObject isKindOfClass:aClass]) {
		[self addObject:anObject];
	}
	else
	{
		FLog(@"anObject:%@", anObject);
	}
}

- (void)addObjectsFromArrayForCtrip:(NSArray *)objects
{
	if(objects && objects.count)
	{
		[self addObjectsFromArray:objects];
	}
	else
	{
		FLog(@"objects:%@", objects);
	}
}

- (void)insertObjectForCtrip:(id)anObject atIndex:(NSUInteger)index
{
    if (nil != anObject && index <= self.count) {
        [self insertObject:anObject atIndex:index];
    }
    else
    {
        FLog(@"count:%lu anObject:%@ index:%lu", (unsigned long)self.count, anObject, (unsigned long)index);
    }
}

- (void)removeObjectAtIndexForCtrip:(NSUInteger)index
{
    if (index < self.count) {
        [self removeObjectAtIndex:index];
    }
    else
    {
        FLog(@"count:%lu index:%lu", (unsigned long)self.count, (unsigned long)index);
    }
}

- (void)replaceObjectAtIndexForCtrip:(NSUInteger)index withObject:(id)anObject
{
    if (nil != anObject && index < self.count) {
        [self replaceObjectAtIndex:index withObject:anObject];
    }
    else
    {
        FLog(@"count:%lu anObject:%@ index:%lu", (unsigned long)self.count, anObject, (unsigned long)index);
    }
}

- (void)exchangeObjectAtIndexForCtrip:(NSUInteger)idx1 withObjectAtIndex:(NSUInteger)idx2
{
    if (idx1 < self.count && idx2 < self.count) {
        [self exchangeObjectAtIndex:idx1 withObjectAtIndex:idx2];
    }
    else
    {
        FLog(@"count:%lu index1:%lu index2:%lu", (unsigned long)self.count, (unsigned long)idx1, (unsigned long)idx2);
    }
}

- (void)removeObjectForCtrip:(id)anObject inRange:(NSRange)range
{
    if (range.location + range.length <= self.count) {
        [self removeObject:anObject inRange:range];
    }
    else
    {
        FLog(@"count:%lu MakeRage(%lu,%lu)", (unsigned long)self.count, (unsigned long)range.location, (unsigned long)range.length);
    }
}

- (void)removeObjectIdenticalToForCtrip:(id)anObject inRange:(NSRange)range
{
    if (range.location + range.length <= self.count) {
        [self removeObjectIdenticalTo:anObject inRange:range];
    }
    else
    {
        FLog(@"count:%lu MakeRage(%lu,%lu)", (unsigned long)self.count, (unsigned long)range.location, (unsigned long)range.length);
    }
}

- (void)removeObjectsInRangeForCtrip:(NSRange)range
{
    if (range.location + range.length <= self.count) {
        [self removeObjectsInRange:range];
    }
    else
    {
        FLog(@"count:%lu MakeRage(%lu,%lu)", (unsigned long)self.count, (unsigned long)range.location, (unsigned long)range.length);
    }
}

- (void)replaceObjectsInRangeForCtrip:(NSRange)range withObjectsFromArray:(NSArray *)otherArray
{
    if (range.location + range.length <= self.count) {
        [self replaceObjectsInRange:range withObjectsFromArray:otherArray];
    }
    else
    {
        FLog(@"count:%lu MakeRage(%lu,%lu)", (unsigned long)self.count, (unsigned long)range.location, (unsigned long)range.length);
    }
}

- (void)replaceObjectsInRangeForCtrip:(NSRange)range withObjectsFromArray:(NSArray *)otherArray range:(NSRange)otherRange
{
    if (range.location + range.length <= self.count && otherRange.location + otherRange.length <= otherArray.count) {
        [self replaceObjectsInRange:range withObjectsFromArray:otherArray range:otherRange];
    }
    else
    {
        FLog(@"count:%lu MakeRage(%lu,%lu) otherCount:%lu OtherRange(%lu,%lu)", (unsigned long)self.count, (unsigned long)range.location, (unsigned long)range.length, (unsigned long)otherArray.count, (unsigned long)otherRange.location, (unsigned long)otherRange.length);
    }
}

- (void)insertObjectsForCtrip:(NSArray *)objects atIndexes:(NSIndexSet *)indexes
{
    if (nil != objects && indexes.count == objects.count && indexes.firstIndex <= self.count && indexes.lastIndex <= self.count) {
        [self insertObjects:objects atIndexes:indexes];
    }
    else
    {
        FLog(@"count:%lu objects:%@ indexesCount:%lu indexesFirstIndex:%lu indexesLastIndex:%lu", (unsigned long)self.count, objects, (unsigned long)indexes.count, (unsigned long)indexes.firstIndex, (unsigned long)indexes.lastIndex);
    }
}

- (void)removeObjectsAtIndexesForCtrip:(NSIndexSet *)indexes
{
    if (indexes.firstIndex < self.count && indexes.lastIndex < self.count) {
        [self removeObjectsAtIndexes:indexes];
    }
    else
    {
        FLog(@"count:%lu indexesCount:%lu indexesFirstIndex:%lu indexesLastIndex:%lu", (unsigned long)self.count, (unsigned long)indexes.count, (unsigned long)indexes.firstIndex, (unsigned long)indexes.lastIndex);
    }
}

- (void)replaceObjectsAtIndexesForCtrip:(NSIndexSet *)indexes withObjects:(NSArray *)objects
{
    if (nil != objects && indexes.count == objects.count && indexes.firstIndex < self.count && indexes.lastIndex < self.count) {
        [self replaceObjectsAtIndexes:indexes withObjects:objects];
    }
    else
    {
        FLog(@"count:%lu objects:%@ indexesCount:%lu indexesFirstIndex:%lu indexesLastIndex:%lu", (unsigned long)self.count, objects, (unsigned long)indexes.count, (unsigned long)indexes.firstIndex, (unsigned long)indexes.lastIndex);
    }
}
@end