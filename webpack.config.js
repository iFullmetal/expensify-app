const path = require('path'); //вебпак интерпритируется нодом, так что require работает(только в этом файле)
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // для раздельной компиляции css и js



//entry -> output

//тут нужно сказать webpack'у что ему транслировать(интерпритировать? компилировать? транспилировать?) и куда
// и как, в зависимости от того, продакш ли это или дев

module.exports = (env)=>{
    const isProduction = env === 'production';

    return  {
        entry: './src/app.js',
        //entry: './src/playground/redux-expensify.js',

        output: {
            path: path.join(__dirname, '/public/dist'),
            filename: 'bundle.js'
        },
        watch: !isProduction,

        module:{
            rules:[

                {
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
                    //говорю вебпаку грузить css через эти npm модули(стили будут лежать вместе с js в одном файле)
                    test: /\.s?css$/,
                    //use - массив loader'ов
                    use: ['style-loader','css-loader', 'sass-loader']
                },

                // //гружу стили в отдельный css файл
                // {
                //     test: /\.s?css$/,
                //     //говорю вебпаку грузить css/scss через эти npm модули
                //     use: [
                //         MiniCssExtractPlugin.loader,
                //         {
                //             loader: "css-loader",
                //             options: {
                //                 modules: true,
                //                 sourceMap: !isProduction,
                //                 importLoaders: 2
                //             }
                //         },
                //         "sass-loader"
                //     ]
                // }
            ]
        },
        // plugins: [
        //     new MiniCssExtractPlugin({
        //         // Options similar to the same options in webpackOptions.output
        //         // all options are optional
        //         filename: 'styles.css',
        //         chunkFilename: '[id].css',
        //         ignoreOrder: false, // Enable to remove warnings about conflicting order
        //     }),
        // ],

        //cheap-module-eval-source-map для удобного дебага в браузере(вместо моего кода не билеберда вебпаковская),
        //для продакшена не пойдет, ибо медленное
        //source-map для продакшена будет грузится только при нажатии f12, а так страница весит 600кб
        devtool: isProduction ?  undefined : 'cheap-module-eval-source-map',
        mode: "development",
        //удобный сервак, который сразу запускает webpack
        //но при этом bundle у него не физический, т.е. лежит в оперативе, а не в файле, чтобы быстрее работало
        devServer: {
            contentBase: path.join(__dirname, '/public/dist'),
            //для работы client-side routing'а нужно, чтобы сервер выдавал дефолтный index.html на любой запрос
            //и реакт уже сам соображала, что там рисовать по адрессной строке
            historyApiFallback: true,
            //говорю серву, где искать bundle
            //publicPath:'/dist/',

        },
    };
};
