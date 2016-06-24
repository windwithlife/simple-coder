//
//  CRNRichTextView.h
//  AwesomeProject
//
//  Created by zlp on 16/6/12.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RCTViewManager.h"
#import "RCLabel.h"

@interface CRNRichTextView : RCLabel

@property (nonatomic, copy) NSString *html;
@property (nonatomic, assign) CGFloat needLayout;

@property (nonatomic, copy) RCTBubblingEventBlock onImgClick;
@property (nonatomic, copy) RCTBubblingEventBlock onUrlClick;
@property (nonatomic, copy) RCTBubblingEventBlock onTextLayout;
@end
