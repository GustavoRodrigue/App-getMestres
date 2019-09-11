import { createConnection } from "typeorm";
import { User } from "../entity/User";
import { Category } from "../entity/Category";
import { SubCategory } from "../entity/SubCategory";
import { Question } from "../entity/Question";
import { Customer } from "../entity/Customer";
import { ServiceProvider } from "../entity/ServiceProvider";
import { RequestOrder } from "../entity/RequestOrder";
import { RequestOrderAnswer } from "../entity/RequestOrderAnswer";

const cfg =  require('../../ormconfig.json');

export default {
    CreateConnection: async () => {
        await createConnection(
            {
                type:cfg.type,
                host: cfg.host,
                port: cfg.Port,
                username: cfg.username,
                password: cfg.password,
                database: cfg.database,
                synchronize: true,
                logging: false,
                entities: [
                    User,
                    Category,
                    SubCategory,
                    Question,
                    Customer,
                    ServiceProvider,
                    RequestOrder,
                    RequestOrderAnswer

                ]
            }
        );
        console.log('Database connected');
    }
}