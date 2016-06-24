//
//  CTRNCalendarPlugin.m
//  CTBusiness
//
//  Created by wei_l on 11/27/15.
//  Copyright © 2015 Ctrip. All rights reserved.
//

#import "CRNCalendarPlugin.h"
#import "CTCalendar.h"

@implementation CRNCalendarPlugin
- (void)callFunction:(NSString *)functionName
          parameters:(NSDictionary *)parameters
            callback:(RCTResponseSenderBlock)callback
{
    if ([functionName isEqualToString:@"addCalendarEvent"]) {
        [self addCalendarEvent:parameters callback:(RCTResponseSenderBlock)callback];
    }
}

- (void)addCalendarEvent:(NSDictionary *)event callback:(RCTResponseSenderBlock)callback
{
    [CTCalendar addEvent:event completion:^(NSDictionary *result) {
        if (callback) {
            callback(@[CRNResult(0, @"addCalendarEvent", NULL), result]);
        }
    }];
}
@end
