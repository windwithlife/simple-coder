//
//  CRNViewController.m
//  CTBusiness
//
//  Created by derick on 16/4/27.
//  Copyright © 2016年 Ctrip. All rights reserved.
//

#import "CRNViewController.h"
#import "CRNView.h"
#import "CRNDispatcher.h"
#import "RCTBridge+Private.h"
//#import "CTH5UserPlugin.h"
#import "JSONKit.h"
//#import "CTAnimationLoadingView.h"
//#import "CTH5InstallManager.h"
//#import "CTUserOperationCollector.h"
#import "RCTEventDispatcher.h"
#import "UIView+React.h"

@interface CRNViewController ()
@property (nonatomic, strong) CRNURL *url;
@property (nonatomic, strong) CRNView *rctView;

@property (nonatomic, assign) BOOL disableDefaultBack;

@property (nonatomic, assign) CFTimeInterval scriptStartLoadTime;
@end

@implementation CRNViewController

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (instancetype)initWithURL:(CRNURL *)url
{
    if (self = [super init]) {
        _disableDefaultBack = NO;
        self.url = url;
        //[CTH5InstallManager installPackagesForURLIfNeed:url.rnBundleURL];
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(jsBundleLoadFinished:)
                                                     name:RCTJavaScriptWillStartLoadingNotification
                                                   object:nil];
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(jsBundleLoadFinished:)
                                                     name:RCTJavaScriptDidLoadNotification
                                                   object:nil];
    }
    
    return self;
}

#pragma mark - Notifications
- (void)jsBundleStartLoading:(NSNotification *)notification
{
    _scriptStartLoadTime = CFAbsoluteTimeGetCurrent();
}

- (void)jsBundleLoadFinished:(NSNotification *)notification
{
  /*
    //埋点记录js加载时间
    CFTimeInterval loadTime = CFAbsoluteTimeGetCurrent() - _scriptStartLoadTime;
    //[CTUserOperationCollector logMetrics:@"crn_load_time" value:@(loadTime) tags:@{@"url":self.url ? ////
  //self.url : @""}];
    
    NSDictionary *dict = notification.userInfo;
    RCTBridge *bridge = [dict valueForKey:@"bridge"];
    if ([bridge isKindOfClass:[RCTBridge class]]) {
        if ([bridge.bundleURL isEqual:self.url]) {
           NSDictionary *envParam = [CTH5UserPlugin getHybridInitParams];
            [bridge.javaScriptExecutor injectJSONText:[envParam JSONStringForCtrip]
                                  asGlobalObjectNamed:@"CRNEnv"
                                             callback:^(NSError *error) {
                                                 if (error != NULL) {
                                                     NSLog(@"error==%@", error);
                                                 }
                                  }];
        }
    }
    */
    self.rctView.hidden = NO;
}

- (void)backBarButtonClicked:(id)sender
{
    [NSObject cancelPreviousPerformRequestsWithTarget:self];
    if (_disableDefaultBack) {
        [self sendRNEvent:@{} name:@"backButtonPressed"];
    } else {
        [super backBarButtonClicked:sender];
    }
}

- (void)setDisableDefaultBack
{
    _disableDefaultBack = YES;
}

#pragma mark -
- (void)viewDidLoad
{
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
    
    //UIImageView *sloganImageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"common_slogan.png"]];
    //sloganImageView.center = CGPointMake(self.view.bounds.size.width / 2.0, self.view.bounds.size.height / 2.0);
    //[self.view addSubview:sloganImageView];
  
    NSURL *jsCodeLocation;
    //jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
    self.rctView = [[CRNView alloc] initWithBundleURL: jsCodeLocation
                                           moduleName: @"youRN"
                                    initialProperties: nil
                                        launchOptions:nil];
  
  
    self.rctView.frame = self.view.bounds;
    self.rctView.hidden = YES;
    
    [self.view addSubview:self.rctView];
    [self setDisableDefaultBack:true];
}

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    if ([self.url rnIsHideNavBar]) {
        self.navigationController.navigationBarHidden = NO;
    }
    [self sendRNEvent:@{@"animated":@(animated)} name:@"viewWillDisappear"];
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    if ([self.url rnIsHideNavBar]) {
        self.navigationController.navigationBarHidden = YES;
    }
    [self sendRNEvent:@{@"animated":@(animated)} name:@"viewWillAppear"];
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    [self sendRNEvent:@{@"animated":@(animated)} name:@"viewDidAppear"];
}

- (void)sendRNEvent:(NSDictionary *)event name:(NSString *)name
{
    RCTBridge *bridge = self.rctView.bridge;
    if (bridge.isValid) {
        @try {
            [bridge.eventDispatcher sendDeviceEventWithName:name body:event];
        } @catch (NSException *exception) {
            //TLog(@"%@", exception);
        } @finally {
            
        }
    }
}

/*
 * 初始传给 JS 层的数据
 {
 "env":{}, //[CTH5UserPlugin getHybridInitParams]
 "urlQuery":{}, //url 的 query 键值对{}
 };
 */
+ (NSDictionary *)initialPropertiesWithURLString:(NSString *)urlString
{
    NSMutableDictionary *properties = [NSMutableDictionary dictionary];
    //NSDictionary *env = [CTH5UserPlugin getHybridInitParams];
    //[properties setObject:env ? env : @{} forKey:@"env"];
    //NSDictionary *query = [urlString query];
    //[properties setObject:query ? query : @{} forKey:@"urlQuery"];
    
    return properties;
}
@end
