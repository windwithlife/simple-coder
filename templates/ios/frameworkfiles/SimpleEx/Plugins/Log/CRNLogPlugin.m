//
//  CRNLogPlugin.m
//  CTBusiness
//
//  Created by jim on 16/5/17.
//  Copyright © 2016年 Ctrip. All rights reserved.
//

#import "CRNLogPlugin.h"
#import "CTLogUtil.h"
#import "RCTConvert.h"
#import "CTUserOperationCollector.h"

@implementation CRNLogPlugin

- (void)callFunction:(NSString *)functionName
          parameters:(NSDictionary *)parameters
            callback:(RCTResponseSenderBlock)callback {

    NSDictionary *info = [RCTConvert NSDictionary:[parameters valueForKey:@"info"]];
    
    if ([functionName equalIgnoreCase:@"logTrace"]) {
        NSString *traceName = [RCTConvert NSString:[parameters valueForKey:@"traceName"]] ;
        [CTLogUtil logTrace:traceName userInfo:info];
        if (callback) {
            callback(@[CRNResult(0, functionName, NULL)]);
        }
    }
    else if ([functionName equalIgnoreCase:@"logMetric"]) {
        NSNumber *metricValue = [RCTConvert NSNumber:[parameters valueForKey:@"metricValue"]];
        NSString *metricName = [RCTConvert NSString:[parameters valueForKey:@"metricName"]] ;
        [CTLogUtil logMetrics:metricName value:metricValue userInfo:info];
        if (callback) {
            callback(@[CRNResult(0, functionName, NULL)]);
        }
    }
    else if ([functionName equalIgnoreCase:@"logMonitor"]) {
        NSString *monitorName = [RCTConvert NSString:[parameters valueForKey:@"monitorName"]] ;
        NSNumber *monitorValue = [RCTConvert NSNumber:[parameters valueForKey:@"monitorValue"]];
        [CTLogUtil logMonitor:monitorName value:monitorValue userInfo:info];
        if (callback) {
            callback(@[CRNResult(0, functionName, NULL)]);
        }
    }
    else if ([functionName equalIgnoreCase:@"logCode"]) {
        NSString *code = [RCTConvert NSString:[parameters valueForKey:@"code"]] ;
        [CTUserOperationCollector logCode:code withParams:info];
        if (callback) {
            callback(@[CRNResult(0, functionName, NULL)]);
        }
    }
    else if ([functionName equalIgnoreCase:@"logPage"]) {
        NSString *page = [RCTConvert NSString:[parameters valueForKey:@"page"]] ;
        [CTUserOperationCollector logPage:page withParams:info];
        if (callback) {
            callback(@[CRNResult(0, functionName, NULL)]);
        }
    }
    else {
        if (callback) {
            callback(@[CRNResult(1, functionName, @"unknow action for Log")]);
        }
        TLog(@"function Name:%@, params=%@", functionName, parameters);
    }
}

@end
