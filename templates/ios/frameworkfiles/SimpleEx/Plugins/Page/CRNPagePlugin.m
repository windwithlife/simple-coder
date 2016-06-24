//
//  CRNPagePlugin.m
//  CTBusiness
//
//  Created by jim on 16/5/18.
//  Copyright © 2016年 Ctrip. All rights reserved.
//

#import "CRNPagePlugin.h"
#import "RCTConvert.h"
#import "CTH5Utility.h"
#import "CTAnimationLoadingView.h"
#import "CRNViewController.h"

@implementation CRNPagePlugin

- (void)callFunction:(NSString *)functionName
          parameters:(NSDictionary *)parameters
            callback:(RCTResponseSenderBlock)callback {
    
    if ([functionName equalIgnoreCase:@"back"]) {
        NSObject *boolObj = [parameters valueForKey:@"animated"];
        BOOL animated = YES;
        if (boolObj) {
            animated = [RCTConvert BOOL:boolObj];
        }
        
        runBlockInMainThread(^{
            [[CRNPlugin visibleNavigationController] popViewControllerAnimated:animated];
        });
    }
    if ([functionName equalIgnoreCase:@"disableNativeBack"]) {
        runBlockInMainThread(^{
            CRNViewController *vc = (CRNViewController *)[CRNPlugin visibleViewController];
            if ([vc isKindOfClass:[CRNViewController class]]) {
                [vc setDisableDefaultBack];
            }
        });
    }
}

@end
