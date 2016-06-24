//
//  CRNViewController.h
//  CTBusiness
//
//  Created by derick on 16/4/27.
//  Copyright © 2016年 Ctrip. All rights reserved.
//

#import "SimpleViewController.h"
#import "CRNURL.h"

@interface CRNViewController : SimpleViewController

- (instancetype)initWithURL:(CRNURL *)url;

- (void)setDisableDefaultBack;

@end
