//
//  SimpleDefines.h
//  reactsimple
//
//  Created by ctrip on 16/6/19.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#ifndef SimpleDefines_h
#define SimpleDefines_h




/**
 *  执行的block
 *
 *  @return Action block
 */
typedef  void (^Action)();


/**
 *  App安装包路径
 */
#define kAppDir        [[NSBundle mainBundle] bundlePath]
/**
 *  App的Tmp目录
 */
#define kTmpDir        NSTemporaryDirectory()
/**
 *  App的Library目录
 */
#define kLibraryDir    [NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES) objectAtIndexForCtrip:0]
/**
 *  App的Cache目录
 */
#define kCacheDir      [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) objectAtIndexForCtrip:0]
/**
 *  App的Documents目录
 */
#define kDocumentDir    [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndexForCtrip:0]


/**
 *  App宽度
 */
#define kAppViewWidth   [[UIScreen mainScreen] applicationFrame].size.width
/**
 *  App高度
 */
#define kAppViewHeight  [[UIScreen mainScreen] applicationFrame].size.height

/**
 *  屏幕宽度
 */
#define kScreenWidth    [[UIScreen mainScreen] bounds].size.width

/**
 *  屏幕高度
 */
#define kScreenHeight   [[UIScreen mainScreen] bounds].size.height

/**
 *  判断操作系统版本是否大于等于v
 */
#define fOSVersionGreaterThan(v)  ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedAscending)

/**
 *  RGBA宏定义
 */
#define fRGBA(r,g,b,a)           [UIColor colorWithRed:r/255.0 green:g/255.0 blue:b/255.0 alpha:a]

/**
 *  RGB宏定义，alpha＝1
 */
#define fRGB(r,g,b)              [UIColor colorWithRed:r/255.0 green:g/255.0 blue:b/255.0 alpha:1.0f]

/**
 *  语言国际化
 */
#define fLS(s)                    NSLocalizedString((s),@"")

/**
 *  NSUserDefault宏定义
 */
#define kUserDefault            [NSUserDefaults standardUserDefaults]

/**
 *  NotificationCenter宏定义
 */
#define kNotificationCenter     [NSNotificationCenter defaultCenter]

/**
 *  UIDevice宏定义
 */
#define kDevice                 [UIDevice currentDevice]

/**
 *  UIScreen宏定义
 */
#define kScreen                 [UIScreen mainScreen]

/**
 *  UIApplication宏定义
 */
#define kApplicaiton            [UIApplication sharedApplication]

/**
 *  AppDelegate宏定义
 */
#define kAppDelegate            [UIApplication sharedApplication].delegate




//defines from h5global.h
#define kiOSHotFixPackagePrefix [@"hf_iOS" stringByAppendingFormat:@"_%@", getAppVersion()]
#define kTempiOSHotFixPackagePrefix [@"hf_iOS" stringByAppendingFormat:@"_%@_tmp", getAppVersion()]

//Notifications
#define kH5WebViewShouldReloadNotification @"kH5WebViewShouldReloadNotification"
#define kH5NativeShouldReloadNotification @"kH5NativeShouldReloadNotification"
#define kH5CopyStringNotification @"kH5CopyStringNotification"
#define kFileDidChangedNotification @"kFileDidChangedNotification"

//UserDefaults Keys
#define kLocalDebugFlagKey @"kLocalDebugFlagKey"
#define kShowH5LogFlagKey @"kShowH5LogFlagKey"


#define kIs_Debug_Local boolValueForKey(kLocalDebugFlagKey)

#define kDPath          [kDocumentDir stringByAppendingString:@"/d.x"]
#define  kWebAppDirName @"webapp_work"
#define  kWebAppDirPath [kDocumentDir stringByAppendingFormat:@"/%@/",kWebAppDirName]
#define  kDebugWebAppDirName @"webapp"

#define  kWbDownloadDirPath [kDocumentDir stringByAppendingFormat:@"/wb-download-%@/", getAppVersion()]


//new defines from joezhang
#define  kResourceRNBundleFlag @"bundle://"






#endif /* SimpleDefines_h */
