//
//  FirstViewController.m
//  TestLibProject
//
//  Created by ctrip on 15/9/6.
//  Copyright (c) 2015年 sunrise. All rights reserved.
//

#import "FirstViewController.h"
//#import "XFramework.h"
#import "H5ViewController.h"

@interface FirstViewController ()

@property (strong, nonatomic) IBOutlet UIView *view2;

@end

@implementation FirstViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
        
        self.tabBarItem.image = [UIImage imageNamed:@"first.png"];
        self.tabBarItem.title = @"第一个";
        
        self.navigationItem.title = @"第一个视图";
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

- (IBAction)switchView:(id)sender {
    
    //FirstViewController* vTemp = [[FirstViewController alloc]init];
    //vTemp.view.backgroundColor = [UIColor brownColor];
    //[self.navigationController pushViewController:vTemp animated:true];
    //[H5ViewController loadURL]
    NSURL* html = [[NSBundle mainBundle] URLForResource:@"GoogleMap" withExtension:@"html"];
    NSString *textFileContents = [NSString stringWithContentsOfFile:html];
    //[H5ViewController loadURL:[NSURL URLWithString:@"http://www.baidu.com"] fromViewController:self];
  
   [H5ViewController loadURL:html fromViewController:self];

    
}
@end
