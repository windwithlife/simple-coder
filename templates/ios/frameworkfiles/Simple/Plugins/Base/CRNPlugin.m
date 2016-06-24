//
//  CRNPlugin.m
//  CTBusiness
//
//  Created by derick on 15/11/18.
//  Copyright © 2015年 Ctrip. All rights reserved.
//

#import "CRNPlugin.h"
#import "RCTUtils.h"
@implementation CRNPlugin

+ (void)callModule:(NSString *)moduleName
          function:(NSString *)functionName
        parameters:(NSDictionary *)parameters
          callback:(RCTResponseSenderBlock)callback
{
    RCTAssert(moduleName, @"module name should not be null.");
    RCTAssert(functionName, @"function name should not be null.");
    NSString *moduleClassName = [[@"CRN" stringByAppendingString:moduleName] stringByAppendingString:@"Plugin"];
    Class cls = NSClassFromString(moduleClassName);
    CRNPlugin *object = [[cls alloc] init];
    RCTAssert([cls isSubclassOfClass:self], @"can not find the class, module name may be incorrect.");
    [object callFunction:functionName parameters:parameters callback:callback];
}

- (void)callFunction:(NSString *)functionName
          parameters:(NSDictionary *)parameters
            callback:(RCTResponseSenderBlock)callback {
    //subclass override.
}

+ (UINavigationController *)visibleNavigationController {
    UIViewController *controller = RCTKeyWindow().rootViewController;
    while (controller.presentedViewController) {
        controller = controller.presentedViewController;
    }
    if ([controller isKindOfClass:[UINavigationController class]]) {
        return (UINavigationController*)controller;
    }
    else if ([controller isKindOfClass:[UIViewController class]]) {
        return controller.navigationController;
    }
    
    return nil;
}

+ (UIViewController *)visibleViewController {
    return [CRNPlugin visibleNavigationController].visibleViewController;
}

+ (NSDictionary *)RNResultWithStatusCode:(int)statusCode
                              methodName:(NSString *)methodName
                               errorDesc:(NSString *)errorDesc {
    NSMutableDictionary *statusDict = [NSMutableDictionary dictionary];
    [statusDict setValue:[NSNumber numberWithInt:statusCode]  forKey:@"status"];
    [statusDict setValue:methodName forKey:@"function"];
    if (statusCode != 0 && errorDesc == nil) {
        NSAssert(false, @"StatusCode!=0, 请提供Error 描述!");
    }
    
    if (statusCode != 0 && errorDesc.length > 0) {
        [statusDict setValue:errorDesc forKey:@"errorDesc"];
    }
    
    return statusDict;
}

@end
