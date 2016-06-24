//
//  CTJSONModel.m
//
//
//  Created by 朱峰&赵辛贵 on 13-9-23.
//  Copyright (c) 2013年 NickJackson. All rights reserved.
//  JSON格式序列化/反序列化功能类

#import "CTJSONModel.h"
#import <objc/runtime.h>

#define kKeySplitFlag @"^|^"
#define kObjSplitFlag @"|**|\n"

#define kDefaultObjectTypePrefix  @"@\""

static NSArray *enumNumberFlagArray = NULL;

#pragma mark - ---- for 64 bit

@interface NSString(X64Bit)

- (unsigned long long)unsignedLongLongValue;

@end


@implementation NSString(X64Bit)

- (unsigned long long)unsignedLongLongValue {
    return [self longLongValue];
}

@end

#pragma mark - CTJSONModel内部声明
@interface CTJSONModel ()

//+ (NSArray *)parseObjectToDictionaryInArray:(NSArray *)array baseClass:(Class)baseClass;
//+ (NSDictionary *)parseObjectToDictionaryInDictionary:(NSDictionary *)dict baseClass:(Class)baseClass;
//+ (NSSet *)parseObjectToDictionaryInSet:(NSSet *)set baseClass:(Class)baseClass;
//+ (id)parseDictionaryInObject:(NSDictionary *)dict;
//+ (NSSet *)parseSetInObject:(NSSet *)set;
//+ (BOOL)isSupportKVCType:(NSString *)type;
//+ (BOOL)objectTypeIsArray:(id)obj;
//+ (BOOL)objectTypeIsDictionary:(id)obj;
//+ (BOOL)objectTypeIsSet:(id)obj;

@end

#pragma mark - implementation CTJSONModel
@implementation CTJSONModel
@synthesize className;

#pragma mark - --------------------初始化--------------------

- (id)init
{
    self = [super init];
    if (self) {
        self.className = NSStringFromClass([self class]);
    }
    return self;
}

#pragma mark - --------------------功能函数--------------------

