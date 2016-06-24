//
//  CRNDispatcher.h
//  CTBusiness
//
//  Created by wei_l on 5/16/16.
//  Copyright © 2016 Ctrip. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CRNURL.h"

@class CTRootViewController;

@interface CRNDispatcher : NSObject

/*
 * 支持 HTTP(S)
 * "/" 开头的相对路径，会取 Hybrid 路径。
*/

+ (BOOL)dispatcherURLString:(NSString *)urlString fromViewController:(UIViewController *)vc;

+ (BOOL)dispatcherURL:(CRNURL *)url fromViewController:(UIViewController *)vc;

@end
