//
//  CRNUserPlugin.m
//  CTBusiness
//
//  Created by jim on 16/5/17.
//  Copyright © 2016年 Ctrip. All rights reserved.
//

#import "CRNUserPlugin.h"
#import "CTUserInfoViewModel.h"
#import "CTBus.h"
#import "CTUtil.h"
#import "CTH5UserPlugin.h"

@implementation CRNUserPlugin

- (void)callFunction:(NSString *)functionName
          parameters:(NSDictionary *)parameters
            callback:(RCTResponseSenderBlock)callback {
    if ([functionName equalIgnoreCase:@"userLogin"] ) {
        BOOL hasLogin = ![[CTBus callData:@"login/isLoginOut" param:nil]boolValue];
        if(hasLogin) {
            callback(@[CRNResult(0, functionName, NULL), [self getUserInfoDictionary]]);
        }
        else {
            [CTBus asyncCallData:@"login/jumpToMemberLoginWithBlock"  result:^(id retObj, NSError *error){
                NSArray *backParams  = (NSArray*)retObj;
                BOOL isSuccess = [[backParams safeObjectAtIndex:0]boolValue];
                if(isSuccess){
                    NSDictionary *userInfo = [self getUserInfoDictionary];
                    callback(@[CRNResult(0, functionName, @"login success"),userInfo]);
                }else {
                    callback(@[CRNResult(1, functionName, @"cancel login")]);
                }
                
            } param:[CTUtil windowRootViewController].visibleViewController, @NO, @YES, nil];
        }
    }
    else if ([functionName equalIgnoreCase:@"getUserInfo"]) {
        NSDictionary *modelDict = [self getUserInfoDictionary];
        callback(@[CRNResult(0, functionName, NULL), modelDict]);
    }
}

-(NSDictionary*) getUserInfoDictionary {
    return  [CTH5UserPlugin getLoginUserInfo];
}

@end
