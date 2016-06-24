//
//  ForthViewController.m
//  TestLibProject
//
//  Created by ctrip on 15/9/6.
//  Copyright (c) 2015年 sunrise. All rights reserved.
//

#import "ForthViewController.h"

@interface ForthViewController ()

@end

@implementation ForthViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
        
        self.tabBarItem.image = [UIImage imageNamed:@"four.png"];
        self.title = @"TestTitle";
        self.tabBarItem.title = @"第四个";
        
        self.navigationItem.title = @"第四个视图";
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.view.backgroundColor= [UIColor colorWithPatternImage:[UIImage imageNamed:@"thirdBackground.jpg"]];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
