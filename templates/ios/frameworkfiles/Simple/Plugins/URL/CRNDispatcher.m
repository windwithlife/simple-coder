//
//  CRNDispatcher.m
//  CTBusiness
//
//  Created by wei_l on 5/16/16.
//  Copyright © 2016 Ctrip. All rights reserved.
//

#import "CRNDispatcher.h"
//#import "NSString+CTURL.h"
#import "CRNViewController.h"
//#import "CTUtil.h"
//#import "CTH5Utility.h"
#import "NSString+CTExtensions.h"
#import "CRNURL.h"

@implementation CRNDispatcher

+ (BOOL)dispatcherURLString:(NSString *)urlString fromViewController:(UIViewController *)vc
{
    if (![CRNURL isCRNURL:urlString] || vc == NULL) {
        return NO;
    }
    CRNURL *urn = [[CRNURL alloc] initWithPath:urlString];
    return [self dispatcherURL:urn fromViewController:vc];
}

+ (BOOL)dispatcherURL:(CRNURL *)url fromViewController:(UIViewController *)vc
{
    if (url == NULL || vc == NULL) {
        return NO;
    }
    
    CRNViewController *rvc = [[CRNViewController alloc] initWithURL:url];
    rvc.title = url.rnTitle;
    BOOL ret = NO;
    if ([vc isKindOfClass:[UIViewController class]] && [vc respondsToSelector:@selector(navigationController)]) {
        [vc.navigationController pushViewController:rvc animated:YES];
        ret = YES;
    } else if ([vc respondsToSelector:@selector(navigationController)]) {
        [vc.navigationController pushViewController:rvc animated:YES];
        ret = YES;
    } else {
        //TLog(@"%@ 页面结构出现异常 %@", self, url);
    }
    return YES;
}

@end
