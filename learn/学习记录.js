一、html 、css
    1、【前端性能优化-图片】
    1）、使用base64方式：使用Base64编码的图片可以减少HTTP请求的数量，因为图片被直接编码在CSS或HTML中。但是，需要注意的是，Base64编码会增加文件的大小（大约增加33%），所以只适用于较小的图片。同时，这并不会真正提高加载速度，而是减少了HTTP请求的次数。如果页面包含大量大型图片，或者对页面加载速度有严格要求的场景，应该避免使用Base64
    2)、通过CDN来托管图片，能够利用CDN的地理位置优势和缓存机制，加快图片的加载速度。
    3). SRCSET和SIZES属性
    使用srcset和sizes属性来提供不同分辨率的图片，并告诉浏览器应该使用哪个版本的图片。
    <img srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 2000w"
        sizes="(max-width: 600px) 500px, (max-width: 1200px) 1000px, 2000px"
        src="small.jpg"
        alt="Responsive Image with Srcset and Sizes"></img>
    4）以下是一个简单的懒加载实现示例：
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Image Optimization Example</title>
    </head>
    <body>
        <!-- 使用data-src代替src属性 -->
        <img data-src="large-image.jpg" alt="Optimized Image" class="lazyload">

        <!-- 引入jQuery（可选，只是为了简化示例） -->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <!-- 引入懒加载脚本 -->
        <script src="lazyload.js"></script>
    </body>
    </html>
    上面的懒加载脚本是一个简单的实现，实际项目中可能需要更健壮和灵活的解决方案，比如使用成熟的库如lozad.js或vanilla-lazyload。



2、rem
    1）、使用 webpack 的 postcss-loader 的一 个插件 postcss-px-to-viewport 实现对 px 到 vw 的自动转换
    postcss-px-to-viewport 是一个 PostCSS 插件，它可以将 CSS 中使用的 px 单位转换为 vw 单位，以实现响应式设计的目的。这非常有用，特别是当你想要根据视口大小自动调整元素的大小时。
    要使用 postcss-px-to-viewport 插件与 postcss-loader 配合 webpack，以下是一个具体的指导：
    1. 安装必要的包
        首先，你需要安装 webpack、postcss-loader 以及相关的插件和依赖。
        npm install --save-dev webpack webpack-cli postcss-loader postcss postcss-px-to-viewport
    2. 配置 webpack 和 PostCSS
        然后，在 webpack 的配置文件中添加 postcss-loader：

        webpack.config.js：
        const path = require('path');
        module.exports = {
            entry: './src/index.js',
            output: {
                filename: 'main.js',
                path: path.resolve(__dirname, 'dist'),
            },
            module: {
                rules: [
                {
                    test: /\.css$/,
                    use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                        postcssOptions: {
                            plugins: [
                            require('postcss-px-to-viewport')({
                                viewportWidth: 750, // 视口宽度
                                unitPrecision: 5, // 转换后的精度，即小数点位数
                                minPixelValue: 2, // 最小值，如果转换的结果小于这个值则会保留为px
                                maxPixelValue: 10000, // 最大值，如果转换的结果大于这个值则会保留为px
                                // ... 其他配置项
                            }),
                            ],
                        },
                        },
                    },
                    ],
                },
                ],
            },
        };
    这里，postcss-px-to-viewport 插件的 viewportWidth 选项被设置为 750，这意味着我们在设计时使用的是基于 750px 宽度的设计稿。
    3. 使用场景
        假设你有一个移动端的页面，它的设计是基于 750px 宽度的设计稿。在设计稿中，你有一个元素的宽度是 150px。当你将这个宽度写入 CSS 时，你可以直接使用 px 单位：

        style.css
        .element {
            width: 150px;
        }
        但是，当 webpack 构建你的代码时，postcss-px-to-viewport 插件会自动将 150px 转换为对应的 vw 单位，以便根据视口的大小自动调整元素的宽度。这样，你可以轻松地实现响应式设计，而无需手动计算 vw 值。
    4. 结果
        构建后，style.css 中的样式将自动转换为：

        .element {
            width: 20vw; /* 假设转换结果为20vw，这取决于你的设计稿和viewportWidth的值 */
        }
        现在，无论用户在何种设备上查看你的页面，.element 的宽度都会根据视口的大小自动调整，从而提供更好的用户体验。


    2）、在移动端开发中，rem 是一个非常有用的单位，它允许你根据根元素的字体大小来设置元素的大小，从而实现响应式设计。以下是一些在移动端使用 rem 的最佳实践，以及如何使用代码来实现它们。
    1. 设置根元素字体大小
        首先，你需要在 HTML 的根元素（<>）上设置一个基准的字体大小。这个大小通常是根据设计稿的屏幕尺寸来确定的。例如，如果你的设计稿是基于 750px 的宽度，你可以设置根元素的字体大小为 100px（或任何其他适合你的用例的值）：
        html {
            font-size: 100px; /* 或其他合适的基准值 */
        }
    2. 根据屏幕尺寸动态设置根元素字体大小
        由于移动设备的屏幕尺寸差异很大，你可能想要根据实际的视口尺寸来动态调整根元素的字体大小。这可以通过使用 JavaScript 或 CSS 媒体查询来实现。
        使用 JavaScript
        你可以使用 JavaScript 来监听视口的尺寸变化，并相应地调整根元素的字体大小。以下是一个简单的示例：
        window.addEventListener('resize', function() {
            var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            // 根据视口宽度调整根元素的字体大小
            // 这里假设设计稿宽度为750px，字号基准为100px
            document.documentElement.style.fontSize = (width / 750) * 100 + 'px';
        });
        // 初始执行一次，避免页面刚加载时字体大小不正确
        window.dispatchEvent(new Event('resize'));
        使用 CSS 媒体查询
        你也可以使用 CSS 的媒体查询来设置不同的屏幕尺寸下根元素的字体大小：
        html {
            font-size: 100px; /* 默认尺寸 */
        }
        @media (max-width: 750px) {
            html {
                font-size: calc(100px * (100vw / 750)); /* 根据视口宽度动态调整 */
            }
        }
    3. 使用 rem 设置元素大小
        一旦你设置了根元素的字体大小，你就可以使用 rem 单位来设置其他元素的大小了。例如：
        .container {
            width: 7.5rem; /* 相当于设计稿中的 750px */
            height: 15rem; /* 相当于设计稿中的 1500px */
        }
        .box {
            font-size: 1.6rem; /* 相当于设计稿中的 160px */
            margin: 0.5rem; /* 相当于设计稿中的 50px */
        }
    4. 考虑使用 CSS 预处理器
        使用如 Sass 或 Less 这样的 CSS 预处理器，你可以更容易地管理 rem 的计算。预处理器允许你使用变量和函数来简化 rem 的使用和计算。
        Sass 示例：
        $base-font-size: 100px; // 基准字体大小
        $design-width: 750px; // 设计稿宽度
        html {
            font-size: $base-font-size;
        }

        @mixin rem($size) {
            font-size: $size * 1px; // 转化为px方便计算
            font-size: ($size / $design-width) * $base-font-size + rem; // 计算为rem值
        }

        .container {
            @include rem(7.5); // 宽度相当于设计稿中的750px
        }
    5. 适配不同屏幕密度的设备
        对于不同屏幕密度的设备（如 Retina 显示屏），你需要确保你的图片和其他资源也进行了适当的适配。通常，这涉及到提供不同分辨率的图片版本，并使用媒体查询或 srcset 属性来根据不同的设备像素比加载不同的图片。
    6. 考虑用户缩放需求
        虽然使用 rem 可以帮助实现响应式设计，但也要注意不要完全禁止用户缩放页面。确保你的网站在响应式设计的同时，也支持用户根据自己的需求进行缩放。
    7. 测试与调试
        最后，务必在不同的设备和屏幕尺寸上进行测试和调试，确保你的 rem 布局在各种情况下都能正常工作。你可以使用浏览器的开发者工具来模拟不同的设备屏幕尺寸和像素比，以方便测试。


