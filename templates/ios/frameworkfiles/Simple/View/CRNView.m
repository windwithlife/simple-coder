//
//  CRNView.m
//  AwesomeProject
//
//  Created by derick on 15/11/18.
//  Copyright © 2015年 Facebook. All rights reserved.
//

#import "CRNView.h"
#import "RCTBridgeDelegate.h"
#import "CRNJSLoader.h"

@interface CRNView () <RCTBridgeDelegate>
@property (nonatomic, copy) NSURL *url;
@end

@implementation CRNView

- (instancetype)initWithBundleURL:(NSURL *)bundleURL
                       moduleName:(NSString *)moduleName
                initialProperties:(NSDictionary *)initialProperties
                    launchOptions:(NSDictionary *)launchOptions
{
   //self = [super initWithBundleURL:bundleURL moduleName:moduleName initialProperties:nil launchOptions:nil];

   //return self;
  

    self.url = bundleURL;
    RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
    
    return [self initWithBridge:bridge moduleName:moduleName initialProperties:initialProperties];
 
}

#pragma mark - RCTBridgeDelegate
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
    return self.url;
}

- (void)loadSourceForBridge:(RCTBridge *)bridge
                  withBlock:(RCTSourceLoadBlock)loadCallback
{
    [CRNJSLoader loadJSDataForURL:self.url withBlock:^(NSError *error, NSData *source) {
        loadCallback(error, source);
    }];
}
@end
