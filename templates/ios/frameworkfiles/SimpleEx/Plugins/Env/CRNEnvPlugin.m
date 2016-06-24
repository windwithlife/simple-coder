//
//  CRNEnvPlugin.m
//  CTBusiness
//
//  Created by jim on 16/5/18.
//  Copyright © 2016年 Ctrip. All rights reserved.
//

#import "CRNEnvPlugin.h"
#import "CTH5UserPlugin.h"
#import "JSONKit.h"

@implementation CRNEnvPlugin

- (void)callFunction:(NSString *)functionName
          parameters:(NSDictionary *)parameters
            callback:(RCTResponseSenderBlock)callback {
    
    if ([functionName equalIgnoreCase:@"getEnv"]) {
        NSDictionary *envDict = [CTH5UserPlugin getHybridInitParams];
        if (callback) {
            callback(@[CRNResult(0, functionName, NULL), envDict]);
        }
    }
}

@end
