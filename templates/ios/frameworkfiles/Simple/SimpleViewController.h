//
//  SimpleViewController.h
//  reactsimple
//
//  Created by ctrip on 16/6/20.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>


@interface SimpleViewController : UIViewController
#pragma mark 返回按钮点击
/**
 返回按钮点击
 用于webview及React Native情况可以重载此方法
 
 @param sender     返回按钮对象
 */
- (void)backBarButtonClicked:(id)sender;

@end