#pragma mark - -----转换方法（序列化）-----
#pragma mark 序列化数组对象
+ (NSArray *)parseObjectToDictionaryInArray:(NSArray *)array baseClass:(Class)baseClass
{
    if (array == nil || baseClass == nil) {
        return NULL;
    }
    
    NSMutableArray *retArray = [[NSMutableArray alloc] init];
    
    for (id obj in array) {
        id newObj = obj;
        
        if ([CTJSONModel objectTypeIsArray:obj]) {
            newObj = [CTJSONModel parseObjectToDictionaryInArray:obj baseClass:baseClass];
        }
        else if ([CTJSONModel objectTypeIsDictionary:obj]) {
            newObj = [CTJSONModel parseObjectToDictionaryInDictionary:obj baseClass:baseClass];
        }
        else if ([CTJSONModel objectTypeIsSet:obj]) {
            newObj = [CTJSONModel parseObjectToDictionaryInSet:obj baseClass:baseClass];
        }
        else if ([newObj isKindOfClass:baseClass]) { //自定义object
            newObj = [obj toDictionaryWithBaseClass:baseClass];
        }
        
        if (newObj != NULL) {
            [retArray addObject:newObj];
        }
    }
    
    return retArray;
}
#pragma mark 序列化字典对象
+ (NSDictionary *)parseObjectToDictionaryInDictionary:(NSDictionary *)dict baseClass:(Class)baseClass
{
    if (dict == nil || baseClass == nil) {
        return NULL;
    }
    
    NSMutableDictionary *retDict = [[NSMutableDictionary alloc] init];
    NSArray *allKeys = [dict allKeys];
    
    for (id key in allKeys) {
        id obj = [dict objectForKey:key];
        
        if (obj == NULL) {
            continue;
        }
        
        id newObj = obj;
        if ([CTJSONModel objectTypeIsArray:obj]) {
            newObj = [CTJSONModel parseObjectToDictionaryInArray:obj baseClass:baseClass];
        }
        else if ([CTJSONModel objectTypeIsDictionary:obj]) {
            newObj = [CTJSONModel parseObjectToDictionaryInDictionary:obj baseClass:baseClass];
        }
        else if ([CTJSONModel objectTypeIsSet:obj]) {
            newObj = [CTJSONModel parseObjectToDictionaryInSet:obj baseClass:baseClass];
        }
        else if ([obj isKindOfClass:baseClass]) {
            newObj = [obj toDictionaryWithBaseClass:baseClass];
        }
        
        if (newObj != NULL) {
            [retDict setObject:newObj forKey:key];
        }
    }
    
    return retDict;
    
}
#pragma mark 序列化集合对象
+ (NSSet *)parseObjectToDictionaryInSet:(NSSet *)set baseClass:(Class)baseClass
{
    if (set == NULL) {
        return NULL;
    }
    
    NSArray *array = [set allObjects];
    NSArray *retArray = [CTJSONModel parseObjectToDictionaryInArray:array baseClass:baseClass];
    
    NSMutableSet *retSet = [[NSMutableSet alloc] initWithArray:retArray];
    return retSet;
}
#pragma mark - -----转换方法（反序列化）-----
#pragma mark 反序列化数组对象
+ (NSArray *)parserArrayInObject:(NSArray *)array
{
    if (array == NULL) {
        return NULL;
    }
    
    NSMutableArray *retArr = [[NSMutableArray alloc] init];
    
    for (id obj in array) {
        id newObj = obj;
        if ([CTJSONModel objectTypeIsArray:obj]) {
            newObj = [CTJSONModel parserArrayInObject:obj];
        }
        else if ([CTJSONModel objectTypeIsDictionary:obj]) {
            newObj = [CTJSONModel parseDictionaryInObject:obj];
        }
        else if ([CTJSONModel objectTypeIsSet:obj]) {
            newObj = [CTJSONModel parseSetInObject:obj];
        }
        
        if (newObj != NULL) {
            [retArr addObject:newObj];
        }
    }
    
    return retArr;
}
#pragma mark 反序列化字典对象
+ (id)parseDictionaryInObject:(NSDictionary *)dict
{
    if (dict == NULL) {
        return NULL;
    }
    
    NSString *className = [dict objectForKey:@"className"];
    Class cls = NSClassFromString(className);
    
    if (cls != NULL) {  //字典转换为自定义类对象
        NSObject *retObj = [[cls alloc] init];
        NSArray *allKeys = [dict allKeys];
        
        for (id key in allKeys) {
            id obj = [dict objectForKey:key];
            
            if (obj == NULL) {
                continue;
            }
            
            id newObj = obj;
            if ([CTJSONModel objectTypeIsArray:obj]) {
                newObj = [CTJSONModel parserArrayInObject:obj];
            }
            else if ([CTJSONModel objectTypeIsDictionary:obj]) {
                newObj = [CTJSONModel parseDictionaryInObject:obj];
            }
            else if ([CTJSONModel objectTypeIsSet:obj]) {
                newObj = [CTJSONModel parseSetInObject:obj];
            }
            
            if (newObj != NULL) {
                [retObj setValue:newObj forKey:key];
            }
        }
        
        return retObj;
    }
    else  //字典转换为字典对象
    {
        NSMutableDictionary *retDict = [[NSMutableDictionary alloc] init];
        NSArray *allKeys = [dict allKeys];
        
        for (id key in allKeys) {
            id obj = [dict objectForKey:key];
            
            if (obj == NULL) {
                continue;
            }
            
            id newObj = obj;
            if ([CTJSONModel objectTypeIsArray:obj]) {
                newObj = [CTJSONModel parserArrayInObject:obj];
            }
            else if ([CTJSONModel objectTypeIsDictionary:obj]) {
                newObj = [CTJSONModel parseDictionaryInObject:obj];
            }
            else if ([CTJSONModel objectTypeIsSet:obj]) {
                newObj = [CTJSONModel parseSetInObject:obj];
            }
            
            if (newObj != NULL) {
                [retDict setObject:newObj forKey:key];
            }
        }
        
        return retDict;
    }
}
#pragma mark 反序列化集合对象
+ (NSSet *)parseSetInObject:(NSSet *)set
{
    if (set == NULL) {
        return NULL;
    }
    
    NSArray *array = [set allObjects];
    NSArray *retArray = [CTJSONModel parserArrayInObject:array];
    
    NSMutableSet *retSet = [[NSMutableSet alloc] initWithArray:retArray];
    return retSet;
}
#pragma mark - 判断对象是否支持KVC
+ (BOOL)isSupportKVCType:(NSString *)type
{
    if (enumNumberFlagArray == NULL) {
        enumNumberFlagArray = @[@"c",@"C",@"i",@"I",@"s",@"S",@"l",@"L",@"q",@"Q",@"f",@"d",@"B"];
    }
    
    if ([enumNumberFlagArray containsObject:type] || [type hasPrefix:kDefaultObjectTypePrefix]) {
        return YES;
    }
    
    return NO;
}

