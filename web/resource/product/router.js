/**
 * Created by ctrip on 16/1/6.
 */
define(['router'],function (router) {
    router.addRouter('main','main');
    router.addRouter('add','add');
    router.addRouter('edit','edit');
    router.addRouter('info','info');
    router.addRouter('remove','remove');
    return router;
});