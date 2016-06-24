//
//  CRNBirthdayPickerPlugin.m
//  CTBusiness
//
//  Created by wei_l on 5/23/16.
//  Copyright © 2016 Ctrip. All rights reserved.
//

#import "CRNDatePickerPlugin.h"
#import "CTBirthdayPicker.h"
#import "CTH5Utility.h"
#import "RCTConvert.h"

@interface CRNDatePickerPlugin () <CTBirthdayPickerDelegate>

@property (nonatomic, copy) RCTResponseSenderBlock callback;

@end

@implementation CRNDatePickerPlugin
- (void)dealloc
{
    _callback = nil;
}

- (void)callFunction:(NSString *)functionName
          parameters:(NSDictionary *)parameters
            callback:(RCTResponseSenderBlock)callback {
    self.callback = callback;
    
    NSDate *date = [RCTConvert NSDate:parameters[@"date"]];
    NSInteger minDisplayyear = [RCTConvert NSNumber:parameters[@"minDisplayYear"]].integerValue;
    if ([functionName equalIgnoreCase:@"selectDate"]) {
        [[CRNPluginManager sharedInstance] retainObject:self];
        __weak __typeof(self) weakSelf = self;
        runBlockInMainThread(^{
            CTBirthdayPicker *picker = [[CTBirthdayPicker alloc] initWithDate:date andMinDisplayYear:minDisplayyear];
            __strong __typeof(weakSelf) strongSelf = weakSelf;
            picker.delegate = strongSelf;
            [picker showInView:[[self class] visibleViewController].view];
        });
    }
}

#pragma mark - CTBirthdayPickerDelegate
- (void)birthdayPickerCancel:(CTBirthdayPicker *)datePicker
{
    if (self.callback) {
        self.callback(@[CRNResult(0, @"selectDate", nil)]);
    }
    
    [[CRNPluginManager sharedInstance] releaseObject:self];
}

- (void)birthdayPickerConfirmWithDate:(NSDate *)date birthdayPicker:(CTBirthdayPicker *)birthdayPicker
{
    if (self.callback) {
        self.callback(@[CRNResult(0, @"selectDate", nil), @(date.timeIntervalSince1970 * 1000.0)]);
    }
    
    [birthdayPicker dismiss];
    
    [[CRNPluginManager sharedInstance] releaseObject:self];
}

@end
