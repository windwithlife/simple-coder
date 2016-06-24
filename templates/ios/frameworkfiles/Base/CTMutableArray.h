//
//  CTMutableArray.h
//  CTRIP_WIRELESS
//
//  Created by NickJackson on 13-1-10.
//  Copyright (c) 2013年 携程. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSMutableArray (mCtripForException)

- (void)addObjectForCtrip:(id)anObject;
- (void)addObjectForCtrip:(id)anObject withClass:(Class)aClass;
- (void)insertObjectForCtrip:(id)anObject atIndex:(NSUInteger)index;
- (void)removeObjectAtIndexForCtrip:(NSUInteger)index;
- (void)replaceObjectAtIndexForCtrip:(NSUInteger)index withObject:(id)anObject;
- (void)exchangeObjectAtIndexForCtrip:(NSUInteger)idx1 withObjectAtIndex:(NSUInteger)idx2;
- (void)removeObjectForCtrip:(id)anObject inRange:(NSRange)range;
- (void)removeObjectIdenticalToForCtrip:(id)anObject inRange:(NSRange)range;
- (void)removeObjectsInRangeForCtrip:(NSRange)range;
- (void)replaceObjectsInRangeForCtrip:(NSRange)range withObjectsFromArray:(NSArray *)otherArray;
- (void)replaceObjectsInRangeForCtrip:(NSRange)range withObjectsFromArray:(NSArray *)otherArray range:(NSRange)otherRange;
- (void)insertObjectsForCtrip:(NSArray *)objects atIndexes:(NSIndexSet *)indexes;
- (void)removeObjectsAtIndexesForCtrip:(NSIndexSet *)indexes;
- (void)replaceObjectsAtIndexesForCtrip:(NSIndexSet *)indexes withObjects:(NSArray *)objects;
- (void)addObjectsFromArrayForCtrip:(NSArray *)objects;

@end

