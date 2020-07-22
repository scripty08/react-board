import { Server, IndexController } from '@scripty/server';
import { ModulesController } from '@scripty/modules';
import ArticlesController from '@scripty/articles';
import dotenv from 'dotenv'
import { mongo } from '@scripty/mongo';

const init = async () => {
    dotenv.config();

    let server = new Server();

    const mongoConfig = {
        server: process.env.server,
        db: process.env.db,
        user: process.env.user,
        password: process.env.password,
        port: process.env.port || 27017,
        options: {
            "encrypt": true
        }
    }

    const mongoose = await mongo(mongoConfig);

    await server.setDatabase(mongoose);
    await server.addController(new IndexController({ title: '@scripty/react-board' }));
    await server.addController(new ModulesController());
    await server.addController(new ArticlesController());
    server.start(3014);
};

init().catch((err) => {
    console.error(err.message);
});