二、 js 
1、考察this指针指向问题 （todo 理解）
        // 4 2 1 ?    4 2 4 ?
        function Foo() {
            Foo.a = function() { console.log(1) } // 给Foo函数自身添加一个方法a
            this.a = function() { console.log(2) } // 给Foo的实例对象添加一个方法a
        }
        Foo.prototype.a = function() { console.log(3) } // 给Foo的原型添加一个方法a
        Foo.a = function() { console.log(4) } // 再次给Foo函数自身添加一个方法a，覆盖前面的赋值
        Foo.a(); // 4
        let obj = new Foo();
        obj.a(); // 2
        Foo.a(); // 1  ? 4   打印出来是1，this被new调用，指向的创建的对象obj， new也会执行Foo函数，倒数第三行修改了Foo.a，所以打印出来的是1



        然后，我们按照顺序来看代码的执行过程：
        Foo.a();
        这一行直接调用了Foo函数对象上的a方法，此时Foo.a已经被最后定义为function() { console.log(4) }，所以输出4。
        let obj = new Foo();
        这行代码创建了Foo的一个实例对象obj，并执行了Foo的构造函数。在构造函数中：
        首先给Foo函数自身添加了一个新的a方法（但这并不影响后面的调用，因为前面的Foo.a调用已经完成）。
        然后给实例对象obj添加了一个a方法。
        obj.a();
        调用了obj实例上的a方法，因为在构造函数中，我们为this.a（即obj.a）赋值了一个打印2的函数，所以这里输出2。
        再次Foo.a();
        和第一次调用一样，直接调用了Foo函数对象上的a方法，输出1。
        需要注意的是，构造函数中给Foo.a赋值并不会影响已经创建的对象或者Foo的原型，它只会改变Foo函数对象自身的a属性。而实例对象obj的a属性则是直接在构造函数中通过this.a添加的。Foo.prototype.a虽然被定义了，但是在此代码中并没有被用到（如果尝试obj.a()而非显式地创建obj.a，则会调用原型上的a方法）。

