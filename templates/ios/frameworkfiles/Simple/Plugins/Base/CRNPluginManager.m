//
//  CRNPluginManager.m
//  CTBusiness
//
//  Created by wei_l on 5/24/16.
//  Copyright © 2016 Ctrip. All rights reserved.
//

#import "CRNPluginManager.h"

@interface CRNPluginManager ()

@property (nonatomic, strong) NSMutableSet *set;

@end

@implementation CRNPluginManager

+ (instancetype)sharedInstance
{
    static CRNPluginManager *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[CRNPluginManager alloc] init];
    });
    
    return instance;
}

- (instancetype)init
{
    if (self = [super init]) {
        _set = [[NSMutableSet alloc] init];
    }
    
    return self;
}

- (void)retainObject:(id)object
{
    [self.set addObject:object];
}

- (void)releaseObject:(id)object
{
    [self.set removeObject:object];
}
@end
