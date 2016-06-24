//
//  CRNCallPlugin.m
//  CTBusiness
//
//  Created by wei_l on 5/16/16.
//  Copyright © 2016 Ctrip. All rights reserved.
//

#import "CRNCallPlugin.h"
#import "CTBus.h"
#import "CTUtil.h"

@implementation CRNCallPlugin

- (void)callFunction:(NSString *)functionName
          parameters:(NSDictionary *)parameters
            callback:(RCTResponseSenderBlock)callback {
    if ([functionName isEqualToString:@"makeCall"]) {
        [self makeCall:parameters callback:(RCTResponseSenderBlock)callback];
    }
}

- (void)makeCall:(NSDictionary *)parameters callback:(RCTResponseSenderBlock)callback {
    NSString *functionName = @"makeCall";
    if (!parameters) {
        [CTBus callData:@"call/callCtrip" param: nil ];
        if (callback) {
            callback(@[CRNResult(0, functionName, NULL)]);
        }
    } else if (parameters.allKeys.count == 1 && parameters[@"phoneNumber"]) {
        [CTBus callData:@"call/callPhoneNumber" param:@{@"phoneNumber":parameters[@"phoneNumber"]}, nil];
        if (callback) {
            callback(@[CRNResult(0, functionName, NULL)]);
        }
    } else {
        id param1, param2, param3, param4;
        
        param1 = [CTUtil windowRootViewController].visibleViewController;
        param2 = !parameters[@"phoneNumber"] ? [NSNull null] : parameters[@"phoneNumber"];
        param3 = !parameters[@"businessCode"] ? [NSNull null] : parameters[@"businessCode"];
        param4 = !parameters[@"pageId"] ? [NSNull null] : parameters[@"pageId"];
        
        [CTBus callData:@"call/makeCall" param:param1, param2, param3, param4, nil];
        if (callback) {
            callback(@[CRNResult(0, functionName, NULL)]);
        }
    }
}

@end