2、 考察对象属性值传递问题
        function changeObjProperty(o) { 
            o.siteUrl = "http://www.baidu.com"
            o = new Object()
            o.siteUrl = "http://www.google.com"
        } 
        let webSite = new Object();
        changeObjProperty(webSite);
        console.log(webSite.siteUrl);
        由于changeObjProperty函数内部首先更改了webSite对象的siteUrl属性，
        然后创建了一个新的对象并更改了它的siteUrl属性（但这不会影响webSite对象），所以打印的结果是webSite对象的siteUrl属性，即"http://www.baidu.com"。
        总结来说：
            尽管changeObjProperty函数内部更改了对象的属性，然后又重新指向了一个新对象并再次更改其属性，
            但是由于JavaScript的函数参数传递是值传递（这里的值是指对象引用的值），
            对函数内部o的引用改变不会影响外部的webSite对象。
            因此，console.log(webSite.siteUrl);的输出结果是"http://www.baidu.com"。

3、事件顺序执行问题
    题目：
        async function async1() { 
            console.log('async1 start'); 
            await async2(); 
            console.log('async1 end');
        }
        async function async2() { console.log('async2');}
        console.log('script start');  
        new Promise(
            function(resolve) { 
                console.log('promise1222');
                resolve();
            }
        ).then(
            function() { console.log('promise2222');}
        );
        setTimeout(function() {
             console.log('setTimeout');
            }, 0
        )
        async1();
        new Promise(
            function(resolve) { 
                console.log('promise1');
                resolve();
            }
        ).then(
            function() { console.log('promise2');}
        );
        console.log('script end');
    答案：
        script start
        promise1222
        async1 start
        async2
        promise1
        script end
        promise2222
        async1 end
        promise2
        setTimeout
    分析：执行顺序的基本规则：
        同步代码 首先执行。
        Promise 会立即创建并开始执行，但任何 .then 或 .catch 注册的回调将在当前执行栈清空后才会执行（即作为微任务）。
        await 会暂停 async 函数的执行，等待 Promise 解析后再继续执行 async 函数的后续代码。
        setTimeout 注册的回调将推迟到事件循环的下一次迭代执行，作为宏任务。

    题目2 :
        console.log('start');  // 1
        const promise = new Promise((resolve) => {
        console.log('promise executor'); // 2
        resolve('promise result');
        });

        promise.then((result) => {
        console.log('promise then callback', result); // 5
        });

        setTimeout(() => {
        console.log('setTimeout callback'); // 8
        }, 0);

        async function asyncFunc() {
        console.log('async function start'); //3
        const asyncResult = await promise;
        console.log('async function after await', asyncResult); // 6
        return 'async function result';
        }

        const asyncPromise = asyncFunc();

        asyncPromise.then((result) => {
        console.log('async promise then callback', result); // 7
        });

        console.log('end');  //4


4、 作用域
        var a = 10;                       // 在全局作用域声明并初始化变量 a为10
        (function () { 
            console.log(a);               // undefined，因为变量提升，声明被提前到函数顶部，但初始化保持在当前位置， let a; console.log(a); 所以是undfined
            a = 5;     
            console.log(a)                   // 修改全局变量a的值为5
            console.log(window.a);       // 输出全局变量a的值，此时为5（等同于console.log(a)）

            var a = 20;                    // 声明局部变量a并初始化为20，由于变量提升，声明被提前到函数顶部，但初始化保持在当前位置
            console.log(a);               // 输出局部变量a的值，此时为20（注意：这里不会再次输出全局变量a的值，因为局部变量a已经声明并遮挡了全局变量a）
        })();


5、考察数组
    题目：
        var obj = { 
            '2': 3, 
            '3': 4, 
            'length': 2, 
            'splice': Array.prototype.splice, 
            'push': Array.prototype.push
        }
        obj.push(1)
        obj.push(2)
        console.log(obj) 
    输出：
        [,,1,2] length 为 4 解释：Array.prototype.push 将根据 length 将元素填充到对应位置并修 改 length 属性 +1，所以输出的结果就是上述结果。

6、 考察赋值表达式
        题目：
            var a = {n: 1};
            var b = a;
            a.x = a = {n: 2};
            console.log(a.x); console.log(b.x)
        输出结果将是：
            undefined
            { n: 2 }

        解释：
            当执行 a.x = a = {n: 2}; 
            这行代码时，赋值操作是从右向左进行的。
            首先，a 被赋予了一个新的对象 {n: 2}。
            然后，试图给原始对象（此时由变量 b 引用）的属性 x 赋值。
            因此，对象 b 现在有了一个属性 x，其值为 {n: 2}。
            但是，由于 a 已经被重新赋值为一个新的对象 {n: 2}，
            它没有属性 x，所以 a.x 是 undefined。
            而 b.x 是 {n: 2}，因为 b 仍然引用着原始对象，
            并且该对象的属性 x 已经被赋值。         


