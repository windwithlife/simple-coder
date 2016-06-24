//
//  CTH5WebView.m
//  CTBusiness
//
//  Created by derick on 9/7/15.
//  Copyright (c) 2015 Ctrip. All rights reserved.
//

#import "SimpleWebView.h"
#import "JSONKit.h"
#import "NSString+CTExtensions.h"


//#define kHiJackRegexp @"/((100msh|cnzz|10086|gx10010)\\.(com|cn))|(\\/baseline\\/scg.js)|(\\/tlbsserver\\/jsreq[\\/?])/"

#define kHiJackRegexp @".*(((100msh|cnzz|10086|gx10010|gclick|17wo|cmigate|dreamfull)\\.(com|cn))"\
@"|(51\\.la)"\
@"|tongji\\w?\\.(in|us)"\
@"|([0-9.:/]+)/www/default/base\\.js"\
@"|(/baseline/scg.js)"\
@"|(/tlbsserver/jsreq[/?]?)).*";

#define kHiJackExpCode @"151207_oth_hack"

@interface SimpleWebView () {
    BOOL isWebPageLoadResultRecorded;
    BOOL isWebViewUnloadedByMemoryWaring;
}
@property (nonatomic, assign) NSTimeInterval startLoadTimestamp;

@property (nonatomic, strong) NSURL *currentURL;

@property (nonatomic, assign) BOOL isNeedReloadForWebviewMemoryCache;
@property (nonatomic, strong) NSError *pageLoadFailedError;
@end

static BOOL isHijacked = NO;

@implementation SimpleWebView

- (void)cleanConnections
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    //   [self.checkBridgeJsTimer invalidate];
   // self.checkBridgeJsTimer = NULL;

    //[self stopLoading];
    self.delegate = NULL;
}

- (void)setDelegate:(id<UIWebViewDelegate>)delegate_ {
  
  if (self.mDelegate != delegate_) {
        [super setDelegate:(id)self];
        self.mDelegate = delegate_;
    }
  
}

- (id)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        [self addNotifications];
        self.scalesPageToFit = YES;
        self.opaque = NO;
        self.maxRetryCheckBridgeJsTimes = kMaxRetryCheckBridgeJSTimes;
        UIScrollView *scrollView = (UIScrollView*)[[self subviews] objectAtIndex:0];
        if ([scrollView isKindOfClass:[UIScrollView class]]) {
            [scrollView setBounces:NO];
        }
        self.keyboardDisplayRequiresUserAction = NO;
    }

    return self;
}

#pragma mark - ---- URL 相关操作

- (void)loadRequestWithURL:(NSURL *)url {
//    {
//        self.isNeedReloadForWebviewMemoryCache = [CTH5InstallManager installPackagesForURLIfNeed:url];
//        self.currentURL = url;
//        NSAssert(self.currentURL.absoluteString.length >= 5, @"URL is too short %@", self.currentURL);
//        [CTH5PackageManager startDownloadAllPackagesListIfNeed];
//        isWebViewUnloadedByMemoryWaring = NO;
//    }
//
//    NSURLRequest *urlRequest = [NSURLRequest requestWithURL:self.currentURL];;
//    self.startLoadTimestamp = [[NSDate date] timeIntervalSince1970];
//    [self loadRequest:urlRequest];
}

- (void)autoCheckHijackIfNeedWithRegEx:(NSString *)regEx
{
//    if (!self.currentURL) {
//        return;
//    }
//    CTABTestResultModel *model = [CTABTestingManager getABTestResultModelByExpCode:kHiJackExpCode userinfo:@{@"HijackURL":self.currentURL.absoluteString}];
//    BOOL isExp = [[model.expVersion uppercaseString] isEqualToString:@"B"];
//
//    if ([NSURL isSuportHTTPS:self.currentURL] && isExp) {//支持 HTTPS 并且 实验版本为 B 的才检测
//        if (isHijacked) {//之前已经检测到了劫持
//            [self reloadWithHTTPS];
//        } else {//之前未检测到劫持则检测是否劫持
//            if ([self checkHijackWithRegEx:regEx]) {
//                isHijacked = YES;
//                [self reloadWithHTTPS];
//            }
//        }
//    }
}
- (void)reloadWithHTTPS
{
//    if (![NSURL isSuportHTTPS:self.currentURL]) {
//        return;
//    }
//    NSString *urlStr = [self.currentURL absoluteString];
//    urlStr = [urlStr stringByReplacingOccurrencesOfString:@"http://" withString:@"https://"];
//    NSURL *newURL = [NSURL URLWithString:[urlStr utf8EncodeForURL]];
//    [self loadRequestWithURL:newURL];
//
//    {
//        NSMutableDictionary *userInfo = [NSMutableDictionary dictionary];
//        [userInfo setValue:self.currentURL.absoluteString forKey:@"HijackURL"];
//        [CTLogUtil logMonitor:@"o_hijack_fixed" value:@0 userInfo:userInfo];
//    }
}


