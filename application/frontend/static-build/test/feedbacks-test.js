define(["can","i18n","utils","app/feedbacks","app/models/feedback","can/view/mustache"],function(e,t,n,r){buster.testCase("something test",{setUp:function(){var i=n.getParam("lang"),o={debug:!0,resGetPath:"locales/__lng__/__ns__.json"};o.lng=void 0!=i?i:"en",n.enableLog(),e.when(t.init(o)).then(function(){e.route.ready(!1),e.Mustache.registerHelper("i18n",function(e){return void 0!=t?t.t(e):e}),new r.router(document),e.route.ready(!0)}),this.timeout=7e3}})});