7、实现new
    在JavaScript中，new 关键字用于创建一个用户自定义的对象类型或者具有构造函数的内置对象的实例。当我们使用 new 关键字来调用函数时，发生了以下几个步骤：
        创建一个新的空对象。
        将这个新对象的原型链接到构造函数的 prototype 对象。
        将构造函数的 this 上下文指向这个新对象。
        如果构造函数返回了一个对象，那么这个对象会取代整个 new 表达式的结果。如果构造函数没有返回对象，那么 new 表达式的结果就是步骤1中创建的新对象。
    
    现在，我们可以模拟 new 的行为，创建一个名为 myNew 的函数：
        function myNew(Constructor, ...args) {
            // 步骤1: 创建一个新的空对象
            const instance = {};
            // 步骤2: 将这个新对象的原型链接到构造函数的 prototype 对象
            instance.__proto__ = Constructor.prototype;

            // 步骤3: 将构造函数的 this 上下文指向这个新对象，并执行构造函数
            const result = Constructor.apply(instance, args);

            // 步骤4: 如果构造函数返回了一个对象，那么返回这个对象；否则返回新创建的对象
            return result instanceof Object ? result : instance;
        }
    下面是如何使用这个 myNew 函数的例子：
        // 定义一个构造函数
        function Person(name, age) {
            this.name = name;
            this.age = age;
        }

        // 为 Person 的原型添加一个方法
        Person.prototype.sayHello = function() {
            console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
        };

        // 使用 myNew 函数来创建一个 Person 实例
        const john = myNew(Person, "John", 30);

        // 测试属性和方法
        console.log(john.name); // 输出: John
        console.log(john.age);  // 输出: 30
        john.sayHello();       // 输出: Hello, my name is John and I'm 30 years old.
        在这个例子中，myNew 函数模拟了 new 关键字的行为。我们首先创建了一个新的空对象，并将其原型设置为 Person.prototype。然后，我们使用 apply 方法来调用 Person 构造函数，并将 this 上下文设置为新创建的对象。最后，我们检查构造函数是否返回了一个对象，如果是，则返回该对象；否则，返回新创建的对象。


8、 class类详细介绍 ：
    在JavaScript中，class 是一种用于创建对象的模板或蓝图的语法糖。
    尽管 JavaScript 本质上是基于原型的语言，并且不使用传统的面向对象编程（OOP）的类，
    但 class 语法提供了一种更简洁、更易于理解的方式来组织和创建对象。
    下面是对 JavaScript 中 class 的详细介绍：

    1. 定义类：你可以使用 class 关键字来定义一个类。类可以包含构造函数、方法和属性。
        class MyClass {
            constructor(name) {
                this.name = name;
            }
            sayHello() {
                console.log(`Hello, my name is ${this.name}`);
            }
        }
        在这个例子中，我们定义了一个名为 MyClass 的类。它有一个构造函数，该函数接受一个参数 name，并将其存储在类的实例中。类还定义了一个名为 sayHello 的方法，该方法打印出一条问候消息。

    2. 创建实例：使用 new 关键字和类名来创建类的实例。
        const instance1 = new MyClass('Alice');
        const instance2 = new MyClass('Bob');
        这里，我们创建了两个 MyClass 的实例，分别命名为 instance1 和 instance2，并传入了不同的 name 参数。

    3. 访问方法和属性：你可以通过实例来访问类中的方法和属性。
        instance1.sayHello(); // 输出: Hello, my name is Alice
        console.log(instance2.name); // 输出: Bob
    4. 继承
        JavaScript 中的类支持继承，这意味着你可以创建一个类，然后让另一个类继承其属性和方法。这是通过 extends 关键字实现的。
            class MySubClass extends MyClass {
                constructor(name, age) {
                    super(name); // 调用父类的构造函数
                    this.age = age;
                }

                introduce() {
                    console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
                }
            }
            const subInstance = new MySubClass('Charlie', 25);
            subInstance.introduce(); // 输出: Hi, I'm Charlie and I'm 25 years old.
            subInstance.sayHello(); // 输出: Hello, my name is Charlie (继承自父类的方法)
        在这个例子中，MySubClass 继承自 MyClass。
        通过调用 super(name)，我们能够在子类的构造函数中调用父类的构造函数。

    5. 静态方法和属性
        使用 static 关键字可以在类上定义静态方法和属性，这些方法和属性只能通过类本身访问，而不能通过类的实例访问。
            class MyStaticClass {
                static myStaticMethod() {
                    console.log('This is a static method.');
                }
            }
            MyStaticClass.myStaticMethod(); // 输出: This is a static method.
    6. 类的私有属性和方法
        虽然早期的 JavaScript 类语法没有直接支持私有属性和方法，但你可以使用一些约定（如前缀 _）来表示私有成员。从 ES2020 开始，你可以使用 # 前缀来创建真正的私有属性和方法。

            class MyPrivateClass {
                #privateProperty = 'private';

                constructor() {
                    this.publicProperty = 'public';
                }

                #privateMethod() {
                    console.log(this.#privateProperty);
                }

                publicMethod() {
                    this.#privateMethod(); // 可以从公共方法内部访问私有方法
                }
            }
            const privateInstance = new MyPrivateClass();
            privateInstance.publicMethod(); // 输出: private (通过公共方法间接访问)
            // privateInstance.#privateMethod(); // 错误: 无法直接访问私有方法
        总的来说，JavaScript 中的 class 提供了一种更结构化和面向对象的方式来组织代码，尽管其底层仍然是基于原型的。