#pragma mark - ---- memory warning

//loading过程中，不能处理memory warning
- (void)resetWebViewForMemoryWarningIfNeed {
    if (!isWebViewUnloadedByMemoryWaring && self.isFinishedLoadWebView) {
        isWebViewUnloadedByMemoryWaring = YES;
        self.isFinishedLoadWebView = NO;
        self.pageLoadFailedError = nil;
        [self stopLoading];
        [self loadHTMLString:@"" baseURL:nil];
        [self resetBridgeJSChecker];
    }
}

- (void)reloadWebViewForMemoryWarningIfNeed {
    if (isWebViewUnloadedByMemoryWaring) {
        [self loadRequestWithURL:self.currentURL];
        isWebViewUnloadedByMemoryWaring = NO;
    }
}

- (void)dealloc {
    //TLog(@"CTH5WebView dealloced.");
    [self cleanConnections];
    [super setDelegate:nil];
    self.mDelegate = nil;
}

#pragma mark - UIWebViewDelegate
- (BOOL)webView:(UIWebView *)webView
shouldStartLoadWithRequest:(NSURLRequest *)request
 navigationType:(UIWebViewNavigationType)navigationType {

    {
        //NSString *urlStr = [[request URL] absoluteString];
        //H5Log(urlStr, NULL);
    }

//    if(XLG_Enabled) {
//        NSString *requestString = [[[request URL] absoluteString] stringByReplacingPercentEscapesUsingEncoding: NSUTF8StringEncoding];
//        if ([requestString hasPrefix:@"ios-log:"]) {
//            NSArray *tmpArr = [requestString componentsSeparatedByString:@":#iOS#"];
//            if ([tmpArr count] > 1) {
//                NSString* logString = [tmpArr objectAtIndexForCtrip:1];
//                H5Log(logString, NULL);
//                TLog(@"UIWebView console: %@", logString);
//            }
//            return NO;
//        }
//    }

    NSURL *url = [request URL];
    NSString *schema = url.scheme.lowercaseString;
    NSString *host = url.host.lowercaseString;
    NSString *relativePath = url.relativePath.lowercaseString;
    if ([schema isEqualToString:@"ctrip"]) {//plugin 直接放在 webView 里面处理了。
        if ([host isEqualToString:@"h5"]) {
            if ([relativePath isEqualToString:@"/plugin"]) {
                [self handleURLStringWithPlugin:[url query]];
            }
        } else {
            //[CTUtil dispatchURL:url];
            //[CTBus callData:@"common/dispatchURL" param:url, nil];
        }

        return NO;
    }
    else if ([SimpleWebView isBlankURL:url]) {
        return YES;
    }
    else {
        if ([self.mDelegate respondsToSelector:@selector(webView:shouldStartLoadWithRequest:navigationType:)]) {
            return [self.mDelegate webView:webView shouldStartLoadWithRequest:request navigationType:navigationType];
        } else if (!self.mDelegate) {
            return NO;
        }
    }

    return YES;
}

+ (BOOL)isBlankURL:(NSURL *)url {
  return [[[url absoluteString] lowercaseString] isEqualToString:@"about:blank"];
}

- (void)setWindowNameIfNeed:(UIWebView *)webView {
//    if ([self isLegalCtripURL]) {
//        NSString *initStr = [[CTH5UserPlugin getHybridInitParams] JSONStringForCtrip];
//        NSString *initJs = [NSString stringWithFormat:@"window.name=JSON.stringify(%@)", initStr];
//        H5Log(@"设置window.name:", initJs);
//        [webView stringByEvaluatingJavaScriptFromString:initJs];
//    }
}

