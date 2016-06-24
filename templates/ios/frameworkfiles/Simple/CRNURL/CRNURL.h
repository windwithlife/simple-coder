//
//  CRNURL.h
//  CTBusiness
//
//  Created by wei_l on 5/26/16.
//  Copyright © 2016 Ctrip. All rights reserved.
//

#import <Foundation/Foundation.h>
#define kCommonRNJsBundleName @"rn_common_ios"

@interface CRNURL : NSObject

- (id)initWithPath:(NSString *)urlPath;

+ (BOOL)isCRNURL:(NSString *)url;

@property (nonatomic, readonly) NSString *rnFilePath;
@property (nonatomic, readonly)  NSString *rnModuleName;
@property (nonatomic, readonly) NSURL *rnBundleURL;
@property (nonatomic, readonly) BOOL rnIsHideNavBar;
@property (nonatomic, readonly) NSString *rnTitle;

+ (NSURL *)commonJSURL;

@end
