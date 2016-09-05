/**
 * Created by ctrip on 16/1/6.
 */
define(['router'],function (router) {
    router.addRouter("",'conditioner');
    router.addRouter('bind','bindDevice');
    router.addRouter('test','conditioner');
    router.addRouter('list','list');
    router.addRouter('remove','remove');
    return router;
});