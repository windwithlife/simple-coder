//
//  CRNRichTextViewManager.m
//  AwesomeProject
//
//  Created by zlp on 16/6/13.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "CRNRichTextViewManager.h"
#import "CRNRichTextView.h"
#import "CTGallery.h"
#import "CTGalleryImageItem.h"
#import "CTUtil.h"
#import "CTH5Utility.h"
#import "RCTShadowView.h"
#import "RCTConvert.h"

@interface CRNRichTextViewManager() <RTLabelDelegate>

@end

@implementation CRNRichTextViewManager

RCT_EXPORT_MODULE(CRNHtmlText)

RCT_EXPORT_VIEW_PROPERTY(onUrlClick, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onImgClick, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onTextLayout, RCTBubblingEventBlock)
RCT_CUSTOM_VIEW_PROPERTY(html, NSString, CRNRichTextView)
{
  view.html = json ?: @"";
}
RCT_CUSTOM_VIEW_PROPERTY(needLayout, CGFloat, CRNRichTextView)
{
    CGFloat need = json ? [RCTConvert CGFloat:json] : NO;
    view.needLayout = need;
}


- (UIView *)view
{
    CRNRichTextView *textView = [[CRNRichTextView alloc] init];
    textView.delegate = self;
    return textView;
}

- (void)rtLabel:(CRNRichTextView *)rtLabel didSelectLinkWithURL:(NSString*)url
{
    if (url.length > 0) {
//        openURL([CTUtil currentVisibleViewController], url, nil);
        if (rtLabel.onUrlClick) {
            rtLabel.onUrlClick(@{@"url":url});
        }
    }
    
}

- (void)rtLabel:(CRNRichTextView *)rtLabel didSelectImageWithURL:(NSString*)imageUrl
{
    if (imageUrl.length > 0) {
//        NSDictionary *dict = @{@"url":imageUrl, @"thumbnail":imageUrl, @"name":@"", @"imageDescription":@"", @"category":@""};
//        CTGalleryImageItem *item = [[CTGalleryImageItem alloc] initWithDictionary:dict];
//        UIViewController *vc = [CTGallery imageViewController:@[item] selectIndex:0];
//        [[CTUtil windowRootViewController] pushViewController:vc animated:YES];
        if (rtLabel.onImgClick) {
            rtLabel.onImgClick(@{@"imageUrl":imageUrl});
        }
    }

    
}

@end
