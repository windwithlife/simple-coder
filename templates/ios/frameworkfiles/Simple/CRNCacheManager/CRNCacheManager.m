//
//  CRNCacheManager.m
//  CTBusiness
//
//  Created by wei_l on 5/26/16.
//  Copyright © 2016 Ctrip. All rights reserved.
//

#import "NSDictionary+CTExtensions.h"
#import "CRNCacheManager.h"
#import "CRNURL.h"

@interface CRNCacheManager ()

@property (nonatomic, readwrite, strong) NSData *commonJSData;

@property (nonatomic, strong) NSMutableDictionary *cache;

@end

@implementation CRNCacheManager
+ (instancetype)sharedInstance
{
    static CRNCacheManager *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[CRNCacheManager alloc] init];
    });
    
    return instance;
}

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (instancetype)init
{
    if (self = [super init]) {
        _cache = [[NSMutableDictionary alloc] init];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleMemoryWarning) name:UIApplicationDidReceiveMemoryWarningNotification object:nil];
    }
    
    return self;
}

- (void)cacheJSData:(NSData *)data forURL:(NSURL *)url
{
    [self.cache setObject:data forKey:url.path];
}

- (NSData *)cachedJSDataForURL:(NSURL *)url
{
    if (url.path) {
        return [self.cache objectForKey:url.path];
    } else {
        return nil;
    }
}

- (void)handleMemoryWarning
{
    for (NSString *key in self.cache.allKeys) {
        if ([key containsString:[[CRNURL commonJSURL] path]]) {
            //common js do not need release.
        } else {
            [self.cache removeSafeObjectForKey:key];
        }
    }
}

@end
