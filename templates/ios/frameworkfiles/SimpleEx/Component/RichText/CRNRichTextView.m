//
//  CRNRichTextView.m
//  AwesomeProject
//
//  Created by zlp on 16/6/12.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "CRNRichTextView.h"
#import "UIView+React.h"

@interface CRNRichTextView()

@end

@implementation CRNRichTextView




-(void)setHtml:(NSString *)html
{
    [self setText:html];
    [self optimumSize];
}

-(void)setNeedLayout:(CGFloat)needLayout
{
    [self setNeedsDisplay];
}

-(void)setOptimumSize:(CGSize)size
{
    _optimumSize = size;
    if (self.onTextLayout) {
        self.onTextLayout(@{@"width":[NSNumber numberWithFloat:_optimumSize.width],@"height":[NSNumber numberWithFloat:_optimumSize.height]});
        NSLog(@"xxxxx");
    }
    
}


@end
