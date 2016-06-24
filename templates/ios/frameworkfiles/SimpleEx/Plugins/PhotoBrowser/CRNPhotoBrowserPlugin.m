//
//  CRNPhotoBrowserPlugin.m
//  CTPublicProduct
//
//  Created by wei_l on 16/6/16.
//  Copyright © 2016年 ctrip. All rights reserved.
//

#import "CRNPhotoBrowserPlugin.h"
#import "CTGalleryImageItem.h"
#import "CTGallery.h"
#import "NSString+CTURL.h"
#import "CTH5Utility.h"

@implementation CRNPhotoBrowserPlugin

- (void)callFunction:(NSString *)functionName
          parameters:(NSDictionary *)parameters
            callback:(RCTResponseSenderBlock)callback {
    if ([functionName isEqualToString:@"show"]) {
        NSDictionary *args = parameters;
        NSArray *imageList = args[@"photoList"];
        NSArray *shareDataList = args[@"shareDataList"];
        NSDictionary *meta = args[@"meta"];
        
        NSMutableArray *imageItemList = [[NSMutableArray alloc] initWithCapacity:imageList.count];
        for (NSDictionary *aDict in imageList) {
            CTGalleryImageItem *item = [[CTGalleryImageItem alloc] init];
            item.thumbnailURL = [NSURL URLWithString:[aDict[@"imageThumbnailUrl"] utf8EncodeForURL]];
            item.url = [NSURL URLWithString:[aDict[@"imageUrl"] utf8EncodeForURL]];
            item.imageDescription = aDict[@"imageDescription"];
            item.name = aDict[@"imageTitle"];
            item.category = aDict[@"category"];
            [imageItemList addObject:item];
        }
        
        NSUInteger showPhotoIndex = [args[@"showPhotoIndex"] unsignedIntegerValue];
        BOOL isThumbnailMode = [meta[@"isThumbnailMode"] boolValue];
        NSString *businessCode = meta[@"businessCode"];
        UIViewController *vc = nil;
        if (!isThumbnailMode) {
            vc = [CTGallery imageViewController:imageItemList selectIndex:showPhotoIndex];
        } else {
            vc = [CTGallery thumbnailImageViewController:imageItemList];
        }
        [CTGallery sharedCTGallery].hybridShareDataList = shareDataList;
        [CTGallery sharedCTGallery].businessCode = businessCode;
        UINavigationController *nav = [[self class] visibleNavigationController];
        runBlockInMainThread(^{
            [nav pushViewController:vc animated:YES];
        });
    }
}

@end
