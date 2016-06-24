//
//  CRNURL.m
//  CTBusiness
//
//  Created by wei_l on 5/26/16.
//  Copyright © 2016 Ctrip. All rights reserved.
//
#import "NSString+CTExtensions.h"
#import "NSString+CTURL.h"
#import "CTArray.h"
#import "CRNURL.h"
#define kDocRNBundleFlag @"/doc/"  //放到设备documents目录可用
#define kAbsRNBundleFlag @"/abs/"  //本地测试可用
#import "SimpleDefines.h"



@interface CRNURL()

@property (nonatomic, copy) NSString *fileAbsolutePath;
@property (nonatomic, copy)  NSString *moduleName;
@property (nonatomic, copy)  NSString *title;
@property (nonatomic, strong) NSURL *bundleURL;
@property (nonatomic, assign) BOOL isHideNavBar;

@end

@implementation CRNURL

+ (BOOL)isCRNURL:(NSString *)url {
    //return [url.lowercaseString containsString:@"crnmodulename="] && [url.lowercaseString containsString:@"crntype=1"];
    return [url.lowercaseString containsString:@"crnmodulename="];
}

- (id)initWithPath:(NSString *)urlPath {
    if (self = [super init]) {
        if ([urlPath.lowercaseString hasPrefix:@"http"] || [urlPath.lowercaseString hasPrefix:@"file:"]) {
            self.fileAbsolutePath = urlPath;
            self.bundleURL = [NSURL URLWithString:[urlPath utf8EncodeForURL]];
        }else if ([urlPath hasPrefix:kResourceRNBundleFlag]){
           NSRange paramRange = [urlPath rangeOfString:@"?"];
          if (paramRange.location != NSNotFound) {
            self.fileAbsolutePath = [urlPath substringToIndex:paramRange.location];
            self.fileAbsolutePath = [self.fileAbsolutePath substringFromIndex:kResourceRNBundleFlag.length];
            self.bundleURL=[[NSBundle mainBundle] URLForResource:self.fileAbsolutePath withExtension:@"jsbundle"];
            NSString* url =[urlPath substringFromIndex: paramRange.location+1];
            NSMutableDictionary *params = [[NSMutableDictionary alloc] init];
            for (NSString *param in [url componentsSeparatedByString:@"&"]) {
              NSArray *elts = [param componentsSeparatedByString:@"="];
              if([elts count] < 2) continue;
              [params setObject:[elts lastObject] forKey:[elts firstObject]];
            }

            self.moduleName = [params objectForKey:@"crnmodulename"];
            self.title = [params objectForKey:@"crntitle"];
          }
          
          return self;
          
        }
        else if ([urlPath hasPrefix:@"/"]) {
            NSRange paramRange = [urlPath rangeOfString:@"?"];
            if (paramRange.location != NSNotFound) {
                self.fileAbsolutePath = [urlPath substringToIndex:paramRange.location];

                if ([urlPath hasPrefix:kDocRNBundleFlag]) {
                    self.fileAbsolutePath = [self.fileAbsolutePath  substringFromIndex:kDocRNBundleFlag.length];
                    self.fileAbsolutePath = [kDocumentDir stringByAppendingPathComponent:self.fileAbsolutePath];
                }
                if ([urlPath hasPrefix:kAbsRNBundleFlag]) {
                    self.fileAbsolutePath = [self.fileAbsolutePath substringFromIndex:kAbsRNBundleFlag.length];
                }
                else {
                    self.fileAbsolutePath = [kWebAppDirPath stringByAppendingPathComponent:self.fileAbsolutePath];
                }
                
                NSString *queryString = [urlPath substringFromIndex:paramRange.location];
                self.bundleURL = [NSURL fileURLWithPath:self.fileAbsolutePath];
                NSString *urlStr = [self.bundleURL.absoluteString stringByAppendingString:[queryString stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
                self.bundleURL = [NSURL URLWithString:urlStr];
            }
        }
        
        {
            NSDictionary *query = [self.bundleURL.absoluteString query];
            for (NSString *key in query.allKeys) {
                if ([key.lowercaseString isEqualToString:@"crnmodulename"]) {
                    self.moduleName = query[key];
                }
                else if ([key.lowercaseString isEqualToString:@"crntitle"]) {
                    self.title = query[key];
                }
            }
        }
        
        self.isHideNavBar = [CRNURL isRNURLHideNavigationBar:urlPath];
    }
    return self;
}

+ (BOOL)isRNURLHideNavigationBar:(NSString *)urlString {
    return [urlString.lowercaseString containsString:@"isHideNavBar=YES".lowercaseString];
}


- (NSString *)rnFilePath {
    return self.fileAbsolutePath;
}

- (NSString *)rnModuleName {
    return self.moduleName;
}

- (NSURL *)rnBundleURL {
    return self.bundleURL;
}

- (BOOL)rnIsHideNavBar {
    return self.isHideNavBar;
}

- (NSString *)rnTitle {
    return self.title;
}

+ (NSURL *)commonJSURL {
//    return [[NSBundle mainBundle] URLForResource:@"common" withExtension:@"js"];
//    return [NSURL URLWithString:@"http://10.2.57.11/rapi/test/merge_test/common.js"];//临时测试用
    return [NSURL fileURLWithPath:[kWebAppDirPath stringByAppendingString:@"rn_common_ios/base.js"]];
}

@end