#pragma mark - 判断类型
#pragma mark 判断对象是否是NSArray类型
+ (BOOL)objectTypeIsArray:(id)obj
{
    if ([obj isKindOfClass:[NSArray class]] || [obj isKindOfClass:[NSMutableArray class]]) {
        return YES;
    }
    
    return NO;
}
#pragma mark 判断对象是否是NSDictionary类型
+ (BOOL)objectTypeIsDictionary:(id)obj
{
    if ([obj isKindOfClass:[NSDictionary class]] || [obj isKindOfClass:[NSMutableDictionary class]]) {
        return YES;
    }
    
    return NO;
}

#pragma mark 判断对象是否是NSSset类型
+ (BOOL)objectTypeIsSet:(id)obj
{
    if ([obj isKindOfClass:[NSSet class]] || [obj isKindOfClass:[NSMutableSet class]]) {
        return YES;
    }
    
    return NO;
}
#pragma mark - --------------------接口API--------------------

#pragma mark 类转换为Dictionary

- (NSDictionary *)toDictionary {
    NSDictionary *encodeDictionary = [self toDictionaryWithBaseClass:[CTJSONModel class]];
    return encodeDictionary;
}

@end


#pragma mark - --------------------基础方法实现--------------------
#pragma mark - NSObject (CTJSONModel)
@implementation NSObject (CTJSONModel)

- (NSDictionary *)toDictionaryWithBaseClass:(Class)baseClass
{
    NSMutableDictionary *retDict = [[NSMutableDictionary alloc] init];
    
    Class cls = [self class];
    
    while (cls != [NSObject class]) {
        
        unsigned int numberOfIvars = 0;
        Ivar* ivars = class_copyIvarList(cls, &numberOfIvars);
        
        for (const Ivar* p = ivars; p < ivars+numberOfIvars; p++) {
            
            Ivar const ivar = *p;
            const char *type = ivar_getTypeEncoding(ivar);
            NSString *key = [NSString stringWithUTF8String:ivar_getName(ivar)];
            if ([key hasPrefix:@"_"] && key.length > 1)  //虽然获取变量，但是这里序列化和反序列化都去掉变量名前面的下划线（包括property）
            {
                key = [key substringFromIndex:1];
            }
            NSString *typeStr = [NSString stringWithUTF8String:type];
            
            if (![CTJSONModel isSupportKVCType:typeStr]) {
                continue;
            }
            
            id oldValue = [self valueForKey:key];
            id newValue = oldValue;
            
            if ([typeStr hasPrefix:kDefaultObjectTypePrefix] && typeStr.length > 3) {
                
                if ([CTJSONModel objectTypeIsArray:oldValue]) {
                    newValue = [CTJSONModel parseObjectToDictionaryInArray:oldValue baseClass:baseClass];
                }
                else if ([CTJSONModel objectTypeIsDictionary:oldValue]) {
                    newValue = [CTJSONModel parseObjectToDictionaryInDictionary:oldValue baseClass:baseClass];
                }
                else if ([CTJSONModel objectTypeIsSet:oldValue]) {
                    newValue = [CTJSONModel parseObjectToDictionaryInSet:oldValue baseClass:baseClass];
                }
                else if ([oldValue isKindOfClass:baseClass]) {
                    newValue = [oldValue toDictionaryWithBaseClass:baseClass];
                }
            }
            
            if (newValue != NULL) {
                [retDict setObject:newValue forKey:key];
            }
            
        }
        
        cls = class_getSuperclass(cls);
        if (ivars != NULL) {
            free(ivars);
        }
    }
    
    return retDict;
    
}


@end

#pragma mark - NSDictionary (CTJSONModel)

@implementation NSDictionary (CTJSONModel)

