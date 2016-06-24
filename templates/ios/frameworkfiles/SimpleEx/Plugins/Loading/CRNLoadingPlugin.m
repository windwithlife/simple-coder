//
//  CRNLoadingPlugin.m
//  CTPublicProduct
//
//  Created by wei_l on 6/12/16.
//  Copyright © 2016 ctrip. All rights reserved.
//

#import "CRNLoadingPlugin.h"
#import "RCTConvert.h"
#import "CTAnimationLoadingView.h"
#import "CRNViewController.h"
#import "CTH5Utility.h"

@implementation CRNLoadingPlugin

- (void)callFunction:(NSString *)functionName
          parameters:(NSDictionary *)parameters
            callback:(RCTResponseSenderBlock)callback {
    if ([functionName equalIgnoreCase:@"show"]) {
        NSString *tips = [RCTConvert NSString:parameters[@"tips"]];
        BOOL needOffset = [RCTConvert BOOL:parameters[@"needOffset"]];
        runBlockInMainThread(^{
            if (needOffset) {
                [CTAnimationLoadingView startLoadingInCRNView:[CRNPlugin visibleViewController].view withTipsMessage:tips];
            } else {
                [CTAnimationLoadingView startLoadingInView:[CRNPlugin visibleViewController].view withTipsMessage:tips];
            }
        });
    } else if ([functionName equalIgnoreCase:@"hide"]) {
        runBlockInMainThread(^{
            [CTAnimationLoadingView stopLoadingInView:[CRNPlugin visibleViewController].view];
        });
    }
}

@end
