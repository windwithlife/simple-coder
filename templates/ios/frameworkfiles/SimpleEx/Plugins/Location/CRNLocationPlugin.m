//
//  CRNLocationPlugin.m
//  CTPublicProduct
//
//  Created by wei_l on 6/12/16.
//  Copyright © 2016 ctrip. All rights reserved.
//

#import "CRNLocationPlugin.h"
#import "CTLocation.h"

@interface CRNLocationPlugin () <CTLocationDelegate>

@property (nonatomic, assign) NSTimeInterval timeout;
@property (nonatomic, assign) BOOL isForceLocate;
@property (nonatomic, assign) NSInteger locateLevel;
@property (nonatomic, copy) RCTResponseSenderBlock callback;

@property (nonatomic, assign) CLLocationCoordinate2D coordinate;
@property (nonatomic, strong) CTGeoAddress *geoAddress;
@property (nonatomic, strong) CTCtripCity *ctripCity;

@property (nonatomic, weak) CTLocationClient *locationClient;

@end

@implementation CRNLocationPlugin

-(void)dealloc
{
    [[CTLocationManager sharedLocationManager] stopLocating:self.locationClient];
    _locationClient = nil;
    _callback = nil;
}

- (void)callFunction:(NSString *)functionName
          parameters:(NSDictionary *)parameters
            callback:(RCTResponseSenderBlock)callback
{
    if ([functionName isEqualToString:@"locate"]) {
        _locateLevel = [parameters[@"locateLevel"] intValue];
        _timeout = [parameters[@"timeout"] intValue];
        _isForceLocate = [parameters[@"isForceLocate"] boolValue];
        self.callback = callback;

        [[CRNPluginManager sharedInstance] retainObject:self];
        self.locationClient = [[CTLocationManager sharedLocationManager] startLocatingWithDelegate:self
                                                                                           timeout:self.timeout
                                                                                      disableCache:self.isForceLocate
                                                                                     needCtripCity:0 == self.locationLevel];
    }
}

- (NSInteger)locationLevel
{
    if ((0 != _locateLevel) && (1 != _locateLevel) && (2 != _locateLevel)) {
        _locateLevel = 0;
    }
    
    return _locateLevel;
}

- (NSTimeInterval)timeout
{
    if (_timeout < 0 || _timeout > 60) {
        _timeout = 0;
    }
    
    return _timeout;
}

#pragma mark - ---- 定位及回调
//成功获取到经纬度回调
- (void)locationClient:(CTLocationClient *)client locationSuccessWithCoordinate:(CLLocationCoordinate2D)coordinate
{
    self.coordinate = coordinate;
    if (2 == self.locationLevel) {
        [self locateCallBack:nil geoPoint:coordinate ctripCity:nil locationClient:client];
        [[CTLocationManager sharedLocationManager] stopLocating:self.locationClient];
    }
}

//成功获取到逆地址信息回调
- (void)locationClient:(CTLocationClient *)client locationSuccessWithGeoAddress:(CTGeoAddress *)geoAddress
{
    self.geoAddress = geoAddress;
    if (1 == self.locationLevel) {
        [self locateCallBack:geoAddress geoPoint:geoAddress.coordinate ctripCity:nil locationClient:client];
        [[CTLocationManager sharedLocationManager] stopLocating:self.locationClient];
    }
}

- (void)locationClient:(CTLocationClient *)client locationSuccessWithCtripCity:(CTCtripCity *)ctripCity
{
    self.ctripCity = ctripCity;
    if (0 == self.locationLevel) {
        [self locateCallBack:self.geoAddress geoPoint:self.coordinate ctripCity:ctripCity locationClient:client];
        [[CTLocationManager sharedLocationManager] stopLocating:self.locationClient];
    }
}

- (NSString *)locateFaildDescriptionByType:(CTLocationFailType)type
{
    NSString *desc = @"";
    switch (type) {
        case CTLocationFailTypeNotEnabled:
            desc = @"(-201)定位未开启";
            break;
        case CTLocationFailTypeCoordinate:
            desc = @"(-202)获取经纬度失败";
            break;
        case CTLocationFailTypeTimeout:
            desc = @"(-203)定位超时";
            break;
        case CTLocationFailTypeGeoAddressFailed:
            desc = @"(-204)逆地址解析失败";
            break;
        case CTLocationFailTypeCtripCityFailed:
            desc = @"(-205)获取Ctrip城市信息失败";
            break;
        default:
            break;
    }
    return desc;
}

//定位失败回调
- (void)locationClient:(CTLocationClient *)client locationFail:(CTLocationFailType)failType
{
    NSString *errorMessage = [self locateFaildDescriptionByType:failType];
    if (self.callback) {
        self.callback(@[CRNResult(failType, @"locate", errorMessage), [self locateResult]]);
        [[CRNPluginManager sharedInstance] releaseObject:self];
    }
}

- (void)locateCallBack:(CTGeoAddress *)location geoPoint:(CLLocationCoordinate2D)coordinate ctripCity:(CTCtripCity *)ctripCity locationClient:(CTLocationClient *)client
{
    if (self.callback) {
        self.callback(@[CRNResult(0, @"locate", nil), [self locateResult]]);
        [[CRNPluginManager sharedInstance] releaseObject:self];
    }
}

- (NSDictionary *)locateResult
{
    NSMutableDictionary *result = [NSMutableDictionary dictionary];
    [result setObject:@{@"latitude":@(self.coordinate.latitude),@"longitude":@(self.coordinate.longitude)} forKey:@"coordinate"];
    
    if (self.geoAddress) {
        NSDictionary *address = [self.geoAddress toDictionaryForHybrid];
        if (address) {
            [result setObject:address forKey:@"address"];
        }
    }
    
    if (self.ctripCity) {
        NSDictionary *ctripCityDictionary = [self.ctripCity toDictionary];
        if (ctripCityDictionary) {
            [result setObject:ctripCityDictionary forKey:@"ctripCity"];
        }
    }
    
    return result;
}

@end
