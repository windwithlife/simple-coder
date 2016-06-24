//
//  SimpleViewController.m
//  reactsimple
//
//  Created by ctrip on 16/6/20.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "SimpleViewController.h"

@interface SimpleViewController ()

@end

@implementation SimpleViewController
- (void)setBackBarButtonItem:(UIBarButtonItem *)item
{
  
}

- (void)setBackButtonWithTarget:(id)target action:(SEL)selector
{
  CGFloat barItemMargin;
  barItemMargin = 0.0f;
  
  UIButton *customButton = [UIButton buttonWithType:UIButtonTypeCustom];
  UIImage* image = [UIImage imageNamed:@"common_btn_back_arrow.png"];
  UIImage* pressedImage = [UIImage imageNamed:@"common_btn_back_arrow_focus.png"];
  [customButton setImage:image forState:UIControlStateNormal];
  [customButton setImage:pressedImage forState:UIControlStateHighlighted];
  
  [customButton setFrame:CGRectMake(0, 0, 22+barItemMargin, 44)];
  [customButton addTarget:target action:selector forControlEvents:UIControlEventTouchUpInside];
  UIBarButtonItem *item = [[UIBarButtonItem alloc] initWithCustomView:customButton];
  self.navigationItem.leftBarButtonItem = item;

}


- (void)viewDidLoad {
    [super viewDidLoad];
  [self setBackButtonWithTarget:self action:@selector(backBarButtonClicked:)];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

//- (BOOL)navigationBar:(UINavigationBar *)navigationBar shouldPopItem:(UINavigationItem *)item
//{
//  //在此处添加点击back按钮之后的操作代码
//  NSLog(@"aaaaaaaaaaaaa");
//  return FALSE;
//  [self backBarButtonClicked:item];
//}

- (void)viewWillAppear:(BOOL)animated
{
  [super viewWillAppear:animated];
  
  //if (self.navigationController == nil)
  //{
  //  self.simpleNavigationController = (SimpleNavigationController *)self.navigationController;
  //}
  
  //if (self.navigationController.viewControllers.count > 1)
  //{
  //  [self setBackButtonWithTarget:self action:@selector(backBarButtonClicked:)];
  //}
  
  
 /*
  NSTimeInterval interval = CFAbsoluteTimeGetCurrent() - _lastRecordTimestamp;
//#if DEBUG
  NSTimeInterval pace = 10;
#else
  NSTimeInterval pace = 10 * 60;
#endif
  if (_lastRecordTimestamp == 0 || interval > pace) {
    _lastRecordTimestamp = CFAbsoluteTimeGetCurrent();
    NSString *className = NSStringFromClass(self.class);
    [LogUtil logMonitor:@"o_active_pager" value:@(0.5) userInfo:@{@"class_name":className}];
  }
  */
}
#pragma mark 返回按钮点击
- (void)backBarButtonClicked:(id)sender
{
  //[self setServiceControllerAlertOff];
  //[self cancelAllServices];
  
  if (self.navigationController.viewControllers.count > 1)
  {
    [self.navigationController popViewControllerAnimated:YES];
  }
  else
  {
    [self.navigationController dismissModalViewControllerAnimated:YES];
  }
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