三、vue 
1、Vue 的响应式原理中 Object.defineProperty 有什么缺陷？为什 么在 Vue3.0 采用了 Proxy，抛弃了 Object.defineProperty？
    1）、Object.defineProperty 的缺陷：
        不支持数组和对象的深层监听：
        Object.defineProperty 只能对对象的属性进行劫持，对于数组的方法或对象的深层属性变化无法监听。例如，当我们改变数组的长度或者调用数组的像 push、pop 这样的方法时，它不能触发视图更新。
        
        无法检测属性的添加或删除：
        如果给对象添加了一个新属性，Object.defineProperty 无法感知到，除非这个属性在初始化时就已经存在于对象上。同理，如果删除了某个属性，也无法被检测到。

        性能问题：
        在对象上定义大量属性时，Object.defineProperty 的开销会变得非常大，因为它需要为每个属性都执行一次定义操作。

        必须遍历对象的所有属性：
    为了实现响应式，Vue 2.x 必须在初始化时遍历对象的所有属性，并通过 Object.defineProperty 将它们转为 getter/setter。这在大型对象上会是一个性能瓶颈。

    2）、 Vue 3.0 为什么采用 Proxy：
        支持深层监听：
        Proxy 可以监听整个对象，包括其属性、子对象以及数组的变化。

        对新属性添加/删除的支持：
        使用 Proxy，当对象添加或删除属性时，Vue 3.0 可以立即感知并触发相应的更新。

        更好的性能：
        Proxy 在处理大型对象或频繁变化的对象时通常比 Object.defineProperty 有更好的性能。

        更简洁的代码：
        Vue 3.0 使用 Proxy 可以简化响应式系统的实现。

    3）、Vue 3.0 中 Proxy 的关键源码示例：
        下面是一个简化的 Vue 3.0 响应式系统的 reactive 函数示例，该函数使用 Proxy 实现：
        function reactive(obj) {
            // 创建响应式对象
            return new Proxy(obj, {
                get(target, key, receiver) {
                // 收集依赖（这里省略了依赖收集的逻辑）
                // ...
                // 返回属性的值
                const result = Reflect.get(target, key, receiver);
                return isObject(result) ? reactive(result) : result;
                },
                set(target, key, value, receiver) {
                // 触发更新（这里省略了更新触发的逻辑）
                // ...
                // 设置属性的值
                return Reflect.set(target, key, value, receiver);
                },
                deleteProperty(target, key) {
                // 删除属性并触发更新（这里省略了删除和更新触发的逻辑）
                // ...
                return Reflect.deleteProperty(target, key);
                }
                // 其他陷阱（trap）方法...
            });
        }
        在上面的代码中，我们创建了一个新的 Proxy 对象，这个对象会拦截对原始对象的 get、set 和 deleteProperty 操作。在 get 方法中，我们可以执行依赖收集，确保当属性发生变化时，相关的观察者可以得到通知；在 set 和 deleteProperty 方法中，我们可以触发组件的重新渲染或其他适当的更新逻辑。
        请注意，上面的示例仅用于解释 Vue 3.0 使用 Proxy 的基本概念，实际的 Vue 3.0 实现要复杂得多，并包含更多的功能、优化和边界情况处理。
2、Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作的原因主要是因为它们的设计初衷和响应式机制。
    设计初衷：
        Vuex 的 mutation：Vuex 的 mutation 是用于修改状态的函数，其设计初衷就是确保每一次状态的改变都是可追踪的，从而能够方便地实现调试和状态回滚等功能。异步操作可能引入不确定性，使得状态的改变难以追踪。
        Redux 的 reducer：在 Redux 中，reducer 是纯函数，它接收当前的 state 和 action，并返回新的 state。reducer 的设计初衷是保持状态的确定性，即相同的输入总是产生相同的输出。异步操作可能引入外部因素，破坏这种确定性。
    
    响应式机制：
        Vue 的响应式系统：在 Vue 中，状态是响应式的，这意味着当状态发生变化时，视图会自动更新。Vuex 通过 mutation 来确保状态的改变能够被 Vue 的响应式系统捕获并触发相应的视图更新。然而，如果 mutation 中包含异步操作，那么状态的改变可能无法被实时捕获，从而导致视图更新不同步。
        Redux 的中间件：虽然 Redux 本身不允许在 reducer 中进行异步操作，但它提供了中间件（middleware）的机制来处理异步操作。中间件可以在 action 被派发（dispatch）到 reducer 之前或之后执行任何操作，包括异步操作。这种设计确保了 reducer 的纯函数性质不受破坏，同时又能灵活地处理异步操作。
        总结来说，Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作是为了保持状态的确定性和可追踪性，以及确保视图的同步更新。对于需要异步操作的情况，Vuex 提供了 action 来处理，而 Redux 则可以通过中间件来实现。

