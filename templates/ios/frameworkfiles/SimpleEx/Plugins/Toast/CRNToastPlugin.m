//
//  CRNToast.m
//  CTBusiness
//
//  Created by wei_l on 5/23/16.
//  Copyright © 2016 Ctrip. All rights reserved.
//

#import "CRNToastPlugin.h"
#import "CTToastTipView.h"
#import "CTH5Utility.h"

@implementation CRNToastPlugin
- (void)callFunction:(NSString *)functionName
          parameters:(NSDictionary *)parameters
            callback:(RCTResponseSenderBlock)callback {
    if ([functionName isEqualToString:@"show"]) {
        [self show:parameters];
    }
}

- (void)show:(NSDictionary *)parameters
{
    runBlockInMainThread(^{
        [CTToastTipView showTipText:parameters[@"text"] withDisplayTime:[parameters[@"duration"] integerValue]];
    });
}
@end
