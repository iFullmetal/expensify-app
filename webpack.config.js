const path = require('path'); //вебпак интерпритируется нодом, так что require работает(только в этом файле)
//entry -> output

//тут нужно сказать webpack'у что ему транслировать(интерпритировать? компилировать? транспилировать?) и куда

module.exports = {
    entry: './src/app.js',
    //entry: './src/playground/redux-expensify.js',

    output: {
        path: path.join(__dirname, '/public'),
        filename: 'bundle.js'
    },
    watch: true,

    module:{
        rules:[{
            //дружу webpack с babel
            //говорю ему: хэй, вебпак,
            loader: 'babel-loader', //через такую штуку
            test: /\.js$/, //бабли такие файлы
            exclude: [
                '/node_modules/', //но кроме тех, которые лежат здесь
                //'/src/playground/'//и эти тоже не бабли, ок?
            ]

        },
        {
            //говорю вебпаку грузить css через эти npm модули
            test: /\.s?css$/,
            //use - массив loader'ов
            use: ['style-loader', 'css-loader', 'sass-loader']
        },
        ]
    },
    //для удобного дебага в браузере(вместо моего кода не билеберда вебпаковская),
    //для продакшена не пойдет, ибо медленное
    devtool: 'cheap-module-eval-source-map',
    mode: "development",
    //удобный сервак, который сразу запускает webpack
    //но при этом bundle у него не физический, т.е. лежит в оперативе, а не в файле, чтобы быстрее работало
    devServer: {
        contentBase: path.join(__dirname, '/public'),
        //для работы client-side routing'а нужно, чтобы сервер выдавал дефолтный index.html на любой запрос
        //и реакт уже сам соображала, что там рисовать по адрессной строке
        historyApiFallback:true
    },
};