//
//  SecondViewController.m
//  TestLibProject
//
//  Created by ctrip on 15/9/6.
//  Copyright (c) 2015年 sunrise. All rights reserved.
//

#import "SecondViewController.h"
#import "CRNDispatcher.h"

@interface SecondViewController ()

@end

@implementation SecondViewController


- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
        
        self.tabBarItem.image = [UIImage imageNamed:@"second.png"];
        self.title = @"TestTitle";
        self.tabBarItem.title = @"第二个";
        
        self.navigationItem.title = @"第二个视图";
    }
    return self;
}


- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
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

- (IBAction)btnReactOpen:(id)sender {
  
  [CRNDispatcher dispatcherURLString:@"bundle://main?crnmodulename=youRN" fromViewController: self];
  
}
@end
