const Knex = require('knex')
const Bookshelf = require('bookshelf')
const path = require('path')

module.exports = app => {
    let config = app.config.bookshelf
    app.bookshelf = Bookshelf(
        Knex({...config.knex, debug: config.debug})
    )

    if (config.plugins) {
        config.plugins.forEach(item => {
            app.bookshelf.plugin(item)
        })
    }

    app.loader.loadToApp(
        path.resolve(app.baseDir, 'app', config.baseDir),
        'model'
    )
}