3、双向绑定和 vuex 是否冲突 ？
    当在严格模式中使用 Vuex 时，在属于 Vuex 的 state 上使用 v-model 会导致出错。 
    解决方案： 
        1)给 <Input> 中绑定 value，然后侦听 input 或者 change 事件，在事件回调中 调用一个方法； 
        2).使用带有 setter 的双向绑定计算属性；
    补充说明：
        双向绑定和Vuex并不直接冲突，但在某些情况下可能会引起一些问题。双向绑定是指视图（View）和模型（Model）之间的双向数据绑定，当视图中的数据发生变化时，模型会随之更新；反过来，当模型中的数据发生变化时，视图也会相应地更新。在Vue中，通过v-model指令可以实现双向数据绑定。
        然而，当双向绑定和Vuex同时使用时，可能会引起一些问题。双向绑定可能导致视图直接修改了Vuex中的状态，而绕过了Vuex的mutation，这可能破坏了状态的可预测性和一致性。另外，在大型应用中，双向绑定可能导致状态的变更难以追踪和调试。
        为了避免这些问题，通常建议在使用Vuex时尽量避免直接在组件中使用双向绑定。相反，通过使用Vuex的getter来获取状态，在组件中使用单向数据流来更新视图。
        在Vuex的严格模式下，对state的修改只能在mutation中进行，这意味着双向绑定的v-model不能直接用在state上，否则当输入框内容改变，试图直接修改state时，就会抛出错误。但是，可以通过一些方式来解决这个问题，比如使用计算属性（computed properties）来实现双向绑定。当输入框的值改变时，setter会被调用，然后在setter中调用mutation来改变state的值。
        总的来说，虽然双向绑定和Vuex并不直接冲突，但在使用时需要注意避免直接修改Vuex中的状态，以保持状态的可预测性和一致性。

4.Vue 的父组件和子组件生命周期钩子执 行顺序是什么 
    1. 加载渲染过程：父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted； 
    2. 子组件更新过程：父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated； 
    3. 父组件更新过程：父 beforeUpdate -> 父 updated； 
    4. 销毁过程：父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed；


5、vue3中<script setup>写法与setup() {}写法的异同
    Vue 3 引入了 Composition API，这是为了解决 Vue 2 中随着组件复杂度的增加而出现的逻辑组织和可维护性问题。<script setup> 和 setup() 都是 Composition API 的使用方式，但它们之间有一些重要的异同。
    相同点：
        响应性：无论是使用 <script setup> 还是 setup()，你都可以利用 Vue 3 的响应性系统，如 ref、reactive 等。
        组合逻辑：两者都允许你使用 Composition API 的组合函数，如 computed、watch、watchEffect 等，从而更加灵活地组织和复用代码逻辑。
        与模板的交互：无论是哪种写法，都可以返回模板所需的数据和方法，以供模板使用。
    不同点：
        语法简洁性：
            <script setup> 提供了更加简洁和直观的语法。在这种模式下，你不需要显式地导出一个 setup 函数，所有在 <script setup> 范围内定义的变量和函数都会自动暴露给模板。
            相比之下，setup() 需要明确地导出一个函数，并在该函数内部定义和返回所有的响应式数据和方法。
        声明与定义：
            在 <script setup> 中，你可以直接声明 ref 和 reactive 变量，它们会自动被处理为响应式的，并且可以直接在模板中使用。
            在 setup() 中，你需要在函数体内部声明这些响应式变量，并通过 return 语句将它们暴露出去。
        语法糖与明确性：
            <script setup> 可以视为一种语法糖，它使得代码更加简洁，同时也减少了样板代码的数量。然而，这种简洁性可能对于不熟悉这种写法的开发者来说会增加一定的学习曲线。
            setup() 则提供了更加明确的结构，尤其是在处理复杂的组件逻辑时。它使得代码的组织和阅读更加直观。
        与其他 API 的结合：
            <script setup> 更加简洁的语法使得它与其他 Vue 3 的新特性（如 defineProps、defineEmits 以及 <style vars>）结合得更为紧密和直观。
            而在 setup() 中使用这些新特性可能需要稍微多一点的样板代码。
        总的来说：
            <script setup> 和 setup() 在功能上是等价的，它们都是 Vue 3 Composition API 的表现形式。选择哪种写法主要取决于你的个人喜好和项目的具体需求。如果你追求代码的简洁性和直观性，并且愿意接受一定的学习曲线，那么 <scrip setup> 可能是一个不错的选择。而如果你更看重代码的明确性和结构性，那么 setup() 可能会更适合你。

