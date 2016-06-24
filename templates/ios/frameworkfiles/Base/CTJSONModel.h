//
//  CTJSONModel.h
//
//
//  Created by 朱峰&赵辛贵 on 13-9-23.
//  Copyright (c) 2013年 NickJackson. All rights reserved.
//  JSON格式序列化/反序列化功能类

#import <Foundation/Foundation.h>

/**
	支持对象序列化类
 */
@interface CTJSONModel : NSObject

/** 对象类名 */
@property (nonatomic, copy) NSString *className;

/**
	将CTJSONModel类或子类序列化为JSON字符串方法
 
	@return 序列化后的JSON字符串
 */
- (NSDictionary *)toDictionary;

@end

#pragma mark - ---- 完整的对象序列化

@interface NSObject (CTJSONModel)

/**
 *  将对象转换成Dictionary.该转换函数，会对类中的基类，以及dict/array/set等容器中都进行遍历转换
 *  被转换的对象需要有基类，基类里面必须要有成员变量className，表示该类类名。
 *  NOTE:建议当前转换类直接继承CTJSONObject
 *
 *  @param baseClass 当前需要转换对象的基类
 *
 *  @return 对象对应的Dictionary
 */
- (NSDictionary *)toDictionaryWithBaseClass:(Class)baseClass;

@end

@interface NSDictionary (CTJSONModel)

/**
 *  Dictionary转换成类。该转化函数支持对象嵌套。
 *  需要转换成的class需要有基类，基类里面必须要有成员变量className，表示该类类名。
 *  NOTE:建议baseClass为CTJSONObject，需要转换的类继承该基类
 *
 *  @param cls       需要被转化成功的类的类名
 *  @param baseClass 需要被转换类的基类
 *
 *  @return Dictionary对应的类
 */
- (id)toObjectWithClass:(Class)cls baseClass:(Class)baseClass;

@end


#pragma mark - ---- 简易的序列化/反序列化对象，不处理容器嵌套，只处理父子类成员变量

/**
 * @description 对象转化成dict/String
 *
 */
@interface NSObject(SimpleSerialize)

/**
 *  对象转换成Dictionary，不做嵌套对象/容器内对象的转换
 *
 *  @return 对象对应的Dictionary
 */
- (NSDictionary *)simpleToDictionary;

/**
 *  对象转化成字符串，不做嵌套对象/容器内对象的转换
 *  参考字符串转化成对象- (id)simpleToObject:(Class)cls;
 *
 *  @return 对象对应的字符串
 */
- (NSString *)simpleToString;

@end

/**
 * @description dict转化成对象
 *
 */
@interface NSDictionary(SimpleSerialize)

/**
 *  Dictionary转化成对象，不做嵌套对象/容器内对象的转换
 *  参考：
 *
 *  @param cls 需要转换成的类名
 *
 *  @return Dictionary对应的对象
 */
- (id)simpleToObject:(Class)cls;

@end


/**
 * @description string转化成对象
 *
 */
@interface NSString(SimpleDerialize)

/**
 *  字符串转换成对象，不做嵌套对象/容器内对象的转换
 *  参考- (NSString *)simpleToString;
 *  @param cls 转换成的对象类型
 *
 *  @return 字符串对应的对象
 */
- (id)simpleToObject:(Class)cls;

@end