- (id)toObjectWithClass:(Class)cls baseClass:(Class)baseClass {
    if (cls == nil || baseClass == nil) {
        return NULL;
    }
    
    id cloneItem = [[cls alloc] init];
    
    if (![cloneItem isKindOfClass:baseClass]) {//要生成的类不是baseClass的子类
        return NULL;
    }
    
    do {
        unsigned int numberOfIvars = 0;
        Ivar* ivars = class_copyIvarList(cls, &numberOfIvars);
        
        for (const Ivar* p = ivars; p < ivars+numberOfIvars; p++) {
            
            Ivar const ivar = *p;
            const char *type = ivar_getTypeEncoding(ivar);
            NSString *key = [NSString stringWithUTF8String:ivar_getName(ivar)];
            if ([key hasPrefix:@"_"] && key.length > 1)  //虽然获取变量，但是这里序列化和反序列化都去掉变量名前面的下划线（包括property）
            {
                key = [key substringFromIndex:1];
            }
            NSString *typeStr = [NSString stringWithUTF8String:type];
            
            if (![CTJSONModel isSupportKVCType:typeStr]) {
                continue;
            }
            
            id oldValue = [self objectForKey:key];
            id newValue = oldValue;
            
            if ([[typeStr lowercaseString] isEqualToString:@"c"]) {
                oldValue = [NSNumber numberWithChar:(char)[oldValue intValue]];
            }
            else if ([typeStr hasPrefix:kDefaultObjectTypePrefix] && typeStr.length > 3) {
                
                if ([CTJSONModel objectTypeIsArray:oldValue]) {
                    newValue = [CTJSONModel parserArrayInObject:oldValue];
                }
                else if ([CTJSONModel objectTypeIsDictionary:oldValue]) {
                    newValue = [CTJSONModel parseDictionaryInObject:oldValue];
                }
                else if ([CTJSONModel objectTypeIsSet:oldValue]) {
                    newValue = [CTJSONModel parseSetInObject:oldValue];
                }
                else if ([oldValue isKindOfClass:baseClass]){
                    newValue = [self toObjectWithClass:[oldValue class] baseClass:baseClass];
                }
            }
            
            if (newValue != NULL) {
                [cloneItem setValue:newValue forKey:key];
            }
            
        }
        
        cls = class_getSuperclass(cls);
        if (ivars != NULL) {
            free(ivars);
        }
    } while (cls != baseClass);
    
    return cloneItem;
}

@end


@implementation  NSObject(SimpleSerialize)

- (NSDictionary *)simpleToDictionary {
    
    NSMutableDictionary *retDict = [[NSMutableDictionary alloc] init];
    
    Class cls = [self class];
    
    while (cls != [NSObject class]) {
        
        unsigned int numberOfIvars = 0;
        Ivar* ivars = class_copyIvarList(cls, &numberOfIvars);
        
        for (const Ivar* p = ivars; p < ivars+numberOfIvars; p++) {
            
            Ivar const ivar = *p;
            const char *type = ivar_getTypeEncoding(ivar);
            NSString *key = [NSString stringWithUTF8String:ivar_getName(ivar)];
            if ([key hasPrefix:@"_"] && key.length > 1)  //虽然获取变量，但是这里序列化和反序列化都去掉变量名前面的下划线（包括property）
            {
                key = [key substringFromIndex:1];
            }
            NSString *typeStr = [NSString stringWithUTF8String:type];
            
            if (![CTJSONModel isSupportKVCType:typeStr]) {
                continue;
            }
            
            id oldValue = [self valueForKey:key];
            if (oldValue != NULL) {
                [retDict setObject:oldValue forKey:key];
            }
        }
        
        cls = class_getSuperclass(cls);
        if (ivars != NULL) {
            free(ivars);
        }
    }
    
    return retDict;
}


- (NSString *)simpleToString {
    
    NSMutableString *retStr = [NSMutableString string];

    Class cls = [self class];
    
    while (cls != [NSObject class]) {
        
        unsigned int numberOfIvars = 0;
        Ivar* ivars = class_copyIvarList(cls, &numberOfIvars);
        
        for (const Ivar* p = ivars; p < ivars+numberOfIvars; p++) {
            
            Ivar const ivar = *p;
            const char *type = ivar_getTypeEncoding(ivar);
            NSString *key = [NSString stringWithUTF8String:ivar_getName(ivar)];
            if ([key hasPrefix:@"_"] && key.length > 1)  //虽然获取变量，但是这里序列化和反序列化都去掉变量名前面的下划线（包括property）
            {
                key = [key substringFromIndex:1];
            }
            NSString *typeStr = [NSString stringWithUTF8String:type];
            
            if (![CTJSONModel isSupportKVCType:typeStr]) {
                continue;
            }
            
            id oldValue = [self valueForKey:key];
            if (oldValue != NULL) {
                [retStr appendFormat:@"%@=%@",key, oldValue];
                [retStr appendString:kKeySplitFlag];
            }
        }
        
        cls = class_getSuperclass(cls);
        if (ivars != NULL) {
            free(ivars);
        }
    }
    
    if (retStr.length > kKeySplitFlag.length) {
        [retStr stringByReplacingCharactersInRange:NSMakeRange(retStr.length-kKeySplitFlag.length, kKeySplitFlag.length) withString:@""];
    }
    
    return retStr;
}

