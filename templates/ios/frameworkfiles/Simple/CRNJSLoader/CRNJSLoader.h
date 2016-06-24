//
//  CRNJSLoader.h
//  CTBusiness
//
//  Created by wei_l on 5/26/16.
//  Copyright © 2016 Ctrip. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeDelegate.h"

@interface CRNJSLoader : NSObject

+ (void)loadJSDataForURL:(NSURL *)url withBlock:(RCTSourceLoadBlock)loadCallback;

@end
