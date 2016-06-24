//
//  SimpleMainFramework.m
//  reactsimple
//
//  Created by ctrip on 16/6/22.
//  Copyright © 2016年 Facebook. All rights reserved.
//
#import "FirstViewController.h"
#import "SecondViewController.h"
#import "ThirdViewController.h"
#import "ForthViewController.h"
#import "SimpleMainFramework.h"


#define XColorRGB(r,g,b) [UIColor colorWithRed:(r)/255.0f green:(g)/255.0f blue:(b)/255.0f alpha:1.0f]

@implementation SimpleMainFramework
+ (UIViewController*)initUI:(NSDictionary*)params{
  
  //and 4 vnc
  UIViewController* vFirst = [[FirstViewController alloc] init];
  vFirst.view.backgroundColor =XColorRGB(0, 0, 200);
  UIViewController* vSecond = [[SecondViewController alloc]init];
  vSecond.view.backgroundColor =XColorRGB(0, 200, 100);
  UIViewController* vThird  = [[ThirdViewController alloc] init];
  vThird.view.backgroundColor = XColorRGB(200, 0, 0);
  UIViewController* vForth  = [[ForthViewController alloc] init];
  //vForth.view.backgroundColor = XColorRGB(100, 100, 100);
  
  
  UINavigationController *navFirst = [[UINavigationController alloc] initWithRootViewController:vFirst];
  UINavigationController *navSecond = [[UINavigationController alloc] initWithRootViewController:vSecond];
  UINavigationController *navThird = [[UINavigationController alloc] initWithRootViewController:vThird];
  UINavigationController *navForth = [[UINavigationController alloc] initWithRootViewController:vForth];
  
  
  //NSArray* array = [NSArray arrayWithObjects:vFirst,vSecond, nil];
  NSArray* arrayNav = [NSArray arrayWithObjects:navFirst,navSecond,navThird,navForth, nil];
  
  UITabBarController *tabBar = [[UITabBarController alloc]init];
  tabBar.viewControllers = arrayNav;
  

  return tabBar;
}
@end
