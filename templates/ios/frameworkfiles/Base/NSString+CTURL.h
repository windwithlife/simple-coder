//
//  NSString+CTURL.h
//  CTFoundation
//
//  Created by derick on 8/25/15.
//  Copyright (c) 2015 Ctrip. All rights reserved.
//

#import <Foundation/Foundation.h>


// 支持 符合 rfc1808 的 url：'<scheme>://<net_loc>/<path>;<params>?<query>#<fragment>'
//http://www.w3.org/Addressing/rfc1808.txt
// e.g. 'ctrip://m.fat16.ctrip.com:80/webapp/tour;c1=2?q1=a&q2=b#ppp'
// 以及 '/' 本地路径
// 以及 'file:///' 协议
@interface NSString (CTURL)
- (NSString *)utf8EncodeForURL;

/*
** 调用 CFURLCreateStringByAddingPercentEscapes。
 */
- (NSString *)encodeURLComponent;

/*
 ** 调用 CFURLCreateStringByReplacingPercentEscapes。
 */
- (NSString *)decodeURLComponent;

/*
** 调用 stringByAddingPercentEscapesUsingEncoding。
 */
- (NSString *)encodeURL;

/*
** 调用 stringByReplacingPercentEscapesUsingEncoding。
 */
- (NSString *)decodeURL;

/*
 ** 历史遗留
 */
- (NSDictionary *)getDictFromURLString;

@property (readonly, copy) NSString *scheme;
@property (readonly, strong) NSDictionary *query;
@property (readonly, copy) NSString *queryString;
@property (readonly, copy) NSString *host;
@property (readonly, copy) NSString *path;
@end