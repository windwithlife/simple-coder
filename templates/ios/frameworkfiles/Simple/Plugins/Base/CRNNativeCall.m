//
//  CRNCall.m
//  CTBusiness
//
//  Created by derick on 15/11/18.
//  Copyright © 2015年 Ctrip. All rights reserved.
//

#import "CRNNativeCall.h"
#import "CRNPlugin.h"

@implementation CRNNativeCall

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(callNative,
                 callModule:(NSString *)moduleName
                 function:(NSString *)functionName
                 parameters:(NSDictionary *)parameters)
{
    [CRNPlugin callModule:moduleName
                 function:functionName
               parameters:parameters
                 callback:nil];
}

RCT_REMAP_METHOD(callNativeWithCallback,
                 callModule:(NSString *)moduleName
                  function:(NSString *)functionName
                  parameters:(NSDictionary *)parameters
                  callback:(RCTResponseSenderBlock)callback)
{
    [CRNPlugin  callModule:moduleName
                  function:functionName
                parameters:parameters
                  callback:callback];
}
@end