四、react



五、node



六、小程序


七、网络相关
1.介绍 HTTPS 握手过程 
    1. 客户端使用 https 的 url 访问 web 服务器，要求与服务器建立 ssl 连接； 
    2. web 服务器收到客户端请求后，会将网站的证书（包含公钥）传送一份 给客户端；
    3. 客户端收到网站证书后会检查证书的颁发机构以及过期时间，如果没有问 题就随机产生一个秘钥；
    4. 客户端利用公钥将会话秘钥加密，并传送给服务端，服务端利用自己的私钥解密出会话秘钥；
    5. 之后服务器与客户端使用秘钥加密传输；

八、其他
1、为什么通常在发送数据埋点请求的时候使 用的是 1x1 像素的透明 gif 图片
在发送数据埋点请求时，使用1x1像素的透明GIF图片主要有以下几个原因：
    跨域友好：图片请求天然支持跨域，这使得使用1x1像素的GIF图片能够方便地跨域发送数据，无需担心跨域限制的问题。
    执行过程无阻塞：相比其他请求方式，图片请求不会阻塞页面加载，也不会影响用户的体验。这对于需要快速发送数据并避免影响页面性能的场景来说非常有利。
    体积小且透明：1x1像素的GIF图片体积非常小，对网页内容几乎没有影响。这使得它在发送数据埋点请求时几乎不会占用额外的带宽或资源。
    无需服务器响应：在数据埋点请求的场景中，通常只需要向服务器发送数据（如日志数据），而无需服务器返回消息体回应。使用1x1像素的GIF图片作为请求的一部分，服务器可以用一个非常小的响应（甚至不发送任何实体内容，只发送一个状态码如204 No Content）来确认请求的成功处理，从而节省服务器资源。
    易于实现和检测：使用图片请求发送数据埋点相对简单，不需要复杂的请求处理逻辑。同时，可以通过图片的onerror和onload事件来检测发送状态，方便进行错误处理和状态监控。
    综上所述，使用1x1像素的透明GIF图片在发送数据埋点请求时具有跨域友好、无阻塞、体积小、无需服务器响应以及易于实现和检测等优点，因此得到了广泛的应用。

2、移动端点击问题通常涉及几个方面，包括点击穿透、点击延迟（300ms延迟）、以及点击区域过小等。
    这些问题主要源于移动端浏览器对点击事件的不同处理方式和移动设备屏幕的局限性。下面我将详细讨论这些问题，并提供具体的解决方案和代码案例。

        1. 点击穿透（Click Through）
        点击穿透通常发生在两个重叠的可点击元素之间，当你点击上层的元素时，下层的元素也会被触发。这经常发生在弹出层、模态框等场景中。
        解决方案：
        使用touchend代替click：移动端建议使用touchend事件代替click事件，因为touchend事件会在手指离开屏幕时立即触发，而click事件会有300ms的延迟。
        阻止默认行为和冒泡：在点击上层元素时，使用e.preventDefault()和e.stopPropagation()阻止默认行为和事件冒泡。
        代码案例：
        document.querySelector('.overlay').addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // 处理点击事件
        });
        2. 点击延迟（300ms Delay）
        移动端浏览器为了区分点击和长按操作，通常会在点击事件触发前等待300ms。这会导致页面响应变慢，用户体验下降。
        解决方案：
        使用FastClick库：FastClick是一个流行的JavaScript库，用于消除移动端浏览器的300ms点击延迟。它可以自动检测是否需要处理延迟，并相应地优化点击事件。
        自定义解决方案：如果你不想使用第三方库，也可以自己实现类似的功能。通常是通过在touchend事件中模拟click事件来实现。
        
        代码案例（使用FastClick）：
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);
        3. 点击区域过小
        由于移动设备屏幕尺寸有限，一些按钮或链接的点击区域可能过小，导致用户难以准确点击。
        解决方案：
        增大点击区域：通过CSS样式增大元素的点击区域。可以使用padding、margin或伪元素（如:before、:after）来实现。
        使用touch-target-size属性：在某些情况下，你可以使用CSS的touch-target-size属性来指定最小触摸目标大小。
        代码案例：
        .button {
            padding: 15px; /* 增大点击区域 */
            display: inline-block;
            /* 其他样式 */
        }
    总结：移动端点击问题是前端开发中常见的问题，但通过合理的解决方案和代码优化，可以有效地提升用户体验。在实际开发中，可以根据具体情况选择适合的解决方案，并结合代码案例进行实现。

3、面向对象原则
        1. 单一职责原则（Single Responsibility Principle，SRP）
            SRP原则规定一个类应该只有一个改变的理由。
        2. 开放封闭原则（Open Closed Principle，OCP）
            OCP原则规定软件实体（类、模块、函数等）应该对扩展开放，对修改关闭。
        3. 依赖倒置原则（Dependence Inversion Principle，DIP）
        4. 里氏替换原则（Liskov Substitution Principle，LSP）
        5. 接口隔离原则（Interface Segregation Principle，ISP）
        6. 迪米特法则（Law of Demeter，LoD）
        7. 合成复用原则（Composite/Aggregate Reuse Principle，CARP）
        8. 迪米特法则（Law of Demeter，LoD）

