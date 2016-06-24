//
//  CRNJSLoader.m
//  CTBusiness
//
//  Created by wei_l on 5/26/16.
//  Copyright © 2016 Ctrip. All rights reserved.
//

#import "CRNJSLoader.h"
#import "CRNCacheManager.h"
#import "CRNURL.h"
#import "RCTUtils.h"
//#import "CTH5InstallManager.h"

@interface CRNJSLoader ()

@end

@implementation CRNJSLoader

+ (void)loadJSDataForURL:(NSURL *)url withBlock:(RCTSourceLoadBlock)loadCallback
{
    [self loadDataForURL:url withBlock:^(NSError *error, NSData *source) {
        NSData *data = source;
        if (!error && data) {
            if ([CRNJSLoader needMergeCommonJSForURL:url]) {
                [self commonJSDatawWithBlock:^(NSError *error, NSData *source) {
                    NSMutableData *commonJSData = [NSMutableData dataWithData:source];
                    [commonJSData appendData:data];
                    loadCallback(error, commonJSData);
                }];
            } else {
                loadCallback(error, data);
            }
        } else {
            loadCallback(error, data);
        }
    }];
}

+ (void)loadDataForURL:(NSURL *)url withBlock:(RCTSourceLoadBlock)loadCallback
{
    NSURLSessionDataTask *task = [[NSURLSession sharedSession] dataTaskWithURL:url completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
        if (error) {
            loadCallback(error, nil);
        } else {
            NSStringEncoding encoding = NSUTF8StringEncoding;
            if (response.textEncodingName != nil) {
                CFStringEncoding cfEncoding = CFStringConvertIANACharSetNameToEncoding((CFStringRef)response.textEncodingName);
                if (cfEncoding != kCFStringEncodingInvalidId) {
                    encoding = CFStringConvertEncodingToNSStringEncoding(cfEncoding);
                }
            }

            if ([response isKindOfClass:[NSHTTPURLResponse class]] && ((NSHTTPURLResponse *)response).statusCode != 200) {
                NSString *rawText = [[NSString alloc] initWithData:data encoding:encoding];
                NSDictionary *userInfo;
                NSDictionary *errorDetails = RCTJSONParse(rawText, nil);
                if ([errorDetails isKindOfClass:[NSDictionary class]] && [errorDetails[@"errors"] isKindOfClass:[NSArray class]]) {
                    NSMutableArray<NSDictionary *> *fakeStack = [NSMutableArray new];
                    for (NSDictionary *err in errorDetails[@"errors"]) {
                        [fakeStack addObject: @{
                                                @"methodName": err[@"description"] ?: @"",
                                                @"file": err[@"filename"] ?: @"",
                                                @"lineNumber": err[@"lineNumber"] ?: @0
                                                }];
                    }
                    userInfo = @{
                                 NSLocalizedDescriptionKey: errorDetails[@"message"] ?: @"No message provided", @"stack": fakeStack,
                                 };
                } else {
                    userInfo = @{NSLocalizedDescriptionKey: rawText};
                }
                error = [NSError errorWithDomain:@"CRNJSLoader"
                                            code:((NSHTTPURLResponse *)response).statusCode
                                        userInfo:userInfo];
                loadCallback(error, data);
            } else {
                loadCallback(nil, data);
            }
        }
    }];
    
    [task resume];
}

+ (void)commonJSDatawWithBlock:(RCTSourceLoadBlock)loadCallback
{
    NSData *data = [[CRNCacheManager sharedInstance] cachedJSDataForURL:[CRNURL commonJSURL]];
    if (!data) {
        [self loadDataForURL:[CRNURL commonJSURL] withBlock:^(NSError *error, NSData *source) {
            if (!error && source) {
                [[CRNCacheManager sharedInstance] cacheJSData:source forURL:[CRNURL commonJSURL]];
            }
            
            loadCallback(error, source);
        }];
    } else {
        loadCallback(nil, data);
    }
}

+ (BOOL)needMergeCommonJSForURL:(NSURL *)url
{
    return [url.absoluteString.lowercaseString containsString:@"needMergeCommonJS".lowercaseString];
}
@end
