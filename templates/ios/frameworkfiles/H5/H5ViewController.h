//
//  H5ViewController.h
//  XFramework
//
//  Created by ctrip on 15/9/9.
//  Copyright (c) 2015年 sunrise. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "SimpleViewController.h"
#import "SimpleWebView.h"

static BOOL bFileContentLoad = NO;

@interface H5ViewController : SimpleViewController <UIWebViewDelegate>
@property (nonatomic, assign) SimpleWebView *webView;

@property (nonatomic, copy) NSString *pageName;

@property (nonatomic, copy) NSString *htmlContentString;

//@property (nonatomic, assign) BOOL isHideLoadingViewForOnlinePage;
@property (nonatomic, assign) BOOL isShowLoadingPage;

//@property (nonatomic, assign) BOOL isHideNavBar;

/**
 *  @brief 初始化
 */
@property (nonatomic, copy) NSURL *currentURL;
- (id)initWithURL:(NSURL *)url;
- (void)loadWebPage;

@property (nonatomic, readonly) NSURL *requestURL;

@property (nonatomic, assign) BOOL isOnlyUseWebviewHistoryBack;

@property (nonatomic, readonly) BOOL isLocalWebPage;

//- (void)stopRetryAction;


//- (void)hideLoadingView;

//- (void)showLoadingView;

+ (H5ViewController*)loadURL:(NSURL*)url fromViewController:(UIViewController *)viewController;



//刷新自动标题逻辑
//- (void)doAutoReadTitleFormJS;


@end