- (void)webViewDidStartLoad:(UIWebView *)webView {
    [self resetBridgeJSChecker];
    [self setWindowNameIfNeed:webView];
    self.pageLoadFailedError = NULL;
    if ([self.mDelegate respondsToSelector:@selector(webViewDidStartLoad:)] &&
        ![SimpleWebView isBlankURL:webView.request.URL]) {
        [self.mDelegate webViewDidStartLoad:webView];
    }
}

- (void)recordInitTime:(NSString *)action {
    //double useTm = [[NSDate date] timeIntervalSince1970] - self.startLoadTimestamp;
    //TLog(@"use time==[%@]---%.2f", action, useTm);

}

- (void)webViewDidFinishLoad:(UIWebView *)webView {
    [self autoCheckHijackIfNeedWithRegEx:nil];
    //double useTm = [[NSDate date] timeIntervalSince1970] - self.startLoadTimestamp;
    //TLog(@"use time==finished_load---%.2f", useTm);

    if(self.isNeedReloadForWebviewMemoryCache) {
        self.isNeedReloadForWebviewMemoryCache = NO;
        [self stopLoading];
        [self reload];
    } else {
        self.isFinishedLoadWebView = YES;
        self.pageLoadFailedError = NULL;
        [self autoCheckBridgeJS];

        if ([self.mDelegate respondsToSelector:@selector(webViewDidFinishLoad:)] &&
            ![SimpleWebView isBlankURL:webView.request.URL]) {
            [self.mDelegate webViewDidFinishLoad:self];
        }

        //可能不支持lizard框架的ctrip域下的URL，会使用timer，检测window.app.callback对象
    }
}

- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error {
    self.pageLoadFailedError = error;
   // [self logLoadPageFinishedIfNeed];

    if ([self.mDelegate respondsToSelector:@selector(webView:didFailLoadWithError:)] &&
        ![SimpleWebView isBlankURL:webView.request.URL]) {
        [self.mDelegate webView:webView didFailLoadWithError:error];
    }
}


#pragma mark - ---- 插件转发
/*
- (void)handleCommand:(CTH5URLCommand *)cmd {
    if (!cmd) {
        return;
    }

    CTH5Plugin *plugin = [self.pluginObjectsDict objectForKey:cmd.className];
    if (NULL == plugin) {
        Class cls = NSClassFromString(cmd.className);
        if (self.viewController != NULL) {
            plugin = [[cls alloc] initWithH5ViewController:self.viewController];
        } else {
            plugin = [[cls alloc] initWithH5WebView:self];
        }
        plugin.h5WebView = self;
        if (!self.pluginObjectsDict) {
            self.pluginObjectsDict = [NSMutableDictionary dictionary];
        }
        [self.pluginObjectsDict setSafeObject:plugin forKey:cmd.className];
    }

    if (plugin) {
        SEL selector = NSSelectorFromString(cmd.methodName);
        if ([plugin respondsToSelector:selector]) {
            void (*objcMsgSend)(id, SEL, id) = (void*)objc_msgSend;
            objcMsgSend(plugin , selector,cmd);
        }
    }
}
*/

- (void)handleURLStringWithPlugin:(NSString *)string
{
    if (string.length == 0) {
        return;
    }
//    CTH5URLCommand *cmd = [CTH5URLCommand commandFromUrlString:string];
//    [self handleCommand:cmd];
}

#pragma mark - ---- notifications

- (void)addNotifications {
    NSNotificationCenter *notifyCenter = [NSNotificationCenter defaultCenter];
    [notifyCenter addObserver:self
                     selector:@selector(appDidEnterBackground)
                         name:UIApplicationDidEnterBackgroundNotification
                       object:nil];
    [notifyCenter addObserver:self
                     selector:@selector(appWillEnterForeground)
                         name:UIApplicationWillEnterForegroundNotification
                       object:nil];
    [notifyCenter addObserver:self
                     selector:@selector(appBecomeActive)
                         name:UIApplicationDidBecomeActiveNotification
                       object:NULL];
//
//    [notifyCenter addObserver:self
//                     selector:@selector(networkChanged:)
//                         name:kNetworkDidChangedNotification
//                       object:NULL];
//    [notifyCenter addObserver:self
//                     selector:@selector(reloadWebViewFromPageName:)
//                         name:kH5NativeShouldReloadNotification
//                       object:nil];
//    [notifyCenter addObserver:self
//                     selector:@selector(reloadWebView:)
//                         name:kH5WebViewShouldReloadNotification
//                       object:nil];


}

