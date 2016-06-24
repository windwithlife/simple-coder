//
//  CTArray.h
//  CTRIP_WIRELESS
//
//  Created by NickJackson on 13-1-10.
//  Copyright (c) 2013年 携程. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSArray (CtripForException)


+ (id)arrayWithObjectForCtrip:(id)anObject;

- (id)objectAtIndexForCtrip:(NSUInteger)index;

- (NSArray *)subarrayWithRangeForCtrip:(NSRange)range;

- (NSArray *)objectsAtIndexesForCtrip:(NSIndexSet *)indexes;

@end