//
//  CRNBusPlugin.m
//  CTBusiness
//
//  Created by derick on 15/11/19.
//  Copyright © 2015年 Ctrip. All rights reserved.
//

#import "CRNBusPlugin.h"
#import "CTH5Utility.h"
#import "CTBus.h"

@implementation CRNBusPlugin
- (void)callFunction:(NSString *)functionName parameters:(NSDictionary *)parameters callback:(RCTResponseSenderBlock)callback
{
    NSString *busName = parameters[@"busName"];
    if (busName && [functionName isEqualToString:@"callData"]) {
        runBlockInMainThread(^{
            [CTBus callData:busName param:parameters[@"parameters"], nil];
        });
    }
}
@end
