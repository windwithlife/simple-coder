//
//  CRNPluginManager.h
//  CTBusiness
//
//  Created by wei_l on 5/24/16.
//  Copyright © 2016 Ctrip. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface CRNPluginManager : NSObject
+ (instancetype)sharedInstance;

- (void)retainObject:(id)object;
- (void)releaseObject:(id)object;

@end
