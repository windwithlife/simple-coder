//
//  CRNHTTPClient.m
//  CTBusiness
//
//  Created by wei_l on 6/12/16.
//  Copyright © 2016 Ctrip. All rights reserved.
//

#import "CRNHTTPClient.h"
#import "CTHTTPClient.h"
#import "CTHTTPClientUtil.h"
#import "NSString+CTURL.h"
#import "JSONKit.h"

@implementation CRNHTTPClient
RCT_EXPORT_MODULE();

/*
 data:{
        url:http://xxx,
        method:"POST",//可省略，默认为 POST
        headers:{},// 可省略
        body:{},//可省略
        timeout:,//不建议自行设置此值，建议省略，会使用框架默认值
}
 */
RCT_REMAP_METHOD(fetch,
                 url:(NSString *)urlString
                 data:(NSDictionary *)data
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject)
{
    NSString *method = data[@"method"];
    NSDictionary *headers = data[@"headers"];
    NSDictionary *body = data[@"body"];
    NSInteger timeout = [data[@"timeout"] integerValue];
    if (timeout < 0 || timeout > 60) {
        timeout = 0;
    }
    
    NSURL *url = [NSURL URLWithString:[urlString utf8EncodeForURL]];
    
    NSMutableDictionary *params = [NSMutableDictionary dictionary];
    if (body) {
        [params addEntriesFromDictionary:body];
    }
    
    NSMutableURLRequest *requset = nil;
    if ([method.lowercaseString isEqualToString:@"get"]) {
        requset = [CTHTTPClientUtil URLRequestForSOAGet:url parameters:params];
    } else {
        requset = [CTHTTPClientUtil URLRequestForSOAPost:url parameters:params];
    }
    
    [headers enumerateKeysAndObjectsUsingBlock:^(NSString *key, id obj, BOOL *stop) {
        if ([key isKindOfClass:[NSString class]] && [key isKindOfClass:[NSString class]]) {
            [requset setValue:obj forHTTPHeaderField:key];
        }
    }];
    
    CTHTTPClient *cli = [CTHTTPClient client];
    
    [cli asyncJSONRequest:requset timeout:0 success:^(AFHTTPRequestOperation *operation, id responseObject) {
        NSDictionary *result = nil;
        if([responseObject isKindOfClass:[NSString class]]){
            result = [((NSString *)responseObject) objectFromJSONStringForCtrip];
        }else if([responseObject isKindOfClass:[NSDictionary class]]){
            result = responseObject;
        }
        resolve(result);
    } faild:^(AFHTTPRequestOperation *operation, NSError *error) {
        reject(@(error.code).stringValue, error.localizedDescription, error);
    }];
}

@end