- (void)appDidEnterBackground {
    if (self.isLoading) {
        [self stopLoading];
    }
}

- (void)appWillEnterForeground {
    if (!self.isFinishedLoadWebView) {
        [self reload];
    }
}

- (void)appBecomeActive {
    if (self.isFinishedLoadWebView && self.isBridgeSupport) {
        [self callBackH5WithTagName:@"app_become_active" param:NULL];
    }
}

- (void)networkChanged:(NSNotification *)notify {
//    if (self.isFinishedLoadWebView && self.isBridgeSupport) {
//        BOOL hasNetwork = ([CTNetworkUtil sharedInstance].networkType != NetworkType_None);
//        NSString *networkType = [CTNetworkUtil sharedInstance].networkTypeInfo;
//        NSDictionary *paramDict = [NSDictionary dictionaryWithObjectsAndKeys:[NSNumber numberWithBool:hasNetwork], @"hasNetwork", networkType, @"networkType", nil];
//        [self callBackH5WithTagName:@"network_did_changed" param:paramDict];
//    }
}

- (void)callbackForWebViewAppear {
//    if (self.isFinishedLoadWebView && self.isBridgeSupport) {
//        NSString *callbackString = [CTH5Global sharedCTH5Global].h5WebViewCallbackString;
//        NSMutableDictionary *userInfo = [NSMutableDictionary dictionary];
//        if (callbackString.length > 0) {
//            userInfo[@"callbackString"] = callbackString;
//        }
//        [userInfo setValue:self.webViewPageName forKey:@"pageName"];
//        [self callBackH5WithTagName:@"web_view_did_appear" param:userInfo];
//        [CTH5Global sharedCTH5Global].h5WebViewCallbackString = NULL;
//    }
}

- (void)reloadWebViewFromPageName:(NSNotification *)notify {
//    NSDictionary *userInfo = notify.userInfo;
//    if ([[userInfo valueForKey:@"pageName"] isEqualToString:self.webViewPageName]) {
//        NSDictionary *dict = [userInfo valueForKey:@"arguments"];
//        if (dict != NULL){
//            [CTH5Global sharedCTH5Global].h5WebViewCallbackString = [dict JSONStringForCtrip];
//        }
//        if ([NSThread currentThread].isMainThread) {
//            [self reload];
//        }
//        else {
//            __weak CTH5WebView *weakSelf = self;
//            runBlockInMainThread(^{
//                [weakSelf reload];
//            });
//        }
//    }
}

- (void)reloadWebView:(NSNotification *)notify {
    NSDictionary *userInfo = notify.userInfo;

    if (userInfo != NULL) {
       // NSString *jsonParam  = [userInfo JSONStringForCtrip];
       // [CTH5Global sharedCTH5Global].h5WebViewCallbackString = jsonParam;
    }
    else {
        [self reload];
    }
}


/////////////


#pragma mark - JSBridge API
void runBlockInMainThread(dispatch_block_t block) {
  if (block == nil) {
    return;
  }
  
  if ([NSThread isMainThread]) {
    block();
  }
  else {
    dispatch_sync(dispatch_get_main_queue(), block);
  }
}
- (NSString *)executeJs:(NSString *)js
{
  if (js.length == 0) {
    return nil;
  }
  
  __block NSString *ret = nil;
  
  if (![NSThread currentThread].isMainThread) {
    __block BOOL isFinishedExecuteJS = NO;
    __weak SimpleWebView *weakSelf = (id)self;
    runBlockInMainThread(^{
      ret = [weakSelf tryExecuteJs:js];
      isFinishedExecuteJS = YES;
    });
    
    while (!isFinishedExecuteJS) {
      [[NSRunLoop currentRunLoop] runMode:NSDefaultRunLoopMode beforeDate:[NSDate distantFuture]];
    }
  } else {
    ret = [self tryExecuteJs:js];
  }
  
  //H5Log(js, ret);
  return ret;
}

