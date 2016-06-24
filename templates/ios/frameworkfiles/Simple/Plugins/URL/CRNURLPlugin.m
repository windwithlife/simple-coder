//
//  CRNURLPlugin.m
//  CTBusiness
//
//  Created by derick on 15/11/18.
//  Copyright © 2015年 Ctrip. All rights reserved.
//

#import "CRNURLPlugin.h"
//#import "CTH5Utility.h"
//#import "CTUtil.h"
#import "CTNavigationController.h"
#import "CTH5ViewController.h"
#import "NSString+CTExtensions.h"
#import "NSString+CTURL.h"
#import "CTH5URL.h"
#import "CTBus.h"

@implementation CRNURLPlugin
- (void)callFunction:(NSString *)functionName parameters:(NSDictionary *)parameters callback:(RCTResponseSenderBlock)callback
{
    if ([functionName isEqualToString:@"openURL"]) {
        [self openURL:parameters];
    }
}

#pragma mark - business interfaces
- (void)openURL:(NSDictionary *)parameters
{
    NSString *urlString = parameters[@"url"];
    RCTAssert(urlString && urlString.length > 0, @"url can not be null.");
    RCTLog(@"open url:%@", urlString);
    runBlockInMainThread(^{
        openURL((CTRootViewController *)[[CTUtil windowRootViewController] visibleViewController], urlString, nil);
    });
}
@end