@end

@implementation NSDictionary(SimpleSerialize)

- (id)simpleToObject:(Class)cls {
    if (cls == NULL) {
        return NULL;
    }
    
    id cloneItem = [[cls alloc] init];
    
    do {
        unsigned int numberOfIvars = 0;
        Ivar* ivars = class_copyIvarList(cls, &numberOfIvars);
        
        for (const Ivar* p = ivars; p < ivars+numberOfIvars; p++) {
            
            Ivar const ivar = *p;
            const char *type = ivar_getTypeEncoding(ivar);
            NSString *key = [NSString stringWithUTF8String:ivar_getName(ivar)];
            if ([key hasPrefix:@"_"] && key.length > 1)  //虽然获取变量，但是这里序列化和反序列化都去掉变量名前面的下划线（包括property）
            {
                key = [key substringFromIndex:1];
            }
            NSString *typeStr = [NSString stringWithUTF8String:type];
            
            if (![CTJSONModel isSupportKVCType:typeStr]) {
                continue;
            }
            
            id oldValue = [self objectForKey:key];
            
            if (oldValue != NULL) {
                [cloneItem setValue:oldValue forKey:key];
            }
            
        }
        
        cls = class_getSuperclass(cls);
        if (ivars != NULL) {
            free(ivars);
        }
    } while (cls != [NSObject class]);
    
    return cloneItem;
}

@end

@implementation NSString(SimpleDerialize)

- (id)simpleToObject:(Class)cls {
    if (cls == nil || self.length == 0) {
        return NULL;
    }
    
    id cloneItem = [[cls alloc] init];
    
    NSArray *propertyList = [self componentsSeparatedByString:kKeySplitFlag];
    NSMutableDictionary *tmpKeyValueDict = [NSMutableDictionary dictionary];
    
    for (NSString *aProperty in propertyList) {
        NSRange eqRange = [aProperty rangeOfString:@"="];
        if (eqRange.location == NSNotFound) {
            continue;
        }
        NSString *key = [aProperty substringToIndex:eqRange.location];
        if (key.length < 1) {
            continue;
        }
        
        NSString *value = [aProperty substringFromIndex:eqRange.location +1];
        [tmpKeyValueDict setValue:value forKey:key];
    }
    
    if ([tmpKeyValueDict count] > 0) {
        do {
            unsigned int numberOfIvars = 0;
            Ivar* ivars = class_copyIvarList(cls, &numberOfIvars);
            
            for (const Ivar* p = ivars; p < ivars+numberOfIvars; p++) {
                
                Ivar const ivar = *p;
                const char *type = ivar_getTypeEncoding(ivar);
                NSString *key = [NSString stringWithUTF8String:ivar_getName(ivar)];
                if ([key hasPrefix:@"_"] && key.length > 1)  //虽然获取变量，但是这里序列化和反序列化都去掉变量名前面的下划线（包括property）
                {
                    key = [key substringFromIndex:1];
                }
                NSString *typeStr = [NSString stringWithUTF8String:type];
                
                if (![CTJSONModel isSupportKVCType:typeStr]) {
                    continue;
                }
                
                id oldValue = [tmpKeyValueDict valueForKey:key];
                if ([[typeStr lowercaseString] isEqualToString:@"c"]) {
                    oldValue = [NSNumber numberWithChar:(char)[oldValue intValue]];
                }
                
                if (oldValue != NULL) {
                    [cloneItem setValue:oldValue forKey:key];
                }
                
            }
            
            cls = class_getSuperclass(cls);
            if (ivars != NULL) {
                free(ivars);
            }
        } while (cls != [NSObject class]);
    }
  
    return cloneItem;
}

@end

