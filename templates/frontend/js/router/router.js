/**
 * Created by ctrip on 16/1/6.
 */
define(['router'],function (router) {
    router.addRouter('','home');
    router.addRouter('index','index');
    router.addRouter('add','add');
    router.addRouter('edit','edit');
    router.addRouter('info','info');
    router.addRouter('remove','remove');
    return router;
});