4、设计模式介绍
    单例模式：保证一个类只有一个实例，并提供一个访问它的全局访问点。
    工厂模式：定义一个用于创建对象的接口，让子类决定实例化哪一个类。
    观察者模式：定义对象间的一种一对多的依赖关系，以便当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并自动更新。
    策略模式：定义一系列的算法，把它们一个个封装起来，并且使它们可相互替换。
    适配器模式：将一个类的接口转换成客户希望的另外一个接口。
    模板方法模式：定义一个操作中的算法骨架，将算法的一些步骤延迟到子类中实现。
    组合模式：将对象组合成树形结构以表示“部分-整体”的层次关系。
    迭代器模式：提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露该对象的内部表示。
    状态模式：允许一个对象在其内部状态改变时改变它的行为。
    命令模式：将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化。
    中介者模式：用一个对象来封装一系列对象的交互方式，使得这些对象不必相互明显。
    备忘录模式：在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。

5、渲染过程中遇到 JS 文件怎么处理
    JavaScript 的加载、解析与执行会阻塞文档的解析，
    也就是说，在构建 DOM 时，HTML 解析器若遇到了 JavaScript，那么它会暂停文档的解析，
    将控制权移交给 JavaScript 引擎，等 JavaScript 引擎运行完毕，浏览器再从中断的地方恢复继续解析文档。 
    也就是说，如果你想首屏渲染的越快，就越不应该在首屏就加载 JS 文件，这也是都 建议将 script 标签放在 body 标签底部的原因。
    当然在当下，并不是说 script 标签必须放 在底部，因为你可以给 script 标签添加 defer 或者 async 属性。

    defer: 属性表示延迟到整个页面都解析完毕后再执行；这段Js加载时,HTML并未停止解析，这两个过程是并行的
    async: 属性表示异步加载 JS 文件，执行顺序按照加载顺序。它的执行仍然会阻塞文档的解析

    补充详细说明：
        （1）脚本没有 defer 或 async，浏览器会立即加载并执行指定的脚本，也就是说不等待后续载入的文档元素，读到就加载并执行。 
        （2）defer 属性表示延迟[执行]引入的 JavaScript，即这段 JavaScript 加载时 , HTML并未停止解析，这两个过程是并行的。
            当整个 document 解析完毕后再执行脚本文件，在 DOMContentLoaded 事件触发之前 完成。多个脚本按顺序执行。 
        （3）async 属性表示异步执行引入的 JavaScript，与 defer 的区别在于，如果已经加载好，就会开始执行，也就是说它的执行仍然会阻塞文档的解析，只是它的加载过程不会阻塞。多个脚本的执行顺序无法保证。


6、浏览器渲染过程
    浏览器渲染过程分为三个阶段：
    1. 构建 DOM 树：浏览器读取 HTML 代码，并构建出 DOM 树。
    2. 构建渲染树：将 CSS 代码解析成树结构， 构建 CSSOM 树。
    3. 合并 DOM 和 CSSOM 树以生成渲染树。
    4. 布局和绘制：根据渲染树来布局，计算每个节点的位置和大小信息。
    5. 浏览器会将每个节点绘制到屏幕上。

7、省略
    /*单行文本溢出*/
        p { 
            overflow: hidden; 
            text-overflow: ellipsis; 
            white-space: nowrap;
        }

    /*多行文本溢出*/：使用伪元素和线性渐变来实现多行文本省略的效果
            p {
                max-width: 200px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2; /* 设置显示的行数 */
                -webkit-box-orient: vertical;
                word-break: break-all;
            }
        上面的代码使用了-webkit-line-clamp属性，它是WebKit浏览器引擎（如Chrome和Safari）的一个非标准属性，用于限制在一个块元素显示的文本的行数。如果文本行数超过了限制，就会用省略号（…）来表示。
        然而，这个方法并不是所有浏览器都支持。为了兼容更多的浏览器，你可以使用伪元素和线性渐变来模拟多行文本省略的效果：
            p {
                position: relative; 
                line-height: 1.5em; /*高度为需要显示的行数*行高，比如这里我们显示两行，则为 3*/ 
                height: 3em;
                overflow: hidden;
            }
            p:after { 
                content: "...";
                position: absolute;
                bottom: 0;
                right: 0;
                background-color: #fff;
            }

8、隐藏元素的 background-image 到底加不加载？
回答
（1）元素的背景图片 
    -元素本身设置 display:none，会请求图片 
    -父级元素设置 display:none，不会请求图片
    -样式 没有元素使用，不会请求
    -:hover 样式下，触发时请求 
（2）img 标签图片任何情况下都会请求图片

   
   

    
    







