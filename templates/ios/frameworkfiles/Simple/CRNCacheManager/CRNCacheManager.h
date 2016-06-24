//
//  CRNCacheManager.h
//  CTBusiness
//
//  Created by wei_l on 5/26/16.
//  Copyright © 2016 Ctrip. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface CRNCacheManager : NSObject

+ (instancetype)sharedInstance;

- (void)cacheJSData:(NSData *)data forURL:(NSURL *)url ;

- (NSData *)cachedJSDataForURL:(NSURL *)url;

@end
