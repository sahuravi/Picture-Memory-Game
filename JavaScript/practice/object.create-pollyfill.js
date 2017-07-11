MyObject = {
    create: function (proto, props) {
        debugger
        var obj = {};
        obj.__proto__ = proto;
        Object.defineProperties(obj, props);
        return obj;
    }
}
var newObj = MyObject.create(null, {
    foo: {
        writable: true,
        configurable: true,
        value: 'hello'
    },
    bar: {
        configurable: false,
        get: function () {
            return 10;
        },
        set: function (value) {
            console.log('Setting `o.bar` to', value);
        }
    }
});

for (i = 1; i < n) {
    i = i * 2;
}