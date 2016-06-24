//
//  H5ViewController.m
//  XFramework
//
//  Created by ctrip on 15/9/9.
//  Copyright (c) 2015年 sunrise. All rights reserved.
//
//#import "SimpleWebView.h"
#import "H5ViewController.h"

@interface H5ViewController ()

@end

@implementation H5ViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  self.isOnlyUseWebviewHistoryBack = true;
  // Do any additional setup after loading the view.
  SimpleWebView *tmpWebView = [[SimpleWebView alloc] initWithFrame:self.view.bounds];
  tmpWebView.delegate = self;
  tmpWebView.scalesPageToFit = YES;
  tmpWebView.autoresizesSubviews = YES;
  tmpWebView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
  self.webView = tmpWebView;
  [self.view addSubview:tmpWebView];
  
  [self loadWebPage];
}

- (void)backBarButtonClicked:(id)sender {
  [NSObject cancelPreviousPerformRequestsWithTarget:self];
  
  BOOL isUserDefaultWebviewHistoryBack = self.isOnlyUseWebviewHistoryBack;
  
  if (!isUserDefaultWebviewHistoryBack) {
    // BOOL isH5PageHandleBackEvent = [[self.h5WebView callBackH5WithTagName:@"back" param:NULL] boolValue];//是否H5页面处理过返回事件
    // isUserDefaultWebviewHistoryBack = !isH5PageHandleBackEvent;
  }
  
  if (isUserDefaultWebviewHistoryBack) {    //H5未处理,默认使用WebView的返回
    if (self.webView.canGoBack) { //还能返回上一级
      [self.webView goBack];
    }
    else //已经返回到最后一级，直接离开H5
    {
      //[self cleanConnections];
      //if (self.isPresentToShow) {
      //  [self.navigationController dismissModalViewControllerAnimated:YES];
      //} else {
      [super backBarButtonClicked:nil];
      //}
    }
  }
}


- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
  // Dispose of any resources that can be recreated.
}

- (id)initWithURL:(NSURL *)url{
  //url = addFromFlagForURL(url);
  if (self = [super initWithNibName:NULL bundle:NULL]) {
    
    self.currentURL = url;
    if ([url.absoluteString hasPrefix:@"file://"]) {
      _isLocalWebPage = YES;
    } else {
      _isLocalWebPage = NO;
    }
    
    //_toolBarHidden = YES;
    NSAssert(self.currentURL.absoluteString.length >= 5, @"URL is too short %@", self.currentURL);
  }
  return self;
  
}
- (void)loadWebPage{
  
  if ([self.htmlContentString length] > 0) {
    [self.webView loadHTMLString:self.htmlContentString baseURL:nil];
  }
  else {
    //self.startLoadTimestamp = [[NSDate date] timeIntervalSince1970];
    NSMutableURLRequest *mReq = [NSMutableURLRequest requestWithURL:self.currentURL];
    if (true) {
      [self.webView loadRequest:mReq];
    }
  }
  
  
}


+ (H5ViewController *)loadURLWithFileContent:(NSURL*)url fromViewController:(UIViewController *)viewController
{
  
  
  bFileContentLoad = false;
  
  return [H5ViewController loadURL:url
                          forTitle:NULL
                          subClass:[H5ViewController class]
                fromViewController:viewController
                          animated:true];
}

+ (H5ViewController *)loadURL:(NSURL*)url fromViewController:(UIViewController *)viewController
{
  
  
  return [H5ViewController loadURL:url
                          forTitle:NULL
                          subClass:[H5ViewController class]
                fromViewController:viewController
                          animated:true];
}

+ (H5ViewController *)loadURL:(NSURL*)url forTitle:(NSString*)title subClass:(Class)cls fromViewController:(UIViewController *)viewController animated:(BOOL)animated
{
     NSString * textFileContents;
     if (bFileContentLoad){
     NSError *error;
     textFileContents = [NSString stringWithContentsOfFile:[[NSBundle mainBundle]
                                                           pathForResource:@"myTextFile"
                                                           ofType:@"html"]
                                                 encoding:NSUTF8StringEncoding
                                                    error: &error];
    
   }
  
  if ([cls isSubclassOfClass:[H5ViewController class]]) {
    H5ViewController *h5ViewController = [[cls alloc] initWithURL:url];
    if (title.length > 0) {
      [h5ViewController setTitle:title];
    }
    
    h5ViewController.htmlContentString = textFileContents;
    //h5ViewController.isShowLoadingPage = isShowLoadingPage;
    if ([viewController respondsToSelector:@selector(navigationController)]) {
      [viewController.navigationController pushViewController:h5ViewController animated:animated];
    }
    else {
      [viewController.navigationController pushViewController:h5ViewController animated:animated];
    }
    return h5ViewController;
  }
  
  return NULL;
  
}

/*
 #pragma mark - Navigation
 
 // In a storyboard-based application, you will often want to do a little preparation before navigation
 - (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
 // Get the new view controller using [segue destinationViewController].
 // Pass the selected object to the new view controller.
 }
 */

@end
