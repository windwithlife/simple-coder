//
//  CRNPlugin.h
//  CTBusiness
//
//  Created by derick on 15/11/18.
//  Copyright © 2015年 Ctrip. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "RCTBridgeModule.h"
#import "RCTAssert.h"
#import "RCTLog.h"
#import "CRNPluginManager.h"
#import "NSString+CTExtensions.h"

#define CRNResult(s, k, v) [CRNPlugin RNResultWithStatusCode:(s) methodName:(k) errorDesc:(v)]

@interface CRNPlugin : NSObject


@property (nonatomic, weak) UIViewController *viewController;

+ (void)callModule:(NSString *)moduleName
          function:(NSString *)functionName
        parameters:(NSDictionary *)parameters
          callback:(RCTResponseSenderBlock)callback;

- (void)callFunction:(NSString *)functionName
          parameters:(NSDictionary *)parameters
            callback:(RCTResponseSenderBlock)callback;

+ (UIViewController *)visibleViewController;

+ (UINavigationController *)visibleNavigationController;

+ (NSDictionary *)RNResultWithStatusCode:(int)statusCode
                              methodName:(NSString *)methodName
                               errorDesc:(NSString *)errorDesc;

@end
//#define H5Log(k,v) [CTH5LogUtil addCallLog:(k) result:(v)]