- (NSString *)callBackH5WithTagName:(NSString *)tagName param:(NSObject*)param
{
//  if (![self isLegalCtripURL] || ![self isBridgeSupport]) {
//    return nil;
//  }
//  
//  NSString *jsRet = nil;
//  
//  if (tagName.length > 0) {
//    NSMutableDictionary *jsonDict = [NSMutableDictionary dictionary];
//    [jsonDict setSafeObject:tagName forKey:@"tagname"];
//    
//    if (param != NULL) {
//      [jsonDict setSafeObject:param forKey:@"param"];
//    }
//    
//    NSString *jsParam = [jsonDict JSONStringForCtrip];
//    if (jsParam.length > 0) {
//      NSString *js = [CTH5Global makeBridgeCallbackJSString:jsParam];
//      jsRet = [self executeJs:js];
//    }
//  }
//  return jsRet;
  return nil;
}


#pragma mark - ---- webView加载完成事件

- (void)resetBridgeJSChecker {
  self.retryCheckBridgeJsTimes = 0;
  self.isBridgeSupport = NO;
  [self.checkBridgeJsTimer invalidate];
  self.checkBridgeJsTimer = nil;
}

- (void)callbackForWebViewLoadFinished {
  NSMutableDictionary *userDict = [NSMutableDictionary dictionary];
  //userDict[@"version"] = getAppVersion();
  userDict[@"platform"] = [NSNumber numberWithInt:1];
  userDict[@"osVersion"] = [NSString stringWithFormat:@"iOS_%@", [UIDevice currentDevice].systemVersion];
  //userDict[@"extSouceID"] = [[CTGlobalMemoryCache getInstance] getValidExtSourceStr];
  [self callBackH5WithTagName:@"web_view_finished_load" param:userDict];
}

- (void)autoCheckBridgeJS {
  if ([self isLegalSimpleURL]) {
    [self checkBridgeJSTimerAction:NULL];
    if (!self.isBridgeSupport) {
      [self.checkBridgeJsTimer invalidate];
      self.checkBridgeJsTimer = [NSTimer scheduledTimerWithTimeInterval:0.5
                                                                 target:self
                                                               selector:@selector(checkBridgeJSTimerAction:)
                                                               userInfo:nil
                                                                repeats:YES];
    }
  }
}

- (void)checkBridgeJSIsSupport {
  if (!self.isBridgeSupport) {
    NSString *js = @"(window.app!=undefined)&&(window.app.callback!=undefined)";
    NSString *obj = (id)[self executeJs:js];
   // NSString *log = [NSString stringWithFormat:@"h5_check window.app.callback ==%@", obj];
   // H5Log(log,nil);
    self.isBridgeSupport = [obj boolValue];
  }
}

- (void)checkBridgeJSTimerAction:(NSTimer *)timer {
  self.retryCheckBridgeJsTimes++;
  [self checkBridgeJSIsSupport];
  
  if (self.retryCheckBridgeJsTimes >= self.maxRetryCheckBridgeJsTimes || self.isBridgeSupport) {
    [self.checkBridgeJsTimer invalidate];
    self.checkBridgeJsTimer = NULL;
  }
  
  if (self.isBridgeSupport) {
    [self callbackForWebViewLoadFinished];
  }
}

#pragma mark - Internal Methods
- (NSString *)tryExecuteJs:(NSString *)js
{
  NSString *ret = nil;
  @try {
    ret = [self stringByEvaluatingJavaScriptFromString:js];
  } @catch(NSException *e) {
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    [dict setObject:js forKey:@"js"];
    [dict setObject:e.name forKey:@"name"];
    [dict setObject:e.reason forKey:@"reason"];
    [dict setObject:e.userInfo forKey:@"userInfo"];
   // [CTLogUtil logTrace:@"o_exe_js_error" userInfo:dict];
  }
  
  return ret;
}

- (BOOL)isLegalSimpleURL {
//  if (isDevEnv()) {
//    return YES;
//  } else {
//    NSURL *currentURL = self.request.URL;
//    NSString *urlString = [currentURL.absoluteString lowercaseString];
//    BOOL isLocalHTMLFile = [urlString hasPrefix:@"file://"];
//    BOOL isDevURL = [urlString rangeOfString:@"http://10.2.57.11/"].location != NSNotFound;
//    if (isLocalHTMLFile || [StringUtil isCtripURL:currentURL.host] || isDevURL) {
//      return YES;
//    }
//    
//    return NO;
//    
//  }
  return YES;
  
}



@end
